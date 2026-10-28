/**
 * Site footer with fixed brand copy and the current calendar year.
 */
import React from 'react';

/**
 * Render the footer using the same calendar timezone as the homepage availability.
 * @returns The footer landmark with an automatically calculated copyright year.
 */
export default function SiteFooter() {
  const current_year = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    timeZone: 'America/Los_Angeles'
  }).format(new Date());

  return (
    <footer className="section-shell site-footer">
      <div className="section-shell__container site-footer__layout">
        <div className="site-footer__branding">
          <a className="site-footer__brand" href="/" aria-label="NicholasByDesign home">
            nicholasbydesign
          </a>
          <span className="site-footer__status">
            <span className="site-footer__dot" aria-hidden="true" />
            All systems nominal
          </span>
        </div>
        <p className="site-footer__copyright">
          © {current_year} NicholasByDesign. Crafted with architectural rigor &amp; caffeine.
        </p>
      </div>
    </footer>
  );
}
