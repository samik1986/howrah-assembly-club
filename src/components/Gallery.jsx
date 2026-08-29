import React, { useState, useRef } from 'react';

const HoverVideo = ({ url }) => {
  const videoRef = useRef(null);
  const playPromiseRef = useRef(null);
  const isHoveredRef = useRef(false);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (videoRef.current) {
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        playPromiseRef.current = promise;
        promise.catch(error => {
          // Play prevented (usually due to lack of user interaction or rapid mouseout)
        });
      }
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (videoRef.current) {
      if (playPromiseRef.current !== undefined && playPromiseRef.current !== null) {
        playPromiseRef.current.then(() => {
          // Only pause if we are STILL not hovered
          if (!isHoveredRef.current && videoRef.current) {
            videoRef.current.pause();
          }
        }).catch(() => {
          // Promise was rejected, no need to pause since it never played
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        src={url}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        muted
        loop
        playsInline
      />
    </div>
  );
};

const Gallery = () => {
  const [activeAlbum, setActiveAlbum] = useState(null);

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
      url: '/assets/media/celeb_65yrs.mp4',
      title: 'Cultural Evening Highlights',
      desc: 'Glimpses from our 65th anniversary.'
    },
    {
      id: 3,
      type: 'album',
      title: 'Sindoor Khela',
      desc: 'The emotional farewell to Maa Durga. Click to view album.',
      coverImages: [
        '/assets/media/Sindur_khela/20241014_154556.jpg',
        '/assets/media/Sindur_khela/PXL_20241014_101515795.jpg',
        '/assets/media/Sindur_khela/PXL_20241014_101547571.jpg'
      ],
      items: [
        { id: 's1', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _04.mp4' },
        { id: 's2', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _05.mp4' },
        { id: 's3', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _06.mp4' },
        { id: 's4', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _08.mp4' },
        { id: 's5', type: 'video', url: '/assets/media/Sindur_khela/20241014_170756.mp4' },
        { id: 's6', type: 'video', url: '/assets/media/Sindur_khela/20241014_170946.mp4' },
        { id: 's7', type: 'video', url: '/assets/media/Sindur_khela/20241014_171003.mp4' },
        { id: 'i1', type: 'image', url: '/assets/media/Sindur_khela/20241014_154556.jpg' },
        { id: 'i2', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101439429.jpg' },
        { id: 'i3', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101515795.jpg' },
        { id: 'i4', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101530014.jpg' },
        { id: 'i5', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101547571.jpg' },
        { id: 'i6', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101621411.jpg' },
        { id: 'i7', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_102054439.jpg' },
        { id: 'i8', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_102103853.jpg' }
      ]
    },
    {
      id: 4,
      type: 'album',
      title: '2025 Bisarjan (100 Years Celebration)',
      desc: 'Our monumental 100-year celebration and idol immersion.',
      coverImages: [
        '/assets/media/2025_Bisarjan/20241014_154625.jpg',
        '/assets/media/2025_Bisarjan/PXL_20241014_101657805.jpg',
        '/assets/media/2025_Bisarjan/PXL_20241014_102148714.jpg'
      ],
      items: [
        { id: 'b1', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_174006.mp4' },
        { id: 'b2', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_174213.mp4' },
        { id: 'b3', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_175024.mp4' },
        { id: 'b4', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_180231.mp4' },
        { id: 'b5', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_181156.mp4' },
        { id: 'b6', type: 'video', url: '/assets/media/2025_Bisarjan/PXL_20241014_111354397.mp4' },
        { id: 'b7', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_210602.mp4' },
        { id: 'b8', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_210657.mp4' },
        { id: 'b9', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_211006.mp4' },
        { id: 'b10', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_220442.mp4' },
        { id: 'b11', type: 'video', url: '/assets/media/2025_Bisarjan/20241014_222910.mp4' },
        { id: 'b12', type: 'video', url: '/assets/media/2025_Bisarjan/PXL_20241014_143136009.TS.mp4' },
        { id: 'b13', type: 'video', url: '/assets/media/2025_Bisarjan/PXL_20241014_145123407.TS.mp4' },
        { id: 'bi1', type: 'image', url: '/assets/media/2025_Bisarjan/20241014_154625.jpg' },
        { id: 'bi2', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_101625902.jpg' },
        { id: 'bi3', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_101657805.jpg' },
        { id: 'bi4', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_101700412.jpg' },
        { id: 'bi5', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_102148714.jpg' },
        { id: 'bi6', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_102149591.jpg' },
        { id: 'bi7', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_122359400.jpg' },
        { id: 'bi8', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_123117498.jpg' },
        { id: 'bi9', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_123223126.jpg' },
        { id: 'bi10', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_142436924.jpg' },
        { id: 'bi11', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_142708946.jpg' },
        { id: 'bi12', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_143513942.jpg' },
        { id: 'bi13', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_144454769.jpg' },
        { id: 'bi14', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_144547382.jpg' },
        { id: 'bi15', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_145113150.jpg' },
        { id: 'bi16', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_145635178.jpg' },
        { id: 'bi17', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_151401286.jpg' },
        { id: 'bi18', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_151533950.jpg' },
        { id: 'bi19', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_152258559.jpg' },
        { id: 'bi20', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_152530405.jpg' },
        { id: 'bi21', type: 'image', url: '/assets/media/2025_Bisarjan/PXL_20241014_152733246.jpg' }
      ]
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      alt: 'Blood Donation Camp',
      title: 'Annual Blood Donation Camp',
      desc: 'Our successful social drive last month.'
    }
  ];

  return (
    <section id="gallery" className="section container animate-fade-in" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="hero-badge">Our Memories</span>
        <h2 style={{ fontSize: '3rem' }}>{activeAlbum ? activeAlbum.title : 'Club Gallery'}</h2>
        <p style={{ color: 'var(--text-main)', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
          {activeAlbum ? 'Browse photos and videos from this album.' : 'Explore moments captured during our events, celebrations, and social activities.'}
        </p>
        {activeAlbum && (
          <button 
            onClick={() => setActiveAlbum(null)}
            className="btn btn-secondary"
            style={{ marginTop: '2rem' }}
          >
            ← Back to Gallery
          </button>
        )}
      </div>

      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {!activeAlbum ? (
          mediaItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item card" 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                cursor: item.type === 'album' ? 'pointer' : 'default'
              }}
              onClick={() => {
                if (item.type === 'album') {
                  setActiveAlbum(item);
                }
              }}
            >
              <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', background: '#e2e8f0', overflow: 'hidden' }}>
                {item.type === 'image' && (
                  <img 
                    src={item.url} 
                    alt={item.alt} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                {item.type === 'video' && (
                  <HoverVideo url={item.url} />
                )}
                {item.type === 'album' && (
                  <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    {item.coverImages.map((src, i) => (
                      <img key={i} src={src} className="animated-cover-img" alt="Album Cover" />
                    ))}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      padding: '1rem 2rem',
                      borderRadius: '30px',
                      fontWeight: 'bold',
                      zIndex: 10,
                      backdropFilter: 'blur(5px)'
                    }}>
                      View Album
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: '1.5rem', flexGrow: 1, background: 'var(--surface)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: 'var(--primary)' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))
        ) : (
          activeAlbum.items.map((item) => (
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
                    alt="Gallery item" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <HoverVideo url={item.url} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Gallery;
