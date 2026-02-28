import React, { useState } from 'react';

const packages = [
  {
    title: 'Family Tour',
    desc: 'Comfortable sightseeing and guided stays.',
    days: '5 Days',
    price: 'INR 12,999',
    img: 'https://images.unsplash.com/photo-1501117716987-c8e18f8b4d8b?w=1000&auto=format&fit=crop&q=60',
  },
  {
    title: 'Char Dham',
    desc: 'Sacred pilgrimage across the four dhams.',
    days: '9 Days',
    price: 'INR 24,999',
    img: 'https://images.unsplash.com/photo-1505765050423-1f15d1b9a2f2?w=1000&auto=format&fit=crop&q=60',
  },
  {
    title: 'Adventure Tour',
    desc: 'Trekking, rafting and camping adventures.',
    days: '4 Days',
    price: 'INR 8,999',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=60',
  },
];

export default function TourPackages() {
  const [selected, setSelected] = useState(null);

  const scrollToPackages = () => {
    const target = document.getElementById('packages-list');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          <h1 className="page-title">Tour Packages</h1>
          <p className="page-subtitle packages-hero-subtitle">
            Curated tours across Uttarakhand for family holidays, pilgrimage routes, and adventure experiences.
          </p>
          <div className="packages-hero-chips" aria-hidden="true">
            <span className="banner-chip">Family Tours</span>
            <span className="banner-chip">Char Dham</span>
            <span className="banner-chip">Adventure Trails</span>
          </div>
        </div>
        <button
          type="button"
          className="packages-hero-scroll-indicator"
          onClick={scrollToPackages}
          aria-label="Scroll to tour packages"
        >
          <span />
        </button>
      </section>

      <section className="packages-section" id="packages-list">
        <h2 className="section-heading">Popular Packages</h2>
        <div className="packages-grid">
          {packages.map((p, i) => (
            <article key={i} className="package-card">
              <div className="package-image" style={{ backgroundImage: `url('${p.img}')` }} />
              <div className="package-content">
                <div className="package-title">{p.title}</div>
                <div className="package-description">{p.desc}</div>
                <div className="package-meta-row">
                  <div className="package-duration">{p.days}</div>
                  <div className="package-price">{p.price}</div>
                </div>
                <button className="explore-btn" type="button" onClick={() => setSelected(i)}>
                  Explore
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected !== null && (
        <div className="page-modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="page-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={`${packages[selected].title} details`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{packages[selected].title}</h3>
            <p>{packages[selected].desc}</p>
            <div className="page-modal-actions">
              <strong>{packages[selected].price}</strong>
              <button className="explore-btn" type="button" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
