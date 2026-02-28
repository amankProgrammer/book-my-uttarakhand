import React, { useState, useEffect } from 'react';
import sunsetbanner from '../assets/videos/sunsetbanner.mp4';
import banner3 from '../assets/videos/banner3.mp4';
import tiger2 from '../assets/videos/tiger2.mp4';
import banner4 from '../assets/videos/banner4.mp4';
import mountains from '../assets/images/mountains.svg';
import useSmoothScroll from '../hooks/useSmoothScroll';

const slides = [sunsetbanner, banner3, tiger2, banner4];

const contentData = [
  { title: 'Explore Mountains', desc: 'Experience breathtaking travel destinations' },
  { title: 'Luxury Honeymoon', desc: 'Make your wedding journey unforgettable' },
  { title: 'Beach Destinations', desc: "Relax at the world's best beaches" },
  { title: 'Adventure Tours', desc: 'Thrilling trekking and adventure packages' },
];

function VideoBanner() {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const scrollEnquiry = useSmoothScroll('#enquiry');

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const updateMode = () => {
      setShowVideo(!(motionQuery.matches || mobileQuery.matches));
    };

    updateMode();
    motionQuery.addEventListener('change', updateMode);
    mobileQuery.addEventListener('change', updateMode);

    return () => {
      motionQuery.removeEventListener('change', updateMode);
      mobileQuery.removeEventListener('change', updateMode);
    };
  }, []);

  return (
    <section className="video-banner" id="home">
      <div className="video-container">
        {showVideo ? (
          <video
            key={slides[current]}
            className="video-slide active"
            src={slides[current]}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster={mountains}
          />
        ) : (
          <img
            className="banner-fallback active"
            src={mountains}
            alt="Scenic Uttarakhand mountains"
          />
        )}
      </div>
      <div className="overlay" />

      <div className="banner-content">
        <h1 className="title">{contentData[current].title}</h1>
        <p className="desc">{contentData[current].desc}</p>
        <button className="main-btn" type="button" onClick={scrollEnquiry}>
          Plan Your Uttarakhand Trip
        </button>
      </div>

      <div className="slider-controls">
        <button id="prev" type="button" onClick={prev} aria-label="Show previous hero slide">
          &#10094;
        </button>
        <button id="next" type="button" onClick={next} aria-label="Show next hero slide">
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default VideoBanner;
