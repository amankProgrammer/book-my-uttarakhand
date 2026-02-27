import React from 'react';

export default function DestinationsList({ items, rowRef }) {
  return (
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
  );
}
