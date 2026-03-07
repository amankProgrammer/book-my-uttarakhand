import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { uttarakhandDestinations as defaultDestinations } from '../data/uttarakhandDestinations';
import useCmsCollection from '../hooks/useCmsCollection';
import './destination-detail.css';
// icons for detail page (install react-icons)
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaHotel, FaUsers, FaStar, FaCheckCircle, FaSuitcaseRolling } from 'react-icons/fa';

// Sample tour packages data - in a real app, this could be more comprehensive
const getPackagesForDestination = (slug) => {
  const allPackages = {
    'jim-corbett': [
      {
        title: 'Corbett Wildlife Safari',
        desc: 'Full day jeep safari with expert naturalists and wildlife photography opportunities.',
        days: '2 Days',
        price: 'INR 8,999',
        img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1000&auto=format&fit=crop&q=60',
        inclusions: ['Jeep Safari', 'Naturalist Guide', 'Forest Stay', 'All Meals'],
      },
      {
        title: 'Corbett Family Retreat',
        desc: 'Relaxing jungle stay with nature walks and river-side activities.',
        days: '3 Days',
        price: 'INR 15,999',
        img: 'https://images.unsplash.com/photo-1564021174914-a5b4032b3c22?w=1000&auto=format&fit=crop&q=60',
        inclusions: ['River Resort', 'Boating', 'Bonfire', 'All Meals'],
      },
      {
        title: ' Corbett Adventure Tour',
        desc: 'Exciting jungle safari combined with river rafting and camping.',
        days: '3 Days',
        price: 'INR 12,999',
        img: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1000&auto=format&fit=crop&q=60',
        inclusions: ['Safari', 'River Rafting', 'Camping', 'Adventure Activities'],
      },
    ],
    'nainital': [
      {
        title: 'Nainital Lake Tour',
        desc: 'Explore the beautiful lakes of Nainital with boating and sightseeing.',
        days: '2 Days',
        price: 'INR 6,999',
        img: 'https://media.gettyimages.com/id/2167947723/photo/naini-lake-is-in-nainital-uttarakhand-india-on-april-21-2024.jpg?s=612x612&w=0&k=20&c=I57VTdgQFgJweBtNvZ4TV9Ti9mlOkO7CjIMZzebvrqo=',
        inclusions: ['Lake Boating', 'Hotel Stay', 'Sightseeing', 'Breakfast'],
      },
      {
        title: 'Nainital Hill Station Escape',
        desc: 'Complete Nainital experience with Tiffin Top, Naina Devi and Mall Road.',
        days: '3 Days',
        price: 'INR 9,999',
        img: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=1000&auto=format&fit=crop&q=60',
        inclusions: ['Hotel', 'All Transfers', 'Sightseeing', 'Meals Included'],
      },
    ],
    'mussorie': [
      {
        title: 'Mussoorie Hill Station Tour',
        desc: 'Discover the Queen of Hills with Mall Road, Gun Hill and Kempty Falls.',
        days: '2 Days',
        price: 'INR 7,999',
        img: 'https://media.istockphoto.com/id/1063050920/photo/sunrise-in-himalayas-uttrakashi-uttrakhand-india.jpg?s=612x612&w=0&k=20&c=aqiIZT3ksan6OkqSgQTcxdFcPK7U-_vd01Wj6MiZ1bs=',
        inclusions: ['Hotel Stay', 'Sightseeing', 'Cable Car', 'Breakfast'],
      },
      {
        title: 'Mussoorie & Dehradun Combo',
        desc: 'Explore Mussoorie along with nearby attractions of Dehradun.',
        days: '3 Days',
        price: 'INR 11,999',
        img: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1000&auto=format&fit=crop&q=60',
        inclusions: ['Hotels', 'All Transfers', 'Sightseeing', 'Meals'],
      },
    ],
  };

  return allPackages[slug] || [
    {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} Explorer`,
      desc: 'Discover the beauty and culture of this amazing destination.',
      days: '2 Days',
      price: 'INR 7,999',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=60',
      inclusions: ['Hotel Stay', 'Sightseeing', 'Transfers', 'Breakfast'],
    },
    {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} Adventure`,
      desc: 'An action-packed journey through mountains and valleys.',
      days: '3 Days',
      price: 'INR 12,999',
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&auto=format&fit=crop&q=60',
      inclusions: ['Premium Stay', 'Adventure Activities', 'All Meals', 'Guide'],
    },
  ];
};

