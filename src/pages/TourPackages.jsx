import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaFilter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaTimes,
  FaWhatsapp,
} from 'react-icons/fa';
import { uttarakhandTourPackages as defaultPackages } from '../data/uttarakhandTourPackages';
import useCmsCollection from '../hooks/useCmsCollection';
import { categoryFromSlug, slugFromCategory, tourPackageCategories } from '../data/tourPackageCategories';

function assetUrl(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && typeof value.default === 'string') return value.default;
  return '';
}

const DURATION_FILTERS = [
  { key: 'any', label: 'Any duration', test: () => true },
  { key: '1-3', label: '1-3 Days', test: (p) => p.durationDays >= 1 && p.durationDays <= 3 },
  { key: '4-6', label: '4-6 Days', test: (p) => p.durationDays >= 4 && p.durationDays <= 6 },
  { key: '7-9', label: '7-9 Days', test: (p) => p.durationDays >= 7 && p.durationDays <= 9 },
  { key: '10+', label: '10+ Days', test: (p) => p.durationDays >= 10 },
];

const BUDGET_FILTERS = [
  { key: 'any', label: 'Any budget', test: () => true },
  { key: 'u10', label: 'Under ₹10,000', test: (p) => p.startingPrice < 10000 },
  { key: '10-20', label: '₹10,000-₹20,000', test: (p) => p.startingPrice >= 10000 && p.startingPrice <= 20000 },
  { key: '20-35', label: '₹20,000-₹35,000', test: (p) => p.startingPrice > 20000 && p.startingPrice <= 35000 },
  { key: '35+', label: '₹35,000+', test: (p) => p.startingPrice > 35000 },
];

const SORT_OPTIONS = [
  {
    key: 'featured',
    label: 'Recommended',
    compare: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.startingPrice - b.startingPrice,
  },
  { key: 'price-asc', label: 'Price: Low -> High', compare: (a, b) => a.startingPrice - b.startingPrice },
  { key: 'price-desc', label: 'Price: High -> Low', compare: (a, b) => b.startingPrice - a.startingPrice },
  { key: 'rating', label: 'Rating: High -> Low', compare: (a, b) => b.rating - a.rating },
];

const WHY_CHOOSE_US = [
  { title: '24/7 Support', desc: 'We stay available during your trip.' },
  { title: 'Local Experts', desc: 'Verified routes, stays, and vendors.' },
  { title: 'Customizable Plans', desc: 'Edit hotels, pace, and activities.' },
  { title: 'Best Price Promise', desc: 'Transparent quotes, no surprises.' },
];

const CATEGORY_INFO = {
  'Char Dham & Spiritual Tours': {
    kicker: 'Spiritual journeys',
    audience: 'Religious travelers, families, senior citizens',
    points: ['Senior-friendly pacing', 'Darshan assistance', 'Comfortable stopovers'],
    bestSeason: 'May-Oct',
  },
  'Hill Station & Family Tours': {
    kicker: 'Hill escapes',
    audience: 'Couples, families, honeymooners',
    points: ['Lake views & viewpoints', 'Relaxed sightseeing', 'Best-value stays'],
    bestSeason: 'Mar-Jun, Sep-Nov',
  },
  'Wildlife & Adventure': {
    kicker: 'Thrill & nature',
    audience: 'Youth, adventure lovers, wildlife enthusiasts',
    points: ['Safari/adventure options', 'Local experts', 'Flexible activity planning'],
    bestSeason: 'Nov-Jun',
  },
  'Seasonal Packages': {
    kicker: 'Limited-time offers',
    audience: 'Deal seekers, festive travelers',
    points: ['Seasonal routes', 'Limited slots', 'Best rates on early booking'],
    bestSeason: 'Seasonal',
  },
};

const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    rating: 5,
    text: 'Smooth planning and great on-ground support. The itinerary was exactly as promised and very comfortable for our parents.',
  },
  {
    name: 'Neha Singh',
    rating: 5,
    text: 'Loved the filters and the package details. We customized our Nainital + Corbett trip and everything was handled perfectly.',
  },
  {
    name: 'Rohan Kapoor',
    rating: 4,
    text: 'The Rishikesh adventure plan was amazing. The team helped with activities and timings - no stress at all.',
  },
];

