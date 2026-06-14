const Activities = () => {
  return (
    <section id="activities" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center">
          <span className="hero-badge" style={{ marginBottom: '1rem' }}>What We Do</span>
          <h2>Our Primary Activities</h2>
        </div>

        <div className="grid" style={{ marginTop: '4rem' }}>
          <div className="card" style={{ background: 'var(--background)' }}>
            <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>
              🏆
            </div>
            <h3>Table Tennis Sessions</h3>
            <p>
              Join our regular table tennis sessions. We have multiple high-quality tables available for practice, casual matches, and local tournaments.
            </p>
            <ul style={{ marginTop: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Professional Coaching available
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Regular local tournaments
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Equipment provided for beginners
              </li>
            </ul>
          </div>

          <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="card-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              ⏰
            </div>
            <h3 style={{ color: 'white' }}>Typical Timings</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              We are open most evenings. Drop by during our regular hours to see the action or join a game.
            </p>
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius)' }}>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Evening Sessions</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                7:00 PM - 9:00 PM
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
                *Timings may vary on holidays and tournament days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
