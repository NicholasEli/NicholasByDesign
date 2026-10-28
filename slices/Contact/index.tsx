/**
 * Presentational contact slice with editable introductory copy and native draft controls.
 */
import React, { useId } from 'react';

import type { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { SliceComponentProps } from '@prismicio/react';

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Render the contact layout without submitting, storing, or transmitting entered data.
 * @param props - The generated contact slice and its position among the page's slices.
 * @returns The editable introduction, fixed contact details, and unconnected dispatch panel.
 */
export default function Contact({ slice, index, slices }: ContactProps) {
  const control_id = useId();
  const heading_id = `${control_id}-heading`;
  const terminal_id = `${control_id}-terminal`;
  const first_contact_index = slices.findIndex(
    /** Find the first contact instance so the hero anchor has one unique target. */
    function find_contact(current_slice) {
      return current_slice.slice_type === 'contact';
    }
  );

  return (
    <section
      className="section-shell contact-section"
      id={index === first_contact_index ? 'contact' : `contact-${control_id}`}
      aria-labelledby={heading_id}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="section-shell__container">
        <span className="section-shell__tag contact-section__tag" aria-hidden="true">
          {'<section id="contact">'}
        </span>

        <div className="contact-section__layout">
          <div className="contact-section__introduction">
            <p className="section-shell__eyebrow">DIRECT TRANSMISSION</p>
            <div className="section-shell__heading" id={heading_id}>
              <PrismicRichText
                field={slice.primary.heading}
                fallback={<h2>Let&apos;s Integrate.</h2>}
              />
            </div>
            <div className="section-shell__description contact-section__description">
              <PrismicRichText
                field={slice.primary.description}
                fallback={
                  <p>
                    Whether deploying zero-to-one architecture, engineering complex WebGL frontends,
                    or launching agentic AI pipelines in prod, reach out directly.
                  </p>
                }
              />
            </div>

            <dl className="contact-section__details">
              <div className="contact-section__detail">
                <dt>Direct Comms:</dt>
                <dd className="contact-section__value contact-section__value--email">
                  nicholas@bydesign.engineering
                </dd>
              </div>
              <div className="contact-section__detail">
                <dt>PGP Fingerprint:</dt>
                <dd className="contact-section__value">9E4F 821A 77CD 0B52</dd>
              </div>
              <div className="contact-section__detail">
                <dt>Location / Time:</dt>
                <dd className="contact-section__value contact-section__value--location">
                  UTC-5 (EST) / Global Remote
                </dd>
              </div>
            </dl>

            <div className="contact-section__advisory">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M2 4h20v16H2zM6 9l3 3-3 3M12 16h5" />
              </svg>
              <p>
                Direct advisory engagements, architecture audits &amp; hands-on lead sprints
                accepted.
              </p>
            </div>
          </div>

          <div
            className="section-shell__panel contact-section__panel"
            role="group"
            aria-labelledby={terminal_id}
          >
            <div className="contact-section__panel-header">
              <h3 className="contact-section__terminal-title" id={terminal_id}>
                TERMINAL DISPATCH
              </h3>
              <p className="contact-section__encryption">ENC: TLS 1.3 // 256-BIT</p>
            </div>

            <div className="contact-section__fields">
              <div className="contact-section__identity">
                <div className="contact-section__field">
                  <label className="contact-section__label" htmlFor={`${control_id}-name`}>
                    YOUR NAME / ORG
                  </label>
                  <input
                    className="contact-section__input"
                    id={`${control_id}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Rivera, VP Eng"
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
                  />
                </div>
              </div>

              <div className="contact-section__field">
                <label className="contact-section__label" htmlFor={`${control_id}-scope`}>
                  ARCHITECTURE SCOPE
                </label>
                <div className="contact-section__select-wrap">
                  <select
                    className="contact-section__input contact-section__input--select"
                    id={`${control_id}-scope`}
                    name="scope"
                    defaultValue="frontend"
                  >
                    <option value="frontend">Frontend &amp; Spatial Systems Architecture</option>
                    <option value="fullstack">Full-Stack Systems Architecture</option>
                    <option value="ai">Agentic AI Pipelines</option>
                    <option value="advisory">Architecture Audits &amp; Advisory</option>
                  </select>
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
                    <path d="m5 7 5 5 5-5" />
                  </svg>
                </div>
              </div>

              <div className="contact-section__field">
                <label className="contact-section__label" htmlFor={`${control_id}-details`}>
                  TRANSMISSION DETAILS
                </label>
                <textarea
                  className="contact-section__input contact-section__input--textarea"
                  id={`${control_id}-details`}
                  name="details"
                  rows={5}
                  placeholder="Briefly describe your systems, timeline, or engineering objectives..."
                />
              </div>
            </div>

            <div className="contact-section__actions">
              <label className="contact-section__nda" htmlFor={`${control_id}-nda`}>
                <input id={`${control_id}-nda`} type="checkbox" name="nda" defaultChecked />
                <span>Standard mutual NDA requested</span>
              </label>
              <button
                className="contact-section__send"
                type="button"
                disabled
                title="Transmission sending is not connected yet"
              >
                SEND TRANSMISSION
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
