import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaWhatsapp,
} from 'react-icons/fa';
import { uttarakhandTourPackages } from '../data/uttarakhandTourPackages';

const INR = new Intl.NumberFormat('en-IN');

const CHAR_DHAMS = [
  {
    number: '01',
    title: 'Yamunotri',
    desc: 'Source of the holy Yamuna River. A spiritual start to the Char Dham circuit in the high Himalayas.',
    deity: 'Goddess Yamuna',
    altitude: '3,293m',
    icon: '🪷',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
  },
  {
    number: '02',
    title: 'Gangotri',
    desc: 'Origin of the sacred Ganga. A calm, powerful temple town surrounded by alpine beauty.',
    deity: 'Goddess Ganga',
    altitude: '3,100m',
    icon: '🌊',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80',
  },
  {
    number: '03',
    title: 'Kedarnath',
    desc: 'One of the 12 Jyotirlingas of Lord Shiva, set against stunning Kedarnath peaks.',
    deity: 'Lord Shiva',
    altitude: '3,583m',
    icon: '🗿',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
  },
  {
    number: '04',
    title: 'Badrinath',
    desc: 'Sacred abode of Lord Vishnu along the Alaknanda River, famous for its aarti and temple town vibe.',
    deity: 'Lord Vishnu',
    altitude: '3,133m',
    icon: '🔱',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&auto=format&fit=crop&q=80',
  },
];

const CHAR_ROUTE = [
  { label: 'Start', name: 'Dehradun', meta: 'Base city' },
  { name: 'Yamunotri', meta: '3,293m' },
  { name: 'Gangotri', meta: '3,100m' },
  { name: 'Kedarnath', meta: '3,583m' },
  { name: 'Badrinath', meta: '3,133m' },
  { label: 'End', name: 'Haridwar', meta: 'Spiritual city' },
];

const CHAR_ESSENTIALS = [
  {
    icon: '📅',
    title: 'Best time to visit',
    text: 'Season typically runs from May to November. Peak comfort months are May-June and Sep-Oct.',
    bullets: ['Summer: pleasant for pilgrimage', 'Monsoon: landslide risk (Jul-Aug)', 'Winter: temples closed'],
  },
  {
    icon: '🥾',
    title: 'Trekking & access',
    text: 'Each dham has different accessibility. We plan pacing, transfers, and buffers based on your group.',
    bullets: ['Yamunotri: trek from Janki Chatti', 'Gangotri: road access + short walk', 'Kedarnath: trek/heli options', 'Badrinath: road access'],
  },
  {
    icon: '🎒',
    title: 'What to pack',
    text: 'Weather changes fast in the mountains. Pack layers, rain protection, and essential meds.',
    bullets: ['Warm layers + thermals', 'Rain jacket / poncho', 'Trekking shoes', 'ID proof + medicines'],
  },
];

const REVIEWS = [
  {
    name: 'Aarav Mehta',
    rating: 5,
    text: 'Smooth planning and great on-ground support. The itinerary was exactly as promised and very comfortable for our parents.',
  },
  {
    name: 'Neha Singh',
    rating: 5,
    text: 'Loved the details page and the quick enquiry flow. We customized our trip and everything was handled perfectly.',
  },
  {
    name: 'Rohan Kapoor',
    rating: 4,
    text: 'Great experience overall. Clear inclusions/exclusions and fast WhatsApp response made booking easy.',
  },
];

const FAQS = [
  {
    q: 'Is this package customizable?',
    a: 'Yes. Hotels, pace, transfers, and activities can be customized based on your dates and group size.',
  },
  {
    q: 'Is it safe for elderly travelers?',
    a: 'We recommend a senior-friendly pace, comfortable stays, and buffer time. For certain routes, heli options may be available.',
  },
  {
    q: 'What documents are required?',
    a: 'A valid government ID is generally required for hotel check-ins and permits (where applicable).',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellation depends on hotel/vendor policies and travel dates. Share your dates in enquiry to get the exact terms.',
  },
];

