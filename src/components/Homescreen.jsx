import React, { useEffect, useState } from 'react';
import Destinations from './Destinations';
import Intro from './Intro';
import Packages from './Packages';
import WhyChoose from './WhyChoose';
import About from './About';
import WeddingSection from './WeddingSection';
import BestTime from './BestTime';
import EnquirySection from './EnquirySection';
import { consumePendingHomeScroll, scrollToSection } from '../hooks/useHomeSectionNavigation';

export default function Homescreen() {
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (e) => {
    const src = e.currentTarget.getAttribute('data-full') || e.currentTarget.src;
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc('');
  };

  useEffect(() => {
    const hashTarget = window.location.hash.replace('#', '');
    if (hashTarget) {
      requestAnimationFrame(() => scrollToSection(hashTarget));
    }

    consumePendingHomeScroll();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const onEscape = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [lightboxOpen]);

  return (
    <main id="home-content" className="homescreen">
      <Intro />
      <Destinations />
      <Packages />
      <WhyChoose />
      <About />
      <WeddingSection openLightbox={openLightbox} />
      <BestTime />
      <EnquirySection />

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div
          id="lightbox"
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding gallery image viewer"
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" aria-label="Close" onClick={closeLightbox}>
              ×
            </button>
            <img src={lightboxSrc} alt="Enlarged view" className="lightbox-img" />
          </div>
        </div>
      )}
    </main>
  );
}

