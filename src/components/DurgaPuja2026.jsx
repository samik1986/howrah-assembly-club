import React from 'react';
import { Link } from 'react-router-dom';

const DurgaPuja2026 = () => {
  return (
    <div className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          Durga Puja <span style={{ color: 'var(--secondary)' }}>2026</span>
        </h1>
      </div>

      <div className="grid" style={{ gap: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        
        {/* Our Vision for 2026 */}
        <div className="card" style={{ padding: '3rem', background: 'var(--surface)', borderTop: '4px solid var(--secondary)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Vision for 2026</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
            As we prepare to welcome Maa Durga this year, our theme revolves around spiritual reawakening and environmental sustainability. The 2026 Puja promises to be a visual spectacle, crafted by master artisans using eco-friendly materials, bringing forth a unique blend of traditional artistry and modern consciousness. We look forward to hosting an inclusive celebration that not only captivates the eyes but also nourishes the soul, reinforcing our bonds of unity.
          </p>
        </div>

        {/* Support Us */}
        <div className="card" style={{ padding: '3rem', background: 'var(--primary)', color: 'white', borderTop: '4px solid var(--accent)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🙏</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>Support the Celebration</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', marginBottom: '2rem' }}>
            A celebration of this magnitude is made possible only through the generous support of our extended family. Your contributions are vital for preparing the daily Maha Bhog, distributing Prasadam to thousands of devotees, and organizing vast feeding programs (Annadaan) for the needy around this auspicious time. Join hands with us to ensure that the joy of the festival reaches every home.
          </p>
          
          <Link to="/donate" className="btn" style={{ 
            background: 'var(--accent)', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', padding: '1rem 2rem'
          }}>
            Donate Now <span>→</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DurgaPuja2026;
