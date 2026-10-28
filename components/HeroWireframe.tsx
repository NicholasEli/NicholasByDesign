/**
 * Extruded N-shaped wire network with a stable silhouette and changing local connections.
 */
'use client';

import React, { useEffect, useId, useState } from 'react';

type WirePoint = { x: number; y: number; radius: number; color: string };
type WireConnection = { first: number; second: number };

const outline_points = [
  { x: 80, y: 580 },
  { x: 80, y: 100 },
  { x: 180, y: 100 },
  { x: 460, y: 460 },
  { x: 460, y: 100 },
  { x: 560, y: 100 },
  { x: 560, y: 580 },
  { x: 460, y: 580 },
  { x: 180, y: 220 },
  { x: 180, y: 580 }
];
const outline_path = 'M80 580V100H180L460 460V100H560V580H460L180 220V580Z';

/**
 * Precompute the three connected lattice ribbons once, outside the animation render loop.
 * @returns Shared vertices, permanent struts, and pairs of alternative cell diagonals.
 */
function create_wire_network() {
  const points: WirePoint[] = [];
  const struts = new Map<string, WireConnection>();
  const connections: WireConnection[] = [];
  const colors = ['var(--hero-cyan)', '#fff', '#9855ff', 'var(--hero-magenta)', '#7dd3fc'];
  const strips = [
    { x: 80, y: 100, dx: 0, dy: 480, width_x: 100, width_y: 0 },
    { x: 180, y: 100, dx: 280, dy: 360, width_x: 0, width_y: 120 },
    { x: 460, y: 100, dx: 0, dy: 480, width_x: 100, width_y: 0 }
  ];

  /** Add a vertex, sharing matching coordinates where the ribbons join. */
  function add_point({ x, y }: { x: number; y: number }) {
    const existing_index = points.findIndex(
      /** Match a previously registered lattice vertex. */
      function matches_point(point) {
        return point.x === x && point.y === y;
      }
    );
    if (existing_index !== -1) return existing_index;
    const index = points.length;
    points.push({ x, y, radius: index % 4 === 0 ? 4.5 : 3, color: colors[index % colors.length] });
    return index;
  }

  /** Keep each permanent undirected strut only once. */
  function add_strut({ first, second }: WireConnection) {
    const key = `${Math.min(first, second)}-${Math.max(first, second)}`;
    struts.set(key, { first, second });
    return;
  }

  for (const strip of strips) {
    let previous: WireConnection | null = null;
    for (let row = 0; row <= 4; row += 1) {
      const progress = row / 4;
      const x = strip.x + strip.dx * progress;
      const y = strip.y + strip.dy * progress;
      const first = add_point({ x, y });
      const second = add_point({ x: x + strip.width_x, y: y + strip.width_y });
      add_strut({ first, second });
      if (previous) {
        add_strut({ first: previous.first, second: first });
        add_strut({ first: previous.second, second });
        connections.push(
          { first: previous.first, second },
          { first: previous.second, second: first }
        );
      }
      previous = { first, second };
    }
  }

  return { points, struts: [...struts.values()], connections };
}

const wire_network = create_wire_network();

/**
 * Render a recognizable wireframe N with depth, colored vertices, and local rewiring.
 * @returns Decorative SVG artwork without filled letter faces.
 */
export default function HeroWireframe() {
  const gradient_id = useId();

  /** Choose changing diagonals inside each cell without crossing the N's negative space. */
  function get_connections({ randomize }: { randomize: boolean }) {
    const connections = new Set<number>();
    for (let index = 0; index < wire_network.connections.length; index += 2) {
      const choice = randomize ? Math.floor(Math.random() * 2) : (index / 2) % 2;
      connections.add(index + choice);
      if (randomize && Math.random() < 0.18) {
        connections.add(index + 1 - choice);
      }
    }
    return connections;
  }

  const [active_connections, setActiveConnections] = useState(
    get_connections({ randomize: false })
  );

  useEffect(function manage_connections() {
    const motion_query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let connection_timer: ReturnType<typeof setInterval> | undefined;

    /** Refresh the local connections on the existing animation interval. */
    function refresh_connections() {
      setActiveConnections(get_connections({ randomize: true }));
    }

    /** Keep the silhouette static when reduced motion is requested. */
    function sync_motion() {
      clearInterval(connection_timer);
      if (motion_query.matches) {
        setActiveConnections(get_connections({ randomize: false }));
        return;
      }
      connection_timer = setInterval(refresh_connections, 2200 / 2.25);
    }

    sync_motion();
    motion_query.addEventListener('change', sync_motion);

    /** Release the timer and preference listener when the artwork unmounts. */
    return function cleanup_connections() {
      clearInterval(connection_timer);
      motion_query.removeEventListener('change', sync_motion);
    };
  }, []);

  return (
    <svg
      className="home-hero__wireframe"
      viewBox="0 0 640 680"
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradient_id}
          x1="80"
          y1="100"
          x2="560"
          y2="580"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--hero-cyan)" />
          <stop offset="0.6" stopColor="var(--color-neon-violet)" />
          <stop offset="1" stopColor="var(--hero-magenta)" />
        </linearGradient>
      </defs>
      <g className="home-hero__geometry">
        <g className="home-hero__depth">
          <path d={outline_path} transform="translate(24 -24)" />
          {outline_points.map(
            /** Connect matching front and rear corners to give the letter depth. */
            function render_depth(point) {
              return (
                <line
                  key={`${point.x}-${point.y}`}
                  x1={point.x}
                  y1={point.y}
                  x2={point.x + 24}
                  y2={point.y - 24}
                />
              );
            }
          )}
        </g>
        <g className="home-hero__edges">
          {wire_network.struts.map(
            /** Keep the lattice rails and crossbars visible between connection changes. */
            function render_strut({ first, second }) {
              return (
                <line
                  key={`${first}-${second}`}
                  x1={wire_network.points[first].x}
                  y1={wire_network.points[first].y}
                  x2={wire_network.points[second].x}
                  y2={wire_network.points[second].y}
                />
              );
            }
          )}
        </g>
        <path className="home-hero__outline" d={outline_path} stroke={`url(#${gradient_id})`} />
        <g className="home-hero__signals">
          {wire_network.connections.map(
            /** Fade between alternative diagonals while leaving the N outline intact. */
            function render_connection({ first, second }, index) {
              return (
                <line
                  key={index}
                  className={`home-hero__connection${active_connections.has(index) ? ' home-hero__connection--active' : ''}`}
                  x1={wire_network.points[first].x}
                  y1={wire_network.points[first].y}
                  x2={wire_network.points[second].x}
                  y2={wire_network.points[second].y}
                  stroke={wire_network.points[first].color}
                />
              );
            }
          )}
        </g>
        <g className="home-hero__vertices">
          {wire_network.points.map(
            /** Render the neon lattice nodes at their stable letter coordinates. */
            function render_point(point, index) {
              return (
                <circle key={index} cx={point.x} cy={point.y} r={point.radius} fill={point.color} />
              );
            }
          )}
        </g>
      </g>
    </svg>
  );
}
