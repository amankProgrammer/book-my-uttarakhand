import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const initialForm = { name: '', phone: '', email: '', message: '' };

function getWhatsAppUrl({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^\+?\d[\d\s-]{8,14}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) errors.message = 'Please add a short message (10+ characters).';
  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    document.title = 'Contact | Book our Uttarakhand';
  }, []);

  const whatsappText = useMemo(() => {
    const parts = [
      'Hello Book our Uttarakhand!',
      'I want to enquire about a tour package.',
      formData.name ? `Name: ${formData.name}` : '',
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.email ? `Email: ${formData.email}` : '',
      formData.message ? `Message: ${formData.message}` : '',
    ].filter(Boolean);
    return parts.join('\n');
  }, [formData.email, formData.message, formData.name, formData.phone]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('error');
      return;
    }

    window.open(getWhatsAppUrl({ phone: '919876543210', text: whatsappText }), '_blank', 'noopener,noreferrer');
    setStatus('success');
    setFormData(initialForm);
    setErrors({});
  };

  return (
    <main className="contact-page">
      <header className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="container contact-hero-inner" data-reveal>
          <Link className="contact-back" to="/">
            <FaArrowLeft aria-hidden="true" /> Back to home
          </Link>
          <h1>Contact Us</h1>
          <p>Tell us your dates and we’ll suggest the best Uttarakhand plan within your budget.</p>
          <div className="contact-hero-actions">
            <a className="primary-cta" href="tel:+919876543210">
              <FaPhoneAlt aria-hidden="true" /> Call now
            </a>
            <a
              className="secondary-link"
              href={getWhatsAppUrl({ phone: '919876543210', text: 'Hello! I want to plan an Uttarakhand trip. Please share options.' })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="contact-body" data-reveal>
        <div className="container contact-grid">
          <aside className="contact-panel">
            <h2>Reach us</h2>
            <div className="contact-cards">
              <a className="contact-card" href="tel:+919876543210">
                <FaPhoneAlt aria-hidden="true" />
                <div>
                  <strong>Phone</strong>
                  <span>+91 98765 43210</span>
                </div>
              </a>
              <a
                className="contact-card"
                href={getWhatsAppUrl({ phone: '919876543210', text: 'Hello! I want to enquire about an Uttarakhand tour package.' })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" />
                <div>
                  <strong>WhatsApp</strong>
                  <span>Fastest replies</span>
                </div>
              </a>
              <a className="contact-card" href="mailto:info@example.com">
                <FaEnvelope aria-hidden="true" />
                <div>
                  <strong>Email</strong>
                  <span>info@example.com</span>
                </div>
              </a>
              <div className="contact-card contact-card-static" aria-label="Office location">
                <FaMapMarkerAlt aria-hidden="true" />
                <div>
                  <strong>Office</strong>
                  <span>Dehradun, Uttarakhand</span>
                </div>
              </div>
            </div>

            <div className="contact-note">
              <p>
                Prefer packages? Start from the curated listing and open any package to see itinerary, inclusions, and quick enquiry.
              </p>
              <Link className="secondary-link" to="/tour-packages">
                Browse tour packages
              </Link>
            </div>
          </aside>

          <div className="contact-form-card">
            <h2>Send an enquiry</h2>
            <p className="contact-form-sub">Share your travel dates + group size. We respond on WhatsApp quickly.</p>

            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-form-row">
                <label>
                  Full name
                  <input name="name" value={formData.name} onChange={onChange} aria-invalid={Boolean(errors.name)} />
                  {errors.name ? <span className="field-error">{errors.name}</span> : null}
                </label>
                <label>
                  Phone
                  <input name="phone" value={formData.phone} onChange={onChange} aria-invalid={Boolean(errors.phone)} />
                  {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
                </label>
              </div>

              <label>
                Email (optional)
                <input name="email" value={formData.email} onChange={onChange} aria-invalid={Boolean(errors.email)} />
                {errors.email ? <span className="field-error">{errors.email}</span> : null}
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Example: 4 people, 10–14 May, prefer deluxe hotels, want Nainital + Corbett."
                  value={formData.message}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? <span className="field-error">{errors.message}</span> : null}
              </label>

              <div className="form-actions">
                <button type="submit" className="primary-cta">
                  Send on WhatsApp
                </button>
              </div>

              {status === 'success' ? (
                <p className="form-feedback success" role="status">
                  Opening WhatsApp… If it didn’t open, use the WhatsApp button above.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="form-feedback error" role="alert">
                  Please correct the highlighted fields.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

