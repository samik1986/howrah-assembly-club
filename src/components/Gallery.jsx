import React from 'react';
import ReactPlayer from 'react-player';

const Gallery = () => {
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Durga Puja Celebrations',
      title: 'Maha Ashtami Pushpanjali',
      desc: 'Devotees gathered for the morning prayers.'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://www.youtube.com/watch?v=placeholder1',
      title: 'Cultural Evening Highlights',
      desc: 'Glimpses from our annual cultural fest.'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Blood Donation Camp',
      title: 'Annual Blood Donation Camp',
      desc: 'Our successful social drive last month.'
    },
    {
      id: 4,
      type: 'video',
      url: 'https://www.youtube.com/watch?v=placeholder2',
      title: 'Sindoor Khela',
      desc: 'The emotional farewell to Maa Durga.'
    }
  ];

  return (
    <section id="gallery" className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="hero-badge">Our Memories</span>
        <h2 style={{ fontSize: '3rem' }}>Club Gallery</h2>
        <p style={{ color: 'var(--text-main)', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
          Explore moments captured during our events, celebrations, and social activities.
        </p>
      </div>

      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {mediaItems.map((item) => (
          <div key={item.id} className="gallery-item card" style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            padding: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', background: '#e2e8f0' }}>
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.alt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ReactPlayer 
                  url={item.url} 
                  width="100%" 
                  height="100%" 
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  controls={true}
                  light={true}
                />
              )}
            </div>
            <div style={{ padding: '1.5rem', flexGrow: 1, background: 'var(--surface)' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: 'var(--primary)' }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
