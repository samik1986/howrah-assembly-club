import React from 'react';

const Media = () => {
  const mediaReleases = [
    {
      id: 1,
      date: 'August 15, 2025',
      title: 'Howrah Assembly Club Announces Grand Vision for 2026 Durga Puja',
      excerpt: 'In a recent press conference, the club committee unveiled plans for an eco-friendly celebration aiming to set a new standard in community festivals.',
      source: 'The Daily Chronicle'
    },
    {
      id: 2,
      date: 'May 10, 2025',
      title: 'Annual Blood Donation Drive Breaks Previous Records',
      excerpt: 'With over 500 donors participating, the club’s social wing successfully organized its largest blood donation camp to date, partnering with the Red Cross.',
      source: 'Howrah Times'
    },
    {
      id: 3,
      date: 'January 22, 2025',
      title: 'Youth Cultural Fest Showcases Emerging Local Talent',
      excerpt: 'The three-day cultural extravaganza concluded on a high note, providing a much-needed platform for local musicians and theater groups.',
      source: 'Bengal Tribune'
    }
  ];

  return (
    <div className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          Media <span style={{ color: 'var(--secondary)' }}>Releases</span>
        </h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-main)' }}>
          Stay updated with the latest news, press clips, and official announcements from Howrah Assembly Club.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        {mediaReleases.map(release => (
          <div key={release.id} className="card" style={{ padding: '2rem', background: 'var(--surface)', borderLeft: '4px solid var(--secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{release.source}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{release.date}</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{release.title}</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{release.excerpt}</p>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Read Full Article</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
