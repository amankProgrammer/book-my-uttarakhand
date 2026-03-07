import React from 'react';
import { Link } from 'react-router-dom';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useCmsCollection from '../hooks/useCmsCollection';
import { defaultHomePackages } from '../cms/defaultContent';

export default function Packages() {
  const scrollEnquiry = useSmoothScroll('#enquiry');
  const { items: cmsItems } = useCmsCollection('homePackages');
  const travelStyles = cmsItems.length ? cmsItems : defaultHomePackages;

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
            <article className="pkg-card" key={style.id || style.title}>
              <div className="pkg-img" style={{ backgroundImage: style.imageUrl ? `url(${style.imageUrl})` : undefined }} aria-hidden="true" />
              <div className="pkg-body">
                <h4>{style.title}</h4>
                <p>{style.summary}</p>
                <ul className="pkg-points">
                  {(style.points || []).map((point) => (
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
