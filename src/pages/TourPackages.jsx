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
      <style>{`
        .tour-banner{position:relative;height:360px;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;margin-top:80px;color:white}
        .banner-content-wrapper{position:relative;text-align:center;z-index:2;padding:30px}
        .packages-section{padding:40px 6%;background:#f3fff4}
        .packages-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
        .package-card{background:white;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);cursor:pointer}
        .package-image{height:180px;background-size:cover;background-position:center}
        .package-content{padding:18px}
        .package-title{font-family:Playfair Display,serif;font-size:18px;margin-bottom:8px}
        .explore-btn{width:100%;padding:10px;background:linear-gradient(135deg,#2c7a3f,#1f5a2f);color:white;border:none;border-radius:8px}
      `}</style>

      <section className="tour-banner" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80')` }}>
        <div className="banner-content-wrapper">
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }}>Tour Packages</h1>
          <p style={{ maxWidth: 800 }}>Curated tours across Uttarakhand — family, pilgrimage and adventure packages.</p>
        </div>
      </section>

      <section className="packages-section">
        <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>Popular Packages</h2>
        <div className="packages-grid">
          {packages.map((p, i) => (
            <div key={i} className="package-card" onClick={() => setSelected(i)}>
              <div className="package-image" style={{ backgroundImage: `url('${p.img}')` }} />
              <div className="package-content">
                <div className="package-title">{p.title}</div>
                <div className="package-description">{p.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                  <div className="package-duration">{p.days}</div>
                  <div className="package-price">{p.price}</div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <button className="explore-btn">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal / details */}
      {selected !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000 }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', padding: 20, borderRadius: 8, width: '90%', maxWidth: 800 }} onClick={(e) => e.stopPropagation()}>
            <h3>{packages[selected].title}</h3>
            <p>{packages[selected].desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <strong>{packages[selected].price}</strong>
              <button className="explore-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
