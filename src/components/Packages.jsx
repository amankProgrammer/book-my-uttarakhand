import React from 'react';
import pkgFamily from '../assets/images/pkg-family.svg';
import pkgChardham from '../assets/images/pkg-chardham.svg';
import pkgWildlife from '../assets/images/pkg-wildlife.svg';
import pkgAdventure from '../assets/images/pkg-adventure.svg';
import useSmoothScroll from '../hooks/useSmoothScroll';

export default function Packages() {
  const scrollEnquiry = useSmoothScroll('#enquiry');

  return (
    <section className="packages" id="packages" data-reveal>
      <div className="container">
        <h3>Uttarakhand Tour Packages 🎒</h3>
        <div className="package-cards">
          <article className="pkg-card">
            <div
              className="pkg-img"
              style={{ backgroundImage: `url('${pkgFamily}')` }}
              aria-hidden="true"
            />
            <div className="pkg-body">
              <h4>Family Tour</h4>
              <p>Comfortable sightseeing & guided stays.</p>
              <div className="pkg-meta">
                <span className="price">From ₹12,999</span>
                <button className="small-cta" type="button" onClick={scrollEnquiry}>Book Now</button>
              </div>
            </div>
          </article>
          <article className="pkg-card">
            <div
              className="pkg-img"
              style={{
                backgroundImage: `url('${pkgChardham}')`,
              }}
              aria-hidden="true"
            />
            <div className="pkg-body">
              <h4>Char Dham</h4>
              <p>Sacred pilgrimage across the four dhams.</p>
              <div className="pkg-meta">
                <span className="price">From ₹24,999</span>
                <button className="small-cta" type="button" onClick={scrollEnquiry}>Enquire</button>
              </div>
            </div>
          </article>
          <article className="pkg-card">
            <div
              className="pkg-img"
              style={{
                backgroundImage: `url('${pkgWildlife}')`,
              }}
              aria-hidden="true"
            />
            <div className="pkg-body">
              <h4>Wildlife Tour</h4>
              <p>Jeep safaris & jungle stays.</p>
              <div className="pkg-meta">
                <span className="price">From ₹10,499</span>
                <button className="small-cta" type="button" onClick={scrollEnquiry}>Book Safari</button>
              </div>
            </div>
          </article>
          <article className="pkg-card">
            <div
              className="pkg-img"
              style={{
                backgroundImage: `url('${pkgAdventure}')`,
              }}
              aria-hidden="true"
            />
            <div className="pkg-body">
              <h4>Adventure Tour</h4>
              <p>Trekking, rafting & camping adventures.</p>
              <div className="pkg-meta">
                <span className="price">From ₹8,999</span>
                <button className="small-cta" type="button" onClick={scrollEnquiry}>Explore</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
