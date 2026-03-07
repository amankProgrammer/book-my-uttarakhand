import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import footerScene from '../assets/images/footer-design.png';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, firebaseEnabled } from '../firebase/client';
import useCmsCollection from '../hooks/useCmsCollection';

function Footer() {
  const year = new Date().getFullYear();
  const goToHomeSection = useHomeSectionNavigation();

  const { items: contactItems } = useCmsCollection('contact');
  const contactInfo = React.useMemo(() => {
    const info = {
      phone: '+91 98765 43210',
      email: 'info@example.com',
      address: 'Dehradun, Uttarakhand',
    };
    contactItems.forEach(item => {
      const type = (item.type || '').toLowerCase();
      const val = item.value || '';
      if (type.includes('phone') || type === 'call') info.phone = val;
      if (type.includes('email')) info.email = val;
      if (type.includes('address') || type.includes('office')) info.address = val;
    });
    return info;
  }, [contactItems]);

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
            <li><Link to="/destination-wedding">Destination Weddings</Link></li>
            <li><button type="button" className="footer-link-btn" onClick={() => goToHomeSection('enquiry')}>Contact Us</button></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Call us: <strong>{contactInfo.phone}</strong></p>
          <p>Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
          <p className="muted">Office: {contactInfo.address}</p>
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

    setStatus('submitting');
    setMessage('');

    try {
      if (endpoint) {
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
      } else if (firebaseEnabled && db) {
        await addDoc(collection(db, 'newsletterSignups'), {
          email: trimmedEmail,
          source: 'bookouruttarakhand-newsletter',
          submittedAt: new Date().toISOString(),
          createdAt: serverTimestamp(),
        });
      } else {
        throw new Error('Newsletter endpoint is not configured.');
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
