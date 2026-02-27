import React, { useState, useEffect } from 'react';
import sunsetbanner from '../assets/videos/sunsetbanner.mp4';
import banner3 from '../assets/videos/banner3.mp4';
import tiger2 from '../assets/videos/tiger2.mp4';
import banner4 from '../assets/videos/banner4.mp4';

const slides = [sunsetbanner, banner3, tiger2, banner4];

const contentData = [
  { title: 'Explore Mountains', desc: 'Experience breathtaking travel destinations' },
  { title: 'Luxury Honeymoon', desc: 'Make your wedding journey unforgettable' },
  { title: 'Beach Destinations', desc: "Relax at the world's best beaches" },
  { title: 'Adventure Tours', desc: 'Thrilling trekking and adventure packages' },
];

function VideoBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="video-banner">
      <div className="video-container">
        {slides.map((src, i) => (
          <video
            key={i}
            className={i === current ? 'video-slide active' : 'video-slide'}
            src={src}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
          />
        ))}
      </div>
      <div className="overlay" />

      <div className="banner-content">
        <h1 className="title">{contentData[current].title}</h1>
        <p className="desc">{contentData[current].desc}</p>
        <button className="main-btn" onClick={(e) => e.preventDefault()}>
          Plan Your Uttarakhand Trip
        </button>
      </div>

      <div className="slider-controls">
        <span id="prev" onClick={prev}>&#10094;</span>
        <span id="next" onClick={next}>&#10095;</span>
      </div>
    </section>
  );
}

export default VideoBanner;
