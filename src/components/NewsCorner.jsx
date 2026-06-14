import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';

const NEWS_FEEDS = {
  en: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
  bn: 'https://bengali.abplive.com/home/feed',
  hi: 'https://www.amarujala.com/rss/breaking-news.xml'
};

const NewsCorner = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="news-corner" className="section" style={{ background: 'var(--surface)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ marginBottom: '1rem', background: '#3b82f6', color: 'white' }}>
            {t('News_Corner')}
          </span>
          <h2>{t('Daily_News')}</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto', color: 'var(--text-light)' }}>
            {t('News_Desc')}
          </p>
        </div>

        {/* Radio Player */}
        <div style={{ background: '#f8fafc', padding: '1rem 2rem', borderRadius: '12px', border: '2px solid #3b82f6', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>📻</span>
            <div>
              <h3 style={{ margin: 0 }}>{t('Live_Radio')}</h3>
              <div style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>● LIVE STREAM</div>
            </div>
          </div>
          <ReactPlayer 
            url='https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8' 
            playing={false} 
            controls={true} 
            width="300px" 
            height="50px" 
            config={{ file: { forceHLS: true } }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="loader" style={{ display: 'inline-block', width: '50px', height: '50px', border: '5px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {articles.map((article, idx) => {
              // Safely extract a thumbnail if it exists, otherwise fallback
              let thumb = article.thumbnail || article.enclosure?.link;
              if (!thumb && article.description) {
                  // Sometimes rss2json puts the image inside the description HTML
                  const imgMatch = article.description.match(/<img[^>]+src="([^">]+)"/);
                  if (imgMatch) thumb = imgMatch[1];
              }

              return (
              <div key={idx} style={{ 
                background: 'white', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                {thumb ? (
                  <img src={thumb} alt={article.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '200px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>📰</span>
                  </div>
                )}
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{article.title}</h3>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {new Date(article.pubDate).toLocaleDateString()}
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>
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
