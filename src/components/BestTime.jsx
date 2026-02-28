import React from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

export default function BestTime() {
  const scrollEnquiry = useSmoothScroll('#enquiry');
  return (
    <section className="best-time" id="best-time" data-reveal>
      <div className="container">
        <h1>Best Time to Visit 🌤️</h1>
        <ul className="seasons">
          <li>
            <strong>Summer (March–June):</strong> Best for sightseeing and family
            vacations.
          </li>
          <li>
            <strong>Monsoon (July–September):</strong> Lush green landscapes and
            great for nature lovers.
          </li>
          <li>
            <strong>Winter (October–February):</strong> Snowfall and honeymoon
            trips.
          </li>
        </ul>
        <div className="cta-row">
          <button className="primary-cta" type="button" onClick={scrollEnquiry}>
            Plan Your Uttarakhand Trip Today
          </button>
          <a href="#enquiry" className="secondary-link" onClick={scrollEnquiry}>
            Contact us for custom packages
          </a>
        </div>
      </div>
    </section>
  );
}
