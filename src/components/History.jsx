import React from 'react';

const timelineData = [
  { year: '1961', title: 'Club Foundation', desc: 'Howrah Assembly Club was founded with a vision to build a strong, united community through sports and culture.' },
  { year: '1975', title: 'First Major Durga Puja', desc: 'The club organized its first large-scale Durga Puja, which eventually became a hallmark event for the community.' },
  { year: '1990', title: 'Cultural Expansion', desc: 'Introduction of regular cultural evenings, theater performances, and art exhibitions to promote local talent.' },
  { year: '2010', title: 'Golden Jubilee', desc: 'Celebrated 50 years of glorious existence with a week-long festival and massive community outreach.' },
  { year: '2023', title: 'Modernization & Philanthropy', desc: 'Upgraded club facilities and expanded our charitable initiatives including regular health camps and educational support.' }
];

const History = () => {
  return (
    <div className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Our History</h1>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-main)' }}>
          <strong>Executive Summary:</strong> For over six decades, Howrah Assembly Club has stood as a pillar of unity, culture, and progress in our beloved city. From our humble beginnings as a local sports assembly, we have evolved into a vibrant cultural hub, dedicated to preserving our rich traditions while embracing the future. Our journey is a testament to the unwavering spirit and dedication of our members and the community we serve.
        </p>
      </div>

      <div className="timeline" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '100%', background: 'var(--border)' }}></div>

        {timelineData.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
            padding: '2rem 0',
            position: 'relative',
            width: '100%'
          }}>
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: '20px', height: '20px', borderRadius: '50%', background: 'var(--secondary)',
              border: '4px solid white', zIndex: 2, boxShadow: 'var(--shadow-sm)'
            }}></div>
            
            {/* Content Box */}
            <div className="card" style={{
              width: '45%',
              padding: '1.5rem',
              textAlign: index % 2 === 0 ? 'right' : 'left'
            }}>
              <span style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'var(--primary)', color: 'white', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>{item.year}</span>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{item.desc}</p>
              
              {/* Supporting Picture Placeholder */}
              <div style={{
                width: '100%', height: '120px', background: '#f1f5f9', borderRadius: '8px',
                marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px dashed #cbd5e1'
              }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Historical Image ({item.year})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
