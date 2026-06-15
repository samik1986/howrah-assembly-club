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

CRITICAL INSTRUCTION: Do NOT just write one-liners. Each of the 20 news items must be highly informative, containing at least 2 detailed sentences explaining the context, impact, or significance of the event. 
If the provided headlines lack information, use your internal knowledge of realistic current events to invent highly plausible, detailed news.
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
    if (!script || script.length < 50) {
      if (lang === 'bn') {
        script = "হাওড়া অ্যাসেম্বলি ক্লাব থেকে শুভ সন্ধ্যা! আজকের বিস্তারিত সংবাদে আপনাকে স্বাগত। হাওড়ার ৫টি বিশেষ খবর: ১. হাওড়া পৌর কর্পোরেশনের উদ্যোগে গঙ্গার ঘাটগুলিকে দূষণমুক্ত করার জন্য এক বিশাল পরিচ্ছন্নতা অভিযান শুরু হয়েছে, যা সাধারণ মানুষের প্রশংসা কুড়িয়েছে। ২. শিবপুর এলাকায় যানজট কমানোর লক্ষ্যে পুলিশ প্রশাসন আজ থেকে নতুন ট্রাফিক নিয়ম চালু করেছে, যার ফলে যাতায়াত অনেক সহজ হবে। ৩. যাত্রীদের সুবিধার্থে হাওড়া স্টেশনের ৫ নম্বর প্ল্যাটফর্মে নতুন অত্যাধুনিক এস্কেলেটর বসানো হয়েছে। ৪. শিবপুর বোটানিক্যাল গার্ডেনে আজ থেকে তিন দিনব্যাপী এক বর্ণাঢ্য পুষ্প প্রদর্শনীর সূচনা হয়েছে, যেখানে দেশ-বিদেশের নানা ফুল প্রদর্শন করা হচ্ছে। ৫. কদমতলা যুব সংঘের মাঠে স্থানীয় যুবকদের জন্য একটি নতুন স্পোর্টস কমপ্লেক্স তৈরির ভিত্তিপ্রস্তর স্থাপন করা হয়েছে। কলকাতার ৫টি খবর: ১. ময়দানে আসন্ন আন্তর্জাতিক কলকাতা বইমেলার প্রস্তুতি পুরোদমে শুরু হয়েছে, এবার নতুন বেশ কিছু প্রকাশনা সংস্থা অংশগ্রহণ করবে। ২. ইস্ট-ওয়েস্ট মেট্রোর শিয়ালদহ থেকে এসপ্ল্যানেড পর্যন্ত নতুন রুট খুব শীঘ্রই যাত্রী সাধারণের জন্য খুলে দেওয়া হবে বলে কর্তৃপক্ষ জানিয়েছে। ৩. পর্যটকদের আকর্ষণের জন্য ভিক্টোরিয়া মেমোরিয়ালে একটি নতুন থ্রিডি লাইট অ্যান্ড সাউন্ড শো চালু করা হয়েছে যা বাংলার ইতিহাস তুলে ধরবে। ৪. নিউ টাউনে আইটি হাব সম্প্রসারণের জন্য নতুন করে ২০০ একর জমি অধিগ্রহণ করেছে রাজ্য সরকার, যা প্রচুর কর্মসংস্থান সৃষ্টি করবে। ৫. শীতের মরসুম উদযাপনের জন্য পার্ক স্ট্রিটে সপ্তাহব্যাপী একটি বিশাল খাদ্য উৎসবের আয়োজন করা হয়েছে। জাতীয় খবর: ১. তথ্যপ্রযুক্তি এবং ব্যাঙ্কিং খাতের অভাবনীয় সাফল্যের ওপর ভর করে ভারতীয় শেয়ার বাজার আজ সর্বকালের সর্বোচ্চ রেকর্ড ছুঁয়েছে। ২. দিল্লি থেকে মুম্বাই সংযোগকারী নতুন এক্সপ্রেসওয়ে প্রকল্পের প্রথম পর্যায়ের কাজ সফলভাবে শেষ হয়েছে। ৩. চলতি মাসে দেশে জিএসটি সংগ্রহের পরিমাণ আগের সব রেকর্ড ভেঙে দিয়েছে, যা অর্থনীতির উন্নতির ইঙ্গিত দেয়। ৪. মহাকাশ গবেষণায় আরও এক ধাপ এগিয়ে ইসরো আজ সফলভাবে একটি নতুন অত্যাধুনিক আবহাওয়া উপগ্রহ উৎক্ষেপণ করেছে। ৫. কৃষকদের ফসলের সঠিক মূল্য নিশ্চিত করতে এবং ক্ষতিপূরণ দিতে কেন্দ্রীয় সরকার আজ একটি বড় বীমা প্রকল্পের ঘোষণা করেছে। আন্তর্জাতিক সংবাদ: ১. সুইজারল্যান্ডে আয়োজিত জাতিসংঘ জলবায়ু সম্মেলনে বিশ্বের প্রথম সারির দেশগুলি কার্বন নিঃসরণ কমানোর জন্য একটি ঐতিহাসিক চুক্তিতে স্বাক্ষর করেছে। ২. ইউরোপীয় ইউনিয়ন কৃত্রিম বুদ্ধিমত্তা নিয়ন্ত্রণের জন্য আজ একটি নতুন ও কঠোর প্রযুক্তি আইন পাশ করেছে, যা বিশ্বজুড়ে প্রভাব ফেলবে। ৩. আগামী অলিম্পিক গেমসের জন্য প্রস্তুতি সম্পূর্ণ করার লক্ষ্যে আয়োজক দেশ নতুন কিছু অত্যাধুনিক স্টেডিয়ামের উদ্বোধন করেছে। ৪. বিশ্ব স্বাস্থ্য সংস্থা আজ নতুন করে সংক্রামক ব্যাধি প্রতিরোধের জন্য একটি সংশোধিত ও যুগান্তকারী নির্দেশিকা প্রকাশ করেছে। ৫. এশিয়া ও ইউরোপের মধ্যে বাণিজ্য আরও সহজতর করতে একটি নতুন মুক্ত বাণিজ্য চুক্তি আজ চূড়ান্ত রূপ পেয়েছে। আমাদের সংবাদ শোনার জন্য আপনাকে অসংখ্য ধন্যবাদ!";
      } else if (lang === 'hi') {
        script = "हावड़ा असेंबली क्लब से शुभ संध्या! आज के विस्तृत समाचार में आपका स्वागत है। हावड़ा के 5 समाचार: 1. हावड़ा नगर निगम ने गंगा घाटों को प्रदूषण मुक्त बनाने के लिए एक विशाल सफाई अभियान शुरू किया है, जिसकी जनता काफी सराहना कर रही है। 2. शिबपुर इलाके में ट्रैफिक जाम कम करने के उद्देश्य से पुलिस ने आज से नए यातायात नियम लागू किए हैं, जिससे आवाजाही आसान होगी। 3. यात्रियों की सुविधा के लिए हावड़ा स्टेशन के प्लेटफॉर्म नंबर 5 पर एक नया और आधुनिक एस्केलेटर लगाया गया है। 4. बोटैनिकल गार्डन में आज से तीन दिवसीय भव्य पुष्प प्रदर्शनी की शुरुआत हुई है, जिसमें देश-विदेश के फूल प्रदर्शित किए गए हैं। 5. कदमतला में स्थानीय युवाओं को खेलों के प्रति प्रोत्साहित करने के लिए एक नए स्पोर्ट्स कॉम्प्लेक्स की आधारशिला रखी गई है। कोलकाता के 5 समाचार: 1. मैदान में आगामी अंतरराष्ट्रीय कोलकाता पुस्तक मेले की तैयारियां जोरों पर हैं, जिसमें इस बार कई नए प्रकाशक भाग लेंगे। 2. ईस्ट-वेस्ट मेट्रो के सियालदह से एस्प्लेनेड तक के नए रूट को बहुत जल्द आम यात्रियों के लिए खोल दिया जाएगा। 3. पर्यटकों को आकर्षित करने के लिए विक्टोरिया मेमोरियल में बंगाल का इतिहास दर्शाने वाला एक नया 3D लाइट एंड साउंड शो शुरू किया गया है। 4. राज्य सरकार ने न्यू टाउन में आईटी हब के विस्तार के लिए नई जमीन का अधिग्रहण किया है, जिससे रोजगार के नए अवसर पैदा होंगे। 5. सर्दियों के मौसम का जश्न मनाने के लिए पार्क स्ट्रीट में एक सप्ताह तक चलने वाला विशाल फूड फेस्टिवल आयोजित किया गया है। राष्ट्रीय समाचार: 1. आईटी और बैंकिंग क्षेत्र की अपार सफलता के दम पर भारतीय शेयर बाजार आज अपने सर्वकालिक उच्चतम स्तर पर पहुंच गया है। 2. दिल्ली को मुंबई से जोड़ने वाले नए एक्सप्रेसवे परियोजना का पहला चरण सफलतापूर्वक पूरा हो गया है। 3. इस महीने देश में जीएसटी संग्रह ने पिछले सभी रिकॉर्ड तोड़ दिए हैं, जो मजबूत अर्थव्यवस्था का संकेत है। 4. अंतरिक्ष अनुसंधान में एक कदम और आगे बढ़ते हुए, इसरो ने आज सफलतापूर्वक एक नया उन्नत मौसम उपग्रह लॉन्च किया है। 5. किसानों को उनकी फसलों का उचित मूल्य दिलाने और नुकसान की भरपाई के लिए केंद्र सरकार ने एक नई फसल बीमा योजना की घोषणा की है। अंतर्राष्ट्रीय समाचार: 1. संयुक्त राष्ट्र जलवायु सम्मेलन में दुनिया के शीर्ष देशों ने कार्बन उत्सर्जन को कम करने के लिए एक ऐतिहासिक समझौते पर हस्ताक्षर किए हैं। 2. यूरोपीय संघ ने आर्टिफिशियल इंटेलिजेंस को नियंत्रित करने के लिए आज एक नया सख्त तकनीकी कानून पारित किया है, जिसका वैश्विक प्रभाव होगा। 3. आगामी ओलंपिक खेलों की तैयारी पूरी करने के लिए मेजबान देश ने कुछ नए अत्याधुनिक स्टेडियमों का उद्घाटन किया है। 4. विश्व स्वास्थ्य संगठन ने आज संक्रामक रोगों की रोकथाम के लिए एक नए और अभूतपूर्व दिशा-निर्देश जारी किए हैं। 5. एशिया और यूरोप के बीच व्यापार को सुगम बनाने के लिए आज एक नए मुक्त व्यापार समझौते को अंतिम रूप दिया गया है। हमारे साथ जुड़ने के लिए धन्यवाद!";
      } else {
        script = "Good evening from the Howrah Assembly Club! Welcome to today's detailed news broadcast. Here are 5 comprehensive updates from Howrah: 1. The Howrah Municipal Corporation has launched a massive, city-wide riverfront clean-up initiative aimed at reducing pollution in the Ganges, a move that has been widely praised by environmentalists. 2. To tackle severe traffic congestion during peak hours, the local police administration has implemented an entirely new traffic rerouting system in the Shibpur area starting today. 3. Enhancing passenger comfort, the railway authorities have successfully installed and inaugurated a brand new heavy-duty escalator on Platform 5 of Howrah Station. 4. A spectacular three-day flower exhibition has officially commenced at the Shibpur Botanical Garden, showcasing a wide variety of exotic and rare blooming flora from across the globe. 5. Emphasizing community fitness, the foundation stone for a state-of-the-art sports complex was laid today in Kadamtala, designed specifically for local youth athletes. Here are 5 updates from Kolkata: 1. Preparations for the highly anticipated International Kolkata Book Fair are in full swing at the Maidan, with organizers confirming the participation of dozens of new global publishers this year. 2. The Metro Railway authorities have announced that the newly constructed East-West underground route stretching from Sealdah to Esplanade will be officially open for commercial service very soon. 3. In an effort to boost local tourism, a mesmerizing new 3D light and sound show has been inaugurated at the Victoria Memorial, vividly depicting the rich historical heritage of Bengal. 4. The state government has successfully acquired an additional 200 acres of land in New Town to significantly expand the existing IT hub, a project expected to generate thousands of new jobs. 5. Celebrating the winter season, a massive week-long culinary food festival featuring both local and international cuisines has kicked off on the famous Park Street. National News: 1. Driven by exceptional growth in the technology and banking sectors, the Indian stock market surged aggressively today, hitting an unprecedented all-time record high. 2. The Ministry of Road Transport celebrated a milestone today as the crucial first phase of the ambitious Delhi-Mumbai Expressway project was officially completed and opened to the public. 3. Showcasing a robust economic recovery, the nation's total GST collection for the current month has shattered all previous records, surpassing all financial expectations. 4. Making another leap in space exploration, ISRO has successfully launched its newest and most advanced meteorological satellite, which will provide highly accurate weather forecasting. 5. In a major move to support agriculture, the central government has rolled out a comprehensive new crop insurance scheme designed to guarantee fair prices and compensate farmers for weather-related losses. World News: 1. At the latest UN Climate Summit in Switzerland, world leaders have unanimously signed a historic and legally binding agreement to aggressively cut down global carbon emissions over the next decade. 2. Setting a global precedent, the European Union has officially passed a strict new technology law specifically designed to regulate and ethically monitor the rapid development of Artificial Intelligence. 3. Gearing up for the upcoming Olympic Games, the host nation has proudly unveiled three newly constructed, state-of-the-art sporting stadiums equipped with environmentally sustainable technologies. 4. The World Health Organization has issued a groundbreaking set of revised international guidelines today, focusing heavily on preventative measures against future infectious disease outbreaks. 5. Strengthening global economic ties, a major free trade agreement between several key Asian and European nations has been finalized today after months of rigorous negotiations. Thank you for tuning in to the Howrah Assembly Club community radio!";
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
