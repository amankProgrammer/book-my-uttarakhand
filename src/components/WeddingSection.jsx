import React from 'react';

const galleryImages = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=400',
];

export default function WeddingSection({ openLightbox }) {
  return (
    <>
      <section className="dw-hero" id="wedding" data-reveal>
        <p>Save The Date</p>
        <h1>Groom & Bride</h1>
        <p>Sunday, 25 October 2026</p>
      </section>

      <section className="dw-section" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Our Story</h2>
          <div className="dw-divider" />
          <p className="dw-story">
            "Aapka swagat hai hamari zindagi ke sabse haseen safar mein."
            Hum ek naye kal ki shuruaat karne ja rahe hain aur aapke bina ye jashn adhura hai.
          </p>

          <div className="dw-couple-flex">
            <div className="dw-person-box">
              <img
                src="https://images.unsplash.com/photo-1591604466107-dd9ba4484368?q=80&w=400"
                alt="The Groom"
              />
              <h3>The Groom</h3>
              <p>Handsome & Kind</p>
            </div>

            <div className="dw-ampersand">&</div>

            <div className="dw-person-box">
              <img
                src="https://images.unsplash.com/photo-1607191196656-b0972da205b3?q=80&w=400"
                alt="The Bride"
              />
              <h3>The Bride</h3>
              <p>Beautiful & Sweet</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dw-section dw-events-section" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Wedding Events</h2>
          <div className="dw-divider" />
          <div className="dw-events-grid">
            <article className="dw-event-card">
              <h4>Engagement</h4>
              <p><strong>06:00 PM</strong></p>
              <p>The Grand Heritage, New Delhi</p>
              <p>Pyaar ki pehli rasam, dher saari khushiyan.</p>
            </article>
            <article className="dw-event-card">
              <h4>Main Ceremony</h4>
              <p><strong>07:00 PM onwards</strong></p>
              <p>Rose Garden, New Delhi</p>
              <p>Saat phere aur janmon ka sath.</p>
            </article>
            <article className="dw-event-card">
              <h4>Reception</h4>
              <p><strong>08:30 PM</strong></p>
              <p>Imperial Ballroom, New Delhi</p>
              <p>Dawat aur dher saari baatein.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="dw-section" id="wedding-gallery" data-reveal>
        <div className="container">
          <h2 className="dw-section-title">Sweet Moments</h2>
          <div className="dw-divider" />
          <div className="dw-gallery-grid">
            {galleryImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Wedding moment ${index + 1}`}
                data-full={src}
                onClick={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="dw-rsvp" data-reveal>
        <h2>Celebrate With Us</h2>
        <p>Aapki maujoodgi hamare liye ashirwad hogi.</p>
        <a
          href="https://wa.me/919876543210?text=Hello%20TravelWorld%21%20I%20confirm%20my%20attendance%20for%20the%20wedding%20celebration."
          className="dw-rsvp-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Confirm Your Attendance
        </a>
      </section>
    </>
  );
}
