import React from 'react';
import { Link } from 'react-router-dom';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';
import { homeGalleryHighlights as defaultHomeGalleryHighlights } from '../data/galleryItems';
import useCmsCollection from '../hooks/useCmsCollection';

export default function HomeGallery() {
  const goToHomeSection = useHomeSectionNavigation();

  const { items: cmsItems } = useCmsCollection('gallery');
  const homeGalleryHighlights = cmsItems.length > 0 ? cmsItems.slice(0, 6) : defaultHomeGalleryHighlights;

  return (
    <section className="home-gallery" data-reveal>
      <div className="container">
        <div className="home-gallery-head">
          <p className="home-gallery-kicker">Gallery Highlights</p>
          <h3>A Quick Look at Real Uttarakhand Moments</h3>
          <p>
            Explore a curated preview from destinations, stays, weddings, and adventures. Open the full gallery for
            more inspiration.
          </p>
        </div>

        <div className="home-gallery-grid">
          {homeGalleryHighlights.map((item) => (
            <article key={item.title} className="home-gallery-card" style={{ backgroundImage: `url('${item.image}')` }}>
              <div className="home-gallery-overlay">
                <span className="home-gallery-badge">{item.category}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="home-gallery-actions">
          <Link to="/gallery" className="primary-cta">
            Open Full Gallery
          </Link>
          <button type="button" className="secondary-link" onClick={() => goToHomeSection('enquiry')}>
            Talk to a Trip Expert
          </button>
        </div>
      </div>
    </section>
  );
}
