/**
 * Global section navigation, hard page refresh, and external social profile links.
 * Social icon geometry comes from Bootstrap Icons; see public/licenses/bootstrap-icons.txt.
 */
'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const navigation_groups = [
  {
    name: 'primary',
    label: 'Main sections',
    items: [
      {
        section_id: 'top',
        href: '/#top',
        label: 'Home',
        view_box: '0 0 24 24',
        filled: false,
        icon_path: 'm3 10 9-7 9 7v11h-6v-8H9v8H3z'
      },
      {
        section_id: 'pillars',
        href: '/#pillars',
        label: 'Multidisciplinary Pillars',
        view_box: '0 0 216.996 216.995',
        filled: true,
        icon_path:
          'M0,199.396h60.077V43.964L0,76.674V199.396L0,199.396z M18.158,87.458l23.762-12.933v106.707H18.158V87.458L18.158,87.458z    M156.919,43.964v155.433h60.076V76.674L156.919,43.964z M198.838,181.238h-23.762V74.531l23.762,12.933V181.238z M72.182,37.373   v162.023h72.632V37.373l-36.316-19.774L72.182,37.373z M126.656,181.238H90.34V48.16l18.157-9.886l18.158,9.886V181.238z'
      },
      {
        section_id: 'ai_architecture',
        href: '/#ai_architecture',
        label: 'AI-Augmented Architecture',
        view_box: '0 0 24 24',
        filled: false,
        icon_path: 'M5 7h14v13H5zM12 7V3M10 3h4M1 11h4M19 11h4M8 12h1M15 12h1M9 16h6'
      },
      {
        section_id: 'contact',
        href: '/#contact',
        label: 'Contact',
        view_box: '0 0 24 24',
        filled: false,
        icon_path: 'M3 5h18v14H3zM7 9l3 3-3 3m6 0h4'
      }
    ]
  },
  {
    name: 'secondary',
    label: 'Social profiles',
    items: [
      {
        section_id: null,
        href: 'https://www.linkedin.com/in/nicholasbydesign/',
        label: 'LinkedIn',
        view_box: '0 0 16 16',
        filled: true,
        icon_path:
          'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'
      },
      {
        section_id: null,
        href: 'https://github.com/NicholasEli/',
        label: 'GitHub',
        view_box: '0 0 16 16',
        filled: true,
        icon_path:
          'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8'
      }
    ]
  }
];

/**
 * Render section anchors and profile links outside the isolated slice simulator.
 * @returns The fixed navigation rail with native anchors and a refresh button.
 */
export default function SiteNavigation() {
  const pathname = usePathname();
  const [active_section, setActiveSection] = useState('top');

  useEffect(
    function track_visible_section() {
      if (pathname !== '/') return;

      let animation_frame: number | null = null;

      /** Highlight the section crossing the upper third of the viewport, in actual page order. */
      function sync_visible_section() {
        animation_frame = null;
        const activation_line = window.innerHeight / 3;
        let next_section = 'top';
        let active_top = -Infinity;
        let final_section = 'top';
        let final_top = -Infinity;

        for (const item of navigation_groups[0].items) {
          if (!item.section_id) continue;

          const section = document.getElementById(item.section_id);
          if (!section) continue;

          const section_top = section.getBoundingClientRect().top;

          if (section_top > final_top) {
            final_section = item.section_id;
            final_top = section_top;
          }

          if (section_top <= activation_line && section_top > active_top) {
            next_section = item.section_id;
            active_top = section_top;
          }
        }

        const at_page_end =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

        if (at_page_end) next_section = final_section;
        if (window.scrollY <= 0) next_section = 'top';

        setActiveSection(next_section);
        return;
      }

      /** Coalesce scroll and layout changes into one measurement per animation frame. */
      function schedule_section_update() {
        if (animation_frame !== null) return;

        animation_frame = window.requestAnimationFrame(sync_visible_section);
        return;
      }

      const layout_observer = new ResizeObserver(schedule_section_update);
      layout_observer.observe(document.body);
      schedule_section_update();
      window.addEventListener('scroll', schedule_section_update, { passive: true });
      window.addEventListener('resize', schedule_section_update);
      window.addEventListener('hashchange', schedule_section_update);

      /** Release viewport listeners, layout observation, and pending work on route changes. */
      return function cleanup_visible_section() {
        window.removeEventListener('scroll', schedule_section_update);
        window.removeEventListener('resize', schedule_section_update);
        window.removeEventListener('hashchange', schedule_section_update);
        layout_observer.disconnect();

        if (animation_frame !== null) window.cancelAnimationFrame(animation_frame);
        return;
      };
    },
    [pathname]
  );

  /** Reload the current document, preserving the browser's normal refresh behavior. */
  function refresh_page() {
    return window.location.reload();
  }

  if (pathname === '/slice-simulator' || pathname?.startsWith('/slice-simulator/')) {
    return <></>;
  }

  return (
    <nav className="site-navigation" aria-label="Global navigation">
      <button
        className="site-navigation__brand"
        type="button"
        onClick={refresh_page}
        aria-label="NicholasByDesign — refresh page"
        title="Refresh page"
      >
        <span className="site-navigation__logo" aria-hidden="true">
          N
        </span>
        {/*<span className="site-navigation__name">NICHOLASBYDESIGN</span>*/}
      </button>

      {navigation_groups.map(
        /** Render section anchors or external profile links. */
        function render_group(group) {
          return (
            <ul
              className={`site-navigation__list site-navigation__list--${group.name}`}
              aria-label={group.label}
              key={group.name}
            >
              {group.items.map(
                /** Render a native link with the supplied decorative SVG geometry. */
                function render_item(item) {
                  const is_external = group.name === 'secondary';
                  const is_active =
                    !is_external && pathname === '/' && active_section === item.section_id;
                  const selected_class = is_active ? ' site-navigation__button--highlighted' : '';
                  const icon_class = item.filled ? ' site-navigation__icon--filled' : '';
                  let item_href = item.href;
                  if (!is_external && pathname === '/') {
                    item_href = `#${item.section_id}`;
                  }
                  const accessible_label = is_external
                    ? `${item.label} (opens in a new tab)`
                    : item.label;

                  return (
                    <li className="site-navigation__item" key={item.label}>
                      <a
                        className={`site-navigation__button${selected_class}`}
                        href={item_href}
                        aria-label={accessible_label}
                        title={accessible_label}
                        aria-current={is_active ? 'location' : undefined}
                        target={is_external ? '_blank' : undefined}
                        rel={is_external ? 'noopener noreferrer' : undefined}
                      >
                        <svg
                          className={`site-navigation__icon${icon_class}`}
                          viewBox={item.view_box}
                          fill={item.filled ? 'currentColor' : 'none'}
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d={item.icon_path} />
                        </svg>
                      </a>
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
