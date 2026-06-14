import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container footer-content">
        <a href="#" className="footer-logo">
          Howrah<span>Assembly</span>
        </a>
        <p style={{ maxWidth: '400px', color: 'rgba(255,255,255,0.7)' }}>
          {t('Footer_Desc')}
        </p>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} {t('Club_Name')}. {t('All_Rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
