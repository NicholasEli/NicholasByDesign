/**
 * Rotating point network with connections that change among nearby vertices.
 */
'use client';

import React, { useEffect, useState } from 'react';

const wire_points = [
  { x: 128, y: 98, radius: 4.5, color: 'var(--hero-cyan)' },
  { x: 348, y: 70, radius: 3.5, color: '#fff' },
  { x: 568, y: 126, radius: 3, color: '#7dd3fc' },
  { x: 609, y: 318, radius: 4, color: '#9855ff' },
  { x: 595, y: 538, radius: 3.5, color: 'var(--hero-magenta)' },
  { x: 402, y: 620, radius: 4, color: '#7dd3fc' },
  { x: 155, y: 552, radius: 3.5, color: 'var(--hero-cyan)' },
  { x: 18, y: 455, radius: 2.5, color: '#fff' },
  { x: 46, y: 263, radius: 2.5, color: '#fff' },
  { x: 211, y: 373, radius: 5, color: 'var(--hero-magenta)' },
  { x: 417, y: 401, radius: 4, color: 'var(--hero-cyan)' },
  { x: 500, y: 208, radius: 5, color: 'var(--hero-magenta)' }
];

/**
 * Render the wireframe with deterministic initial connections and client-side rewiring.
 * @returns Decorative SVG lines and colored vertices without filled faces.
 */
export default function HeroWireframe() {
  /**
   * Find the three closest vertices to one point using squared Euclidean distance.
   * @param options - The index of the source point.
   * @returns Neighbor indexes ordered from nearest to farthest.
   */
  function get_neighbors({ point_index }: { point_index: number }) {
    const point = wire_points[point_index];
    const neighbors = [];

    for (let index = 0; index < wire_points.length; index += 1) {
      if (index === point_index) continue;
      const neighbor = wire_points[index];
      neighbors.push({
        index,
        distance: (neighbor.x - point.x) ** 2 + (neighbor.y - point.y) ** 2
      });
    }

    neighbors.sort(function compare_distance(first, second) {
      return first.distance - second.distance;
    });
    return neighbors.slice(0, 3);
  }

  /**
   * Give an undirected connection the same key from either endpoint.
   * @param options - The indexes of the two vertices.
   * @returns A stable, deduplicated edge key.
   */
  function get_edge_key({ first, second }: { first: number; second: number }) {
    return `${Math.min(first, second)}-${Math.max(first, second)}`;
  }

  /**
   * Keep each nearest neighbor and select another from the next two closest points.
   * @param options - Whether to randomize the secondary connections.
   * @returns The active, undirected edge keys.
   */
  function get_connections({ randomize }: { randomize: boolean }) {
    const connections = new Set<string>();
    for (let point_index = 0; point_index < wire_points.length; point_index += 1) {
      const neighbors = get_neighbors({ point_index });
      const secondary_index = randomize ? 1 + Math.floor(Math.random() * 2) : 1;
      connections.add(get_edge_key({ first: point_index, second: neighbors[0].index }));
      connections.add(
        get_edge_key({ first: point_index, second: neighbors[secondary_index].index })
      );
    }
    return connections;
  }

  const [active_connections, setActiveConnections] = useState(
    get_connections({ randomize: false })
  );

  useEffect(function manage_connections() {
    const motion_query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let connection_timer: ReturnType<typeof setInterval> | undefined;

    /** Refresh the random nearby connections on each animation interval. */
    function refresh_connections() {
      setActiveConnections(get_connections({ randomize: true }));
    }

    /** Start or stop rewiring when the system motion preference changes. */
    function sync_motion() {
      clearInterval(connection_timer);
      if (motion_query.matches) {
        setActiveConnections(get_connections({ randomize: false }));
        return;
      }
      connection_timer = setInterval(refresh_connections, 2200 / 1.5);
    }

    sync_motion();
    motion_query.addEventListener('change', sync_motion);

    /** Release the timer and preference listener when the artwork unmounts. */
    return function cleanup_connections() {
      clearInterval(connection_timer);
      motion_query.removeEventListener('change', sync_motion);
    };
  }, []);

  const possible_connections = new Map<string, { first: number; second: number }>();
  for (let point_index = 0; point_index < wire_points.length; point_index += 1) {
    for (const neighbor of get_neighbors({ point_index })) {
      const edge_key = get_edge_key({ first: point_index, second: neighbor.index });
      possible_connections.set(edge_key, { first: point_index, second: neighbor.index });
    }
  }

  return (
    <svg className="home-hero__wireframe" viewBox="0 0 640 680" fill="none" focusable="false">
      <g className="home-hero__geometry">
        <g className="home-hero__edges">
          {[...possible_connections].map(([edge_key, { first, second }]) => (
            <line
              key={edge_key}
              className={`home-hero__connection${active_connections.has(edge_key) ? ' home-hero__connection--active' : ''}`}
              x1={wire_points[first].x}
              y1={wire_points[first].y}
              x2={wire_points[second].x}
              y2={wire_points[second].y}
            />
          ))}
        </g>
        <g className="home-hero__vertices">
          {wire_points.map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r={point.radius} fill={point.color} />
          ))}
        </g>
      </g>
    </svg>
  );
}
