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
Here are today's latest headlines: ${headlines}
Write a concise, engaging, 3 to 4 sentence news broadcast script summarizing the most important points. Add a tiny bit of local flavor for Kolkata and Howrah if possible. 
${langInstruction}`;

    // 3. Call Gemini
    const apiKey = process.env.VITE_GEMINI_API_KEY; // works on Vercel
    if (!apiKey) {
      throw new Error("Missing Gemini API Key on Server");
    }

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    });
    
    const geminiData = await geminiRes.json();
    let script = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to fetch the news script at this moment.";
    script = script.replace(/\*\*/g, '').replace(/\*/g, '');

    // 4. Set CDN Caching for 24 hours (86400 seconds)
    // s-maxage=86400 instructs the Vercel Edge CDN to cache this for 1 day.
    // stale-while-revalidate allows serving a stale cache while fetching a new one in the background.
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');

    // 5. Return script
    return res.status(200).json({ script });

  } catch (error) {
    console.error("Error generating news script:", error);
    return res.status(500).json({ error: 'Failed to generate news script', details: error.message });
  }
}
