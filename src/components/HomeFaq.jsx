import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'Can I customize a tour package?',
    a: 'Yes. Hotels, pace, transfers, and activities can be customized based on your dates, budget, and group size.',
  },
  {
    q: 'What is included in most packages?',
    a: 'Most packages include hotel stay, breakfast + dinner, transfers, and sightseeing. Exact inclusions vary by package.',
  },
  {
    q: 'Is Char Dham suitable for senior citizens?',
    a: 'Yes, with senior-friendly pacing, comfortable stays, and buffer time. Heli assistance can be planned where available.',
  },
  {
    q: 'How do I book or enquire quickly?',
    a: 'Open any package detail page and use the enquiry form, or message us directly on WhatsApp for the fastest response.',
  },
  {
    q: 'What is the best time to visit Uttarakhand?',
    a: 'Mar–Jun is great for hill stations, Sep–Nov for clear views, and Dec–Mar for snow. Seasonal trips depend on weather updates.',
  },
  {
    q: 'Do you help with pickup and transfers?',
    a: 'Yes. Pickup is usually planned from Haridwar/Dehradun/Rishikesh based on the selected package and travel route.',
  },
];

function getWhatsAppUrl({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="tours-faq" id="faqs" data-reveal>
      <div className="container">
        <h2 className="section-heading">FAQs</h2>
        <p className="page-subtitle">Quick answers to common questions before you book your Uttarakhand trip.</p>

        <div className="tours-faq-list" role="list">
          {FAQS.map((item, idx) => {
            const open = idx === openIndex;
            return (
              <div key={item.q} className="tours-faq-item" role="listitem">
                <button
                  type="button"
                  className="tours-faq-q"
                  aria-expanded={open}
                  onClick={() => setOpenIndex((v) => (v === idx ? -1 : idx))}
                >
                  {item.q}
                  <span aria-hidden="true">{open ? '-' : '+'}</span>
                </button>
                {open ? <p className="tours-faq-a">{item.a}</p> : null}
              </div>
            );
          })}
        </div>

        <div className="cta-row">
          <Link className="primary-cta" to="/tour-packages">
            Browse all packages
          </Link>
          <a
            className="secondary-link"
            href={getWhatsAppUrl({ phone: '919876543210', text: 'Hello! I want to plan an Uttarakhand tour package. Please share options.' })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
