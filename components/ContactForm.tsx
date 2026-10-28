/**
 * Contact controls that open a draft in the visitor's configured email application.
 */
'use client';

import React, { useId } from 'react';
import type { SubmitEvent } from 'react';

type ContactFormProps = {
  recipient: string;
};

/**
 * Render the four contact fields and open an addressed email draft after native validation.
 * @param props - The contact email address that receives the visitor's draft.
 * @returns The accessible contact form using the shared contact panel styles.
 */
export default function ContactForm({ recipient }: ContactFormProps) {
  const control_id = useId();
  const terminal_id = `${control_id}-terminal`;

  /**
   * Encode the subject and entered contact details without submitting to the website.
   * @param event - The validated native form submission.
   * @returns No value; the visitor reviews and sends the draft in their email application.
   */
  function open_email_draft(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form_data = new FormData(event.currentTarget);
    const name = String(form_data.get('name') ?? '').trim();
    const email = String(form_data.get('email') ?? '').trim();
    const subject = String(form_data.get('subject') ?? '').trim();
    const message = String(form_data.get('message') ?? '')
      .trim()
      .replace(/\r\n?|\n/g, '\r\n');
    const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
    const mailto_url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto_url;
    return;
  }

  return (
    <form
      className="section-shell__panel contact-section__panel"
      aria-labelledby={terminal_id}
      action={`mailto:${recipient}`}
      method="post"
      encType="text/plain"
      onSubmit={open_email_draft}
    >
      <div className="contact-section__panel-header">
        <h3 className="contact-section__terminal-title" id={terminal_id}>
          TERMINAL DISPATCH
        </h3>
        <p className="contact-section__mail-hint">OPENS YOUR MAIL APP</p>
      </div>

      <div className="contact-section__fields">
        <div className="contact-section__identity">
          <div className="contact-section__field">
            <label className="contact-section__label" htmlFor={`${control_id}-name`}>
              YOUR NAME
            </label>
            <input
              className="contact-section__input"
              id={`${control_id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Alex Rivera"
              required
            />
          </div>
          <div className="contact-section__field">
            <label className="contact-section__label" htmlFor={`${control_id}-email`}>
              EMAIL ADDRESS
            </label>
            <input
              className="contact-section__input"
              id={`${control_id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@acmecorp.com"
              required
            />
          </div>
        </div>

        <div className="contact-section__field">
          <label className="contact-section__label" htmlFor={`${control_id}-subject`}>
            SUBJECT
          </label>
          <input
            className="contact-section__input"
            id={`${control_id}-subject`}
            name="subject"
            type="text"
            placeholder="Project enquiry"
            required
          />
        </div>

        <div className="contact-section__field">
          <label className="contact-section__label" htmlFor={`${control_id}-message`}>
            MESSAGE
          </label>
          <textarea
            className="contact-section__input contact-section__input--textarea"
            id={`${control_id}-message`}
            name="message"
            rows={5}
            placeholder="Briefly describe your systems, timeline, or engineering objectives..."
            required
          />
        </div>
      </div>

      <div className="contact-section__actions">
        <button className="contact-section__send" type="submit">
          BEGIN TRANSMISSION
        </button>
      </div>
    </form>
  );
}
