import React from 'react';
import weddingHero from '../assets/images/wedding-hero.svg';

export default function WeddingSection({ openLightbox }) {
  return (
    <section className="wedding-section" data-reveal>
        <div className="container wedding-grid">
        <div
          className="wedding-hero"
          style={{ backgroundImage: `url('${weddingHero}')` }}
          aria-hidden="true"
        />
        <div className="wedding-content">
          <div className="wedding-card">
            <h3>💍 Destination Wedding in Uttarakhand</h3>
            <p className="lead">
              Plan your dream wedding in the Himalayas — luxury resorts,
              riverside ceremonies, and intimate mountain venues with full
              planning and hospitality services.
            </p>
            <div className="wedding-services">
              <div className="svc">
                <strong>Venue & Planning</strong>
                <p>Selection, booking and end-to-end coordination.</p>
              </div>
              <div className="svc">
                <strong>Decoration & Catering</strong>
                <p>Floral themes, mandap design and curated menus.</p>
              </div>
              <div className="svc">
                <strong>Photography & Entertainment</strong>
                <p>Cinematic photography, DJ and live performances.</p>
              </div>
            </div>
            <div className="sample-weddings">
              {[weddingHero, weddingHero, weddingHero].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Sample wedding ${i + 1}`}
                  data-full={src}
                  className="thumb"
                  onClick={openLightbox}
                />
              ))}
            </div>
            <div className="wedding-cta">
              <a
                href="https://wa.me/919876543210?text=Hello%20TravelWorld%21%20I%20would%20like%20to%20enquire%20about%20destination%20wedding%20packages%20in%20Uttarakhand."
                target="_blank"
                className="primary-cta whatsapp-btn"
              >
                💬 Enquire on WhatsApp
              </a>
              <button className="secondary-link" id="viewSamples">
                View sample weddings
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
