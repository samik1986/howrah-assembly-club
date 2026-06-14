import React from 'react';
import { useTranslation } from 'react-i18next';

const KidsCorner = () => {
  const { t } = useTranslation();

  return (
    <section id="kids-corner" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <span className="hero-badge" style={{ marginBottom: '1rem', background: 'var(--primary)', color: 'white' }}>
            {t('Kids_Corner')}
          </span>
          <h2>{t('Daily_Game_Title')}</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto', color: 'var(--text-light)' }}>
            {t('Daily_Game_Desc')}
          </p>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '4px solid var(--primary)',
        }}>
          {/* Embedding a dynamic daily crossword / word puzzle game. 
              AmuseLabs WapoDaily updates every day. */}
          <iframe 
            src="https://amuselabs.com/pmm/crossword?id=WapoDaily" 
            width="100%" 
            height="700px" 
            style={{ border: 'none', display: 'block' }}
            title="Daily English Skill Builder Game"
            sandbox="allow-scripts allow-same-origin allow-popups"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default KidsCorner;
