import React, { useEffect, useState } from 'react';
import sunsetbanner from '../assets/videos/sunsetbanner.mp4';
import nainitalview from '../assets/videos/nainital.mp4';
import kedarnath from '../assets/videos/kedarnath_view.mp4';
import tiger2 from '../assets/videos/tiger2.mp4';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useCmsCollection from '../hooks/useCmsCollection';
import { defaultHeroSlides } from '../cms/defaultContent';

const localHeroSlides = [
  {
    title: 'Explore Mountains',
    desc: 'Experience breathtaking travel destinations',
    videoSrc: sunsetbanner,
    fallbackUrl: defaultHeroSlides[0].fallbackUrl,
  },
  {
    title: 'Hill Station Retreats',
    desc: 'Relax in cool, scenic hill towns and mountain resorts',
    videoSrc: nainitalview,
    fallbackUrl: defaultHeroSlides[1].fallbackUrl,
  },
  {
    title: 'Spiritual Pilgrimages',
    desc: 'Visit sacred temples and serene ashrams across Uttarakhand',
    videoSrc: kedarnath,
    fallbackUrl: defaultHeroSlides[2].fallbackUrl,
  },
  {
    title: 'Adventure Tours',
    desc: 'Thrilling trekking and adventure packages in the Himalayas',
    videoSrc: tiger2,
    fallbackUrl: defaultHeroSlides[3].fallbackUrl,
  },
];

function VideoBanner() {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const scrollEnquiry = useSmoothScroll('#enquiry');
  const { items: cmsSlides } = useCmsCollection('heroSlides');
  const activeSlides = cmsSlides.length ? cmsSlides : localHeroSlides;
  const safeIndex = activeSlides.length ? current % activeSlides.length : 0;
  const activeSlide = activeSlides[safeIndex] || localHeroSlides[0];
  const activeFallback =
    activeSlide.fallbackUrl ||
    activeSlide.imageUrl ||
    defaultHeroSlides[safeIndex % defaultHeroSlides.length]?.fallbackUrl ||
    defaultHeroSlides[0].fallbackUrl;
  const activeVideoSrc = activeSlide.videoUrl || activeSlide.videoSrc || '';

  useEffect(() => {
    if (!activeSlides.length) return undefined;
    const timer = setInterval(() => {
      setVideoReady(false);
      setCurrent((c) => (c + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const prev = () => {
    setVideoReady(false);
    setCurrent((c) => (c - 1 + activeSlides.length) % activeSlides.length);
  };

  const next = () => {
    setVideoReady(false);
    setCurrent((c) => (c + 1) % activeSlides.length);
  };

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMode = () => {
      const shouldShowVideo = Boolean(activeVideoSrc) && !(motionQuery.matches || videoFailed);
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
  }, [activeVideoSrc, videoFailed]);

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
            key={activeVideoSrc}
            className={videoReady ? 'video-slide active video-ready' : 'video-slide active'}
            src={activeVideoSrc}
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
        <h1 key={`title-${safeIndex}`} className="title banner-title">{activeSlide.title}</h1>
        <p key={`desc-${safeIndex}`} className="desc banner-desc">{activeSlide.desc}</p>
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
