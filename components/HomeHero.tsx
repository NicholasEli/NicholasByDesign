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
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__frame">
        <span className="home-hero__tag home-hero__tag--opening" aria-hidden="true">
          {'<body>'}
        </span>

        <div className="home-hero__layout">
          <div className="home-hero__content">
            <div className="home-hero__heading-wrap">
              <span className="home-hero__tag home-hero__tag--heading" aria-hidden="true">
                {'<h1>'}
              </span>
              <h1 className="home-hero__title" id="home-hero-title">
                <span className="home-hero__line">Hi,</span>
                <span className="home-hero__line">
                  I&apos;m <span className="home-hero__name">Nicholas,</span>
                </span>
                <span className="home-hero__profession">
                  <span className="home-hero__line">forward deploy</span>
                  <span className="home-hero__line">engineer &amp;</span>
                  <span className="home-hero__line">devsigner.</span>
                </span>
              </h1>
            </div>

            <p className="home-hero__roles">
              <span className="home-hero__role home-hero__role--engineering">
                Forward Deploy Engineer
              </span>
              <span className="home-hero__separator" aria-hidden="true">
                //
              </span>
              <span className="home-hero__role home-hero__role--design">Devsigner</span>
              <span className="home-hero__separator" aria-hidden="true">
                //
              </span>
              <span className="home-hero__role home-hero__role--systems">Systems Architect</span>
            </p>

            <div className="home-hero__description">
              <PrismicRichText
                field={description}
                fallback={
                  <p>
                    Bridging the chasm between visionary spatial interfaces, robust full-stack
                    engineering, and autonomous multi-agent intelligence to deploy mission-critical
                    solutions at enterprise scale.
                  </p>
                }
              />
            </div>

            <div className="home-hero__action">
              <a className="home-hero__contact" href="#contact">
                Integrate me
              </a>
              <span className="home-hero__tag home-hero__tag--heading-end" aria-hidden="true">
                {'</h1>'}
              </span>
            </div>

            <p className="home-hero__availability">
              <span className="home-hero__status-dot" aria-hidden="true" />
              <span>Ready for Q2 Direct Engagements</span>
            </p>
          </div>

          <div className="home-hero__art" aria-hidden="true">
            <HeroWireframe />
          </div>
        </div>

        <div className="home-hero__closing" aria-hidden="true">
          <span className="home-hero__tag">{'</body>'}</span>
          <span className="home-hero__tag">{'</html>'}</span>
        </div>
      </div>
    </section>
  );
}
