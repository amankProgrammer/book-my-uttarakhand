import React from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

const seasons = [
  {
    season: 'Spring and Summer',
    duration: 'March to June',
    weather: 'Pleasant days and cool evenings',
    bestFor: ['Family vacations', 'Sightseeing circuits', 'Road trips and lakes'],
  },
  {
    season: 'Monsoon Green Season',
    duration: 'July to September',
    weather: 'Lush valleys with frequent showers',
    bestFor: ['Nature lovers', 'Offbeat stays', 'Photography trips'],
  },
  {
    season: 'Autumn and Winter',
    duration: 'October to February',
    weather: 'Clear mountain views and winter chill',
    bestFor: ['Honeymoon travel', 'Snow experiences', 'Temple and spiritual tours'],
  },
];

export default function BestTime() {
  const scrollEnquiry = useSmoothScroll('#enquiry');

  return (
    <section className="best-time" id="best-time" data-reveal>
      <div className="container">
        <div className="best-time-head">
          <h2>Best Time to Visit Uttarakhand</h2>
          <p>Choose your season based on weather preference, trip goal, and activity type for the best experience.</p>
        </div>

        <div className="season-cards">
          {seasons.map((item) => (
            <article key={item.season} className="season-card">
              <div className="season-card-head">
                <h3>{item.season}</h3>
                <span>{item.duration}</span>
              </div>
              <p className="season-weather">{item.weather}</p>
              <ul className="season-list">
                {item.bestFor.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="cta-row">
          <button className="primary-cta" type="button" onClick={scrollEnquiry}>
            Plan Your Trip by Season
          </button>
          <a href="#enquiry" className="secondary-link" onClick={scrollEnquiry}>
            Get a month-wise custom itinerary
          </a>
        </div>
      </div>
    </section>
  );
}
