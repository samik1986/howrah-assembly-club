import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Hls from 'hls.js';

const NEWS_FEEDS = {
  en: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
  bn: 'https://bengali.abplive.com/home/feed',
  hi: 'https://www.amarujala.com/rss/breaking-news.xml'
};

const NewsCorner = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const currentLang = i18n.language || 'en';
        const feedUrl = NEWS_FEEDS[currentLang] || NEWS_FEEDS['en'];
        
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
          // Take top 9 articles
          setArticles(data.items.slice(0, 9));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [i18n.language]);

  const [selectedStation, setSelectedStation] = useState(0);
  const [selectedFmStation, setSelectedFmStation] = useState(0);
  const akashvaniAudioRef = useRef(null);
  const fmAudioRef = useRef(null);

  const AKASHVANI_KOLKATA_URL = 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8';
  
  const OTHER_FM_STATIONS = [
    { name: 'FM GOLD KOLKATA (100.2 MHz)', url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio056/hlspbaudio05664kbps.m3u8' },
    { name: 'AKASHVANI MAITREE', url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio057/hlspbaudio05764kbps.m3u8' },
    { name: 'RADIO MILAN (BENGALI FM)', url: 'https://stream.zeno.fm/f3y7x0m83yzuv' },
    { name: 'VIVIDH BHARATI NATIONAL', url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio001/hlspbaudio00164kbps.m3u8' }
  ];

  const fmSrc = OTHER_FM_STATIONS[selectedFmStation].url;

  // Initialize HLS for Akashvani Player
  useEffect(() => {
    let hls;
    const audio = akashvaniAudioRef.current;
    if (audio) {
      if (AKASHVANI_KOLKATA_URL.endsWith('.m3u8') && Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(AKASHVANI_KOLKATA_URL);
        hls.attachMedia(audio);
      } else {
        audio.src = AKASHVANI_KOLKATA_URL;
      }
    }
    return () => { if (hls) hls.destroy(); };
  }, []);

  // Initialize HLS for Secondary FM Player
  useEffect(() => {
    let hls;
    const audio = fmAudioRef.current;
    if (audio) {
      if (fmSrc.endsWith('.m3u8') && Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(fmSrc);
        hls.attachMedia(audio);
      } else {
        audio.src = fmSrc;
      }
    }
    return () => { if (hls) hls.destroy(); };
  }, [fmSrc]);

  const audioQueue = useRef([]);
  const globalAudio = useRef(new Audio());

  const stopNews = () => {
    window.speechSynthesis.cancel();
    if (globalAudio.current) {
      globalAudio.current.pause();
    }
    audioQueue.current = [];
    setIsPlaying(false);
    setTranscript("");
  };

  const playCloudTTS = (text, lang) => {
    // Google TTS has a strict 200 byte limit. Bengali/Hindi chars use 3 bytes each.
    // We must aggressively chunk by words to ~50 characters maximum.
    const words = text.split(/\s+/);
    const chunks = [];
    let currentChunk = "";
    
    for (let word of words) {
      if ((currentChunk.length + word.length + 1) <= 50) {
        currentChunk += (currentChunk ? " " : "") + word;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = word;
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    
    audioQueue.current = [];
    for (let chunk of chunks) {
      chunk = chunk.trim();
      if (!chunk) continue;
      // Fetch via our secure backend proxy to bypass browser restrictions and Captchas
      const url = `/api/tts?lang=${lang}&text=${encodeURIComponent(chunk)}`;
      audioQueue.current.push(url);
    }

    const playNext = () => {
      if (audioQueue.current.length === 0) {
        setIsPlaying(false);
        return;
      }
      const nextUrl = audioQueue.current.shift();
      globalAudio.current.src = nextUrl;
      globalAudio.current.onended = playNext;
      globalAudio.current.onerror = (e) => {
        console.error("Cloud TTS Audio playback failed", e);
        playNext();
      };
      globalAudio.current.play().catch(e => {
        console.error("Audio play blocked", e);
        setTranscript(prev => prev + "\n\n[System Audio Error: " + e.message + " - The browser has blocked auto-playing audio.]");
        setIsPlaying(false);
      });
    };

    setIsPlaying(true);
    playNext();
  };

  const generateAndPlayNews = async () => {
    // SYNCHRONOUSLY UNLOCK BROWSER AUDIO CONTEXT ON BUTTON CLICK!
    // This prevents "NotAllowedError: play() failed because the user didn't interact"
    // caused by awaiting the fetch request before playing audio.
    globalAudio.current.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    globalAudio.current.play().catch(() => {});

    setIsGenerating(true);
    setTranscript("");
    
    try {
      let voiceLang = "en-IN";
      if (currentLang === 'bn') {
        voiceLang = "bn-IN";
      } else if (currentLang === 'hi') {
        voiceLang = "hi-IN";
      }

      const today = new Date().toLocaleDateString('en-CA');
      const cacheKey = `ai_news_script_${currentLang}_${today}_v5`;
      let script = localStorage.getItem(cacheKey);

      // If we accidentally cached the error message previously, ignore it
      if (script && script.includes("Unable to fetch")) {
        script = null;
      }

      if (!script) {
        // Fetch from Vercel Serverless Function, appending a version string to bust any bad Vercel CDN caches
        const res = await fetch(`/api/get-news-script?lang=${currentLang}&v=5`);
        if (!res.ok) throw new Error('Failed to fetch from server API');
        
        const data = await res.json();
        script = data.script || "Unable to fetch the news script at this moment.";
        
        // Ensure some spacing for formatting if the AI forgot
        script = script.replace(/([.!?।])\s+(\d+\.)/g, '$1\n\n$2');
        
        // Save to local fallback cache and clean up old ones
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('ai_news_script_')) {
            localStorage.removeItem(key);
          }
        });
        localStorage.setItem(cacheKey, script);
      }

      setTranscript(script);

      // Use Cloud TTS for ALL languages to ensure a consistent, 
      // smooth voice that is perfectly cached for the entire day.
      playCloudTTS(script, currentLang);
      
    } catch (error) {
      console.error("Error generating AI news:", error);
      alert("Failed to fetch AI news broadcast.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Stop speech if component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <section id="news-corner" className="section" style={{ background: '#d5d0c4', minHeight: '100vh', paddingTop: '100px', fontFamily: '"Georgia", "Times New Roman", serif', color: '#1a1a1a' }}>
      <div className="container" style={{ background: '#f4f1ea', padding: '3rem', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.2)', border: '1px solid #b3aba0', maxWidth: '1200px' }}>
        
        {/* Newspaper Header */}
        <div className="text-center" style={{ marginBottom: '2rem', borderBottom: '4px double #1a1a1a', paddingBottom: '2rem' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', margin: '0', borderBottom: '2px solid #1a1a1a', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            {t('Daily_News')}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '0.5rem 0', fontStyle: 'italic', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <span>VOL. 1 — HOWRAH ASSEMBLY CLUB</span>
            <span>{new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : (currentLang === 'bn' ? 'bn-IN' : 'hi-IN'), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>{t('News_Corner').toUpperCase()}</span>
          </div>
        </div>

        {/* AI News Reader Button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {!isPlaying ? (
            <button 
              onClick={generateAndPlayNews} 
              disabled={isGenerating}
              style={{ background: '#1a1a1a', color: '#f4f1ea', padding: '1rem 2.5rem', fontSize: '1.2rem', fontFamily: '"Georgia", serif', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', cursor: isGenerating ? 'not-allowed' : 'pointer', opacity: isGenerating ? 0.7 : 1, transition: 'all 0.2s', borderBottom: '4px solid #000' }}
            >
              {isGenerating ? (t('Generating_AI_News') || "Preparing Broadcast...") : (t('Read_AI_News') || "Listen to AI News Broadcast 🤖")}
            </button>
          ) : (
            <button 
              onClick={stopNews} 
              style={{ background: '#c00', color: '#f4f1ea', padding: '1rem 2.5rem', fontSize: '1.2rem', fontFamily: '"Georgia", serif', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', cursor: 'pointer', borderBottom: '4px solid #800', animation: 'pulse 2s infinite' }}
            >
              {t('Stop_AI_News') || "Stop Broadcast ⏹️"}
            </button>
          )}
        </div>

        {/* Dual Radio Players */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Player 1: Akashvani Kolkata */}
          <div style={{ flex: '1 1 400px', background: '#e8e4d9', padding: '1.5rem', border: '2px solid #1a1a1a', borderLeft: '8px solid #c00', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>📡</span>
              <div>
                <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.2rem' }}>
                  AKASHVANI KOLKATA
                </h3>
                <div style={{ color: '#c00', fontSize: '0.85rem', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>ALL INDIA RADIO • LIVE</div>
              </div>
            </div>
            <div style={{ filter: 'sepia(50%) grayscale(20%)' }}>
              <audio 
                ref={akashvaniAudioRef}
                controls 
                style={{ width: '100%', height: '40px', borderRadius: '0' }}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          {/* Player 2: Other Kolkata FM Channels */}
          <div style={{ flex: '1 1 400px', background: '#e8e4d9', padding: '1.5rem', border: '2px solid #1a1a1a', borderLeft: '8px solid #1a1a1a', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>📻</span>
              <div style={{ flexGrow: 1 }}>
                <select 
                  value={selectedFmStation} 
                  onChange={(e) => setSelectedFmStation(Number(e.target.value))}
                  style={{ width: '100%', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1rem', background: 'transparent', border: '1px solid #1a1a1a', padding: '0.3rem', fontFamily: '"Georgia", serif', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {OTHER_FM_STATIONS.map((station, idx) => (
                    <option key={idx} value={idx}>{station.name}</option>
                  ))}
                </select>
                <div style={{ color: '#c00', fontSize: '0.85rem', fontWeight: 'bold', animation: 'pulse 2s infinite', marginTop: '0.3rem' }}>LOCAL FM • LIVE</div>
              </div>
            </div>
            <div style={{ filter: 'sepia(50%) grayscale(20%)' }}>
              <audio 
                ref={fmAudioRef}
                controls 
                style={{ width: '100%', height: '40px', borderRadius: '0' }}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <div className="loader" style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid #d5d0c4', borderTopColor: '#1a1a1a', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '3rem 2rem', columnRule: '1px solid #ccc' }}>
            {articles.map((article, idx) => {
              // Safely extract a thumbnail if it exists, otherwise fallback
              let thumb = article.thumbnail || article.enclosure?.link;
              if (!thumb && article.description) {
                  const imgMatch = article.description.match(/<img[^>]+src="([^">]+)"/);
                  if (imgMatch) thumb = imgMatch[1];
              }

              return (
              <div key={idx} style={{ 
                background: 'transparent', 
                borderBottom: '1px solid #1a1a1a',
                paddingBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {thumb && (
                  <img src={thumb} alt={article.title} style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', border: '2px solid #1a1a1a', filter: 'sepia(40%) grayscale(60%) contrast(120%)', marginBottom: '1rem' }} />
                )}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', lineHeight: '1.2', fontWeight: 'bold' }}>{article.title}</h3>
                  <div style={{ color: '#444', fontSize: '0.85rem', textTransform: 'uppercase', borderBottom: '1px dotted #888', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                    PUBLISHED: {new Date(article.pubDate).toLocaleTimeString()}
                  </div>
                  <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a', fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic', fontSize: '1.1rem' }}>
                      {t('Read_More')} &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsCorner;
