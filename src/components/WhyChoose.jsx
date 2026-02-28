import React from 'react';

const reasons = [
  {
    code: 'SC',
    title: 'Scenery and Climate',
    detail: 'Snow peaks, lakes, valleys, and pleasant weather make it ideal across multiple travel styles.',
  },
  {
    code: 'SP',
    title: 'Spiritual Significance',
    detail: 'From iconic temples to peaceful retreats, Uttarakhand offers deep spiritual and cultural routes.',
  },
  {
    code: 'WL',
    title: 'Wildlife and Nature',
    detail: 'National parks, forest reserves, and rich biodiversity create unforgettable nature experiences.',
  },
  {
    code: 'AD',
    title: 'Adventure Opportunities',
    detail: 'Trekking, rafting, camping, and mountain drives for both beginners and experienced travelers.',
  },
  {
    code: 'FM',
    title: 'Family Friendly Routes',
    detail: 'Easy-access destinations with flexible itineraries suitable for kids, seniors, and group travel.',
  },
  {
    code: 'VH',
    title: 'Variety in One State',
    detail: 'In a single trip, combine hill stations, temple circuits, wildlife safaris, and activity tours.',
  },
];

export default function WhyChoose() {
  return (
    <section className="why-choose" data-reveal>
      <div className="container">
        <div className="why-choose-head">
          <h3>Why Choose Uttarakhand</h3>
          <p>
            Uttarakhand gives you the rare mix of scenic holidays, spiritual routes, adventure experiences, and
            comfortable family travel in one destination map.
          </p>
        </div>

        <div className="features">
          {reasons.map((reason) => (
            <article key={reason.title} className="feature">
              <span className="feature-code">{reason.code}</span>
              <h4>{reason.title}</h4>
              <p>{reason.detail}</p>
            </article>
          ))}
        </div>

        <div className="why-choose-footer">
          <p>Perfect for weekend escapes, long vacations, honeymoons, spiritual tours, and nature-led road trips.</p>
        </div>
      </div>
    </section>
  );
}
