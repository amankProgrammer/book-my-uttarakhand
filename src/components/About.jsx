import React from 'react';
import aboutIllustration from '../assets/images/AboutUs.png';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';
import useCmsCollection from '../hooks/useCmsCollection';

export default function About() {
  const goToHomeSection = useHomeSectionNavigation();
  const { items: cmsItems } = useCmsCollection('about');

  const defaultContent = [
    {
      sectionTitle: '🏔 About Us',
      content: 'We are a Uttarakhand-based travel and wedding management team dedicated to providing unforgettable experiences for travelers and couples. Our goal is to make your journey and celebrations in the beautiful hills of Uttarakhand smooth, memorable, and stress-free.\n\nWith strong local knowledge and professional planning, we offer safe, affordable, and luxury travel as well as destination wedding services tailored to your needs.',
    }
  ];

  const contentItems = cmsItems.length > 0 ? cmsItems : defaultContent;
  const mainImage = contentItems[0]?.imageUrl || contentItems[0]?.image || aboutIllustration;

  return (
    <section className="about-section" id="about" data-reveal>
      <div className="container about-grid">
        <div className="about-text">
          {contentItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <h3>{item.sectionTitle}</h3>
              {(item.content || '').split('\n').filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </React.Fragment>
          ))}
          <ul className="about-priorities">
            <li><strong>Trusted Service</strong></li>
            <li><strong>Transparent Pricing</strong></li>
            <li><strong>Authentic Local Experience</strong></li>
            <li><strong>Hassle-Free Planning</strong></li>
          </ul>
          <div className="about-cta">
            <button className="primary-cta" type="button" onClick={() => goToHomeSection('enquiry')}>
              Meet Our Team
            </button>
            <button className="secondary-link" type="button" onClick={() => goToHomeSection('enquiry')}>
              Request a Callback
            </button>
          </div>
        </div>
        <div className="about-visual" aria-hidden="true">
          <img src={mainImage} alt="Illustration of Uttarakhand travel and weddings" />
        </div>
      </div>
    </section>
  );
}
