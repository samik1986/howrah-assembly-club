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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>About Howrah Assembly Club</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              A beacon of culture, heritage, and social harmony in the heart of Howrah. For decades, our club has been at the forefront of community engagement, bringing people together through sports, cultural events, and philanthropic activities.
            </p>
          </div>
          
          <div className="history-timeline" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '2px solid var(--primary-light)', paddingBottom: '0.5rem' }}>Our Historic Milestones</h3>
            
            <div style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>1934 - Journey to Shantiniketan</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                On Good Friday, 21 members of Howrah Assembly went to Shantiniketan by Cycle. Rabindranath Tagore gave the following blessing:
              </p>
              <blockquote style={{ fontStyle: 'italic', background: 'var(--bg-main)', padding: '0.8rem', borderRadius: '8px', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                "I am pleased with the adventurous spirit of young members of Howrah Wheelers, who are touring over our motherland enduring hardship and privations."
              </blockquote>
            </div>

            <div style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>1939 - The Mahajati Sadan</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                It is said that the freedom fighter Subhas Chandra Bose had asked Rabindranath Tagore to build a theatre, and Tagore responded by laying the foundation stone of the Mahajati Sadan on 10th August 1939 in presence of the Howrah Assembly Band team.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>1999 - A New Building</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                Principal of Ramkrishna Mission B.T. College, Swami Sanatanananda (Shisher Maharaj) opened the newly constructed Howrah Assembly club Building on 18th July 1999, by installing The Three Portraits of Ramkrishnadev, Ma Sarada & Swami Vivekananda.
              </p>
            </div>
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
