import { useTranslation } from 'react-i18next';

const Activities = () => {
  const { t } = useTranslation();

  return (
    <section id="activities" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center">
          <span className="hero-badge" style={{ marginBottom: '1rem' }}>{t('What_We_Do')}</span>
          <h2>{t('Our_Primary_Activities')}</h2>
        </div>

        <div className="grid" style={{ marginTop: '4rem' }}>
          <div className="card" style={{ background: 'var(--background)' }}>
            <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>
              🏆
            </div>
            <h3>{t('Table_Tennis_Sessions')}</h3>
            <p>
              {t('TTS_Desc')}
            </p>
            <ul style={{ marginTop: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> {t('Prof_Coaching')}
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> {t('Local_Tournaments')}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> {t('Equipment_Provided')}
              </li>
            </ul>
          </div>

          <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="card-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              ⏰
            </div>
            <h3 style={{ color: 'white' }}>{t('Typical_Timings')}</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {t('Timings_Desc')}
            </p>
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius)' }}>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>{t('Evening_Sessions')}</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                7:00 PM - 9:00 PM
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
                {t('Timings_Note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
