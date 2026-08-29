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
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Howrah Assembly" style={{ height: '50px', width: 'auto', marginRight: '10px' }} />
          Howrah<span>Assembly</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" style={getStyle('/')}>{t('Home')}</Link>
          <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--text-muted)' }}>Club Info ▾</span>
            <div className="dropdown-content">
              <Link to="/history" style={getStyle('/history')}>History</Link>
              <Link to="/activities" style={getStyle('/activities')}>Activities</Link>
              <Link to="/contact" style={getStyle('/contact')}>{t('Contact')}</Link>
            </div>
          </div>
          <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--text-muted)' }}>Durga Puja ▾</span>
            <div className="dropdown-content">
              <Link to="/durga-puja" style={getStyle('/durga-puja')}>History & Legacy</Link>
              <Link to="/durga-puja-2026" style={getStyle('/durga-puja-2026')}>2026 Puja</Link>
              <Link to="/donate" style={getStyle('/donate')}>Support/Donate</Link>
            </div>
          </div>
          <Link to="/gallery" style={getStyle('/gallery')}>{t('Gallery')}</Link>
          <Link to="/media" style={getStyle('/media')}>Media</Link>
          <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--text-muted)' }}>More ▾</span>
            <div className="dropdown-content">
              <Link to="/kids-corner" style={getStyle('/kids-corner')}>{t('Kids_Corner')}</Link>
              <Link to="/news" style={getStyle('/news')}>{t('News_Corner')}</Link>
              <Link to="/wellness" style={getStyle('/wellness')}>{t('Wellness_Corner')}</Link>
            </div>
          </div>
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
