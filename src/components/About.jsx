const About = () => {
  return (
    <section id="about" className="section container">
      <div className="text-center mb-12">
        <span className="hero-badge" style={{ marginBottom: '1rem' }}>Our History</span>
        <h2>About The Club</h2>
        <p style={{ maxWidth: '700px', margin: '1rem auto' }}>
          Established as a pillar of the Kadamtala community, the Howrah Assembly Club has long been a place for sports enthusiasts and residents to come together.
        </p>
      </div>
      
      <div className="grid">
        <div className="card">
          <div className="card-icon">🏓</div>
          <h3>Sports Excellence</h3>
          <p>
            We pride ourselves on our state-of-the-art table tennis facilities, catering to everyone from beginners to seasoned professionals looking to hone their skills.
          </p>
        </div>
        <div className="card">
          <div className="card-icon">🤝</div>
          <h3>Community First</h3>
          <p>
            Beyond sports, we are a hub for social engagement, bringing together individuals from all walks of life in Howrah to foster long-lasting connections.
          </p>
        </div>
        <div className="card">
          <div className="card-icon">🌟</div>
          <h3>Welcoming Environment</h3>
          <p>
            Our doors are open to everyone. Experience a supportive and friendly atmosphere where you can learn, play, and grow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
