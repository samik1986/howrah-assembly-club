import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const HoverVideo = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  
  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onClick={() => {
        // If clicked, we might want to open a modal, but for now just toggle mute or play.
      }}
    >
      <video 
        src={url}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        muted={!playing}
        loop
        playsInline
        controls={playing}
        ref={(el) => {
          if (el) {
            if (playing) {
              el.play().catch(e => console.log(e));
            } else {
              el.pause();
            }
          }
        }}
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
        { id: 's1', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _04.mp4', title: 'Sindur Khela Part 1' },
        { id: 's2', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _05.mp4', title: 'Sindur Khela Part 2' },
        { id: 's3', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _06.mp4', title: 'Sindur Khela Part 3' },
        { id: 's4', type: 'video', url: '/assets/media/Sindur_khela/Sindur Khela _08.mp4', title: 'Sindur Khela Part 4' },
        { id: 's5', type: 'video', url: '/assets/media/Sindur_khela/20241014_170756.mp4', title: 'Sindur Khela Highlight 1' },
        { id: 's6', type: 'video', url: '/assets/media/Sindur_khela/20241014_170946.mp4', title: 'Sindur Khela Highlight 2' },
        { id: 's7', type: 'video', url: '/assets/media/Sindur_khela/20241014_171003.mp4', title: 'Sindur Khela Highlight 3' },
        { id: 'i1', type: 'image', url: '/assets/media/Sindur_khela/20241014_154556.jpg', title: 'Sindur Khela Image 1' },
        { id: 'i2', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101439429.jpg', title: 'Sindur Khela Image 2' },
        { id: 'i3', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101515795.jpg', title: 'Sindur Khela Image 3' },
        { id: 'i4', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101530014.jpg', title: 'Sindur Khela Image 4' },
        { id: 'i5', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101547571.jpg', title: 'Sindur Khela Image 5' },
        { id: 'i6', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_101621411.jpg', title: 'Sindur Khela Image 6' },
        { id: 'i7', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_102054439.jpg', title: 'Sindur Khela Image 7' },
        { id: 'i8', type: 'image', url: '/assets/media/Sindur_khela/PXL_20241014_102103853.jpg', title: 'Sindur Khela Image 8' }
      ]
    },
    {
      id: 4,
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
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <HoverVideo url={item.url} />
                )}
              </div>
              <div style={{ padding: '1rem', background: 'var(--surface)' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{item.title}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Gallery;
