const Contact = () => {
  return (
    <section id="contact" className="section container">
      <div className="contact-grid">
        <div className="contact-info">
          <span className="hero-badge" style={{ marginBottom: '1rem' }}>Visit Us</span>
          <h2>Get In Touch</h2>
          <p>
            Whether you are looking to join a table tennis session, participate in community events, or just want to see what we are about, we would love to have you.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <p>Address</p>
                <span>1/4, 23 Kali Kundu Lane, Kadamtala</span>
                <span>Howrah, West Bengal - 711101</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="icon">⏰</div>
              <div>
                <p>Club Hours</p>
                <span>7:00 PM - 9:00 PM (Most Evenings)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="map-container">
          {/* Simple map placeholder or iframe embed */}
          <iframe 
            src="https://maps.google.com/maps?q=1/4,%2023%20Kali%20Kundu%20Lane,%20Kadamtala,%20Howrah,%20West%20Bengal%20711101&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
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
