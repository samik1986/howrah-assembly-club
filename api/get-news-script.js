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

Your task is to write a fast, concise news broadcast script (max 4 sentences) that includes:
- 1 local news update about Howrah or Kolkata
- 1 national news update about India
- 1 global news update

${langInstruction}`;

    // 3. Call Gemini
    const apiKey = process.env.VITE_GEMINI_API_KEY; 
    let script = "";

    try {
      if (!apiKey) throw new Error("Missing API Key");

      // Set up AbortController to prevent Vercel 10s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000); // 7 second timeout

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
        script = "হাওড়া অ্যাসেম্বলি ক্লাব থেকে শুভ সন্ধ্যা! এখানে আপনার আজকের সংবাদ। স্থানীয়ভাবে হাওড়ায়, পৌর কর্পোরেশন গঙ্গার ঘাট পরিষ্কার করার একটি নতুন উদ্যোগ ঘোষণা করেছে, অন্যদিকে কলকাতায় আসন্ন উৎসবের প্রস্তুতি পুরোদমে চলছে। জাতীয়ভাবে, ভারতীয় শেয়ার বাজার আজ রেকর্ড উচ্চতায় পৌঁছেছে। এদিকে বিশ্বমঞ্চে, জাতিসংঘ সম্মেলনে নতুন জলবায়ু চুক্তি স্বাক্ষরিত হয়েছে। আমাদের সাথে থাকার জন্য ধন্যবাদ!";
      } else if (lang === 'hi') {
        script = "हावड़ा असेंबली क्लब से शुभ संध्या! यहाँ आपका आज का समाचार बुलेटिन है। स्थानीय रूप से हावड़ा में, नगर निगम ने गंगा घाटों को साफ करने की एक नई पहल की घोषणा की है, जबकि कोलकाता में आगामी उत्सव की तैयारी जोरों पर है। राष्ट्रीय स्तर पर, भारतीय शेयर बाजार आज रिकॉर्ड ऊंचाई पर पहुंच गया। इस बीच, संयुक्त राष्ट्र शिखर सम्मेलन में नए जलवायु समझौतों पर हस्ताक्षर किए गए हैं। धन्यवाद!";
      } else {
        script = "Good evening from the Howrah Assembly Club! Here is your daily news round-up. Locally in Howrah, the municipal corporation has announced a new initiative to clean up the riverfront, while in Kolkata, preparations for upcoming festivals are in full swing. Nationally, the Indian stock market reached a record high today. Meanwhile, on the global stage, new climate agreements have been signed at the UN summit. Thank you for tuning in!";
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
