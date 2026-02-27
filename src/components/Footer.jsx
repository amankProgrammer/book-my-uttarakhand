import React, { useState } from 'react';
import footerScene from '../assets/images/footer-design.png';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <img src={footerScene} alt="Footer Scene" />
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            Book my<span>Uttarakhand</span>
          </div>
          <p className="tag">Uttarakhand specialists — curated tours, weddings & adventures.</p>
          <div className="socials" aria-hidden="true">
            <a href="#" className="s">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.14 8.44 9.88v-6.99H8.07v-2.89h2.23V9.41c0-2.2 1.31-3.42 3.31-3.42.96 0 1.96.17 1.96.17v2.15h-1.1c-1.09 0-1.42.67-1.42 1.36v1.63h2.42l-.39 2.89h-2.03v6.99c4.78-.74 8.44-4.89 8.44-9.88z" fill="#fff"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Top Destinations</a></li>
            <li><a href="#">Tour Packages</a></li>
            <li><a href="#">Destination Weddings</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Call us: <strong>+91 98765 43210</strong></p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
          <p className="muted">Office: Dehradun, Uttarakhand</p>
        </div>
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p className="muted">Get curated packages & offers in your inbox.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="copy">© {year} BookmyUttarakhand. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return subscribed ? (
    <div style={{ padding: '12px', color: '#0b3d2e', fontWeight: 700 }}>
      Thanks — you are subscribed!
      <div style={{ fontSize: '12px', color: '#556' }}>Check your inbox for offers.</div>
    </div>
  ) : (
    <form id="newsletterForm" className="newsletter-form" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Your email address" required />
      <button type="submit" className="small-cta">Subscribe</button>
    </form>
  );
}

export default Footer;
