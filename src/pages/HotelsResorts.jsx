import React, { useState } from 'react';

const data = [
  {
    id: 'jimcorbett',
    title: 'Jim Corbett',
    hotels: [
      'https://via.placeholder.com/300x160?text=Amrais+Green',
      'https://via.placeholder.com/300x160?text=Maulik+Mansion',
      'https://via.placeholder.com/300x160?text=The+Corbett+Silva',
      'https://via.placeholder.com/300x160?text=Vasavana+Resort',
      'https://via.placeholder.com/300x160?text=Maya+the+Forest+Resort',
    ],
  },
  {
    id: 'nainital',
    title: 'Nainital',
    hotels: [
      'https://via.placeholder.com/300x160?text=Cedar+wood',
      'https://via.placeholder.com/300x160?text=Aroma',
      'https://via.placeholder.com/300x160?text=Manu+Maharani+Regency',
    ],
  },
  {
    id: 'almora',
    title: 'Almora',
    hotels: ['https://via.placeholder.com/300x160?text=The+Mountain+Paradise'],
  },
];

export default function HotelsResorts() {
  const [modalSrc, setModalSrc] = useState('');
  const [activeTab, setActiveTab] = useState('jimcorbett');

  return (
    <div className="page hotels-resorts">
      <style>{`
        .simple-banner{position:relative;height:360px;background-image:linear-gradient(135deg,rgba(0,0,0,0.35),rgba(0,0,0,0.35)),url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&auto=format&fit=crop&q=80');background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;margin-top:80px;color:white;text-shadow:2px 2px 8px rgba(0,0,0,0.5)}
        .hotels-section{padding:40px 6%;background:#f3fff4}
        .section-title{text-align:center;font-size:32px;font-family:Playfair Display,serif;margin-bottom:8px;color:#1a1a1a}
        .hotels-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:18px}
        .hotel-card{background:white;border-radius:12px;padding:12px;box-shadow:0 6px 18px rgba(0,0,0,0.08);text-align:center;position:relative}
        .hotel-card img{width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:8px}
        .hotel-overlay{position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.95);padding:6px 10px;border-radius:20px;font-weight:700;color:#2c7a3f}
        .destination-tabs{display:flex;gap:8px;justify-content:center;margin-bottom:18px}
        .destination-tab{padding:8px 14px;border-radius:20px;background:#f0f7f3;cursor:pointer}
        .destination-tab.active{background:#2c7a3f;color:white}
        .image-modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);z-index:3000}
        .image-modal img{max-width:90%;max-height:80%;border-radius:8px}
      `}</style>

      <section className="simple-banner">
        <h1>Hotels & Resorts</h1>
      </section>

      <section className="hotels-section">
        <h2 className="section-title">Top Hotels by Destination</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', color: '#666' }}>
          Choose the best stay options across Uttarakhand
        </p>

        <div className="destination-tabs">
          {data.map((d) => (
            <button
              key={d.id}
              className={`destination-tab ${activeTab === d.id ? 'active' : ''}`}
              onClick={() => setActiveTab(d.id)}
            >
              {d.title}
            </button>
          ))}
        </div>

        {data.map((d) => (
          <div
            key={d.id}
            style={{ display: activeTab === d.id ? 'block' : 'none' }}
            className="destination-block"
          >
            <h3 className="destination-heading">{d.title}</h3>
            <div className="hotels-grid">
              {d.hotels.map((src, i) => (
                <div key={i} className="hotel-card">
                  <img src={src} alt={`hotel-${i}`} onClick={() => setModalSrc(src)} />
                  <div className="hotel-overlay">View</div>
                  <h3 style={{ fontSize: '16px' }}>Hotel {i + 1}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}

        {modalSrc && (
          <div className="image-modal" onClick={() => setModalSrc('')}>
            <img src={modalSrc} alt="hotel" />
          </div>
        )}
      </section>
    </div>
  );
}
