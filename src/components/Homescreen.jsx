import React, { useState } from 'react';
import Destinations from './Destinations';
import Intro from './Intro';
import Packages from './Packages';
import WhyChoose from './WhyChoose';
import About from './About';
import WeddingSection from './WeddingSection';
import BestTime from './BestTime';
import EnquirySection from './EnquirySection';

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

  return (
    <main id="home" className="homescreen">
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
        <div id="lightbox" className="lightbox" onClick={closeLightbox} role="dialog" aria-label="Image viewer">
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

