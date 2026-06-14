import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section container">
      <div className="contact-grid">
        <div className="contact-info">
          <span className="hero-badge" style={{ marginBottom: '1rem' }}>{t('Visit_Us')}</span>
          <h2>{t('Get_In_Touch')}</h2>
          <p>
            {t('Contact_Desc')}
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <p>{t('Address')}</p>
                <span>1/4, 23 Kali Kundu Lane, Kadamtala</span>
                <span>Howrah, West Bengal - 711101</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="icon">⏰</div>
              <div>
                <p>{t('Club_Hours')}</p>
                <span>7:00 PM - 9:00 PM {t('Most_Evenings')}</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius)' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--primary)' }}>{t('Transit_Guide')}</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{t('Transit_Surface')}</p>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-light)', display: 'block', lineHeight: '1.5' }}>{t('Transit_Surface_Desc')}</span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{t('Transit_Water')}</p>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-light)', display: 'block', lineHeight: '1.5' }}>{t('Transit_Water_Desc')}</span>
              </div>
              
              <div>
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{t('Transit_Air')}</p>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-light)', display: 'block', lineHeight: '1.5' }}>{t('Transit_Air_Desc')}</span>
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
