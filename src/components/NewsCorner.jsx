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

  const currentLang = i18n.language || 'en';
  const radioSrc = currentLang === 'bn' 
    ? 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8' 
    : 'https://audio-edge-fvq45.ams.d.radiomast.io/3ccc1156-fcf8-4ba7-9a0c-28e3a465e1ae?listening-from-radio-garden=1607152226837';
  const isHls = radioSrc.endsWith('.m3u8');

  useEffect(() => {
    let hls;
    const audio = audioRef.current;
    
    if (audio) {
      if (isHls && Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(radioSrc);
        hls.attachMedia(audio);
      } else {
        audio.src = radioSrc;
      }
    }
    
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [radioSrc, isHls]);

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

        {/* Radio Player */}
        <div style={{ background: '#e8e4d9', padding: '1rem 2rem', border: '2px solid #1a1a1a', borderLeft: '8px solid #1a1a1a', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎙️</span>
            <div>
              <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.2rem' }}>
                {currentLang === 'bn' ? 'AKASHVANI KOLKATA' : t('Live_Radio')}
              </h3>
              <div style={{ color: '#c00', fontSize: '0.875rem', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>● ON AIR</div>
            </div>
          </div>
          <div style={{ filter: 'sepia(50%) grayscale(20%)' }}>
            <audio 
              ref={audioRef}
              controls 
              style={{ width: '300px', height: '40px', borderRadius: '0' }}
            >
              Your browser does not support the audio element.
            </audio>
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
