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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.2889248441113!2d88.32338697528994!3d22.582775779484377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02778a36412d45%3A0x6506fd4b68d66447!8m2!3d22.5827758!4d88.3259619!16s%2Fg%2F11c52lqr_5!5e0!3m2!1sen!2sus!4v1718043640245!5m2!1sen!2sus" 
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
