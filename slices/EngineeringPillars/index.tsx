/**
 * Reorderable engineering pillars with editable introduction and fixed skill cards.
 */
import React, { useId } from 'react';

import type { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { SliceComponentProps } from '@prismicio/react';

export type EngineeringPillarsProps = SliceComponentProps<Content.EngineeringPillarsSlice>;

const pillars = [
  {
    number: '01',
    theme: 'frontend',
    title: 'Defining The Outcome',
    description:
      'Any high-level goal must be broken down into clearly defined epics with realistic timelines and assignable tasks to establish reasonable expectations and predictable outcomes.',
    features: [
      'Declarable goal epics/chapters',
      'Devise a realistic timeline',
      'Distributive micro tasks'
    ],
    stack: [
      'Project Management',
      'Goal Definition',
      'Epic Planning',
      'Timeline Planning',
      'Task Breakdown'
    ],
    icon_view_box: '0 0 24 24',
    icon_fill_rule: 'evenodd' as const,
    icon_paths: [
      {
        'd': 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z',
        'opacity': 1.0
      }
    ]
  },
  {
    number: '02',
    theme: 'spatial',
    title: 'Review Oriented Progress',
    description:
      'The best way to mitigate issues in production is a series review and approval steps and not be afraid of rejection.',
    features: ['Structured review', 'Actionable feedback', 'Clear acceptance criteria'],
    stack: [
      'Review Management',
      'Approval Workflows',
      'Feedback Integration',
      'Continuous Improvement'
    ],
    icon_view_box: '0 0 32 32',
    icon_fill_rule: 'nonzero' as const,
    icon_paths: [
      {
        'd': 'M30.428 14.663l-13.095-13.094c-0.35-0.349-0.833-0.565-1.367-0.565s-1.017 0.216-1.367 0.565l0-0-2.713 2.718 3.449 3.449c0.22-0.077 0.473-0.121 0.737-0.121 1.269 0 2.297 1.028 2.297 2.297 0 0.269-0.046 0.526-0.131 0.766l0.005-0.016 3.322 3.324c0.222-0.079 0.479-0.125 0.746-0.125 1.268 0 2.296 1.028 2.296 2.296s-1.028 2.296-2.296 2.296c-1.268 0-2.296-1.028-2.296-2.296 0-0.313 0.063-0.611 0.176-0.883l-0.006 0.015-3.11-3.094v8.154c0.764 0.385 1.279 1.163 1.279 2.061 0 1.27-1.030 2.3-2.3 2.3s-2.3-1.030-2.3-2.3c0-0.634 0.256-1.207 0.671-1.623l-0 0c0.211-0.211 0.462-0.382 0.741-0.502l0.015-0.006v-8.234c-0.842-0.354-1.422-1.173-1.422-2.126 0-0.32 0.065-0.624 0.183-0.901l-0.006 0.015-3.389-3.405-8.98 8.974c-0.348 0.351-0.562 0.834-0.562 1.368s0.215 1.017 0.563 1.368l13.096 13.092c0.349 0.35 0.832 0.566 1.366 0.566s1.016-0.216 1.366-0.566l13.034-13.034c0.35-0.349 0.567-0.833 0.567-1.366s-0.217-1.017-0.567-1.366l-0-0z',
        'opacity': 1.0
      }
    ]
  },
  {
    number: '03',
    theme: 'fullstack',
    title: 'Controlled Versioning',
    description:
      'Project success extends past the first deployment. Ensuring snapshots are created anytime something new is introduced is preventative maintenance.',
    features: ['Versioned snapshots', 'Traceable change history', 'Reliable rollback and recovery'],
    stack: ['Version Control', 'Release Management', 'Backup and Recovery', 'Deployment Tracking'],
    icon_view_box: '0 0 24 24',
    icon_fill_rule: 'nonzero' as const,
    icon_paths: [
      {
        'd': 'M6.59961 11.3974C6.59961 8.67119 6.59961 7.3081 7.44314 6.46118C8.28667 5.61426 9.64432 5.61426 12.3596 5.61426H15.2396C17.9549 5.61426 19.3125 5.61426 20.1561 6.46118C20.9996 7.3081 20.9996 8.6712 20.9996 11.3974V16.2167C20.9996 18.9429 20.9996 20.306 20.1561 21.1529C19.3125 21.9998 17.9549 21.9998 15.2396 21.9998H12.3596C9.64432 21.9998 8.28667 21.9998 7.44314 21.1529C6.59961 20.306 6.59961 18.9429 6.59961 16.2167V11.3974Z',
        'opacity': 1.0
      },
      {
        'd': 'M4.17157 3.17157C3 4.34315 3 6.22876 3 10V12C3 15.7712 3 17.6569 4.17157 18.8284C4.78913 19.446 5.6051 19.738 6.79105 19.8761C6.59961 19.0353 6.59961 17.8796 6.59961 16.2167V11.3974C6.59961 8.6712 6.59961 7.3081 7.44314 6.46118C8.28667 5.61426 9.64432 5.61426 12.3596 5.61426H15.2396C16.8915 5.61426 18.0409 5.61426 18.8777 5.80494C18.7403 4.61146 18.4484 3.79154 17.8284 3.17157C16.6569 2 14.7712 2 11 2C7.22876 2 5.34315 2 4.17157 3.17157Z',
        'opacity': 0.5
      }
    ]
  }
];

/**
 * Render the slice introduction and three static engineering disciplines.
 * @param props - The generated slice content and its position in the Slice Zone.
 * @returns An accessible, responsive section with editable introductory copy.
 */
export default function EngineeringPillars({ slice, index }: EngineeringPillarsProps) {
  const heading_id = useId();

  return (
    <section
      className="section-shell engineering-pillars"
      id={index === 0 ? 'pillars' : `pillars-${slice.id}`}
      aria-labelledby={heading_id}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="section-shell__container">
        <span className="section-shell__tag engineering-pillars__tag" aria-hidden="true">
          {'<section id="pillars">'}
        </span>

        <header className="engineering-pillars__header">
          <div className="engineering-pillars__introduction">
            <p className="section-shell__eyebrow engineering-pillars__eyebrow">
              ENGINEERING MASTERY
            </p>
            <div className="section-shell__heading engineering-pillars__heading" id={heading_id}>
              <PrismicRichText
                field={slice.primary.heading}
                fallback={<h2>Multidisciplinary Pillars</h2>}
              />
            </div>
            <div className="section-shell__description engineering-pillars__description">
              <PrismicRichText
                field={slice.primary.description}
                fallback={
                  <p>
                    My engineering philosophy revolves around eradicating ambiguity. I balance
                    hyper-tactical and distributive tasks with resilient and predictable outcomes.
                  </p>
                }
              />
            </div>
          </div>
          <p className="engineering-pillars__status">// STATUS: IN PROGRESS</p>
        </header>

        <div className="engineering-pillars__cards">
          {pillars.map(
            /** Render one fixed discipline card with its accent color. */
            function render_pillar(pillar) {
              return (
                <article
                  className={`engineering-pillars__card engineering-pillars__card--${pillar.theme}`}
                  key={pillar.number}
                >
                  <div className="engineering-pillars__card-header">
                    <span className="engineering-pillars__icon" aria-hidden="true">
                      <svg
                        viewBox={pillar.icon_view_box}
                        fill="currentColor"
                        fillRule={pillar.icon_fill_rule}
                        clipRule={pillar.icon_fill_rule}
                        focusable="false"
                      >
                        {pillar.icon_paths.map(
                          /** Preserve the supplied SVG geometry and duotone opacity. */
                          function render_icon_path(icon_path) {
                            return (
                              <path key={icon_path.d} d={icon_path.d} opacity={icon_path.opacity} />
                            );
                          }
                        )}
                      </svg>
                    </span>
                    <span className="engineering-pillars__badge">PILLAR {pillar.number}</span>
                  </div>
                  <h3 className="engineering-pillars__card-title">{pillar.title}</h3>
                  <p className="engineering-pillars__card-description">{pillar.description}</p>
                  <ul className="engineering-pillars__features">
                    {pillar.features.map(
                      /** Render a feature with a decorative checkmark. */
                      function render_feature(feature) {
                        return (
                          <li className="engineering-pillars__feature" key={feature}>
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <circle cx="10" cy="10" r="8" />
                              <path d="m6 10 3 3 5-6" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                  <div className="engineering-pillars__stack">
                    <ul className="engineering-pillars__chips">
                      {pillar.stack.map(
                        /** Render a noninteractive stack label. */
                        function render_chip(technology, technology_index) {
                          const accent_class =
                            technology_index === pillar.stack.length - 1
                              ? ' engineering-pillars__chip--accent'
                              : '';
                          return (
                            <li
                              className={`engineering-pillars__chip${accent_class}`}
                              key={technology}
                            >
                              {technology}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
