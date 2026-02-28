import React from 'react';
import useHomeSectionNavigation from '../hooks/useHomeSectionNavigation';

const planningPoints = [
  'End-to-end itinerary planning for every budget',
  'Hotel, transport, and activity guidance in one place',
  'Flexible travel plans for weekend and long trips',
  'Local destination knowledge for better route choices',
];

const travelGoals = [
  {
    title: 'Family Vacation',
    detail: 'Comfort-focused stays, easy sightseeing, and child-friendly activities.',
  },
  {
    title: 'Honeymoon Escape',
    detail: 'Scenic stays, privacy, and romantic experiences across hill stations.',
  },
  {
    title: 'Adventure Break',
    detail: 'Trekking, rafting, camping, and nature trails based on your comfort level.',
  },
  {
    title: 'Spiritual Journey',
    detail: 'Temple circuits and pilgrimage routes with practical travel coordination.',
  },
];

export default function Intro() {
  const goToHomeSection = useHomeSectionNavigation();

  return (
    <section className="intro" id="intro" data-reveal>
      <div className="container intro-text-only">
        <p className="intro-kicker">Your Uttarakhand Travel Partner</p>
        <h2>Plan Better Trips With Complete Local Guidance</h2>

        <p>
          Uttarakhand offers everything in one destination: peaceful hill stations, sacred temples, wildlife reserves,
          adventure routes, and scenic weekend escapes. To make the most of it, you need the right destination mix,
          ideal season, and a practical day-by-day plan.
        </p>
        <p>
          We help travelers build personalized plans instead of generic packages. Whether you want a short 2-3 day
          break or a detailed multi-city trip, our team helps you choose where to go, where to stay, and what to do.
        </p>

        <div className="intro-layout-grid">
          <article className="intro-panel">
            <h3>What You Get</h3>
            <ul className="intro-highlights">
              {planningPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="intro-panel">
            <h3>Popular Travel Goals</h3>
            <div className="intro-goals">
              {travelGoals.map((goal) => (
                <div key={goal.title} className="intro-goal-card">
                  <h4>{goal.title}</h4>
                  <p>{goal.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="intro-stats">
          <article className="intro-stat-card">
            <h4>2500+</h4>
            <p>travelers served</p>
          </article>
          <article className="intro-stat-card">
            <h4>17+</h4>
            <p>major destinations covered</p>
          </article>
          <article className="intro-stat-card">
            <h4>24x7</h4>
            <p>planning support availability</p>
          </article>
        </div>

        <div className="intro-actions">
          <button type="button" className="primary-cta" onClick={() => goToHomeSection('destinations')}>
            Explore Destinations
          </button>
          <button type="button" className="secondary-link" onClick={() => goToHomeSection('enquiry')}>
            Request Custom Plan
          </button>
        </div>
      </div>
    </section>
  );
}
