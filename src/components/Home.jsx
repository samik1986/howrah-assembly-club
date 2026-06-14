import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Hero from './Hero';

const Home = () => {
  const { t } = useTranslation();

  const cards = [
    { title: t('About'), path: '/about', icon: 'ℹ️', desc: t('About_Desc') },
    { title: t('Activities'), path: '/activities', icon: '🏓', desc: t('TTS_Desc') },
    { title: t('Gallery'), path: '/gallery', icon: '📸', desc: t('Gallery_Desc') },
    { title: t('Kids_Corner'), path: '/kids-corner', icon: '🧩', desc: t('Daily_Game_Desc') },
    { title: t('Contact'), path: '/contact', icon: '📞', desc: t('Contact_Desc') }
  ];

  return (
    <>
      <Hero />
      <section className="section container">
        <h2 className="text-center" style={{ marginBottom: '2rem' }}>{t('Explore_Club')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {cards.map((card, index) => (
            <Link to={card.path} key={index} style={{
              display: 'block',
              padding: '1.5rem',
              background: 'var(--surface)',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              color: 'var(--text)',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--shadow-md)'
            }}
            className="home-card"
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{card.desc.substring(0, 100)}...</p>
              <div style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {t('Read_More')} →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
