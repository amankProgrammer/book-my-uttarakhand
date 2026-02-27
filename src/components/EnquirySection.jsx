import React, { useState } from 'react';

export default function EnquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="enquiry-section" id="enquiry" data-reveal>
      <div className="container">
        <h3>Send Us an Enquiry 💌</h3>
        <p>Have questions or need a custom package? Fill out the form below and we’ll respond promptly.</p>
        {submitted ? (
          <div style={{ padding: '12px', color: '#fff', fontWeight: 700 }}>
            Thank you! We will get back to you shortly.
          </div>
        ) : (
          <form id="generalEnquiryForm" onSubmit={handleSubmit}>
            <label>
              Name<input name="name" required />
            </label>
            <label>
              Email<input type="email" name="email" required />
            </label>
            <label>
              Phone<input name="phone" required />
            </label>
            <label>
              Message<textarea name="message" rows="4" />
            </label>
            <div className="form-actions">
              <button type="submit" className="primary-cta">
                Send Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
