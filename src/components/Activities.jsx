import { useTranslation } from 'react-i18next';

const Activities = () => {
  return (
    <section id="activities" className="section animate-fade-in" style={{ paddingTop: '120px', background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="hero-badge" style={{ marginBottom: '1rem' }}>Our Pillars</span>
          <h2 style={{ fontSize: '3rem' }}>Cultural & Social Activities</h2>
        </div>

        <div className="split-screen-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* Cultural Activities - Left */}
          <div className="card split-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--background)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Cultural Activities</h3>
            <p style={{ flexGrow: 1, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              We celebrate our rich heritage through various cultural programs throughout the year. From musical evenings and theater performances to art exhibitions and classical dance recitals, we provide a platform for local talent to shine and keep our traditions alive.
            </p>
            <div className="image-placeholder" style={{
              width: '100%', height: '250px', background: '#e2e8f0', borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cbd5e1'
            }}>
              <span style={{ color: '#94a3b8' }}>Cultural Image Placeholder</span>
            </div>
          </div>

          {/* Social Activities - Right */}
          <div className="card split-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--primary)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>Social Activities</h3>
            <p style={{ flexGrow: 1, fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1.5rem' }}>
              Serving the community is at the core of our existence. We organize regular health camps, blood donation drives, and educational support programs for the underprivileged. Our social initiatives aim to bring a positive change and foster a spirit of brotherhood.
            </p>
            <div className="image-placeholder" style={{
              width: '100%', height: '250px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Social Image Placeholder</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Activities;
