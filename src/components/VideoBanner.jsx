import React, { useEffect, useState } from 'react';
import sunsetbanner from '../assets/videos/sunsetbanner.mp4';
import banner3 from '../assets/videos/banner3.mp4';
import tiger2 from '../assets/videos/tiger2.mp4';
import banner4 from '../assets/videos/banner4.mp4';
import useSmoothScroll from '../hooks/useSmoothScroll';

const slides = [sunsetbanner, banner3, tiger2, banner4];
const fallbackSlides = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1920&auto=format&fit=crop',
];

const contentData = [
  { title: 'Explore Mountains', desc: 'Experience breathtaking travel destinations' },
  { title: 'Luxury Honeymoon', desc: 'Make your wedding journey unforgettable' },
  { title: 'Beach Destinations', desc: "Relax at the world's best beaches" },
  { title: 'Adventure Tours', desc: 'Thrilling trekking and adventure packages' },
];

function VideoBanner() {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const scrollEnquiry = useSmoothScroll('#enquiry');
  const activeFallback = fallbackSlides[current % fallbackSlides.length];

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = setInterval(() => {
      setVideoReady(false);
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setVideoReady(false);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setVideoReady(false);
    setCurrent((c) => (c + 1) % slides.length);
  };

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMode = () => {
      const shouldShowVideo = !(motionQuery.matches || videoFailed);
      if (shouldShowVideo) {
        setVideoReady(false);
      }
      setShowVideo(shouldShowVideo);
    };

    updateMode();
    motionQuery.addEventListener('change', updateMode);

    return () => {
      motionQuery.removeEventListener('change', updateMode);
    };
  }, [videoFailed]);

  return (
    <section className="video-banner" id="home">
      <div className="video-container">
        <img
          className="video-backdrop"
          src={activeFallback}
          alt=""
          aria-hidden="true"
        />
        {showVideo ? (
          <video
            key={slides[current]}
            className={videoReady ? 'video-slide active video-ready' : 'video-slide active'}
            src={slides[current]}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            poster={activeFallback}
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onError={() => {
              setVideoFailed(true);
              setShowVideo(false);
            }}
          />
        ) : (
          <img
            className="banner-fallback active"
            src={activeFallback}
            alt="Scenic Uttarakhand mountains"
          />
        )}
      </div>
      <div className="overlay" />

      <div className="banner-content">
        <h1 key={`title-${current}`} className="title banner-title">{contentData[current].title}</h1>
        <p key={`desc-${current}`} className="desc banner-desc">{contentData[current].desc}</p>
        <button key={`cta-${current}`} className="main-btn banner-cta" type="button" onClick={scrollEnquiry}>
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
