import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WeddingSection from '../components/WeddingSection';
import { scrollToSection } from '../hooks/useHomeSectionNavigation';

export default function DestinationWedding() {
  const location = useLocation();

  useEffect(() => {
    const hashTarget = location.hash.replace('#', '');
    if (hashTarget) {
      requestAnimationFrame(() => scrollToSection(hashTarget));
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.hash]);

  return (
    <main className="destination-wedding-page">
      <WeddingSection />
    </main>
  );
}
