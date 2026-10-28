/**
 * Contact slice with editable introductory copy and an email draft form.
 */
import React, { useId } from 'react';

import type { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { SliceComponentProps } from '@prismicio/react';

import ContactForm from '@/components/ContactForm';

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Render the contact introduction, fixed details, and mail application draft form.
 * @param props - The generated contact slice and its position among the page's slices.
 * @returns The editable introduction, fixed contact details, and email draft form.
 */
export default function Contact({ slice, index, slices }: ContactProps) {
  const control_id = useId();
  const heading_id = `${control_id}-heading`;
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
                    Whether deploying zero-to-one architecture, engineering complex frontends, or
                    launching agentic AI pipelines for productive solutions, reach out directly.
                  </p>
                }
              />
            </div>

            <dl className="contact-section__details">
              <div className="contact-section__detail">
                <dt>Email:</dt>
                <dd className="contact-section__value contact-section__value--email">
                  <a
                    title="Email nicholasbydesign@gmail.com"
                    href="mailto:nicholasbydesign@gmail.com"
                  >
                    nicholasbydesign@gmail.com
                  </a>
                </dd>
              </div>
              <div className="contact-section__detail">
                <dt>LinkedIn:</dt>
                <dd className="contact-section__value">
                  <a
                    title="Nicholas Eli"
                    href="https://www.linkedin.com/in/nicholasbydesign/"
                    target="_blank"
                  >
                    Nicholas Eli
                  </a>
                </dd>
              </div>
              <div className="contact-section__detail">
                <dt>Github:</dt>
                <dd className="contact-section__value">
                  <a title="Github" href="https://github.com/NicholasEli/" target="_blank">
                    Nicholas Eli
                  </a>
                </dd>
              </div>
              <div className="contact-section__detail">
                <dt>Location</dt>
                <dd className="contact-section__value contact-section__value--location">
                  Vancouver, Washington
                </dd>
              </div>
            </dl>

            <div className="contact-section__advisory">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M2 4h20v16H2zM6 9l3 3-3 3M12 16h5" />
              </svg>
              <p>
                Direct advisory engagements, architecture audits, ui/ux design &amp; e-commerce
                accepted.
              </p>
            </div>
          </div>

          <ContactForm recipient="nicholasbydesign@gmail.com" />
        </div>
      </div>
    </section>
  );
}
