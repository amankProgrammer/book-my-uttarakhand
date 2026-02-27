import React, { useState } from 'react';

const places = [
  { title: 'Dehradun', img: 'https://media.istockphoto.com/id/586054322/photo/another-day-in-paradise.jpg?s=612x612&w=0&k=20&c=IR5ZcDTPEQ1b7bwaYLtOL2mqmdZUDOikFnORMYOlV3g=' , note: 'Capital City • Gateway to Hills'},
  { title: 'Nainital', img: 'https://media.gettyimages.com/id/2167947723/photo/naini-lake-is-in-nainital-uttarakhand-india-on-april-21-2024.jpg?s=612x612&w=0&k=20&c=I57VTdgQFgJweBtNvZ4TV9Ti9mlOkO7CjIMZzebvrqo=', note: 'Lake District • Boating'},
  { title: 'Mussoorie', img: 'https://media.istockphoto.com/id/1063050920/photo/sunrise-in-himalayas-uttrakashi-uttrakhand-india.jpg?s=612x612&w=0&k=20&c=aqiIZT3ksan6OkqSgQTcxdFcPK7U-_vd01Wj6MiZ1bs=', note: 'Queen of Hills'},
  { title: 'Ranikhet', img: 'https://media.istockphoto.com/id/1161434085/photo/golf-course-in-ranikhet-uttarakhand.jpg?s=612x612&w=0&k=20&c=NoIxioUxvSXrxJi9AizIdVPjTESLJDoswGCVhRhn_bE=', note: 'Serenity • Forests'},
  { title: 'Almora', img: 'https://media.istockphoto.com/id/1160153665/photo/scenic-high-altitude-mountain-road-at-munsiyari-uttarakhand-india.jpg?s=612x612&w=0&k=20&c=NC7urBvUG9XMU50JxHfmxsUDftyr9_DF-7_F13DoR4o=', note: 'Culture & Heritage'},
];

export default function UttarakhandDestination() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="destination-page">
      <style>{`
        .destination-banner{position:relative;height:360px;background-size:cover;background-position:center;margin-top:80px;color:white;display:flex;align-items:center;justify-content:center}
        .category-section{padding:40px 6%;background:white}
        .destinations-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
        .dest-card{background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)}
        .dest-card-img{width:100%;height:160px;background-size:cover;background-position:center}
        .dest-card-body{padding:12px}
      `}</style>

      <section className="destination-banner" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80')` }}>
        <div className="banner-content-wrapper">
          <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Explore Uttarakhand</h1>
          <p>Discover the Complete Guide to the Land of Gods</p>
        </div>
      </section>

      <section className="category-section">
        <div className="container">
          <h3>🏔 Major Cities & Hill Stations</h3>
          <p className="category-intro">Experience the charm of Uttarakhand's most popular hill stations and cities.</p>

          <div className="destinations-grid">
            {places.map((p, i) => (
              <article key={i} className="dest-card">
                <div className="dest-card-img" style={{ backgroundImage: `url('${p.img}')` }} />
                <div className="dest-card-body">
                  <h4>{p.title}</h4>
                  <p style={{ color: '#666' }}>{p.note}</p>
                  <div className="dest-highlight">{p.note}</div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button className="expand-btn" onClick={() => setExpanded((s) => !s)}>{expanded ? 'Show Less' : 'Explore More'}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
