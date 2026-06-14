import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <a href="#" className="logo">
          Howrah<span>Assembly</span>
        </a>
        <nav className="nav-links">
          <a href="#home">{t('Home')}</a>
          <a href="#about">{t('About')}</a>
          <a href="#activities">{t('Activities')}</a>
          <a href="#gallery">{t('Gallery')}</a>
          <a href="#contact">{t('Contact')}</a>
        </nav>
        <div className="lang-switcher" style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
          <button onClick={() => changeLanguage('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: i18n.language === 'en' ? 'var(--primary)' : 'var(--text)', fontWeight: i18n.language === 'en' ? 'bold' : 'normal' }}>EN</button>
          <span style={{ color: 'var(--text-light)' }}>|</span>
          <button onClick={() => changeLanguage('bn')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: i18n.language === 'bn' ? 'var(--primary)' : 'var(--text)', fontWeight: i18n.language === 'bn' ? 'bold' : 'normal' }}>BN</button>
          <span style={{ color: 'var(--text-light)' }}>|</span>
          <button onClick={() => changeLanguage('hi')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: i18n.language === 'hi' ? 'var(--primary)' : 'var(--text)', fontWeight: i18n.language === 'hi' ? 'bold' : 'normal' }}>HI</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
