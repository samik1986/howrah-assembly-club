import React, { useState } from 'react';

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '', address: '', city: '', state: '', country: '', amount: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real application, connect this to a backend or email service.
  };

  return (
    <div className="section container animate-fade-in" style={{ paddingTop: '120px' }}>
      
      {/* Emotional Paragraph */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Reconnect With Your <span style={{ color: 'var(--secondary)' }}>Roots</span></h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', fontStyle: 'italic' }}>
          For a Bengali, wherever life may lead, the heart always returns home during Durga Puja. It is the time when nostalgia whispers through the sound of the dhaak, the fragrance of dhuno, and the shared joy of community. Your support brings our shared heritage to life, ensuring that the warmth of our traditions reaches everyone—from the grand pandal decorations to the comforting taste of the Maha Bhog. Stand with us, and let’s celebrate the spirit of giving.
        </p>
      </div>

      {/* Donation Form */}
      <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem', background: 'var(--surface)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <h2 style={{ color: 'var(--accent)', fontSize: '2rem', marginBottom: '1rem' }}>Thank You!</h2>
            <p style={{ fontSize: '1.1rem' }}>Your details have been received. We deeply appreciate your support.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            <h2 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>Donation Form</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Donation Amount *</label>
                <input required type="number" name="amount" placeholder="e.g. 5000" value={formData.amount} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email ID *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>WhatsApp Number *</label>
                <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Address</label>
              <textarea name="address" rows="3" value={formData.address} onChange={handleChange} style={inputStyle}></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
              Proceed to Support
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  fontSize: '1rem',
  fontFamily: 'inherit'
};

export default Donation;
