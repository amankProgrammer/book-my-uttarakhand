import React, { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function validateForm(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!/^\+?\d[\d\s-]{8,14}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (values.message.trim() && values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }

  return errors;
}

export default function EnquirySection() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setFeedback('Please correct the highlighted fields.');
      return;
    }

    if (!endpoint) {
      setStatus('error');
      setFeedback('Enquiry endpoint is not configured.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'bookouruttarakhand-enquiry',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Enquiry request failed');
      }

      setStatus('success');
      setFeedback('Thank you! We will get back to you shortly.');
      setFormData(initialForm);
      setErrors({});
    } catch {
      setStatus('error');
      setFeedback('Could not submit your enquiry right now. Please try again soon.');
    }
  };

  return (
    <section className="enquiry-section" id="enquiry" data-reveal>
      <div className="container">
        <h3>Send Us an Enquiry 💌</h3>
        <p>Have questions or need a custom package? Fill out the form below and we’ll respond promptly.</p>
        <form id="generalEnquiryForm" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
            />
            {errors.name && <span id="enquiry-name-error" className="field-error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
            />
            {errors.email && <span id="enquiry-email-error" className="field-error">{errors.email}</span>}
          </label>
          <label>
            Phone
            <input
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
            />
            {errors.phone && <span id="enquiry-phone-error" className="field-error">{errors.phone}</span>}
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
            />
            {errors.message && <span id="enquiry-message-error" className="field-error">{errors.message}</span>}
          </label>
          <div className="form-actions">
            <button type="submit" className="primary-cta" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
            </button>
          </div>
        </form>
        {feedback && (
          <p
            className={status === 'success' ? 'form-feedback success' : 'form-feedback error'}
            role={status === 'success' ? 'status' : 'alert'}
            aria-live="polite"
          >
            {feedback}
          </p>
        )}
      </div>
    </section>
  );
}
