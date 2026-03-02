import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uttarakhandDestinations } from '../data/uttarakhandDestinations';
// icons (requires `npm install react-icons`)
import { FaMapMarkerAlt, FaCalendarAlt, FaBed, FaStar, FaArrowRight, FaCheckCircle} from 'react-icons/fa';

const INITIAL_VISIBLE_COUNT = 8;

export default function UttarakhandDestination() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const visiblePlaces = expanded
    ? uttarakhandDestinations
    : uttarakhandDestinations.slice(0, INITIAL_VISIBLE_COUNT);

  const scrollToCatalog = () => {
    const target = document.getElementById('destination-catalog');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDestinationClick = (place) => {
    navigate(`/uttarakhand-destination/${place.slug}`);
  };

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');

      if (!hash) {
        return;
      }

      const targetIndex = uttarakhandDestinations.findIndex((destination) => destination.slug === hash);

      if (targetIndex >= INITIAL_VISIBLE_COUNT && !expanded) {
        setExpanded(true);
        return;
      }

      const target = document.getElementById(hash);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [expanded]);

  return (
    <div className="destination-page">
      <section className="destination-hero-banner">
        <div className="destination-hero-floating-shapes" aria-hidden="true">
          <span className="destination-hero-shape" />
          <span className="destination-hero-shape" />
          <span className="destination-hero-shape" />
          <span className="destination-hero-shape" />
          <span className="destination-hero-shape" />
        </div>
        <div className="destination-hero-mountain" aria-hidden="true">
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
            <path d="M0,160 L0,88 L150,36 L300,66 L450,22 L600,56 L750,20 L900,42 L1050,12 L1200,62 L1200,160 Z" />
            <path d="M0,160 L0,108 L200,64 L400,94 L600,54 L800,82 L1000,44 L1200,92 L1200,160 Z" />
          </svg>
        </div>
        <div className="banner-content-wrapper destination-hero-content">
          <p className="destination-hero-kicker">Curated Mountain Experiences</p>
          <h1 className="page-title">Explore Uttarakhand</h1>
          <p className="destination-hero-subtitle">Discover the complete guide to the Land of Gods</p>
          <div className="destination-hero-chips" aria-hidden="true">
            <span className="banner-chip">Nature Escapes</span>
            <span className="banner-chip">Adventure Trails</span>
            <span className="banner-chip">Spiritual Journeys</span>
          </div>
        </div>
        <button
          type="button"
          className="destination-hero-scroll-indicator"
          onClick={scrollToCatalog}
          aria-label="Scroll to destination listings"
        >
          <span />
        </button>
      </section>

      <section className="category-section" id="destination-catalog">
        <div className="container">
          <h3>Major Cities & Hill Stations</h3>
          <p className="category-intro">
            Click any destination card to open a full guide with top activities, travel season, and must-do experiences.
          </p>

          <div className="destinations-grid">
            {visiblePlaces.map((place) => (
              <article key={place.slug} id={place.slug} className="dest-card">
                <button
                  type="button"
                  className="dest-card-trigger"
                  onClick={() => handleDestinationClick(place)}
                  aria-label={`Open details for ${place.title}`}
                >
                  <div className="dest-card-img" style={{ backgroundImage: `url('${place.img}')` }}>
                    <span className="dest-tagline">{place.tagline}</span>
                  </div>

                  <div className="dest-card-body">
                    <div className="dest-card-head">
                      <h4>{place.title}</h4>
                      <span className="dest-rating">
                        <FaStar className="rating-icon" /> {place.rating}
                      </span>
                    </div>
                    <p className="dest-note">{place.note}</p>

                    <div className="dest-quick-facts">
                      <span className="quick-fact">
                        <FaMapMarkerAlt className="quick-fact-icon" /> Altitude: {place.altitude}
                      </span>
                      <span className="quick-fact">
                        <FaCalendarAlt className="quick-fact-icon" /> {place.bestTime}
                      </span>
                      <span className="quick-fact">
                        <FaBed className="quick-fact-icon" /> {place.idealDuration}
                      </span>
                    </div>

                    <div className="dest-activity-chips">
                      {place.activities.slice(0, 3).map((activity) => (
                        <span key={activity} className="activity-chip">
                          <FaCheckCircle className="activity-icon" /> {activity}
                        </span>
                      ))}
                    </div>

                    <span className="dest-details-link">
                      View full details & activities <FaArrowRight className="link-icon" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>

          <div className="expand-action">
            <button className="expand-btn" type="button" onClick={() => setExpanded((state) => !state)}>
              {expanded ? 'Show Less' : 'Explore More Destinations'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
