import React, { useState } from 'react';

const packages = [
  {
    title: 'Family Tour',
    desc: 'Comfortable sightseeing & guided stays.',
    days: '5 Days',
    price: '₹12,999',
    img: 'https://images.unsplash.com/photo-1501117716987-c8e18f8b4d8b?w=1000&auto=format&fit=crop&q=60',
  },
  {
    title: 'Char Dham',
    desc: 'Sacred pilgrimage across the four dhams.',
    days: '9 Days',
    price: '₹24,999',
    img: 'https://images.unsplash.com/photo-1505765050423-1f15d1b9a2f2?w=1000&auto=format&fit=crop&q=60',
  },
  {
    title: 'Adventure Tour',
    desc: 'Trekking, rafting & camping adventures.',
    days: '4 Days',
    price: '₹8,999',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=60',
  },
];

export default function TourPackages() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="tour-packages-page">
      <section className="tour-banner">
        <div className="banner-content-wrapper">
          <h1 className="page-title">Tour Packages</h1>
          <p className="page-subtitle">Curated tours across Uttarakhand — family, pilgrimage and adventure packages.</p>
        </div>
      </section>

      <section className="packages-section">
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
                <button className="explore-btn" type="button" onClick={() => setSelected(i)}>Explore</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal / details */}
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
              <button className="explore-btn" type="button" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