const FAQS = [
  {
    q: 'What is the best time to visit Uttarakhand?',
    a: 'Mar-Jun is great for hill stations, Sep-Nov for clear weather, and Dec-Mar for snow destinations. Seasonal trips depend on road and weather updates.',
  },
  {
    q: 'Is Char Dham suitable for senior citizens?',
    a: 'Yes - we recommend a senior-friendly pace, comfortable stays, and buffer time. We can also plan heli options where available.',
  },
  {
    q: 'Are meals included in these packages?',
    a: 'Most packages include breakfast & dinner. Exact inclusions vary by package and hotel selection.',
  },
  {
    q: 'Can I customize my tour package?',
    a: 'Yes - duration, hotels, transfers, and activities can be customized. Use the enquiry form inside a package for a tailored quote.',
  },
];

function getWhatsAppUrl({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
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

function PackageCard({ pkg, onQuickView }) {
  const isLimited = pkg.seatsLeft && pkg.seatsLeft <= 12;
  const imageUrl = assetUrl(pkg.image);

  return (
    <article className="tour-card" data-reveal>
      <div className="tour-card-media" style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}>
        <div className="tour-card-badges">
          {pkg.featured && <span className="tour-badge tour-badge-popular">Featured</span>}
          {pkg.badge ? <span className="tour-badge tour-badge-accent">{pkg.badge}</span> : null}
          {isLimited ? <span className="tour-badge tour-badge-danger">Limited Seats Left</span> : null}
        </div>
        <span className="tour-duration-badge">
          <FaCalendarAlt aria-hidden="true" /> {pkg.durationLabel}
        </span>
      </div>

      <div className="tour-card-body">
        <div className="tour-card-head">
          <h3 className="tour-title">{pkg.title}</h3>
          <div className="tour-rating">
            <Stars value={pkg.rating} />
            <span className="tour-rating-value">{pkg.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="tour-location">
          <FaMapMarkerAlt aria-hidden="true" /> {pkg.location}
        </p>

        <p className="tour-price">
          <span className="tour-price-label">Starting</span> <strong>{pkg.startingPriceLabel}</strong>
        </p>

        <ul className="tour-highlights">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h}>
              <FaCheckCircle aria-hidden="true" /> {h}
            </li>
          ))}
        </ul>

        <div className="tour-actions">
          <Link className="tour-cta" to={`/tour-packages/${pkg.id}`}>
            View Details <FaArrowRight aria-hidden="true" />
          </Link>
          <button className="tour-quick" type="button" onClick={() => onQuickView(pkg)}>
            Quick View
          </button>
        </div>
      </div>
    </article>
  );
}

