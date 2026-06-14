import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section container">
      <div className="text-center mb-12">
        <span className="hero-badge" style={{ marginBottom: '1rem' }}>{t('Our_History')}</span>
        <h2>{t('About_The_Club')}</h2>
        <p style={{ maxWidth: '700px', margin: '1rem auto' }}>
          {t('About_Desc')}
        </p>
      </div>
      
      <div className="grid">
        <div className="card">
          <div className="card-icon">🏓</div>
          <h3>{t('Sports_Excellence')}</h3>
          <p>
            {t('Sports_Desc')}
          </p>
        </div>
        <div className="card">
          <div className="card-icon">🤝</div>
          <h3>{t('Community_First')}</h3>
          <p>
            {t('Community_Desc')}
          </p>
        </div>
        <div className="card">
          <div className="card-icon">🌟</div>
          <h3>{t('Welcoming_Environment')}</h3>
          <p>
            {t('Welcoming_Desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
