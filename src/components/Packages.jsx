import React from 'react';
import { Link } from 'react-router-dom';
import useSmoothScroll from '../hooks/useSmoothScroll';

const travelStyles = [
  {
    title: 'Family Comfort Trips',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80',
    summary: 'Balanced sightseeing, comfortable hotels, and smooth transfers for all age groups.',
    points: ['2N to 5N plans', 'Cab + stay support', 'Kid-friendly pacing'],
    budget: 'From INR 12,999',
  },
  {
    title: 'Spiritual Route Plans',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80',
    summary: 'Carefully sequenced temple journeys with route planning and practical halt recommendations.',
    points: ['Char Dham options', 'Senior-friendly planning', 'Guided stopovers'],
    budget: 'From INR 24,999',
  },
  {
    title: 'Wildlife and Forest Stays',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&auto=format&fit=crop&q=80',
    summary: 'Safari-focused getaways around Corbett and Rajaji with nature-rich accommodation options.',
    points: ['Safari scheduling help', 'Resort options by zone', 'Birding add-ons'],
    budget: 'From INR 10,499',
  },
  {
    title: 'Adventure and Camping',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
    summary: 'Itineraries built around trekking, rafting, camping, and activity-based mountain holidays.',
    points: ['Beginner to advanced', 'Safety-first planning', 'Custom difficulty level'],
    budget: 'From INR 8,999',
  },
];

export default function Packages() {
  const scrollEnquiry = useSmoothScroll('#enquiry');

  return (
    <section className="packages" id="packages" data-reveal>
      <div className="container">
        <div className="packages-head">
          <h3>Travel Styles We Curate</h3>
          <p>
            This is a quick preview. For full day-wise details, inclusions, and custom combinations, open the complete
            packages page.
          </p>
          <Link className="pkg-page-link" to="/tour-packages">
            Open Full Tour Packages
          </Link>
        </div>

        <div className="package-cards">
          {travelStyles.map((style) => (
            <article className="pkg-card" key={style.title}>
              <div className="pkg-img" style={{ backgroundImage: `url('${style.image}')` }} aria-hidden="true" />
              <div className="pkg-body">
                <h4>{style.title}</h4>
                <p>{style.summary}</p>
                <ul className="pkg-points">
                  {style.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="pkg-meta">
                  <span className="price">{style.budget}</span>
                  <button className="small-cta" type="button" onClick={scrollEnquiry}>
                    Customize This Plan
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
