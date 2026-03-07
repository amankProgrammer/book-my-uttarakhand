import React, { useEffect, useMemo, useState } from 'react';
import { galleryItems as defaultGalleryItems } from '../data/galleryItems';
import useCmsCollection from '../hooks/useCmsCollection';
import './gallery.css';

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'adventures', label: 'Adventures' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);

  const { items: cmsItems } = useCmsCollection('gallery');
  const galleryItems = cmsItems.length > 0 ? cmsItems : defaultGalleryItems;

  const visibleItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (!lightboxItem) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxItem(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxItem]);

  const scrollToFilter = () => {
    const target = document.getElementById('gallery-filter');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="gallery-page">
      <section className="gallery-page-hero">
        <div className="gallery-page-floating-shapes" aria-hidden="true">
          <span className="gallery-page-shape" />
          <span className="gallery-page-shape" />
          <span className="gallery-page-shape" />
          <span className="gallery-page-shape" />
          <span className="gallery-page-shape" />
          <span className="gallery-page-shape" />
        </div>
        <div className="gallery-page-mountain" aria-hidden="true">
          <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
            <path d="M0,160 L0,88 L150,36 L300,66 L450,22 L600,56 L750,20 L900,42 L1050,12 L1200,62 L1200,160 Z" />
            <path d="M0,160 L0,108 L200,64 L400,94 L600,54 L800,82 L1000,44 L1200,92 L1200,160 Z" />
          </svg>
        </div>

        <div className="gallery-page-hero-content">
          <h1>Our Gallery</h1>
          <p>
            Discover Uttarakhand through curated moments, from majestic landscapes and luxury stays to wedding and
            adventure memories.
          </p>
        </div>

        <button type="button" className="gallery-page-scroll-indicator" onClick={scrollToFilter} aria-label="Scroll to gallery filters">
          <span />
        </button>
      </section>

      <section id="gallery-filter" className="gallery-page-filter">
        <div className="gallery-page-filter-buttons">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={activeFilter === option.id ? 'gallery-page-filter-btn active' : 'gallery-page-filter-btn'}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-page-grid-section">
        <div className="gallery-page-dots gallery-page-dots-left" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="gallery-page-dots gallery-page-dots-right" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="gallery-page-container">
          <header className="gallery-page-header">
            <h2>Explore Our Moments</h2>
            <div className="gallery-page-header-line" />
            <p>A visual journey through memorable experiences across Uttarakhand.</p>
          </header>

          <div className="gallery-page-grid">
            {visibleItems.map((item, index) => (
              <article
                key={`${item.title}-${item.category}`}
                className={`gallery-page-item ${item.size ? `gallery-page-item-${item.size}` : ''}`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                onClick={() => setLightboxItem(item)}
              >
                <span className="gallery-page-category-badge">{item.category}</span>
                <img src={item.image} alt={item.title} />
                <div className="gallery-page-icon">+</div>
                <div className="gallery-page-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {lightboxItem && (
        <div className="gallery-page-lightbox" onClick={() => setLightboxItem(null)} role="dialog" aria-modal="true" aria-label="Gallery lightbox">
          <div className="gallery-page-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-page-lightbox-close" onClick={() => setLightboxItem(null)} aria-label="Close lightbox">
              x
            </button>
            <img className="gallery-page-lightbox-img" src={lightboxItem.image} alt={lightboxItem.title} />
            <p className="gallery-page-lightbox-caption">{lightboxItem.title}</p>
          </div>
        </div>
      )}
    </main>
  );
}
