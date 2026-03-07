import React, { useRef } from 'react';
import useAutoScroll from '../hooks/useAutoScroll';
import useCmsCollection from '../hooks/useCmsCollection';
import { defaultHomeDestinations } from '../cms/defaultContent';

export default function Destinations() {
  const rowRef = useRef(null);
  useAutoScroll(rowRef, 60);
  const { items: cmsItems } = useCmsCollection('homeDestinations');
  const items = cmsItems.length ? cmsItems : defaultHomeDestinations;

  return (
    <section className="destinations" id="destinations" data-reveal>
      <div className="container">
        <h3>Top Tourist Destinations</h3>
        <div className="dest-row" aria-label="Top tourist destinations" tabIndex="0" ref={rowRef}>
          {items.map((item, idx) => (
            <article
              className="hero-card"
              style={{ backgroundImage: `url('${item.imageUrl || item.image || ''}')` }}
              aria-label={item.title}
              key={item.id || item.title || idx}
            >
              <div className="card-overlay">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <details className="more-list">
          <summary>More Destinations</summary>
          <ul>
            <li>Kausani - Views of Nanda Devi and Trishul</li>
            <li>Chopta - Meadows, Tungnath and Chandrashila treks</li>
            <li>Pangot - Bird watching paradise</li>
            <li>Lansdowne - Quiet colonial hill station</li>
            <li>Mussoorie - Queen of Hills</li>
            <li>Harsil Valley - Riverside and apple orchards</li>
            <li>Rudraprayag - Sacred confluence of rivers</li>
            <li>Tungnath - Highest Shiva temple trek</li>
            <li>Rajaji National Park - Elephant and tiger safaris</li>
            <li>Naukuchiatal - Paragliding and boating</li>
            <li>Maldevta - Riverside camping near Dehradun</li>
            <li>Chaukori - Tea gardens and Himalayan viewpoints</li>
            <li>Tehri Lake - Water sports and adventure</li>
          </ul>
        </details>
      </div>
    </section>
  );
}
