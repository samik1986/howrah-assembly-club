const Footer = () => {
  return (
    <footer>
      <div className="container footer-content">
        <a href="#" className="footer-logo">
          Howrah<span>Assembly</span>
        </a>
        <p style={{ maxWidth: '400px', color: 'rgba(255,255,255,0.7)' }}>
          A premier community and table tennis club in Kadamtala, West Bengal. Serving the community with passion and excellence.
        </p>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Howrah Assembly Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
