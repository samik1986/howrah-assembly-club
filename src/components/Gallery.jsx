import React from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Players engaged in a competitive table tennis match',
      title: t('Evening_Match')
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Table tennis paddle and ball close up',
      title: t('Equipment_Ready')
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Community sports hall',
      title: t('Our_Facilities')
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Dynamic serve during a ping pong game',
      title: t('Action_Shot')
    }
  ];

  return (
    <section id="gallery" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="hero-badge">{t('Multimedia')}</span>
        <h2>{t('Club_Gallery')}</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '1rem auto 0' }}>
          {t('Gallery_Desc')}
        </p>
      </div>

      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {mediaItems.map((item) => (
          <div key={item.id} className="gallery-item" style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            aspectRatio: '4/3',
            group: 'true'
          }}>
            <img 
              src={item.url} 
              alt={item.alt} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem 1rem 1rem',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
              pointerEvents: 'none'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
