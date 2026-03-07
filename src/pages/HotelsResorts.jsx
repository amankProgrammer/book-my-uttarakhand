import React, { useState, useMemo } from 'react';
import useCmsCollection from '../hooks/useCmsCollection';

export const defaultHotelImages = [
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
  location,
  price,
  facilities = ['wifi', 'pool', 'spa', 'breakfast'],
  imageIndex = 0
) => ({
  name,
  location,
  price,
  facilities: facilities.join('\n'), // Admin schema requires text lines
  imageUrl: defaultHotelImages[imageIndex % defaultHotelImages.length],
});

export const defaultFlatHotels = [
  createHotel('Amrais Green', 'Jim Corbett', '15,000', ['wifi', 'pool', 'spa', 'breakfast'], 0),
  createHotel('Maulik Mansion', 'Jim Corbett', '16,500', ['wifi', 'parking', 'breakfast', 'mountain-view'], 1),
  createHotel('The Corbett Silva', 'Jim Corbett', '17,999', ['wifi', 'pool', 'parking', 'bonfire'], 2),
  createHotel('Vasavana Resort', 'Jim Corbett', '21,000', ['wifi', 'spa', 'breakfast', 'dj-night'], 3),
  createHotel('Maya the Forest Resort', 'Jim Corbett', '18,500', ['wifi', 'pool', 'spa', 'breakfast'], 4),
  createHotel('Dee Fellows', 'Jim Corbett', '14,500', ['wifi', 'parking', 'spa', 'mountain-view'], 5),
  createHotel('La Perle', 'Jim Corbett', '19,500', ['wifi', 'pool', 'breakfast', 'bonfire'], 6),
  createHotel('Banyan Retreat', 'Jim Corbett', '22,000', ['wifi', 'pool', 'spa', 'breakfast'], 7),
  createHotel('Corbett Tusker Trail', 'Jim Corbett', '16,999', ['wifi', 'spa', 'parking', 'bonfire'], 0),
  createHotel('Corbett Grace', 'Jim Corbett', '15,999', ['wifi', 'pool', 'breakfast', 'dj-night'], 1),

  createHotel('Cedar wood', 'Nainital', '12,999', ['wifi', 'parking', 'breakfast', 'mountain-view'], 2),
  createHotel('Aroma', 'Nainital', '13,500', ['wifi', 'pool', 'spa', 'breakfast'], 3),
  createHotel('Manu Maharani Regency', 'Nainital', '20,000', ['wifi', 'pool', 'spa', 'breakfast'], 4),
  createHotel('Royal heritage resort', 'Nainital', '17,500', ['wifi', 'pool', 'breakfast', 'dj-night'], 5),
  createHotel('The Palace Belvedere', 'Nainital', '23,500', ['wifi', 'spa', 'parking', 'mountain-view'], 6),

  createHotel('The Mountain Paradise', 'Almora', '11,500', ['wifi', 'pool', 'spa', 'breakfast'], 7),

  createHotel('Nature valley', 'Kausani', '10,999', ['wifi', 'pool', 'spa', 'breakfast'], 0),
  createHotel('Kasauni inn', 'Kausani', '12,499', ['wifi', 'pool', 'spa', 'breakfast'], 1),
  createHotel('Kasauni Regency Resort', 'Kausani', '14,999', ['wifi', 'pool', 'spa', 'breakfast'], 2),

  createHotel('Pool Retreat Ranikhet', 'Ranikhet', '13,999', ['wifi', 'pool', 'spa', 'breakfast'], 3),
  createHotel('Colonels Paradise', 'Ranikhet', '12,999', ['wifi', 'breakfast', 'parking', 'bonfire'], 4),

  createHotel('Wild Sping', 'Mussoorie', '14,500', ['wifi', 'pool', 'spa', 'breakfast'], 5),
  createHotel('Shining Hills', 'Mussoorie', '15,500', ['wifi', 'pool', 'spa', 'breakfast'], 6),
  createHotel('MV Acosta', 'Mussoorie', '19,000', ['wifi', 'pool', 'spa', 'breakfast'], 7),
  createHotel('Solitaire Resort', 'Mussoorie', '21,500', ['wifi', 'pool', 'spa', 'dj-night'], 0),
];

const data = [
  {
    title: 'Jim Corbett',
    hotels: defaultFlatHotels.filter(h => h.location === 'Jim Corbett').map(h => ({
      name: h.name, price: h.price, nights: 2, days: 3, img: h.imageUrl, amenities: h.facilities.split('\n')
    }))
  },
  {
    title: 'Nainital',
    hotels: defaultFlatHotels.filter(h => h.location === 'Nainital').map(h => ({
      name: h.name, price: h.price, nights: 2, days: 3, img: h.imageUrl, amenities: h.facilities.split('\n')
    }))
  },
  {
    title: 'Almora',
    hotels: defaultFlatHotels.filter(h => h.location === 'Almora').map(h => ({
      name: h.name, price: h.price, nights: 2, days: 3, img: h.imageUrl, amenities: h.facilities.split('\n')
    }))
  },
  {
    title: 'Kausani',
    hotels: defaultFlatHotels.filter(h => h.location === 'Kausani').map(h => ({
      name: h.name, price: h.price, nights: 2, days: 3, img: h.imageUrl, amenities: h.facilities.split('\n')
    }))
  },
  {
    title: 'Ranikhet',
    hotels: defaultFlatHotels.filter(h => h.location === 'Ranikhet').map(h => ({
      name: h.name, price: h.price, nights: 2, days: 3, img: h.imageUrl, amenities: h.facilities.split('\n')
    }))
  },
  {
    title: 'Mussoorie',
    hotels: defaultFlatHotels.filter(h => h.location === 'Mussoorie').map(h => ({
      name: h.name, price: h.price, nights: 2, days: 3, img: h.imageUrl, amenities: h.facilities.split('\n')
    }))
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
  
  const { items: cmsItems } = useCmsCollection('hotels');

  const groupedData = useMemo(() => {
    if (cmsItems.length === 0) return data; // Use static default if no data in CMS
    
    // Group CMS hotels by location
    const map = new Map();
    cmsItems.forEach((item) => {
      const loc = item.location || 'Other';
      if (!map.has(loc)) {
        map.set(loc, { title: loc, hotels: [] });
      }
      // Ensure facilities is an array regardless of how it was seeded
      let amenitiesArray = ['wifi', 'breakfast'];
      if (Array.isArray(item.facilities)) {
        amenitiesArray = item.facilities;
      } else if (typeof item.facilities === 'string') {
        amenitiesArray = item.facilities.split('\n').map(s => s.trim()).filter(Boolean);
      } else if (item.amenities) { // Fallback for old schema if any
        amenitiesArray = Array.isArray(item.amenities) ? item.amenities : [item.amenities];
      }

      map.get(loc).hotels.push({
        name: item.name,
        price: item.price,
        nights: 2, // Not currently explicitly in CMS schema, using reasonable default
        days: 3, 
        img: item.imageUrl || item.image || item.img || defaultHotelImages[0],
        amenities: amenitiesArray,
      });
    });
    return Array.from(map.values());
  }, [cmsItems]);

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

        {groupedData.map((d) => (
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
