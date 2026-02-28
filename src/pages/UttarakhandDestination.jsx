import React, { useState } from 'react';

const featuredPlaces = [
  { title: 'Dehradun', img: 'https://media.istockphoto.com/id/586054322/photo/another-day-in-paradise.jpg?s=612x612&w=0&k=20&c=IR5ZcDTPEQ1b7bwaYLtOL2mqmdZUDOikFnORMYOlV3g=' , note: 'Capital City • Gateway to Hills'},
  { title: 'Nainital', img: 'https://media.gettyimages.com/id/2167947723/photo/naini-lake-is-in-nainital-uttarakhand-india-on-april-21-2024.jpg?s=612x612&w=0&k=20&c=I57VTdgQFgJweBtNvZ4TV9Ti9mlOkO7CjIMZzebvrqo=', note: 'Lake District • Boating'},
  { title: 'Mussoorie', img: 'https://media.istockphoto.com/id/1063050920/photo/sunrise-in-himalayas-uttrakashi-uttrakhand-india.jpg?s=612x612&w=0&k=20&c=aqiIZT3ksan6OkqSgQTcxdFcPK7U-_vd01Wj6MiZ1bs=', note: 'Queen of Hills'},
  { title: 'Ranikhet', img: 'https://media.istockphoto.com/id/1161434085/photo/golf-course-in-ranikhet-uttarakhand.jpg?s=612x612&w=0&k=20&c=NoIxioUxvSXrxJi9AizIdVPjTESLJDoswGCVhRhn_bE=', note: 'Serenity • Forests'},
  { title: 'Almora', img: 'https://media.istockphoto.com/id/1160153665/photo/scenic-high-altitude-mountain-road-at-munsiyari-uttarakhand-india.jpg?s=612x612&w=0&k=20&c=NC7urBvUG9XMU50JxHfmxsUDftyr9_DF-7_F13DoR4o=', note: 'Culture & Heritage'},
];

const extraPlaces = [
  { title: 'Kausani', img: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1000&auto=format&fit=crop&q=60', note: 'Mini Switzerland of India' },
  { title: 'Chopta', img: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5c54?w=1000&auto=format&fit=crop&q=60', note: 'Gateway to Tungnath trek' },
  { title: 'Auli', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1000&auto=format&fit=crop&q=60', note: 'Ski slopes & snow views' },
];

export default function UttarakhandDestination() {
  const [expanded, setExpanded] = useState(false);
  const visiblePlaces = expanded ? [...featuredPlaces, ...extraPlaces] : featuredPlaces;

  return (
    <div className="destination-page">
      <section className="destination-banner">
        <div className="banner-content-wrapper">
          <h1 className="page-title">Explore Uttarakhand</h1>
          <p>Discover the Complete Guide to the Land of Gods</p>
        </div>
      </section>

      <section className="category-section">
        <div className="container">
          <h3>🏔 Major Cities & Hill Stations</h3>
          <p className="category-intro">Experience the charm of Uttarakhand's most popular hill stations and cities.</p>

          <div className="destinations-grid">
            {visiblePlaces.map((p, i) => (
              <article key={i} className="dest-card">
                <div className="dest-card-img" style={{ backgroundImage: `url('${p.img}')` }} />
                <div className="dest-card-body">
                  <h4>{p.title}</h4>
                  <p className="dest-note">{p.note}</p>
                  <div className="dest-highlight">{p.note}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="expand-action">
            <button className="expand-btn" type="button" onClick={() => setExpanded((s) => !s)}>
              {expanded ? 'Show Less' : 'Explore More'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
