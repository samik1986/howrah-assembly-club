export default async function handler(req, res) {
  const { text, lang } = req.query;
  
  if (!text || !lang) {
    return res.status(400).send('Missing text or lang parameter');
  }

  try {
    // We use the gtx client to fetch the audio
    const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=${lang}&client=gtx&q=${encodeURIComponent(text)}`;
    
    const googleRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    if (!googleRes.ok) {
      console.error(`Google TTS API returned ${googleRes.status}`);
      return res.status(googleRes.status).send('Google TTS error');
    }

    const arrayBuffer = await googleRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Stream back to the client as an MP3
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // Cache for 24 hours at Edge
    res.send(buffer);
  } catch (error) {
    console.error("TTS Proxy Error:", error);
    res.status(500).send('Internal Server Error');
  }
}
