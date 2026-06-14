export default async function handler(req, res) {
  // Only allow GET requests for CDN caching
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const lang = req.query.lang || 'en';

  const NEWS_FEEDS = {
    en: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    bn: 'https://bengali.abplive.com/home/feed',
    hi: 'https://www.amarujala.com/rss/breaking-news.xml'
  };

  const feedUrl = NEWS_FEEDS[lang] || NEWS_FEEDS['en'];

  try {
    // 1. Fetch live RSS headlines
    const rssResponse = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
    const rssData = await rssResponse.json();
    
    if (rssData.status !== 'ok') {
      throw new Error('Failed to fetch RSS feed');
    }

    const articles = rssData.items.slice(0, 9);
    const headlines = articles.map((a, i) => `${i+1}. ${a.title}`).join(" ");

    // 2. Prepare Gemini Prompt
    let langInstruction = "Respond completely in English.";
    if (lang === 'bn') {
      langInstruction = "Respond completely in Bengali script.";
    } else if (lang === 'hi') {
      langInstruction = "Respond completely in Hindi script.";
    }

    const prompt = `You are an AI News Anchor for the 'Howrah Assembly Club' community radio. 
Here are today's general headlines: ${headlines}

Your task is to write a comprehensive news broadcast script that MUST include exactly:
- 5 specific news updates about Howrah
- 5 specific news updates about Kolkata
- 5 specific news updates about India
- 5 specific news updates about the World

If the provided headlines do not contain enough information, use your internal knowledge of realistic current events to invent highly plausible news for Howrah and Kolkata.
${langInstruction}`;

    // 3. Call Gemini
    const apiKey = process.env.VITE_GEMINI_API_KEY; 
    let script = "";

    try {
      if (!apiKey) throw new Error("Missing API Key");

      // Set up AbortController to prevent Vercel 10s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500); // 8.5 second timeout

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const geminiData = await geminiRes.json();
      script = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
      script = script.replace(/\*\*/g, '').replace(/\*/g, '');
    } catch (e) {
      console.warn("Gemini API failed or timed out. Using fallback scripts.", e.message);
    }

    // 4. Fallback Scripts for Today (If API fails or times out)
    if (!script || script.length < 10) {
      if (lang === 'bn') {
        script = "হাওড়া অ্যাসেম্বলি ক্লাব থেকে শুভ সন্ধ্যা! হাওড়ার সংবাদ: ১. গঙ্গার ঘাট পরিষ্কার অভিযান শুরু। ২. শিবপুরে নতুন ট্রাফিক নিয়ম। ৩. হাওড়া স্টেশনে নতুন এস্কেলেটর। ৪. বোটানিক্যাল গার্ডেনে ফুল উৎসব। ৫. কদমতলায় নতুন স্পোর্টস কমপ্লেক্স। কলকাতার সংবাদ: ১. ময়দানে আসন্ন বইমেলার প্রস্তুতি। ২. মেট্রোর নতুন রুট চালু। ৩. ভিক্টোরিয়া মেমোরিয়ালে লাইট অ্যান্ড সাউন্ড শো। ৪. নিউ টাউনে আইটি হাব সম্প্রসারণ। ৫. পার্ক স্ট্রিটে খাদ্য উৎসব। জাতীয় সংবাদ: ১. ভারতীয় শেয়ার বাজারে রেকর্ড। ২. নতুন হাইওয়ে প্রকল্প উদ্বোধন। ৩. জিএসটি সংগ্রহ বৃদ্ধি। ৪. মহাকাশ গবেষণায় নতুন স্যাটেলাইট। ৫. কৃষকদের জন্য নতুন বীমা প্রকল্প। আন্তর্জাতিক সংবাদ: ১. জাতিসংঘে জলবায়ু চুক্তি। ২. ইউরোপে নতুন প্রযুক্তি আইন। ৩. অলিম্পিকের প্রস্তুতি। ৪. বিশ্ব স্বাস্থ্য সংস্থার নতুন নির্দেশিকা। ৫. আন্তর্জাতিক বাণিজ্য চুক্তি। আমাদের সাথে থাকার জন্য ধন্যবাদ!";
      } else if (lang === 'hi') {
        script = "हावड़ा असेंबली क्लब से शुभ संध्या! हावड़ा के 5 समाचार: 1. गंगा घाट सफाई अभियान शुरू। 2. शिबपुर में नए यातायात नियम। 3. हावड़ा स्टेशन पर नए एस्केलेटर। 4. बोटैनिकल गार्डन में फूल उत्सव। 5. कदमतला में नया स्पोर्ट्स कॉम्प्लेक्स। कोलकाता के 5 समाचार: 1. मैदान में पुस्तक मेले की तैयारी। 2. मेट्रो का नया मार्ग चालू। 3. विक्टोरिया मेमोरियल में लाइट एंड साउंड शो। 4. न्यू टाउन में आईटी हब का विस्तार। 5. पार्क स्ट्रीट में खाद्य उत्सव। राष्ट्रीय समाचार: 1. भारतीय शेयर बाजार में रिकॉर्ड। 2. नई राजमार्ग परियोजना। 3. जीएसटी संग्रह में वृद्धि। 4. अंतरिक्ष अनुसंधान में नया उपग्रह। 5. किसानों के लिए नई बीमा योजना। अंतर्राष्ट्रीय समाचार: 1. संयुक्त राष्ट्र में जलवायु समझौता। 2. यूरोप में नया तकनीकी कानून। 3. ओलंपिक की तैयारी। 4. विश्व स्वास्थ्य संगठन के नए दिशानिर्देश। 5. अंतर्राष्ट्रीय व्यापार समझौता। धन्यवाद!";
      } else {
        script = "Good evening from the Howrah Assembly Club! Here are 5 updates from Howrah: 1. Riverfront clean-up initiative launched. 2. New traffic rules in Shibpur. 3. New escalators at Howrah Station. 4. Flower festival at Botanical Garden. 5. New sports complex in Kadamtala. Here are 5 updates from Kolkata: 1. Preparations for the Book Fair at Maidan. 2. New Metro route operational. 3. Light and sound show at Victoria Memorial. 4. IT hub expansion in New Town. 5. Food festival at Park Street. National News: 1. Indian stock market hits record high. 2. New highway project inaugurated. 3. GST collection increases. 4. New satellite launched for space research. 5. New insurance scheme for farmers. World News: 1. Climate agreement signed at the UN. 2. New tech law passed in Europe. 3. Preparations for the Olympics. 4. New WHO guidelines issued. 5. International trade agreement finalized. Thank you for tuning in!";
      }
    }

    // 5. Set CDN Caching for 24 hours (86400 seconds)
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');

    // 6. Return script
    return res.status(200).json({ script });

  } catch (error) {
    console.error("Error generating news script:", error);
    return res.status(500).json({ error: 'Failed to generate news script', details: error.message });
  }
}
