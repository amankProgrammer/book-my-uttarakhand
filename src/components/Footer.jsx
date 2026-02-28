import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import footerScene from '../assets/images/footer-design.png';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';

function Footer() {
  const year = new Date().getFullYear();
  const goToHomeSection = useHomeSectionNavigation();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <img src={footerScene} alt="Footer Scene" />
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            Book our<span>Uttarakhand</span>
          </div>
          <p className="tag">Uttarakhand specialists — curated tours, weddings & adventures.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/uttarakhand-destination">Top Destinations</Link></li>
            <li><Link to="/tour-packages">Tour Packages</Link></li>
            <li><button type="button" className="footer-link-btn" onClick={() => goToHomeSection('wedding')}>Destination Weddings</button></li>
            <li><button type="button" className="footer-link-btn" onClick={() => goToHomeSection('enquiry')}>Contact Us</button></li>
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
          <div className="copy">© {year} BookourUttarakhand. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!validEmail) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!endpoint) {
      setStatus('error');
      setMessage('Newsletter endpoint is not configured.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          source: 'bookouruttarakhand-newsletter',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Newsletter request failed');
      }

      setStatus('success');
      setMessage('Thanks — you are subscribed! Check your inbox for offers.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Unable to subscribe right now. Please try again in a few minutes.');
    }
  };

  return (
    <form id="newsletterForm" className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        name="email"
        placeholder="Your email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={status === 'error'}
      />
      <button type="submit" className="small-cta" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <p
          className={status === 'success' ? 'form-feedback success' : 'form-feedback error'}
          role={status === 'success' ? 'status' : 'alert'}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default Footer;
