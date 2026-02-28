import React, { useEffect } from 'react';
import Destinations from './Destinations';
import Intro from './Intro';
import HomeGallery from './HomeGallery';
import HomeWeddingShowcase from './HomeWeddingShowcase';
import Packages from './Packages';
import WhyChoose from './WhyChoose';
import About from './About';
import BestTime from './BestTime';
import EnquirySection from './EnquirySection';
import { consumePendingHomeScroll, scrollToSection } from '../hooks/useHomeSectionNavigation';

export default function Homescreen() {
  useEffect(() => {
    const hashTarget = window.location.hash.replace('#', '');
    if (hashTarget) {
      requestAnimationFrame(() => scrollToSection(hashTarget));
    }

    consumePendingHomeScroll();
  }, []);

  return (
    <main id="home-content" className="homescreen">
      <Intro />
      <HomeGallery />
      <HomeWeddingShowcase />
      <Destinations />
      <Packages />
      <WhyChoose />
      <About />
      <BestTime />
      <EnquirySection />
    </main>
  );
}

