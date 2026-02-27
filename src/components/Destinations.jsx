import React, { useRef } from 'react';
import useAutoScroll from '../hooks/useAutoScroll';
import nainital from '../assets/images/nainital.svg';
import jimcorbett from '../assets/images/jimcorbett.svg';
import almora from '../assets/images/almora.svg';
import mukteshwar from '../assets/images/mukteshwar.svg';
import bhimtal from '../assets/images/bhimtal.svg';
import mountains from '../assets/images/mountains.svg';

const items = [
  {
    title: 'Nainital',
    description: 'The Lake District — boating, Mall Road, cable car rides and romantic sunsets.',
    image: nainital,
  },
  {
    title: 'Jim Corbett National Park',
    description:
      'Jeep safaris, bird watching, and rich biodiversity — perfect for wildlife lovers.',
    image: jimcorbett,
  },
  {
    title: 'Ranikhet',
    description: 'Lush green forests, serene Himalayan views and a peaceful retreat.',
    image: mountains,
  },
  {
    title: 'Almora',
    description: 'Cultural heritage, ancient temples and the vibrant Kumaoni culture.',
    image: almora,
  },
  {
    title: 'Mukteshwar',
    description: 'Trekking, rock climbing and breathtaking Himalayan panoramas.',
    image: mukteshwar,
  },
  {
    title: 'Bhimtal',
    description: 'Peaceful lake escapes with boating, island aquarium and nature walks.',
    image: bhimtal,
  },
];

export default function Destinations() {
  const rowRef = useRef(null);
  useAutoScroll(rowRef, 60);  // 60 pixels per second

  return (
    <section className="destinations" data-reveal>
      <div className="container">
        <h3>Top Tourist Destinations 🗺️</h3>
        <div
          className="dest-row"
          aria-label="Top tourist destinations"
          tabIndex="0"
          ref={rowRef}
        >
          {items.map((item, idx) => (
            <article
              className="hero-card"
              style={{ backgroundImage: `url('${item.image}')` }}
              aria-label={item.title}
              key={idx}
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
            <li>Kausani — Views of Nanda Devi & Trishul</li>
            <li>Chopta — Meadows, Tungnath & Chandrashila treks</li>
            <li>Pangot — Bird watching paradise</li>
            <li>Lansdowne — Quiet colonial hill station</li>
            <li>Mussoorie — Queen of Hills</li>
            <li>Harsil Valley — Riverside & apple orchards</li>
            <li>Rudraprayag — Sacred confluence of rivers</li>
            <li>Tungnath — Highest Shiva temple trek</li>
            <li>Rajaji National Park — Elephant & tiger safaris</li>
            <li>Naukuchiatal — Paragliding and boating</li>
            <li>Maldevta — Riverside camping near Dehradun</li>
            <li>Chaukori — Tea gardens & Himalayan viewpoints</li>
            <li>Tehri Lake — Water sports & adventure</li>
          </ul>
        </details>
      </div>
    </section>
  );
}
