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

const ceremonyTypes = [
  {
    code: 'RW',
    title: 'Royal Weddings',
    desc: 'Grand mountain ceremonies with premium decor, hospitality lounges, and multi-event styling.',
  },
  {
    code: 'IC',
    title: 'Intimate Ceremonies',
    desc: 'Private celebrations for close family with meaningful rituals and elegant details.',
  },
  {
    code: 'DV',
    title: 'Destination Vows',
    desc: 'Scenic outdoor vows with panoramic backdrops and fully coordinated ceremony flow.',
  },
  {
    code: 'NW',
    title: 'Nature Weddings',
    desc: 'Forest and valley-inspired functions designed around Uttarakhand landscapes.',
  },
];

const destinationWeddingOptions = [
  {
    destination: 'Jim Corbett',
    subtitle: 'Where wildlife meets romance',
    venues: [
      {
        name: 'Amrais Green',
        tag: 'Popular',
        features: ['Luxury tents', 'Jungle safari', 'Nature walks'],
        price: 'Starting from INR 1,50,000',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200',
      },
      {
        name: 'Maulik Mansion',
        tag: 'Premium',
        features: ['Heritage stay', 'Pool', 'Multi-cuisine'],
        price: 'Starting from INR 2,00,000',
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200',
      },
      {
        name: 'The Corbett Silva',
        tag: 'Featured',
        features: ['River view', 'Adventure sports', 'Bonfire'],
        price: 'Starting from INR 1,80,000',
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200',
      },
      {
        name: 'Vasavana Resort',
        tag: 'Wellness',
        features: ['Forest view', 'Yoga', 'Spa'],
        price: 'Starting from INR 1,75,000',
        image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb21078?q=80&w=1200',
      },
      {
        name: 'Maya the Forest Resort',
        tag: 'Eco',
        features: ['Wildlife', 'Eco-friendly', 'Photography'],
        price: 'Starting from INR 1,60,000',
        image: 'https://images.unsplash.com/photo-1530076886461-ce58ea8abe24?q=80&w=1200',
      },
      {
        name: 'Dee Fellows',
        tag: 'Riverside',
        features: ['Riverside', 'Kayaking', 'Angling'],
        price: 'Starting from INR 1,45,000',
        image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200',
      },
      {
        name: 'La Perle',
        tag: 'Luxury',
        features: ['Luxury', 'Pool', 'Fine dining'],
        price: 'Starting from INR 2,50,000',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200',
      },
      {
        name: 'Banyan Retreat',
        tag: 'Calm',
        features: ['Wellness', 'Meditation', 'Nature'],
        price: 'Starting from INR 1,55,000',
        image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200',
      },
      {
        name: 'Corbett Tusker Trail',
        tag: 'Adventure',
        features: ['Elephant safari', 'Bird watching', 'Trekking'],
        price: 'Starting from INR 1,70,000',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200',
      },
      {
        name: 'Corbett Grace',
        tag: 'Elegant',
        features: ['Serene', 'Garden', 'Events'],
        price: 'Starting from INR 1,40,000',
        image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200',
      },
    ],
  },
  {
    destination: 'Nainital',
    subtitle: 'Lake-side celebrations with classic hill charm',
    venues: [
      {
        name: 'Cedarwood',
        tag: 'Top Rated',
        features: ['Lake view', 'Heritage', 'Boating'],
        price: 'Starting from INR 1,80,000',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200',
      },
      {
        name: 'Aroma',
        tag: 'Luxury',
        features: ['Aromatherapy', 'Spa', 'Luxury'],
        price: 'Starting from INR 2,20,000',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200',
      },
      {
        name: 'Manu Maharani Regency',
        tag: 'Classic',
        features: ['5 star', 'Lake view', 'Fine dining'],
        price: 'Starting from INR 3,50,000',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200',
      },
      {
        name: 'Royal Heritage Resort',
        tag: 'Royal',
        features: ['Palace', 'Golf', 'Nature'],
        price: 'Starting from INR 2,80,000',
        image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?q=80&w=1200',
      },
      {
        name: 'The Palace Belvedere',
        tag: 'Elegant',
        features: ['Colonial', 'Gardens', 'Ballroom'],
        price: 'Starting from INR 3,00,000',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
      },
    ],
  },
  {
    destination: 'Mussoorie',
    subtitle: 'Colonial elegance in the Queen of Hills',
    venues: [
      {
        name: 'Wild Spring',
        tag: 'Featured',
        features: ['Hot springs', 'Nature', 'Tranquil'],
        price: 'Starting from INR 1,55,000',
        image: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?q=80&w=1200',
      },
      {
        name: 'Shining Hills',
        tag: 'Popular',
        features: ['Mountain view', 'Sunset', 'Photography'],
        price: 'Starting from INR 1,70,000',
        image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200',
      },
      {
        name: 'MV Acosta',
        tag: 'Luxury',
        features: ['Colonial', 'Heritage', 'Luxury'],
        price: 'Starting from INR 2,50,000',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200',
      },
      {
        name: 'Solitaire Resort',
        tag: 'Luxury',
        features: ['Modern', 'Pool', 'Events'],
        price: 'Starting from INR 2,20,000',
        image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200',
      },
    ],
  },
  {
    destination: 'Rishikesh',
    subtitle: 'Spiritual ambience by the river',
    venues: [
      {
        name: 'Ganga View Resort',
        tag: 'Spiritual',
        features: ['River view', 'Yoga', 'Meditation'],
        price: 'Starting from INR 1,40,000',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200',
      },
      {
        name: 'Divine Riverside',
        tag: 'Wellness',
        features: ['Ganga access', 'Ayurveda', 'Wellness'],
        price: 'Starting from INR 1,60,000',
        image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200',
      },
      {
        name: 'Holy River Retreat',
        tag: 'Premium',
        features: ['Premium', 'Spa', 'Events'],
        price: 'Starting from INR 2,00,000',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200',
      },
    ],
  },
  {
    destination: 'Bhimtal',
    subtitle: 'Quiet lakeside charm for intimate weddings',
    venues: [
      {
        name: 'Nature Valley',
        tag: 'Intimate',
        features: ['Valley view', 'Peaceful', 'Camping'],
        price: 'Starting from INR 1,20,000',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200',
      },
      {
        name: 'Kasauni Inn',
        tag: 'Value',
        features: ['Cozy', 'Homely', 'Affordable'],
        price: 'Starting from INR 95,000',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200',
      },
      {
        name: 'Kasauni Regency Resort',
        tag: 'Popular',
        features: ['Modern', 'Conference', 'Events'],
        price: 'Starting from INR 1,50,000',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200',
      },
    ],
  },
  {
    destination: 'Ranikhet',
    subtitle: "The Queen's Meadow with pine-forest romance",
    venues: [
      {
        name: 'Pool Retreat Ranikhet',
        tag: 'Trending',
        features: ['Pool', 'Golf', 'Pine views'],
        price: 'Starting from INR 1,80,000',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200',
      },
      {
        name: 'Colonels Paradise',
        tag: 'Exclusive',
        features: ['Colonial', 'Garden', 'Peaceful'],
        price: 'Starting from INR 2,10,000',
        image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200',
      },
    ],
  },
  {
    destination: 'Almora',
    subtitle: 'Heritage charm with panoramic Himalayan backdrops',
    venues: [
      {
        name: 'The Mountain Paradise',
        tag: 'Scenic',
        features: ['Panoramic', 'Heritage', 'Cultural'],
        price: 'Starting from INR 1,65,000',
        image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1200',
      },
      {
        name: 'Kumaon Grand',
        tag: 'Luxury',
        features: ['Luxury', 'Traditional', 'Events'],
        price: 'Starting from INR 2,00,000',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200',
      },
    ],
  },
];

