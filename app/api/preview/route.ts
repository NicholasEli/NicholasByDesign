/**
 * Start a Prismic draft preview session and redirect to the requested document.
 */
import type { NextRequest } from 'next/server';
import { redirectToPreviewURL } from '@prismicio/next';

import { create_client } from '../../../prismicio';

/**
 * Resolve the preview URL using Next.js's required request parameter.
 * @param request - The incoming preview request.
 * @returns A redirect response for the preview session.
 */
export async function GET(request: NextRequest) {
  const client = create_client();

  return await redirectToPreviewURL({ client, request });
}
