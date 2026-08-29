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
              <blockquote style={{ fontStyle: 'italic', background: 'var(--bg-main)', padding: '0.8rem', borderRadius: '8px', margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                "I am pleased with the adventurous spirit of young members of Howrah Wheelers, who are touring over our motherland enduring hardship and privations."
              </blockquote>
              <img 
                src="/assets/media/1934_Shantiniketan_CycleRide.jpeg" 
                alt="1934 Shantiniketan Cycle Ride" 
                style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginTop: '0.5rem', border: '1px solid var(--border)' }}
                loading="lazy"
              />
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

        <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--primary)' }}>Messages from our Presidents</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* President 1 */}
          <div className="card hover-scale" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                SG
              </div>
              <div style={{ marginLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Mr Sovanlal Ghosh</h4>
                <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>Club President</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
              "Welcome to our beloved Howrah Assembly Club. For decades, we have fostered a spirit of community and excellence in sports and culture. Let us continue to build upon our rich heritage together."
            </p>
          </div>

          {/* President 2 */}
          <div className="card hover-scale" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                SB
              </div>
              <div style={{ marginLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Mr. Subir Banerjee</h4>
                <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Puja President</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
              "Our annual Durga Puja is a time of immense joy and spiritual reflection. It brings our entire community together in celebration and devotion. May the Goddess bless us all with peace and prosperity."
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
