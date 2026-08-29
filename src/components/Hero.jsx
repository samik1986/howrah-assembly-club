import { useTranslation } from 'react-i18next';
import PujaCountdown from './PujaCountdown';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content animate-fade-in">
          <span className="hero-badge">{t('Est_in_Howrah')}</span>
          <h1>
            {t('Welcome_to')} <br />
            <span>{t('Club_Name')}</span>
          </h1>
          <p>
            {t('Hero_Desc')}
          </p>
          <div className="hero-buttons">
            <a href="#activities" className="btn btn-primary">{t('Our_Activities')}</a>
            <a href="#contact" className="btn btn-outline">{t('Visit_Us')}</a>
          </div>
        </div>
        
        <div className="hero-countdown-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <PujaCountdown />
        </div>
      </div>
    </section>
  );
};

export default Hero;
