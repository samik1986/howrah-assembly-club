// Contact component

const Contact = () => {
  return (
    <section id="contact" className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      <div className="contact-grid">
        <div className="contact-info">
          <span className="hero-badge" style={{ marginBottom: '1rem' }}>Visit Us</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Experience A Homely Puja</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '2rem', lineHeight: '1.8' }}>
            We warmly invite you to visit our club and experience a truly homely Puja, where devotion meets tradition. Our beautiful idol is crafted by the renowned artist <strong>Sri Sanatan Rudra Pal</strong> (or equivalent master artisan), known for his intricate, traditional Sabeki style and decades of credible craftsmanship that brings Maa Durga to life with divine grace.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Address</p>
                <span>23/1/4 Kali Kundu Lane, Kadamtala</span>
                <span>Howrah, West Bengal - 711101</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="icon">📞</div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Contact Number</p>
                <span>+91 98765 43210</span>
                <span>+91 91234 56789</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">🏛️</div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Durga Puja Committee</p>
                <span>President: Sri Asish Banerjee</span>
                <span>Secretary: Sri Amitava Das</span>
                <span>For puja-related queries, please call the numbers above.</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">🌐</div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Web Support</p>
                <span>Email: support@howrahassemblyclub.org</span>
                <span>For technical issues or online donations, reach out to our support team.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="map-container" style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <iframe 
            src="https://maps.google.com/maps?q=23/1/4%20Kali%20Kundu%20Lane,%20Kadamtala,%20Howrah,%20West%20Bengal%20711101&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, minHeight: '400px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Howrah Assembly Club Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
