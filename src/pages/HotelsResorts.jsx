import React, { useState } from 'react';

const packageImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop',
];

const createHotel = (
  name,
  price,
  nights = 2,
  days = 3,
  imageIndex = 0,
  amenities = ['wifi', 'pool', 'spa', 'breakfast']
) => ({
  name,
  price,
  nights,
  days,
  img: packageImages[imageIndex % packageImages.length],
  amenities,
});

const data = [
  {
    title: 'Jim Corbett',
    hotels: [
      createHotel('Amrais Green', '15,000', 2, 3, 0),
      createHotel('Maulik Mansion', '16,500', 2, 3, 1, ['wifi', 'parking', 'breakfast', 'mountain-view']),
      createHotel('The Corbett Silva', '17,999', 3, 4, 2, ['wifi', 'pool', 'parking', 'bonfire']),
      createHotel('Vasavana Resort', '21,000', 2, 3, 3, ['wifi', 'spa', 'breakfast', 'dj-night']),
      createHotel('Maya the Forest Resort', '18,500', 2, 3, 4),
      createHotel('Dee Fellows', '14,500', 2, 3, 5, ['wifi', 'parking', 'spa', 'mountain-view']),
      createHotel('La Perle', '19,500', 3, 4, 6, ['wifi', 'pool', 'breakfast', 'bonfire']),
      createHotel('Banyan Retreat', '22,000', 2, 3, 7),
      createHotel('Corbett Tusker Trail', '16,999', 2, 3, 0, ['wifi', 'spa', 'parking', 'bonfire']),
      createHotel('Corbett Grace', '15,999', 2, 3, 1, ['wifi', 'pool', 'breakfast', 'dj-night']),
    ],
  },
  {
    title: 'Nainital',
    hotels: [
      createHotel('Cedar wood', '12,999', 2, 3, 2, ['wifi', 'parking', 'breakfast', 'mountain-view']),
      createHotel('Aroma', '13,500', 2, 3, 3),
      createHotel('Manu Maharani Regency', '20,000', 3, 4, 4),
      createHotel('Royal heritage resort', '17,500', 2, 3, 5, ['wifi', 'pool', 'breakfast', 'dj-night']),
      createHotel('The Palace Belvedere', '23,500', 3, 4, 6, ['wifi', 'spa', 'parking', 'mountain-view']),
    ],
  },
  {
    title: 'Almora',
    hotels: [createHotel('The Mountain Paradise', '11,500', 2, 3, 7)],
  },
  {
    title: 'Kausani',
    hotels: [
      createHotel('Nature valley', '10,999', 2, 3, 0),
      createHotel('Kasauni inn', '12,499', 2, 3, 1),
      createHotel('Kasauni Regency Resort', '14,999', 2, 3, 2),
    ],
  },
  {
    title: 'Ranikhet',
    hotels: [
      createHotel('Pool Retreat Ranikhet', '13,999', 2, 3, 3),
      createHotel('Colonels Paradise', '12,999', 2, 3, 4, ['wifi', 'breakfast', 'parking', 'bonfire']),
    ],
  },
  {
    title: 'Mussoorie',
    hotels: [
      createHotel('Wild Sping', '14,500', 2, 3, 5),
      createHotel('Shining Hills', '15,500', 2, 3, 6),
      createHotel('MV Acosta', '19,000', 3, 4, 7),
      createHotel('Solitaire Resort', '21,500', 3, 4, 0, ['wifi', 'pool', 'spa', 'dj-night']),
    ],
  },
];

function toLargePreview(src) {
  return src;
}

const amenityMap = {
  wifi: { icon: '\uD83D\uDCF6', label: 'WiFi' },
  pool: { icon: '\uD83C\uDFCA', label: 'Pool' },
  spa: { icon: '\uD83E\uDDDE', label: 'Spa' },
  parking: { icon: '\uD83C\uDD7F\uFE0F', label: 'Parking' },
  breakfast: { icon: '\uD83C\uDF7D\uFE0F', label: 'Breakfast' },
  'mountain-view': { icon: '\u26F0\uFE0F', label: 'Mountain View' },
  bonfire: { icon: '\uD83D\uDD25', label: 'Bonfire' },
  'dj-night': { icon: '\uD83C\uDFB5', label: 'DJ Night' },
};

export default function HotelsResorts() {
  const [modalSrc, setModalSrc] = useState('');
  const scrollToCatalog = () => {
    const target = document.getElementById('hotels-catalog');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="page hotels-resorts">
      <section className="hotels-hero-banner">
        <div className="hotels-hero-floating-shapes" aria-hidden="true">
          <span className="hotels-hero-shape" />
          <span className="hotels-hero-shape" />
          <span className="hotels-hero-shape" />
          <span className="hotels-hero-shape" />
          <span className="hotels-hero-shape" />
        </div>
        <div className="hotels-hero-mountain" aria-hidden="true">
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
            <path d="M0,160 L0,88 L150,36 L300,66 L450,22 L600,56 L750,20 L900,42 L1050,12 L1200,62 L1200,160 Z" />
            <path d="M0,160 L0,108 L200,64 L400,94 L600,54 L800,82 L1000,44 L1200,92 L1200,160 Z" />
          </svg>
        </div>
        <div className="banner-content-wrapper hotels-hero-content">
          <p className="hotels-hero-kicker">Stay Collection</p>
          <h1 className="page-title">Hotels & Resorts in Uttarakhand</h1>
          <p className="page-subtitle hotels-hero-subtitle">
            Discover scenic mountain stays, luxury resorts, and curated wedding-friendly properties across the top
            destinations.
          </p>
        </div>
        <button type="button" className="hotels-hero-scroll-indicator" onClick={scrollToCatalog} aria-label="Scroll to hotel listings">
          <span />
        </button>
      </section>

      <section className="hotels-section" id="hotels-catalog">
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
                  <h3 className="hotel-name">{hotel.name} Wedding Package</h3>
                  <div className="hotel-amenities" aria-label="Amenities">
                    {hotel.amenities.map((amenity) => {
                      const item = amenityMap[amenity];
                      if (!item) return null;
                      return (
                        <span key={amenity} className="amenity-chip" title={item.label}>
                          <span aria-hidden="true">{item.icon}</span>
                          <span>{item.label}</span>
                        </span>
                      );
                    })}
                  </div>
                  <div className="hotel-package-footer">
                    <div className="hotel-duration">
                      <div className="hotel-duration-label">Duration</div>
                      <div className="hotel-duration-values">
                        <div className="duration-item">
                          <span className="duration-num">{hotel.nights}</span>
                          <span className="duration-unit">NIGHTS</span>
                        </div>
                        <span className="duration-sep" aria-hidden="true">&#10043;</span>
                        <div className="duration-item">
                          <span className="duration-num">{hotel.days}</span>
                          <span className="duration-unit">DAYS</span>
                        </div>
                      </div>
                    </div>
                    <div className="hotel-price-panel">
                      <span className="hotel-price-label">Starting from</span>
                      <span className="hotel-price-value">&#8377; {hotel.price}</span>
                      <span className="hotel-price-note">/PER PERSON</span>
                    </div>
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
                &times;
              </button>
              <img src={modalSrc} alt="Selected hotel preview" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