const weddingStats = [
  { value: '50+', label: 'Wedding venues' },
  { value: '500+', label: 'Happy couples' },
  { value: '15+', label: 'Wedding destinations' },
  { value: '100%', label: 'Planning support' },
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
      setSubmitMessage('Enquiry sent. Our wedding specialist will contact you shortly.');
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
        <p className="dw-hero-kicker">Destination Wedding in Uttarakhand</p>
        <h1>Celebrate in the Himalayas</h1>
        <p className="dw-hero-sub">Where love meets mountain grandeur and every function feels unforgettable.</p>
        <div className="dw-hero-buttons">
          <a href="#wedding-venues" className="dw-hero-btn dw-hero-btn-primary">
            Explore Destinations
          </a>
          <a href="#wedding-enquiry" className="dw-hero-btn dw-hero-btn-secondary">
            Book Your Dream Wedding
          </a>
        </div>
        <div className="dw-scroll-indicator" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className="dw-section" id="wedding-about" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Magical Mountain Weddings</h2>
          <div className="dw-divider" />
          <p className="dw-story">
            We design destination weddings across Uttarakhand with full-service planning, hospitality, and creative
            production. From intimate mountain vows to grand multi-day celebrations, our team handles every milestone
            so families can focus on memories.
          </p>
        </div>
      </section>

      <section className="dw-section dw-ceremony-section" id="wedding-ceremonies" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Ceremony Styles</h2>
          <div className="dw-divider" />
          <div className="dw-ceremony-grid">
            {ceremonyTypes.map((type) => (
              <article key={type.title} className="dw-ceremony-card">
                <span className="dw-ceremony-icon">{type.code}</span>
                <h4>{type.title}</h4>
                <p>{type.desc}</p>
              </article>
            ))}
          </div>
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
          <h2 className="dw-section-title">Choose Your Dream Destination</h2>
          <div className="dw-divider" />

          {destinationWeddingOptions.map((block) => (
            <div key={block.destination} className="dw-destination-block">
              <div className="dw-destination-header">
                <span className="dw-destination-badge">{block.destination.slice(0, 2).toUpperCase()}</span>
                <div>
                  <h3>{block.destination}</h3>
                  <p>{block.subtitle}</p>
                </div>
              </div>

              <div className="dw-resort-grid">
                {block.venues.map((venue) => (
                  <article key={venue.name} className="dw-resort-card">
                    <div className="dw-resort-image" style={{ backgroundImage: `url('${venue.image}')` }}>
                      <span className="dw-resort-tag">{venue.tag}</span>
                    </div>
                    <div className="dw-resort-body">
                      <h4>{venue.name}</h4>
                      <div className="dw-resort-features">
                        {venue.features.map((feature) => (
                          <span key={feature}>{feature}</span>
                        ))}
                      </div>
                      <p className="dw-resort-price">{venue.price}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dw-countdown" data-reveal>
        <div className="container">
          <h2>Your Dream Wedding Awaits</h2>
          <p>Book early and get the best venue, decor, and guest management options.</p>
          <div className="dw-countdown-grid">
            {weddingStats.map((item) => (
              <article key={item.label} className="dw-countdown-item">
                <h3>{item.value}</h3>
                <p>{item.label}</p>
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
          <h2 className="dw-section-title">Real Wedding Moments</h2>
          <div className="dw-divider" />
          <div className="dw-gallery-grid">
            {galleryImages.map((src, index) => (
              <article key={src} className="dw-gallery-card gallery-item" onClick={() => setGalleryLightboxSrc(src)}>
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
              <input
                name="destination"
                value={formData.destination}
                onChange={handleFieldChange}
                placeholder="Nainital / Mussoorie / Corbett"
              />
            </label>
            <label>
              Guest Count
              <input name="guests" value={formData.guests} onChange={handleFieldChange} placeholder="e.g. 180" />
            </label>
            <label className="dw-enquiry-full">
              Message
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleFieldChange}
                placeholder="Share your requirements..."
              />
            </label>
            <div className="dw-enquiry-actions dw-enquiry-full">
              <button type="submit" className="dw-rsvp-btn" disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? 'Sending Enquiry...' : 'Send Enquiry'}
              </button>
            </div>
            {submitMessage && (
              <p
                className={
                  submitStatus === 'success'
                    ? 'form-feedback success dw-enquiry-full'
                    : 'form-feedback error dw-enquiry-full'
                }
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
        <h2>Let&apos;s Plan Your Destination Wedding</h2>
        <p>Share your guest count and preferred dates. We&apos;ll build your custom wedding plan.</p>
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
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close lightbox"
              onClick={() => setGalleryLightboxSrc('')}
            >
              x
            </button>
            <img src={galleryLightboxSrc} alt="Wedding gallery preview" className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}
