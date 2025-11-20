import { ReactNode } from 'react';
import Link from 'next/link';
import './layout.css';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-layout">
      {/* Header/Navigation */}
      <header className="header">
        <nav className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">🌳</span>
            <span className="logo-text">TreeVerse</span>
          </Link>
          
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/trees" className="nav-link">Browse Trees</Link>
            <Link href="/about" className="nav-link">About</Link>
          </div>

          <div className="nav-actions">
            <Link href="/api/v1/auth/login" className="btn-nav btn-login">
              Login
            </Link>
            <Link href="/api/v1/auth/register" className="btn-nav btn-signup">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">🌳</span>
              TreeVerse
            </h3>
            <p className="footer-tagline">
              Growing a greener future, one tree at a time.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/trees">Browse Trees</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Sellers</h4>
            <ul>
              <li><Link href="/seller/register">Become a Seller</Link></li>
              <li><Link href="/seller/dashboard">Seller Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TreeVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