function getWhatsAppUrl({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function assetUrl(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && typeof value.default === 'string') return value.default;
  return '';
}

function Stars({ value }) {
  const rounded = Math.round(value);
  return (
    <span className="tours-stars" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <FaStar key={idx} className={idx < rounded ? 'tours-star on' : 'tours-star'} aria-hidden="true" />
      ))}
    </span>
  );
}

function buildItineraryDays(pkg) {
  if (!pkg.itinerary?.length) return [];

  return pkg.itinerary.map((line, idx) => {
    const cleaned = String(line).replace(/^Day\s*\d+\s*:\s*/i, '').trim();
    const parts = cleaned.split(/·|\||-/).map((p) => p.trim()).filter(Boolean);

    return {
      day: idx + 1,
      title: parts[0] || `Day ${idx + 1}`,
      morning: parts[0] ? `Start with: ${parts[0]}.` : 'Start your day with a comfortable transfer and briefing.',
      afternoon: parts[1] ? `Then: ${parts[1]}.` : 'Continue with sightseeing/activities as per route and season.',
      evening: parts[2] ? `Later: ${parts[2]}.` : 'Evening leisure time and local exploration.',
      stay: categoryStayHint(pkg.category),
    };
  });
}

function categoryStayHint(category) {
  if (category === 'Destination Wedding Packages') return 'Stay: Premium resort (customizable).';
  if (category === 'Char Dham & Spiritual Tours') return 'Stay: Comfortable hotel/camp based on route.';
  return 'Stay: Hotel stay as per selected tier.';
}

