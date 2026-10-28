/**
 * AI convergence architecture with editable introductory copy and fixed system stages.
 */
import React, { useId } from 'react';

import type { Content } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { SliceComponentProps } from '@prismicio/react';

export type AiArchitectureProps = SliceComponentProps<Content.AiArchitectureSlice>;

const architecture_stages = [
  {
    theme: 'intake',
    label: '01 // CLIENT INTAKE',
    title: 'Adaptive UI Layer',
    description:
      'Real-time telemetry captures spatial intent vectors, contextual embeddings, and viewport postures directly in client state.',
    icon_path:
      'M10 11V4a2 2 0 0 1 4 0v9l2-1h4v7a3 3 0 0 1-3 3h-4l-5-7a2 2 0 0 1 2-3l2 2M7 7V4a5 5 0 0 1 10 0',
    footer: 'client → tokenize() → stream',
    metrics: null
  },
  {
    theme: 'core',
    label: '02 // INFERENCE CORE',
    title: 'Agentic Orchestration',
    description:
      'RAG pipelines execute vector queries across Qdrant/Pinecone with speculative decoding and semantic memory caching.',
    icon_path: 'M7 22v-6a9 9 0 1 1 15-7l1 5h-4v5h-4v3M11 8l1-2h3l1 2 2 1v2l-2 1-1 2h-3l-1-2-2-1V9z',
    footer: null,
    metrics: [
      { label: 'Speed:', value: '84 tps', theme: 'speed' },
      { label: 'Quant:', value: '4-bit FP16', theme: 'quant' }
    ]
  },
  {
    theme: 'dispatch',
    label: '03 // DISPATCH',
    title: 'Deterministic Action',
    description:
      'Human-in-the-loop validation, verified schema rollouts, and idempotent writes to system databases.',
    icon_path: 'M5 7h14v13H5zM12 7V3M10 3h4M1 11h4M19 11h4M8 12h1M15 12h1M9 16h6',
    footer: 'verify() → commitTransaction()',
    metrics: null
  }
];

const architecture_features = [
  {
    theme: 'intake',
    title: 'Context-Aware Fluid UI',
    description:
      'Interfaces reconfigure their visual weight, token scale, and actions automatically based on user focus and live workflow context.',
    icon_path: 'M2 5h9M16 5h6M2 12h3M10 12h12M2 19h12M19 19h3M14 2v6M8 9v6M17 16v6'
  },
  {
    theme: 'core',
    title: 'Sub-100ms Edge TTFT',
    description:
      'Hybrid embedding compute on edge workers with fast localized Small Language Model (SLM) fallback for offline safety.',
    icon_path: 'M14 2 4 14h7l-1 8L21 9h-8z'
  },
  {
    theme: 'dispatch',
    title: 'Human-in-the-Loop Ergonomics',
    description:
      'Transparent confidence scoring, speculative UI preview states, and instant undo states where critical security is demanded.',
    icon_path: 'm12 2 3 2 4-1 1 4 3 3-2 3 1 4-4 1-3 3-3-2-4 1-1-4-3-3 2-3-1-4 4-1zM8 12l3 3 5-6'
  }
];

/**
 * Render the editable section introduction, ordered system flow, and supporting capabilities.
 * @param props - The generated Prismic slice content.
 * @returns A static, responsive architecture section.
 */
export default function AiArchitecture({ slice }: AiArchitectureProps) {
  const heading_id = useId();

  return (
    <section
      className="section-shell ai-architecture"
      aria-labelledby={heading_id}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="section-shell__container">
        <span className="section-shell__tag ai-architecture__tag" aria-hidden="true">
          {'<!-- ai convergence flow -->'}
        </span>

        <header className="ai-architecture__header">
          <span className="ai-architecture__marker" aria-hidden="true" />
          <div className="section-shell__heading ai-architecture__heading" id={heading_id}>
            <PrismicRichText
              field={slice.primary.heading}
              fallback={<h2>AI-Augmented Systems Architecture</h2>}
            />
          </div>
          <div className="section-shell__description ai-architecture__description">
            <PrismicRichText
              field={slice.primary.description}
              fallback={
                <p>
                  Frontend interfaces, design systems, and full-stack runtimes don&apos;t operate in
                  static silos. In my work, they converge into an active feedback loop powered by
                  agentic intelligence and low-latency inference.
                </p>
              }
            />
          </div>
        </header>

        <ol className="ai-architecture__flow" role="list">
          {architecture_stages.map(
            /** Render a fixed stage in the intake, inference, and dispatch sequence. */
            function render_stage(stage) {
              return (
                <li
                  className={`ai-architecture__stage ai-architecture__stage--${stage.theme}`}
                  key={stage.theme}
                >
                  <div className="ai-architecture__stage-header">
                    <p className="ai-architecture__label">{stage.label}</p>
                    <svg
                      className="ai-architecture__icon"
                      viewBox="0 0 26 26"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={stage.icon_path} />
                    </svg>
                  </div>
                  <h3 className="ai-architecture__card-title">{stage.title}</h3>
                  <p className="ai-architecture__card-copy">{stage.description}</p>
                  <div className="ai-architecture__footer">
                    {stage.metrics ? (
                      <dl className="ai-architecture__metrics">
                        {stage.metrics.map(
                          /** Render a fixed illustrative inference metric. */
                          function render_metric(metric) {
                            return (
                              <div className="ai-architecture__metric" key={metric.label}>
                                <dt>{metric.label}</dt>
                                <dd
                                  className={`ai-architecture__metric-value ai-architecture__metric-value--${metric.theme}`}
                                >
                                  {metric.value}
                                </dd>
                              </div>
                            );
                          }
                        )}
                      </dl>
                    ) : (
                      <code className="ai-architecture__code">{stage.footer}</code>
                    )}
                  </div>
                </li>
              );
            }
          )}
        </ol>

        <div className="ai-architecture__features">
          {architecture_features.map(
            /** Render a noninteractive architecture capability card. */
            function render_feature(feature) {
              return (
                <article
                  className={`ai-architecture__feature ai-architecture__feature--${feature.theme}`}
                  key={feature.theme}
                >
                  <svg
                    className="ai-architecture__icon ai-architecture__icon--feature"
                    viewBox="0 0 26 26"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={feature.icon_path} />
                  </svg>
                  <h3 className="ai-architecture__card-title ai-architecture__card-title--feature">
                    {feature.title}
                  </h3>
                  <p className="ai-architecture__card-copy">{feature.description}</p>
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
