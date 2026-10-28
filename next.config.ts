/**
 * Next.js configuration with the development badge clear of the navigation rail.
 */
import type { NextConfig } from 'next';

const next_config: NextConfig = {
  devIndicators: {
    position: 'bottom-right'
  }
};

export default next_config;
