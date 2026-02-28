import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';

const whyChooseUs = [
  {
    title: 'Local Wedding Experts',
    desc: 'Dedicated Uttarakhand planners for permits, venue liaison, and on-ground execution.',
  },
  {
    title: 'Transparent Budgets',
    desc: 'Clear package breakdown with venue, decor, hospitality, and production costs.',
  },
  {
    title: 'Premium Guest Experience',
    desc: 'Airport transfers, curated stays, welcome kits, and personalized concierge desks.',
  },
  {
    title: 'Design-First Celebrations',
    desc: 'Theme curation for mehendi, haldi, sangeet, wedding, and reception under one team.',
  },
];

const destinationProperties = [
  {
    name: 'Aahana Resort & Spa',
    location: 'Jim Corbett',
    guests: '150-250 guests',
    startingFrom: 'Starting from ₹18,00,000',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
  },
  {
    name: 'Naini Retreat by Leisure',
    location: 'Nainital',
    guests: '120-220 guests',
    startingFrom: 'Starting from ₹15,50,000',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200',
  },
  {
    name: 'Kausani Himalayan Resort',
    location: 'Kausani',
    guests: '100-180 guests',
    startingFrom: 'Starting from ₹12,75,000',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200',
  },
  {
    name: 'Mussoorie Valley Manor',
    location: 'Mussoorie',
    guests: '180-320 guests',
    startingFrom: 'Starting from ₹22,00,000',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
  },
];

const additionalServices = [
  'Venue scouting and complete contract negotiation',
  'Decor production, floral styling, and mandap concepts',
  'Artist and entertainment curation for all functions',
  'Pre-wedding shoot planning with photography teams',
  'Guest logistics: transport, rooming, and hospitality desk',
  'Wedding website, invites, and RSVP coordination',
];

const galleryImages = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=400',
];

export default function WeddingSection() {
  const goToHomeSection = useHomeSectionNavigation();
  const [galleryLightboxSrc, setGalleryLightboxSrc] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    destination: '',
    guests: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const enquiryEndpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

  useEffect(() => {
    if (!galleryLightboxSrc) return undefined;
    const onEscape = (event) => {
      if (event.key === 'Escape') setGalleryLightboxSrc('');
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [galleryLightboxSrc]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeddingEnquiry = async (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      source: 'bookouruttarakhand-wedding-enquiry',
      submittedAt: new Date().toISOString(),
    };

    if (!enquiryEndpoint) {
      setSubmitStatus('error');
      setSubmitMessage('Wedding enquiry endpoint is not configured.');
      return;
    }

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Wedding enquiry request failed');
      }

      setSubmitStatus('success');
      setSubmitMessage('Enquiry sent! Our wedding specialist will contact you shortly.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        weddingDate: '',
        destination: '',
        guests: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Could not send enquiry right now. Please try again in a few minutes.');
    }
  };

  return (
    <>
      <section className="dw-hero" id="wedding" data-reveal>
        <p>Destination Wedding in Uttarakhand</p>
        <h1>Celebrate in the Himalayas</h1>
        <p>Luxury venues, seamless planning, unforgettable moments</p>
      </section>

      <section className="dw-section" id="wedding-about" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">About Our Wedding Studio</h2>
          <div className="dw-divider" />
          <p className="dw-story">
            We design destination weddings across Uttarakhand with full-service planning, hospitality,
            and creative production. From intimate mountain vows to grand multi-day celebrations, our
            team handles every milestone so families can focus on memories.
          </p>
        </div>
      </section>

      <section className="dw-section dw-events-section" id="wedding-why-us" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Why Choose Us</h2>
          <div className="dw-divider" />
          <div className="dw-feature-grid">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="dw-feature-card">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dw-section" id="wedding-venues" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Destination Properties</h2>
          <div className="dw-divider" />
          <div className="dw-properties-grid">
            {destinationProperties.map((property) => (
              <article key={property.name} className="dw-property-card">
                <img src={property.image} alt={property.name} />
                <div className="dw-property-content">
                  <h4>{property.name}</h4>
                  <p>{property.location}</p>
                  <p>{property.guests}</p>
                  <p className="dw-property-price">{property.startingFrom}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dw-section dw-events-section" id="wedding-services" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">What More We Can Do</h2>
          <div className="dw-divider" />
          <div className="dw-events-grid">
            {additionalServices.map((service) => (
              <article key={service} className="dw-event-card">
                <h4>Premium Service</h4>
                <p>{service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dw-section" id="wedding-gallery" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Wedding Gallery</h2>
          <div className="dw-divider" />
          <div className="dw-gallery-grid">
            {galleryImages.map((src, index) => (
              <article
                key={src}
                className="dw-gallery-card gallery-item"
                onClick={() => setGalleryLightboxSrc(src)}
              >
                <img src={src} alt={`Wedding gallery image ${index + 1}`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dw-section dw-events-section" id="wedding-enquiry" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Wedding Enquiry</h2>
          <div className="dw-divider" />
          <form id="weddingEnquiryForm" className="dw-enquiry-form" onSubmit={handleWeddingEnquiry}>
            <label>
              Name
              <input name="name" value={formData.name} onChange={handleFieldChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={formData.phone} onChange={handleFieldChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleFieldChange} required />
            </label>
            <label>
              Wedding Date
              <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleFieldChange} />
            </label>
            <label>
              Preferred Destination
              <input name="destination" value={formData.destination} onChange={handleFieldChange} placeholder="Nainital / Mussoorie / Corbett" />
            </label>
            <label>
              Guest Count
              <input name="guests" value={formData.guests} onChange={handleFieldChange} placeholder="e.g. 180" />
            </label>
            <label className="dw-enquiry-full">
              Message
              <textarea name="message" rows="4" value={formData.message} onChange={handleFieldChange} placeholder="Share your requirements..." />
            </label>
            <div className="dw-enquiry-actions dw-enquiry-full">
              <button type="submit" className="dw-rsvp-btn" disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? 'Sending Enquiry...' : 'Send Enquiry'}
              </button>
            </div>
            {submitMessage && (
              <p
                className={submitStatus === 'success' ? 'form-feedback success dw-enquiry-full' : 'form-feedback error dw-enquiry-full'}
                role={submitStatus === 'success' ? 'status' : 'alert'}
                aria-live="polite"
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="dw-rsvp" data-reveal>
        <h2>Let’s Plan Your Destination Wedding</h2>
        <p>Share your guest count and preferred dates. We’ll build your custom wedding plan.</p>
        <div className="dw-rsvp-actions">
          <a
            href="https://wa.me/919876543210?text=Hello%20TravelWorld%21%20I%20want%20a%20destination%20wedding%20quote%20in%20Uttarakhand."
            className="dw-rsvp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Quote on WhatsApp
          </a>
          <Link
            to="/#enquiry"
            className="dw-rsvp-btn dw-rsvp-btn-secondary"
            onClick={(event) => {
              event.preventDefault();
              goToHomeSection('enquiry');
            }}
          >
            Request Callback
          </Link>
        </div>
      </section>

      {galleryLightboxSrc && (
        <div
          id="lightbox"
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding gallery lightbox"
          onClick={() => setGalleryLightboxSrc('')}
        >
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" aria-label="Close lightbox" onClick={() => setGalleryLightboxSrc('')}>
              ×
            </button>
            <img src={galleryLightboxSrc} alt="Wedding gallery preview" className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}
