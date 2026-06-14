import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const path = location.pathname;

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

  const getStyle = (target) => {
    return { color: path === target ? 'var(--primary)' : 'inherit', textDecoration: 'none' };
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          Howrah<span>Assembly</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" style={getStyle('/')}>{t('Home')}</Link>
          <Link to="/about" style={getStyle('/about')}>{t('About')}</Link>
          <Link to="/activities" style={getStyle('/activities')}>{t('Activities')}</Link>
          <Link to="/gallery" style={getStyle('/gallery')}>{t('Gallery')}</Link>
          <Link to="/kids-corner" style={getStyle('/kids-corner')}>{t('Kids_Corner')}</Link>
          <Link to="/contact" style={getStyle('/contact')}>{t('Contact')}</Link>
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
