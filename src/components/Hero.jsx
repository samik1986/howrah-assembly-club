const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content animate-fade-in">
          <span className="hero-badge">Est. in Howrah</span>
          <h1>
            Welcome to <br />
            <span>Howrah Assembly Club</span>
          </h1>
          <p>
            A premier community club in Kadamtala, West Bengal. 
            Join us for professional table tennis, community engagement, and a welcoming environment for all skill levels.
          </p>
          <div className="hero-buttons">
            <a href="#activities" className="btn btn-primary">Our Activities</a>
            <a href="#contact" className="btn btn-outline">Visit Us</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
