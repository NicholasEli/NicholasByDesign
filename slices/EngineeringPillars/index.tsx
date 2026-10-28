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
    icon_path: 'M20 5H3v13h11M1 22h13M8 18v4M19 10h7v13h-7zM22.5 19v1'
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
    icon_path: 'M3 3h8v8H3zM17 3h8v8h-8zM3 17h8v8H3zM17 17h8v8h-8z'
  },
  {
    number: '03',
    theme: 'fullstack',
    title: 'Controlled Versioning',
    description:
      'Project success extends past the first deployment. Ensuring snapshots are created anytime something new is introduced is preventative maintenance.',
    features: ['Versioned snapshots', 'Traceable change history', 'Reliable rollback and recovery'],
    stack: ['Version Control', 'Release Management', 'Backup and Recovery', 'Deployment Tracking'],
    icon_path: 'M25 7c0 3-22 7-22 0s22-7 22 0ZM3 7v14c0 7 22 7 22 0V7M3 14c0 7 22 7 22 0'
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
                      <svg viewBox="0 0 28 28" fill="none" focusable="false">
                        <path d={pillar.icon_path} />
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
