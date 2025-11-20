import './about.css';

export const metadata = {
  title: 'About Us - TreeVerse',
  description: 'Learn about TreeVerse mission to connect tree enthusiasts with quality sellers.',
};

export default function AboutPage() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About TreeVerse</h1>
        <p className="tagline">Growing a greener future, one tree at a time</p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            TreeVerse was created to bridge the gap between tree enthusiasts and quality tree sellers. 
            We believe that everyone should have access to premium trees and plants to create their 
            perfect green space.
          </p>
          <p>
            Our platform ensures that every tree sold meets our strict quality standards, and every 
            seller is verified and trusted. We're committed to making tree shopping easy, safe, and 
            enjoyable.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌍</div>
            <h3>Sustainability</h3>
            <p>We promote sustainable forestry practices and eco-friendly packaging.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Trust</h3>
            <p>Every seller is verified to ensure you receive exactly what you ordered.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💚</div>
            <h3>Quality</h3>
            <p>We partner only with sellers who maintain the highest quality standards.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Growth</h3>
            <p>We support both your garden's growth and our sellers' business growth.</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="story-content">
          <h2>Our Story</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>TreeVerse was founded with a simple idea: make buying trees online as easy as buying books.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>Growing Strong</h3>
                <p>Today, we connect thousands of tree enthusiasts with verified sellers across the region.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>How We Work</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Seller Verification</h3>
            <p>We carefully vet every seller to ensure they meet our quality standards.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Quality Control</h3>
            <p>Every listing is reviewed to ensure accurate descriptions and photos.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Secure Transactions</h3>
            <p>All payments are processed securely through Stripe.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Happy Customers</h3>
            <p>We ensure your tree arrives healthy and as described.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Start Planting?</h2>
        <p>Join our community and discover the perfect trees for your space.</p>
        <a href="/trees" className="btn btn-primary btn-large">
          Browse Trees
        </a>
      </section>
    </div>
  );
}
