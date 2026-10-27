/**
 * End the current Prismic preview session.
 */
import { exitPreview } from '@prismicio/next';

/**
 * Clear preview state and return the SDK's redirect response.
 * @returns The exit-preview response.
 */
export function GET() {
  return exitPreview();
}
