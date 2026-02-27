import React from 'react';
import aboutIllustration from '../assets/images/about-illustration.svg';

export default function About() {
  return (
    <section className="about-section" data-reveal>
      <div className="container about-grid">
        <div className="about-text">
          <h3>🏔 About Us</h3>
          <p>
            We are a Uttarakhand-based travel and wedding management team
            dedicated to providing unforgettable experiences for travelers and
            couples. Our goal is to make your journey and celebrations in the
            beautiful hills of Uttarakhand smooth, memorable, and stress-free.
          </p>
          <p>
            With strong local knowledge and professional planning, we offer
            safe, affordable, and luxury travel as well as destination wedding
            services tailored to your needs.
          </p>
          <ul className="about-priorities">
            <li><strong>Trusted Service</strong></li>
            <li><strong>Transparent Pricing</strong></li>
            <li><strong>Authentic Local Experience</strong></li>
            <li><strong>Hassle-Free Planning</strong></li>
          </ul>
          <div className="about-cta">
            <button className="primary-cta">Meet Our Team</button>
            <a href="#enquiryModal" className="secondary-link">Request a Callback</a>
          </div>
        </div>
        <div className="about-visual" aria-hidden="true">
          <img src={aboutIllustration} alt="Illustration of Uttarakhand travel and weddings" />
        </div>
      </div>
    </section>
  );
}