function PackageModal({ pkg, onClose }) {
  const enquiryRef = useRef(null);
  const imageUrl = assetUrl(pkg.image);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dates: '',
    travelers: '',
    message: '',
  });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const scrollToEnquiry = () => enquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const whatsappText = [
      `Hello TravelWorld! I want to book/enquire about: ${pkg.title}`,
      `Duration: ${pkg.durationLabel}`,
      `Budget: ${pkg.startingPriceLabel}`,
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
    <div className="tour-modal-overlay" role="dialog" aria-modal="true" aria-label={`${pkg.title} details`} onClick={onClose}>
      <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="tour-modal-close" onClick={onClose} aria-label="Close package details">
          <FaTimes aria-hidden="true" />
        </button>

        <header className="tour-modal-hero" style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}>
          <div className="tour-modal-hero-inner">
            <p className="tour-modal-category">{pkg.category}</p>
            <h2>{pkg.title}</h2>
            <div className="tour-modal-hero-meta">
              <span>
                <FaCalendarAlt aria-hidden="true" /> {pkg.durationLabel}
              </span>
              <span>
                <FaMapMarkerAlt aria-hidden="true" /> {pkg.location}
              </span>
              <span className="tour-modal-price">{pkg.startingPriceLabel}</span>
            </div>
            <div className="tour-modal-hero-actions">
              <button type="button" className="tour-modal-primary" onClick={scrollToEnquiry}>
                Book Now
              </button>
              <Link className="tour-modal-secondary" to={`/tour-packages/${pkg.id}`} onClick={onClose}>
                View Page <FaArrowRight aria-hidden="true" />
              </Link>
              <a
                className="tour-modal-secondary"
                href={getWhatsAppUrl({
                  phone: '919876543210',
                  text: `Hello TravelWorld! I want details for ${pkg.title} (${pkg.durationLabel}).`,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </header>

        <div className="tour-modal-content">
          <section className="tour-modal-section">
            <h3>Overview</h3>
            <p className="tour-modal-text">{pkg.overview}</p>
          </section>

          <section className="tour-modal-section">
            <h3>Day-wise Itinerary</h3>
            <ol className="tour-itinerary">
              {pkg.itinerary.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
            <p className="tour-modal-note">Itinerary is customizable based on pace, hotel category, and travel dates.</p>
          </section>

          <section className="tour-modal-section tour-modal-split">
            <div className="tour-split-card">
              <h3>Inclusions</h3>
              <ul className="tour-checklist">
                {pkg.inclusions.map((item) => (
                  <li key={item}>
                    <FaCheckCircle aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tour-split-card">
              <h3>Exclusions</h3>
              <ul className="tour-checklist tour-checklist-negative">
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

          <section className="tour-modal-section">
            <h3>Why Choose Us</h3>
            <div className="tour-why-grid">
              {WHY_CHOOSE_US.map((c) => (
                <div key={c.title} className="tour-why-card">
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tour-modal-section">
            <h3>Gallery</h3>
            <div className="tour-gallery">
              {(pkg.gallery.length ? pkg.gallery : [pkg.image]).slice(0, 6).map((src, idx) => (
                <img key={`${pkg.id}-${idx}`} src={src} alt={`${pkg.title} gallery ${idx + 1}`} loading="lazy" />
              ))}
            </div>
          </section>

          <section className="tour-modal-section">
            <h3>Customer Reviews</h3>
            <div className="tour-reviews">
              {TESTIMONIALS.slice(0, 2).map((t) => (
                <article key={t.name} className="tour-review-card">
                  <div className="tour-review-head">
                    <strong>{t.name}</strong>
                    <Stars value={t.rating} />
                  </div>
                  <p>{t.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tour-modal-section" ref={enquiryRef}>
            <h3>Enquiry Form</h3>
            <form className="tour-enquiry" onSubmit={onSubmit}>
              <label>
                Name
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Your name"
                />
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
                  placeholder="e.g. 12–15 Apr"
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
                  placeholder="Hotel type, pickup city, special requests..."
                />
              </label>

              <div className="tour-enquiry-actions tour-enquiry-full">
                <button type="submit" className="tour-enquiry-submit" disabled={submitStatus === 'submitting'}>
                  {submitStatus === 'submitting' ? 'Opening WhatsApp…' : 'Send Enquiry on WhatsApp'}
                </button>
                <a className="tour-enquiry-call" href="tel:+919876543210" aria-label="Call us" title="Call us">
                  <FaPhoneAlt aria-hidden="true" />
                </a>
              </div>

              {submitStatus === 'success' && (
                <p className="tour-enquiry-success tour-enquiry-full" role="status" aria-live="polite">
                  WhatsApp opened in a new tab. If it didn&apos;t open, please allow popups and try again.
                </p>
              )}
            </form>
          </section>
        </div>

        <div className="tour-modal-sticky">
          <span className="tour-modal-sticky-price">{pkg.startingPriceLabel}</span>
          <button type="button" className="tour-modal-sticky-btn" onClick={scrollToEnquiry}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TourPackages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [durationKey, setDurationKey] = useState('any');
  const [budgetKey, setBudgetKey] = useState('any');
  const [sortKey, setSortKey] = useState('featured');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  const { items: cmsItems } = useCmsCollection('packages');
  const uttarakhandTourPackages = cmsItems.length > 0 ? cmsItems : defaultPackages;
  
  const { items: cmsTestimonials } = useCmsCollection('testimonials');
  const displayTestimonials = cmsTestimonials.length > 0 ? cmsTestimonials : TESTIMONIALS;

  const activeCategory = categoryFromSlug(searchParams.get('category'));

  const scrollToPackages = () => {
    const target = document.getElementById('packages-list');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const durationFilter = useMemo(() => DURATION_FILTERS.find((f) => f.key === durationKey) ?? DURATION_FILTERS[0], [durationKey]);
  const budgetFilter = useMemo(() => BUDGET_FILTERS.find((f) => f.key === budgetKey) ?? BUDGET_FILTERS[0], [budgetKey]);
  const sortOption = useMemo(() => SORT_OPTIONS.find((o) => o.key === sortKey) ?? SORT_OPTIONS[0], [sortKey]);

  const categories = useMemo(() => {
    const available = new Set(uttarakhandTourPackages.map((p) => p.category));
    return tourPackageCategories.filter((c) => c.category === 'All' || available.has(c.category));
  }, [uttarakhandTourPackages]);

  const filteredPackages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return uttarakhandTourPackages
      .filter((p) => (activeCategory === 'All' ? true : p.category === activeCategory))
      .filter((p) => durationFilter.test(p))
      .filter((p) => budgetFilter.test(p))
      .filter((p) => {
        if (!normalizedQuery) return true;
        return `${p.title} ${p.location} ${p.category}`.toLowerCase().includes(normalizedQuery);
      })
      .slice()
      .sort(sortOption.compare);
  }, [activeCategory, budgetFilter, durationFilter, query, sortOption, uttarakhandTourPackages]);

  const featured = useMemo(() => uttarakhandTourPackages.filter((p) => p.featured).slice(0, 4), [uttarakhandTourPackages]);
  const seasonal = useMemo(() => uttarakhandTourPackages.filter((p) => p.category === 'Seasonal Packages').slice(0, 4), [uttarakhandTourPackages]);

  const setCategory = (category) => {
    if (category === 'All') {
      setSearchParams({});
      return;
    }
    setSearchParams({ category: slugFromCategory(category) });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((idx) => (idx + 1) % displayTestimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [displayTestimonials.length]);

  const resetFilters = () => {
    setCategory('All');
    setQuery('');
    setDurationKey('any');
    setBudgetKey('any');
    setSortKey('featured');
  };

  return (
    <div className="tour-packages-page">
      <section className="packages-hero-banner">
        <div className="packages-hero-floating-shapes" aria-hidden="true">
          <span className="packages-hero-shape" />
          <span className="packages-hero-shape" />
          <span className="packages-hero-shape" />
          <span className="packages-hero-shape" />
          <span className="packages-hero-shape" />
        </div>
        <div className="packages-hero-mountain" aria-hidden="true">
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
            <path d="M0,160 L0,88 L150,36 L300,66 L450,22 L600,56 L750,20 L900,42 L1050,12 L1200,62 L1200,160 Z" />
            <path d="M0,160 L0,108 L200,64 L400,94 L600,54 L800,82 L1000,44 L1200,92 L1200,160 Z" />
          </svg>
        </div>
        <div className="banner-content-wrapper packages-hero-content">
          <p className="packages-hero-kicker">Curated Journeys</p>
          <h1 className="page-title">Explore Magical Uttarakhand</h1>
          <p className="page-subtitle packages-hero-subtitle">
            Handcrafted tours for families, couples, pilgrims & adventure lovers - designed for comfort and conversion.
          </p>
          <div className="packages-hero-chips" aria-hidden="true">
            <span className="banner-chip">Spiritual Tours</span>
            <span className="banner-chip">Hill Stations</span>
            <span className="banner-chip">Adventure</span>
            <span className="banner-chip">Seasonal Deals</span>
          </div>

          <form
            className="tours-hero-search"
            onSubmit={(e) => {
              e.preventDefault();
              scrollToPackages();
            }}
          >
            <label>
              Destination
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nainital / Kedarnath / Corbett..." />
            </label>
            <label>
              Duration
              <select value={durationKey} onChange={(e) => setDurationKey(e.target.value)}>
                {DURATION_FILTERS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Budget
              <select value={budgetKey} onChange={(e) => setBudgetKey(e.target.value)}>
                {BUDGET_FILTERS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="tours-hero-search-btn">
              Search
            </button>
          </form>
        </div>
        <button type="button" className="packages-hero-scroll-indicator" onClick={scrollToPackages} aria-label="Scroll to tour packages">
          <span />
        </button>
      </section>

      <section className="packages-section" id="packages-list">
        <div className="container">
          <header className="tours-section-head" data-reveal>
            <h2 className="section-heading">Tours & Travel Packages</h2>
            <p className="category-intro">
              Browse structured packages like a professional travel agency - filter by category, duration, and budget, then view full details
              before you enquire.
            </p>
          </header>

          <div className="tours-toolbar" role="region" aria-label="Package filters">
            <div className="tours-tabs" aria-label="Categories">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  className={cat.category === activeCategory ? 'tours-tab active' : 'tours-tab'}
                  onClick={() => setCategory(cat.category)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="tours-filters">
              <div className="tours-filter-group">
                <FaFilter aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search packages..."
                  aria-label="Search packages"
                />
              </div>

              <select value={durationKey} onChange={(e) => setDurationKey(e.target.value)} aria-label="Filter by duration">
                {DURATION_FILTERS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>

              <select value={budgetKey} onChange={(e) => setBudgetKey(e.target.value)} aria-label="Filter by budget">
                {BUDGET_FILTERS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>

              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} aria-label="Sort packages">
                {SORT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>

              <button type="button" className="tours-reset" onClick={resetFilters}>
                Reset
              </button>

              <span className="tours-count" aria-label={`${filteredPackages.length} packages found`}>
                {filteredPackages.length} packages
              </span>
            </div>
          </div>

          <div className="tours-category-info" data-reveal>
            {activeCategory !== 'All' && CATEGORY_INFO[activeCategory] ? (
              <div className="tours-category-panel">
                <p className="tours-category-kicker">{CATEGORY_INFO[activeCategory].kicker}</p>
                <h3 className="tours-category-title">{activeCategory}</h3>
                <p className="tours-category-audience">
                  <strong>Ideal for:</strong> {CATEGORY_INFO[activeCategory].audience}
                </p>
                <div className="tours-category-points">
                  {CATEGORY_INFO[activeCategory].points.map((p) => (
                    <span key={p} className="tours-category-chip">
                      <FaCheckCircle aria-hidden="true" /> {p}
                    </span>
                  ))}
                  <span className="tours-category-chip muted">
                    <FaCalendarAlt aria-hidden="true" /> Best season: {CATEGORY_INFO[activeCategory].bestSeason}
                  </span>
                </div>
              </div>
            ) : (
              <div className="tours-category-grid" aria-label="Package categories">
                {categories
                  .filter((c) => c.category !== 'All')
                  .map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      className="tours-category-card"
                      onClick={() => {
                        setCategory(c.category);
                        scrollToPackages();
                      }}
                    >
                      <strong>{c.label}</strong>
                      <span>{CATEGORY_INFO[c.category]?.audience || 'Curated Uttarakhand itineraries'}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {activeCategory === 'All' && !query.trim() && durationKey === 'any' && budgetKey === 'any' && (
            <section className="tours-featured" aria-label="Featured packages" data-reveal>
              <div className="tours-featured-head">
                <h3>Featured Packages</h3>
                <p>High-demand itineraries placed first for faster conversions.</p>
              </div>
              <div className="tours-featured-grid">
                {featured.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} onQuickView={setSelectedPkg} />
                ))}
              </div>
            </section>
          )}

          <section className="tours-all" aria-label="All packages">
            <div className="tours-grid">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onQuickView={setSelectedPkg} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="tours-why" data-reveal>
        <div className="container">
          <h2 className="section-heading">Why Choose Us</h2>
          <div className="tours-why-cards">
            {WHY_CHOOSE_US.map((c) => (
              <article key={c.title} className="tours-why-item">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tours-seasonal" data-reveal>
        <div className="container">
          <header className="tours-seasonal-head">
            <h2 className="section-heading">Seasonal Offers</h2>
            <p>Limited-time packages that keep your website feeling active and updated.</p>
          </header>
          <div className="tours-seasonal-grid">
            {seasonal.map((pkg) => (
              <Link key={pkg.id} className="tours-seasonal-card" to={`/tour-packages/${pkg.id}`}>
                <span
                  className="tours-seasonal-bg"
                  style={{ backgroundImage: assetUrl(pkg.image) ? `url(${assetUrl(pkg.image)})` : undefined }}
                  aria-hidden="true"
                />
                <span className="tours-seasonal-inner">
                  <span className="tours-seasonal-badge">Offer</span>
                  <strong>{pkg.title}</strong>
                  <span>{pkg.startingPriceLabel}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tours-testimonials" data-reveal>
        <div className="container">
          <h2 className="section-heading">What Travelers Say</h2>
          <div className="tours-testimonial-card" role="group" aria-label="Testimonials slider">
            <div className="tours-testimonial-top">
              <strong>{displayTestimonials[testimonialIndex]?.name}</strong>
              <Stars value={displayTestimonials[testimonialIndex]?.rating || 5} />
            </div>
            <p>{displayTestimonials[testimonialIndex]?.text}</p>
            <div className="tours-testimonial-dots" aria-label="Select testimonial">
              {displayTestimonials.map((t, idx) => (
                <button
                  key={t.name || idx}
                  type="button"
                  className={idx === testimonialIndex ? 'tours-dot active' : 'tours-dot'}
                  onClick={() => setTestimonialIndex(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tours-faq" data-reveal>
        <div className="container">
          <h2 className="section-heading">FAQs</h2>
          <div className="tours-faq-list">
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
        </div>
      </section>

      <section className="tours-final-cta" data-reveal>
        <div className="container">
          <div className="tours-final-cta-inner">
            <h2>Ready for Your Dream Trip?</h2>
            <p>Tap a package, view full details, then send a quick enquiry on WhatsApp for a fast quote.</p>
            <div className="tours-final-cta-actions">
              <button type="button" className="tour-modal-primary" onClick={scrollToPackages}>
                Browse Packages
              </button>
              <a
                className="tour-modal-secondary"
                href={getWhatsAppUrl({ phone: '919876543210', text: 'Hello TravelWorld! I want help choosing an Uttarakhand tour package.' })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <a
        className="whatsapp-float"
        href={getWhatsAppUrl({ phone: '919876543210', text: 'Hello TravelWorld! I want an Uttarakhand tour quote.' })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>

      {selectedPkg ? <PackageModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} /> : null}
    </div>
  );
}