export default function TourPackageDetail() {
  const { id } = useParams();
  const enquiryRef = useRef(null);
  const dhamsRef = useRef(null);

  const pkg = useMemo(() => uttarakhandTourPackages.find((p) => p.id === id) ?? null, [id]);
  const itineraryDays = useMemo(() => (pkg ? buildItineraryDays(pkg) : []), [pkg]);
  const similar = useMemo(() => {
    if (!pkg) return [];
    return uttarakhandTourPackages.filter((p) => p.category === pkg.category && p.id !== pkg.id).slice(0, 3);
  }, [pkg]);

  const [activeDay, setActiveDay] = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', dates: '', travelers: '', message: '' });

  useEffect(() => {
    if (!pkg) return;
    document.title = `${pkg.title} (${pkg.durationLabel}) | Tour Packages`;
    const desc = `${pkg.title} in Uttarakhand - ${pkg.durationLabel}. Starting ${pkg.startingPriceLabel}. ${pkg.overview || ''}`.slice(0, 155);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, [pkg]);

  useEffect(() => {
    const timer = window.setInterval(() => setReviewIndex((i) => (i + 1) % REVIEWS.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!pkg) {
    return (
      <div className="package-detail-page">
        <div className="container package-detail-notfound" data-reveal>
          <h1>Package not found</h1>
          <p>The package you&apos;re looking for doesn&apos;t exist (or the link is incorrect).</p>
          <Link className="package-back-link" to="/tour-packages">
            <FaArrowLeft aria-hidden="true" /> Back to packages
          </Link>
        </div>
      </div>
    );
  }

  const isCharDham = pkg.id === 'char-dham-yatra-10-12';
  const heroImageUrl = assetUrl(pkg.image);
  const effectiveTier = selectedTier ?? pkg.pricingTiers?.[0] ?? { label: 'Standard', price: pkg.startingPrice };
  const effectivePriceLabel = `₹ ${INR.format(effectiveTier.price)}/${pkg.priceUnit}`;

  const scrollToEnquiry = () => enquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToDhams = () => dhamsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const whatsappText = [
      `Hello TravelWorld! I want to enquire about: ${pkg.title}`,
      `Tier: ${effectiveTier.label} (${effectivePriceLabel})`,
      `Duration: ${pkg.durationLabel}`,
      `Pickup: ${pkg.pickupPoint}`,
      formData.name ? `Name: ${formData.name}` : '',
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.dates ? `Travel dates: ${formData.dates}` : '',
      formData.travelers ? `Travelers: ${formData.travelers}` : '',
      formData.message ? `Message: ${formData.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(getWhatsAppUrl({ phone: '919876543210', text: whatsappText }), '_blank', 'noopener,noreferrer');
    setSubmitStatus('success');
  };

  return (
    <div className="package-detail-page">
      <header className="package-hero" style={{ backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : undefined }}>
        <div className="package-hero-overlay" />
        <div className="container package-hero-inner">
          <Link className="package-back-link" to="/tour-packages">
            <FaArrowLeft aria-hidden="true" /> Back to packages
          </Link>

          <div className="package-hero-badges">
            {pkg.featured && <span className="tour-badge tour-badge-popular">Most Popular</span>}
            {pkg.badge ? <span className="tour-badge tour-badge-accent">{pkg.badge}</span> : null}
            {pkg.seatsLeft ? <span className="tour-badge tour-badge-danger">{pkg.seatsLeft} seats left</span> : null}
          </div>

          {isCharDham && <span className="char-om" aria-hidden="true">🕉</span>}
          <h1 className="package-title">{pkg.title}</h1>
          <div className="package-hero-meta">
            <span>
              <FaMapMarkerAlt aria-hidden="true" /> {pkg.location}
            </span>
            <span>
              <FaCalendarAlt aria-hidden="true" /> {pkg.durationLabel}
            </span>
            <span className="package-hero-rating">
              <Stars value={pkg.rating} /> <strong>{pkg.rating.toFixed(1)}</strong>
            </span>
          </div>

          <div className="package-hero-price">
            <strong>{effectivePriceLabel}</strong>
            <span>Starting from</span>
          </div>

          <div className="package-hero-actions">
            <button type="button" className="tour-modal-primary" onClick={scrollToEnquiry}>
              Book Now
            </button>
            {isCharDham && (
              <button type="button" className="tour-modal-secondary" onClick={scrollToDhams}>
                Explore the 4 Dhams
              </button>
            )}
            <a
              className="tour-modal-secondary"
              href={getWhatsAppUrl({ phone: '919876543210', text: `Hello TravelWorld! I want details for ${pkg.title} (${pkg.durationLabel}).` })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="package-quickbar" aria-label="Quick info" data-reveal>
        <div className="container package-quickbar-inner">
          <div className="package-quick-item">
            <span>Duration</span>
            <strong>{pkg.durationLabel}</strong>
          </div>
          <div className="package-quick-item">
            <span>Pickup</span>
            <strong>{pkg.pickupPoint}</strong>
          </div>
          <div className="package-quick-item">
            <span>Meals</span>
            <strong>{pkg.meals}</strong>
          </div>
          <div className="package-quick-item">
            <span>Hotel</span>
            <strong>{pkg.hotelType}</strong>
          </div>
          <div className="package-quick-item">
            <span>Best season</span>
            <strong>{pkg.bestSeason}</strong>
          </div>
        </div>
      </section>

      <main className="package-body">
        {isCharDham && (
          <>
            <section className="char-intro" data-reveal>
              <div className="container">
                <h2>The Holy Quartet of Uttarakhand</h2>
                <p className="char-intro-tagline">"Char Dham" - the four abodes of divine</p>
                <p className="package-text">
                  Char Dham is one of India&apos;s most revered pilgrimage circuits - Yamunotri, Gangotri, Kedarnath, and Badrinath. Beyond
                  spiritual significance, the route takes you through Himalayan valleys, rivers, and ancient temple towns. This page helps you
                  understand the circuit clearly before booking.
                </p>
              </div>
            </section>

            <section className="char-dhams" id="char-dhams" ref={dhamsRef} data-reveal>
              <div className="container">
                <h2 className="char-section-title">The Four Sacred Dhams</h2>
              </div>
              <div className="char-dhams-grid">
                {CHAR_DHAMS.map((dham) => (
                  <article key={dham.title} className="char-dham-card">
                    <div className="char-dham-bg" style={{ backgroundImage: `url(${dham.image})` }} aria-hidden="true" />
                    <div className="char-dham-overlay" aria-hidden="true" />
                    <div className="char-dham-content">
                      <p className="char-dham-number">{dham.number}</p>
                      <h3>{dham.title}</h3>
                      <p>{dham.desc}</p>
                      <div className="char-dham-deity">
                        <span aria-hidden="true">{dham.icon}</span>
                        {dham.deity} • Altitude: {dham.altitude}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="char-route" data-reveal>
              <div className="container">
                <h2 className="char-section-title light">The Sacred Journey Route</h2>
                <p className="char-route-desc">
                  The traditional circuit moves west to east. We build the plan with realistic drive times, buffer days, and senior-friendly
                  pacing.
                </p>
                <div className="char-route-seq" aria-label="Route sequence">
                  {CHAR_ROUTE.map((p, idx) => (
                    <React.Fragment key={`${p.name}-${idx}`}>
                      <div className="char-route-place">
                        {p.label ? <p className="char-route-label">{p.label.toUpperCase()}</p> : null}
                        <h4>{p.name}</h4>
                        <p className="char-route-meta">{p.meta}</p>
                      </div>
                      {idx < CHAR_ROUTE.length - 1 ? <span className="char-route-arrow" aria-hidden="true">-&gt;</span> : null}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>

            <section className="char-essentials" data-reveal>
              <div className="container">
                <h2 className="char-section-title">Essential Information</h2>
                <div className="char-essentials-grid">
                  {CHAR_ESSENTIALS.map((c) => (
                    <article key={c.title} className="char-info-card">
                      <span className="char-info-icon" aria-hidden="true">{c.icon}</span>
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      <ul>
                        {c.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <section className="container package-section" data-reveal>
          <h2>Overview</h2>
          <p className="package-text">{pkg.overview}</p>
        </section>

        <section className="container package-section" data-reveal>
          <h2>Day-wise Itinerary</h2>
          <div className="package-accordion">
            {itineraryDays.map((d, idx) => {
              const open = idx === activeDay;
              return (
                <div key={d.day} className={open ? 'package-acc-item open' : 'package-acc-item'}>
                  <button type="button" className="package-acc-q" onClick={() => setActiveDay(open ? -1 : idx)} aria-expanded={open}>
                    <span>
                      Day {d.day} - {d.title}
                    </span>
                    <span aria-hidden="true">{open ? '-' : '+'}</span>
                  </button>
                  {open && (
                    <div className="package-acc-a">
                      <ul className="package-day-parts">
                        <li>
                          <strong>Morning:</strong> {d.morning}
                        </li>
                        <li>
                          <strong>Afternoon:</strong> {d.afternoon}
                        </li>
                        <li>
                          <strong>Evening:</strong> {d.evening}
                        </li>
                        <li>
                          <strong>{d.stay}</strong>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="container package-section package-split" data-reveal>
          <div className="package-card">
            <h2>Inclusions</h2>
            <ul className="package-checklist">
              {pkg.inclusions.map((item) => (
                <li key={item}>
                  <FaCheckCircle aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="package-card">
            <h2>Exclusions</h2>
            <ul className="package-checklist package-checklist-negative">
              {pkg.exclusions.map((item) => (
                <li key={item}>
                  <span className="tour-x" aria-hidden="true">
                    ✖
                  </span>{' '}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container package-section" data-reveal>
          <h2>Package Highlights</h2>
          <div className="package-highlights">
            {pkg.highlights.slice(0, 6).map((h) => (
              <div key={h} className="package-highlight-card">
                <FaCheckCircle aria-hidden="true" />
                <div>
                  <strong>{h}</strong>
                  <p>Built for comfort, clarity, and a smooth on-trip experience.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container package-section" data-reveal>
          <h2>Gallery</h2>
          <div className="package-gallery">
            {(pkg.gallery?.length ? pkg.gallery : [pkg.image]).slice(0, 5).map((src, idx) => (
              <button
                key={`${pkg.id}-${idx}`}
                type="button"
                className={idx < 2 ? 'package-gallery-item big' : 'package-gallery-item'}
                onClick={() => setLightboxSrc(assetUrl(src))}
                aria-label={`Open gallery image ${idx + 1}`}
              >
                <img src={assetUrl(src)} alt={`${pkg.title} gallery ${idx + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        {isCharDham ? (
          <section className="char-tiers" data-reveal>
            <div className="container">
              <h2 className="char-section-title">Char Dham Yatra Packages</h2>
              <p className="char-tiers-sub">Choose the right comfort level. All plans can be customized.</p>
              <div className="char-tier-grid">
                {pkg.pricingTiers.map((t) => {
                  const featured = t.label.toLowerCase() === 'premium';
                  return (
                    <article key={t.label} className={featured ? 'char-tier featured' : 'char-tier'}>
                      <div className="char-tier-head">
                        <h3>{t.label} Package</h3>
                        <p className="char-tier-price">
                          ₹ {INR.format(t.price)}
                          <span>/{pkg.priceUnit}</span>
                        </p>
                      </div>
                      <div className="char-tier-body">
                        <ul>
                          {(t.features || []).map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="char-tier-btn"
                          onClick={() => {
                            setSelectedTier(t);
                            scrollToEnquiry();
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          <section className="container package-section" data-reveal>
            <h2>Pricing Breakdown</h2>
            <div className="package-pricing">
              <table className="package-table" aria-label="Pricing tiers">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {pkg.pricingTiers.map((t) => (
                    <tr key={t.label}>
                      <td>{t.label}</td>
                      <td>{`₹ ${INR.format(t.price)}/${pkg.priceUnit}`}</td>
                      <td>
                        <button
                          type="button"
                          className="package-select-btn"
                          onClick={() => {
                            setSelectedTier(t);
                            scrollToEnquiry();
                          }}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="package-note">Exact pricing may vary based on date, hotel category, and availability.</p>
            </div>
          </section>
        )}

        <section className="container package-section" data-reveal>
          <h2>Map</h2>
          <div className="package-map">
            <iframe
              title={`${pkg.title} map`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(pkg.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="container package-section" data-reveal>
          <h2>Reviews</h2>
          <div className="package-review">
            <div className="package-review-top">
              <strong>{REVIEWS[reviewIndex].name}</strong>
              <Stars value={REVIEWS[reviewIndex].rating} />
            </div>
            <p>{REVIEWS[reviewIndex].text}</p>
            <div className="tours-testimonial-dots" aria-label="Select review">
              {REVIEWS.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  className={idx === reviewIndex ? 'tours-dot active' : 'tours-dot'}
                  onClick={() => setReviewIndex(idx)}
                  aria-label={`Show review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container package-section" data-reveal>
          <h2>FAQs</h2>
          <div className="package-faq">
            {FAQS.map((f, idx) => {
              const open = idx === openFaqIndex;
              return (
                <div key={f.q} className={open ? 'tours-faq-item open' : 'tours-faq-item'}>
                  <button type="button" className="tours-faq-q" onClick={() => setOpenFaqIndex(open ? -1 : idx)} aria-expanded={open}>
                    {f.q}
                    <span aria-hidden="true">{open ? '-' : '+'}</span>
                  </button>
                  {open && <p className="tours-faq-a">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="container package-section" id="enquiry" ref={enquiryRef} data-reveal>
          <h2>Enquiry Form</h2>
          <form className="tour-enquiry" onSubmit={onSubmit}>
            <label>
              Name
              <input value={formData.name} onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))} placeholder="Your name" />
            </label>
            <label>
              Phone
              <input
                value={formData.phone}
                onChange={(e) => setFormData((s) => ({ ...s, phone: e.target.value }))}
                placeholder="e.g. +91 98765 43210"
              />
            </label>
            <label>
              Travel dates
              <input
                value={formData.dates}
                onChange={(e) => setFormData((s) => ({ ...s, dates: e.target.value }))}
                placeholder="e.g. 12-15 Apr"
              />
            </label>
            <label>
              Travelers
              <input
                value={formData.travelers}
                onChange={(e) => setFormData((s) => ({ ...s, travelers: e.target.value }))}
                placeholder="e.g. 4 adults + 1 child"
              />
            </label>
            <label className="tour-enquiry-full">
              Message
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData((s) => ({ ...s, message: e.target.value }))}
                placeholder={`Selected tier: ${effectiveTier.label} (${effectivePriceLabel}). Pickup city, hotel preference, special requests...`}
              />
            </label>
            <div className="tour-enquiry-actions tour-enquiry-full">
              <button type="submit" className="tour-enquiry-submit" disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? 'Opening WhatsApp...' : 'Send Enquiry on WhatsApp'}
              </button>
              <a className="tour-enquiry-call" href="tel:+919876543210" aria-label="Call us" title="Call us">
                <FaPhoneAlt aria-hidden="true" />
              </a>
              <a
                className="tour-enquiry-call"
                href={getWhatsAppUrl({ phone: '919876543210', text: `Hello TravelWorld! I want to enquire about ${pkg.title}.` })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us"
                title="WhatsApp us"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            </div>

            {submitStatus === 'success' && (
              <p className="tour-enquiry-success tour-enquiry-full" role="status" aria-live="polite">
                WhatsApp opened in a new tab. If it didn&apos;t open, please allow popups and try again.
              </p>
            )}
          </form>
        </section>

        <section className="package-final" data-reveal>
          <div className="container package-final-inner">
            <h2>Limited seats for this season</h2>
            <p>Send dates and group size for the fastest quote. We reply quickly on WhatsApp.</p>
            <div className="package-final-actions">
              <button type="button" className="tour-modal-primary" onClick={scrollToEnquiry}>
                Enquire Now
              </button>
              <a className="tour-modal-secondary" href="tel:+919876543210">
                <FaPhoneAlt aria-hidden="true" /> Call Now
              </a>
              <a
                className="tour-modal-secondary"
                href={getWhatsAppUrl({ phone: '919876543210', text: `Hello TravelWorld! I want to book ${pkg.title}.` })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {similar.length > 0 && (
          <section className="container package-section" data-reveal>
            <h2>Similar Packages</h2>
            <div className="package-similar">
                {similar.map((p) => (
                  <Link key={p.id} to={`/tour-packages/${p.id}`} className="package-similar-card">
                  <span
                    className="package-similar-bg"
                    style={{ backgroundImage: assetUrl(p.image) ? `url(${assetUrl(p.image)})` : undefined }}
                    aria-hidden="true"
                  />
                  <span className="package-similar-inner">
                    <strong>{p.title}</strong>
                    <span>{p.durationLabel}</span>
                    <span>{p.startingPriceLabel}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {lightboxSrc && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setLightboxSrc('')}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox-close" aria-label="Close lightbox" onClick={() => setLightboxSrc('')}>
              x
            </button>
            <img src={lightboxSrc} alt="Gallery preview" className="lightbox-img" />
            <p className="lightbox-caption">{pkg.title}</p>
          </div>
        </div>
      )}

      <div className="package-sticky-cta" aria-label="Sticky actions">
        <button type="button" className="package-sticky-btn primary" onClick={scrollToEnquiry}>
          Book Now
        </button>
        <a className="package-sticky-btn" href="tel:+919876543210">
          <FaPhoneAlt aria-hidden="true" />
        </a>
        <a
          className="package-sticky-btn"
          href={getWhatsAppUrl({ phone: '919876543210', text: `Hello TravelWorld! I want to enquire about ${pkg.title}.` })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
