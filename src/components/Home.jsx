import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Hero from './Hero';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <section className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>About Howrah Assembly Club</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              A beacon of culture, heritage, and social harmony in the heart of Howrah. For decades, our club has been at the forefront of community engagement, bringing people together through sports, cultural events, and philanthropic activities.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/assets/media/History.jpeg" 
              alt="History of Howrah Assembly Club" 
              style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }} 
              loading="lazy"
            />
          </div>
        </div>

        <div className="presidents-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Club President */}
          <div className="president-card card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="president-img-placeholder" style={{ 
              width: '150px', height: '150px', borderRadius: '50%', background: '#e2e8f0', 
              margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-md)', border: '4px solid white'
            }}>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Image Placeholder</span>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Message from the Club President</h3>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              "Our mission has always been to foster a sense of belonging and community spirit. Through our various initiatives, we strive to empower the youth, support the underprivileged, and celebrate our rich cultural heritage together. Welcome to our family."
            </p>
            <strong style={{ color: 'var(--primary)' }}>- Name of Club President</strong>
          </div>

          {/* Durga Puja Committee President */}
          <div className="president-card card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="president-img-placeholder" style={{ 
              width: '150px', height: '150px', borderRadius: '50%', background: '#e2e8f0', 
              margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-md)', border: '4px solid white'
            }}>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Image Placeholder</span>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Message from the Puja Committee President</h3>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              "Durga Puja is not just a festival; it is an emotion that unites us all. Every year, we pour our hearts into organizing a Puja that reflects our devotion, artistic excellence, and commitment to social service. Join us in this divine celebration."
            </p>
            <strong style={{ color: 'var(--primary)' }}>- Name of Puja Committee President</strong>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
