import Link from 'next/link';
import './home.css';

export const metadata = {
  title: 'TreeVerse - Premium Trees & Plants Marketplace',
  description: 'Discover and purchase the finest trees and plants from verified sellers.',
};

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Grow Your Dream Garden with <span className="highlight">TreeVerse</span>
          </h1>
          <p className="hero-subtitle">
            Discover premium trees and plants from verified sellers. Transform your space into a natural paradise.
          </p>
          <div className="hero-actions">
            <Link href="/trees" className="btn btn-primary">
              Browse Trees
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">
            🌳
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose TreeVerse?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Verified Sellers</h3>
            <p>All our sellers are carefully vetted to ensure quality and reliability.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Premium Quality</h3>
            <p>Handpicked selection of the healthiest and most beautiful trees.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Safe Delivery</h3>
            <p>Carefully packaged and delivered to your doorstep with tracking.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Stripe-powered payments ensure your transactions are safe.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          <Link href="/trees?category=fruit" className="category-card">
            <div className="category-icon">🍎</div>
            <h3>Fruit Trees</h3>
            <p>Apple, Orange, Mango & more</p>
          </Link>
          <Link href="/trees?category=ornamental" className="category-card">
            <div className="category-icon">🌸</div>
            <h3>Ornamental</h3>
            <p>Cherry Blossom, Magnolia & more</p>
          </Link>
          <Link href="/trees?category=evergreen" className="category-card">
            <div className="category-icon">🌲</div>
            <h3>Evergreen</h3>
            <p>Pine, Spruce, Fir & more</p>
          </Link>
          <Link href="/trees?category=shade" className="category-card">
            <div className="category-icon">🌳</div>
            <h3>Shade Trees</h3>
            <p>Oak, Maple, Birch & more</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start Your Garden Journey?</h2>
          <p>Join thousands of happy customers who have transformed their spaces.</p>
          <Link href="/trees" className="btn btn-primary btn-large">
            Explore Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
