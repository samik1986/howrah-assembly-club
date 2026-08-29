import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const DurgaPuja = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          Durga Puja: <span style={{ color: 'var(--secondary)' }}>Our Legacy, Our Emotion</span>
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
        {/* Paragraph 1 */}
        <p style={{ maxWidth: '900px', fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-main)', textAlign: 'justify' }}>
          For over 65 glorious years, Howrah Assembly Club’s Durga Puja has been the heartbeat of our community. It is not merely a festival; it is a profound emotion that transcends generations. When the rhythm of the dhaak echoes through the autumn air and the scent of shiuli flowers fills the pandal, every heart beats as one. We come together, leaving behind all differences, to welcome Maa Durga—our strength, our solace, and our divine mother. 
        </p>

        {/* Paragraph 2 */}
        <p style={{ maxWidth: '900px', fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-main)', textAlign: 'justify' }}>
          The legacy we have built over these decades is woven with countless memories, artistic brilliance, and an unwavering devotion to social service. Every idol, every intricate pandal design, and every shared meal of Bhog stands as a testament to our collective spirit. As we step into the future, we carry forward this sacred tradition, ensuring that the warmth of our "parar pujo" (neighborhood puja) continues to illuminate lives, offering hope, joy, and an eternal sense of belonging to every soul who walks through our gates.
        </p>

        {/* Video Section */}
        <div className="video-container card" style={{ width: '100%', maxWidth: '900px', padding: '1rem', background: 'var(--surface)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' }}>65 Years of Glory</h3>
          <div 
            style={{ position: 'relative', paddingTop: '56.25%', background: '#e2e8f0', borderRadius: 'var(--radius)', overflow: 'hidden' }}
            onMouseEnter={() => setIsPlaying(true)}
            onMouseLeave={() => setIsPlaying(false)}
          >
            <ReactPlayer 
              url="/celeb_65yrs.mp4" 
              width="100%" 
              height="100%" 
              style={{ position: 'absolute', top: 0, left: 0 }}
              controls={true}
              playing={isPlaying}
              muted={true} // Browsers usually require video to be muted to autoplay on hover
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurgaPuja;
