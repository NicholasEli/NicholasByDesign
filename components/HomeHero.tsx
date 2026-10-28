/**
 * Fixed homepage introduction with Prismic-managed supporting copy.
 */
import React from 'react';

import type { RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';

import HeroWireframe from './HeroWireframe';

type HomeHeroProps = { description?: RichTextField | null };

/**
 * Render the homepage's greeting, contact link, and decorative wireframe artwork.
 * @param props - The optional rich text description from the Home Page document.
 * @returns The fixed homepage hero section.
 */
export default function HomeHero({ description }: HomeHeroProps) {
  const current_month = Number(
    new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      timeZone: 'America/Los_Angeles'
    }).format(new Date())
  );
  const current_quarter = Math.ceil(current_month / 3);

  return (
    <section className="section-shell home-hero" id="top" aria-labelledby="home-hero-title">
      <div className="section-shell__container home-hero__frame">
        <div>
          <span
            className="section-shell__tag home-hero__tag home-hero__tag--opening"
            aria-hidden="true"
          >
            {'<html>'}
          </span>
          <span
            className="section-shell__tag home-hero__tag home-hero__tag--opening"
            aria-hidden="true"
          >
            {'<body>'}
          </span>
        </div>

        <div className="home-hero__layout">
          <div className="home-hero__content">
            <div className="home-hero__heading-wrap">
              <h1 className="home-hero__title" id="home-hero-title">
                <span className="home-hero__line">Hi,</span>
                <span className="home-hero__line">
                  I&apos;m <span className="home-hero__name">Nicholas,</span>
                </span>
                <span className="home-hero__profession">
                  <span className="home-hero__line">forward deploy</span>
                  <span className="home-hero__line">engineer &amp; devsigner.</span>
                </span>
              </h1>
            </div>

            <p className="home-hero__roles">
              <span className="home-hero__role home-hero__role--engineering">Creative</span>
              <span className="home-hero__separator" aria-hidden="true">
                //
              </span>
              <span className="home-hero__role home-hero__role--design">Development</span>
              <span className="home-hero__separator" aria-hidden="true">
                //
              </span>
              <span className="home-hero__role home-hero__role--systems">Process Improvement</span>
            </p>

            <div className="home-hero__description">
              <PrismicRichText
                field={description}
                fallback={
                  <p>
                    Bridging the chasm between spatial interfaces, robust full-stack engineering,
                    and autonomous intelligence to deploy rapid solutions at scale.
                  </p>
                }
              />
            </div>

            <div className="home-hero__action">
              <a className="home-hero__contact" href="#contact">
                INTEGRATE ME
              </a>
            </div>

            <p className="home-hero__availability">
              <span className="home-hero__status-dot" aria-hidden="true" />
              <span>Ready for Q{current_quarter} Direct Engagements</span>
            </p>
          </div>

          <div className="home-hero__art" aria-hidden="true">
            <HeroWireframe />
          </div>
        </div>
      </div>
    </section>
  );
}
