import React, { useRef } from 'react';
import useAutoScroll from '../hooks/useAutoScroll';

const items = [
  {
    title: 'Nainital',
    description: 'The Lake District - boating, Mall Road, cable car rides and romantic sunsets.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Jim Corbett National Park',
    description: 'Jeep safaris, bird watching, and rich biodiversity - perfect for wildlife lovers.',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Ranikhet',
    description: 'Lush green forests, serene Himalayan views and a peaceful retreat.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Almora',
    description: 'Cultural heritage, ancient temples and the vibrant Kumaoni culture.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Mukteshwar',
    description: 'Trekking, rock climbing and breathtaking Himalayan panoramas.',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Bhimtal',
    description: 'Peaceful lake escapes with boating, island aquarium and nature walks.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
  },
];

export default function Destinations() {
  const rowRef = useRef(null);
  useAutoScroll(rowRef, 60);

  return (
    <section className="destinations" id="destinations" data-reveal>
      <div className="container">
        <h3>Top Tourist Destinations</h3>
        <div className="dest-row" aria-label="Top tourist destinations" tabIndex="0" ref={rowRef}>
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
