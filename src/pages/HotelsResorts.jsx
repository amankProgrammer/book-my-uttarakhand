import React, { useState } from 'react';

const data = [
  {
    title: 'Jim Corbett',
    hotels: [
      { name: 'Amrais Green', img: 'https://via.placeholder.com/300x160?text=Amrais+Green' },
      { name: 'Maulik Mansion', img: 'https://via.placeholder.com/300x160?text=Maulik+Mansion' },
      { name: 'The Corbett Silva', img: 'https://via.placeholder.com/300x160?text=The+Corbett+Silva' },
      { name: 'Vasavana Resort', img: 'https://via.placeholder.com/300x160?text=Vasavana+Resort' },
      { name: 'Maya the Forest Resort', img: 'https://via.placeholder.com/300x160?text=Maya+the+Forest+Resort' },
      { name: 'Dee Fellows', img: 'https://via.placeholder.com/300x160?text=Dee+Fellows' },
      { name: 'La Perle', img: 'https://via.placeholder.com/300x160?text=La+Perle' },
      { name: 'Banyan Retreat', img: 'https://via.placeholder.com/300x160?text=Banyan+Retreat' },
      { name: 'Corbett Tusker Trail', img: 'https://via.placeholder.com/300x160?text=Corbett+Tusker+Trail' },
      { name: 'Corbett Grace', img: 'https://via.placeholder.com/300x160?text=Corbett+Grace' },
    ],
  },
  {
    title: 'Nainital',
    hotels: [
      { name: 'Cedar wood', img: 'https://via.placeholder.com/300x160?text=Cedar+wood' },
      { name: 'Aroma', img: 'https://via.placeholder.com/300x160?text=Aroma' },
      { name: 'Manu Maharani Regency', img: 'https://via.placeholder.com/300x160?text=Manu+Maharani+Regency' },
      { name: 'Royal heritage resort', img: 'https://via.placeholder.com/300x160?text=Royal+heritage+resort' },
      { name: 'The Palace Belvedere', img: 'https://via.placeholder.com/300x160?text=The+Palace+Belvedere' },
    ],
  },
  {
    title: 'Almora',
    hotels: [{ name: 'The Mountain Paradise', img: 'https://via.placeholder.com/300x160?text=The+Mountain+Paradise' }],
  },
  {
    title: 'Kausani',
    hotels: [
      { name: 'Nature valley', img: 'https://via.placeholder.com/300x160?text=Nature+valley' },
      { name: 'Kasauni inn', img: 'https://via.placeholder.com/300x160?text=Kasauni+inn' },
      { name: 'Kasauni Regency Resort', img: 'https://via.placeholder.com/300x160?text=Kasauni+Regency+Resort' },
    ],
  },
  {
    title: 'Ranikhet',
    hotels: [
      { name: 'Pool Retreat Ranikhet', img: 'https://via.placeholder.com/300x160?text=Pool+Retreat+Ranikhet' },
      { name: 'Colonels Paradise', img: 'https://via.placeholder.com/300x160?text=Colonels+Paradise' },
    ],
  },
  {
    title: 'Mussoorie',
    hotels: [
      { name: 'Wild Sping', img: 'https://via.placeholder.com/300x160?text=Wild+Sping' },
      { name: 'Shining Hills', img: 'https://via.placeholder.com/300x160?text=Shining+Hills' },
      { name: 'MV Acosta', img: 'https://via.placeholder.com/300x160?text=MV+Acosta' },
      { name: 'Solitaire Resort', img: 'https://via.placeholder.com/300x160?text=Solitaire+Resort' },
    ],
  },
];

function toLargePreview(src) {
  return src.replace('300x160', '900x480');
}

export default function HotelsResorts() {
  const [modalSrc, setModalSrc] = useState('');

  return (
    <div className="page hotels-resorts">
      <section className="simple-banner">
        <h1>Hotels & Resorts</h1>
      </section>

      <section className="hotels-section">
        <h2 className="section-title">Top Hotels by Destination</h2>
        <p className="section-subtitle">
          Choose the best stay options across Uttarakhand
        </p>

        {data.map((d) => (
          <div key={d.title} className="destination-block">
            <h3 className="destination-heading">{d.title}</h3>
            <div className="hotels-grid">
              {d.hotels.map((hotel) => (
                <article key={hotel.name} className="hotel-card">
                  <button type="button" className="hotel-image-btn" onClick={() => setModalSrc(toLargePreview(hotel.img))}>
                    <img src={hotel.img} alt={hotel.name} />
                  </button>
                  <div className="hotel-overlay">View</div>
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <p className="hotel-desc">Comfortable stay with scenic Uttarakhand surroundings.</p>
                  <div className="hotel-meta">
                    <span className="hotel-stars" aria-hidden="true">★★★★★</span>
                    <span>Uttarakhand</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        {modalSrc && (
          <div className="image-modal" onClick={() => setModalSrc('')}>
            <div
              className="image-modal-inner"
              role="dialog"
              aria-modal="true"
              aria-label="Hotel image preview"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="image-modal-close" onClick={() => setModalSrc('')} aria-label="Close image preview">
                ×
              </button>
              <img src={modalSrc} alt="Selected hotel preview" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
