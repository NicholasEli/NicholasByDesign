/**
 * Global fixed navigation rail with presentational controls and no wired destinations.
 */
'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

const navigation_groups = [
  {
    name: 'primary',
    label: 'Main sections',
    items: [
      { id: null, label: 'Home', icon_path: 'm3 10 9-7 9 7v11h-6v-8H9v8H3z' },
      {
        id: 'pillars',
        label: 'Pillars',
        icon_path: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'
      },
      { id: 'ai_architecture', label: 'Engineering', icon_path: 'm8 6-6 6 6 6m8-12 6 6-6 6' },
      { id: 'contact', label: 'Contact', icon_path: 'M3 5h18v14H3zM7 9l3 3-3 3m6 0h4' }
    ]
  },
  {
    name: 'secondary',
    label: 'Utilities',
    items: [
      {
        label: 'Connections',
        icon_path:
          'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM14 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm18 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM12 9V5M9 11l-4-1m10 1 4-1m-9 5-3 4m7-4 3 4'
      },
      {
        label: 'Social',
        icon_path: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0-4v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8'
      }
    ]
  }
];

/**
 * Render the shared navigation outside the isolated slice simulator.
 * @returns The fixed rail, or empty JSX when rendering a slice preview.
 */
export default function SiteNavigation() {
  const pathname = usePathname();

  if (pathname === '/slice-simulator' || pathname?.startsWith('/slice-simulator/')) {
    return <></>;
  }

  return (
    <nav className="site-navigation" aria-label="Global navigation">
      <div className="site-navigation__brand" aria-hidden="true">
        <span className="site-navigation__logo">N</span>
        {/*<span className="site-navigation__name">NICHOLASBYDESIGN</span>*/}
      </div>

      {navigation_groups.map(
        /** Render the primary section controls or bottom utility controls. */
        function render_group(group) {
          return (
            <ul
              className={`site-navigation__list site-navigation__list--${group.name}`}
              aria-label={group.label}
              key={group.name}
            >
              {group.items.map(
                /** Render an accessible placeholder control with decorative SVG artwork. */
                function render_item(item) {
                  const selected_class =
                    item.label === 'Home' ? ' site-navigation__button--highlighted' : '';

                  return (
                    <li className="site-navigation__item" key={item.label}>
                      <button
                        className={`site-navigation__button${selected_class}`}
                        type="button"
                        aria-label={item.label}
                        title={item.label}
                      >
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                          <path d={item.icon_path} />
                        </svg>
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          );
        }
      )}
    </nav>
  );
}