// Sample gallery images
const getGalleryImages = (destination) => {
  return [
    destination.img,
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1506904702747-92e8316c3d37?w=1000&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1000&auto=format&fit=crop&q=60',
  ];
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const { items: cmsItems } = useCmsCollection('destinations');
  const uttarakhandDestinations = cmsItems.length > 0 ? cmsItems : defaultDestinations;

  // helper to scroll to the enquiry form section
  const scrollToForm = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Find destination by slug or id
    const dest = uttarakhandDestinations.find((d) => d.slug === slug || d.id === slug);
    if (dest) {
      setDestination(dest);
      setPackages(getPackagesForDestination(slug));
      setGallery(getGalleryImages(dest));
      // Reset scroll to top
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!destination) {
    return (
      <div className="destination-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading destination...</p>
      </div>
    );
  }

  return (
    <div className="destination-detail-page">
      {/* Hero Section */}
      <section className="dd-hero" style={{ backgroundImage: `url('${destination.img}')` }}>
        <div className="dd-hero-overlay"></div>
        <div className="dd-hero-content">
          <Link to="/uttarakhand-destination" className="dd-back-link">
            <FaArrowLeft /> Back to Destinations
          </Link>
          <h1 className="dd-hero-title">{destination.title}</h1>
          <p className="dd-hero-tagline">{destination.tagline}</p>
          <div className="dd-hero-rating">
            <FaStar className="dd-rating-star" />
            <span>{destination.rating}</span>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="dd-section dd-overview">
        <div className="container">
          <div className="dd-overview-grid">
            <div className="dd-quick-stats">
              <div className="dd-stat-card">
                <span className="dd-stat-icon"><FaMapMarkerAlt /></span>
                <div className="dd-stat-content">
                  <span className="dd-stat-label">Altitude</span>
                  <span className="dd-stat-value">{destination.altitude}</span>
                </div>
              </div>
              <div className="dd-stat-card">
                <span className="dd-stat-icon"><FaCalendarAlt /></span>
                <div className="dd-stat-content">
                  <span className="dd-stat-label">Best Time</span>
                  <span className="dd-stat-value">{destination.bestTime}</span>
                </div>
              </div>
              <div className="dd-stat-card">
                <span className="dd-stat-icon"><FaHotel /></span>
                <div className="dd-stat-content">
                  <span className="dd-stat-label">Ideal Stay</span>
                  <span className="dd-stat-value">{destination.idealDuration}</span>
                </div>
              </div>
              <div className="dd-stat-card">
                <span className="dd-stat-icon"><FaUsers /></span>
                <div className="dd-stat-content">
                  <span className="dd-stat-label">Ideal For</span>
                  <span className="dd-stat-value">{destination.idealFor}</span>
                </div>
              </div>
            </div>
            <div className="dd-overview-text">
              <h2>About {destination.title}</h2>
              <p className="dd-overview-description">{destination.overview}</p>
              <p className="dd-overview-note">{destination.note}</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="dd-section dd-activities">
        <div className="container">
          <h2 className="dd-section-title">Top Activities in {destination.title}</h2>
          <p className="dd-section-subtitle">Experience the best of what this destination has to offer</p>
          <div className="dd-activities-grid">
            {destination.activities.map((activity, index) => (
              <div key={index} className="dd-activity-card">
                <span className="dd-activity-number">{String(index + 1).padStart(2, '0')}</span>
                <p className="dd-activity-text">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="dd-section dd-highlights">
        <div className="container">
          <h2 className="dd-section-title">Why Travelers Love It</h2>
          <div className="dd-highlights-grid">
            {destination.highlights.map((highlight, index) => (
              <div key={index} className="dd-highlight-item">
                <span className="dd-highlight-icon"><FaCheckCircle /></span>
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="dd-section dd-packages">
        <div className="container">
          <h2 className="dd-section-title">Tour Packages for {destination.title}</h2>
          <p className="dd-section-subtitle">Choose from our curated packages for an unforgettable experience</p>
          <div className="dd-packages-grid">
            {packages.map((pkg, index) => (
              <div key={index} className="dd-package-card">
                <div className="dd-package-image" style={{ backgroundImage: `url('${pkg.img}')` }}>
                  <span className="dd-package-days">{pkg.days}</span>
                </div>
                <div className="dd-package-content">
                  <h3 className="dd-package-title">{pkg.title}</h3>
                  <p className="dd-package-desc">{pkg.desc}</p>
                  <div className="dd-package-inclusions">
                    {pkg.inclusions.map((item, i) => (
                      <span key={i} className="dd-inclusion-tag">{item}</span>
                    ))}
                  </div>
                  <div className="dd-package-footer">
                    <span className="dd-package-price">{pkg.price}</span>
                    <button 
                      className="dd-package-btn"
                      onClick={scrollToForm}
                    >
                      <FaStar className="package-btn-icon" /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="dd-section dd-gallery">
        <div className="container">
          <h2 className="dd-section-title">Photo Gallery</h2>
          <p className="dd-section-subtitle">Glimpse of beautiful {destination.title}</p>
          <div className="dd-gallery-main">
            <div 
              className="dd-gallery-main-image" 
              style={{ backgroundImage: `url('${gallery[activeGalleryIndex]}')` }}
            ></div>
          </div>
          <div className="dd-gallery-thumbnails">
            {gallery.map((img, index) => (
              <button
                key={index}
                className={`dd-gallery-thumb ${activeGalleryIndex === index ? 'active' : ''}`}
                onClick={() => setActiveGalleryIndex(index)}
                style={{ backgroundImage: `url('${img}')` }}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dd-section dd-cta">
        <div className="container">
          <div className="dd-cta-content">
            <h2>Ready to Explore {destination.title}?</h2>
            <p>Contact us for custom packages and exclusive deals</p>
            <div className="dd-cta-buttons">
              <Link to="/tour-packages" className="dd-cta-secondary">
                <FaSuitcaseRolling className="cta-icon" /> View All Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Enquiry Form */}
      <section className="dd-section dd-enquiry-section" id="enquiry-form">
        <div className="container">
          <h2 className="dd-section-title">Enquiry Form</h2>
          <form className="dd-enquiry-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for your enquiry! We will get back to you soon.');
            }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <select required>
                <option value="">Select Package</option>
                {packages.map((pkg, i) => (
                  <option key={i} value={pkg.title}>{pkg.title} - {pkg.days}</option>
                ))}
              </select>
              <textarea placeholder="Your Message" rows="4"></textarea>
              <button type="submit" className="dd-submit-btn">Submit Enquiry</button>
            </form>
        </div>
      </section>
    </div>
  );
}
