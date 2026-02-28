import React from 'react';
import { Link } from 'react-router-dom';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';

const weddingHighlights = [
  'Destination and venue curation by budget and guest size',
  'Theme decor concepts for all wedding functions',
  'Guest hospitality, transport, and rooming coordination',
  'Photography and entertainment planning support',
];

export default function HomeWeddingShowcase() {
  const goToHomeSection = useHomeSectionNavigation();

  return (
    <section className="home-wedding-showcase" data-reveal>
      <div className="container home-wedding-grid">
        <div className="home-wedding-copy">
          <p className="home-wedding-kicker">Destination Wedding</p>
          <h3>Say Your Vows in the Himalayas</h3>
          <p>
            Plan elegant mountain celebrations in Uttarakhand with end-to-end wedding execution, curated venues, and
            premium guest hospitality support.
          </p>
          <ul className="home-wedding-list">
            {weddingHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="home-wedding-actions">
            <Link to="/destination-wedding" className="home-wedding-btn home-wedding-btn-primary">
              Explore Wedding Page
            </Link>
            <button type="button" className="home-wedding-btn home-wedding-btn-secondary" onClick={() => goToHomeSection('enquiry')}>
              Book Wedding Consultation
            </button>
          </div>
        </div>
        <div className="home-wedding-visual" aria-hidden="true">
          <div className="home-wedding-card">
            <h4>Most Loved Wedding Destinations</h4>
            <p>Jim Corbett</p>
            <p>Nainital</p>
            <p>Mussoorie</p>
            <p>Rishikesh</p>
          </div>
          <div className="home-wedding-card home-wedding-card-accent">
            <h4>Planning Support</h4>
            <p>Venue booking</p>
            <p>Decor and hospitality</p>
            <p>Guest management</p>
            <p>Function timeline</p>
          </div>
        </div>
      </div>
    </section>
  );
}
