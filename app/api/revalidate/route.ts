/**
 * Expose the Prismic cache-tag revalidation route.
 */
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Revalidate content tagged with Prismic's cache tag.
 * @returns A JSON acknowledgement with the revalidation timestamp.
 */
export async function POST() {
  revalidateTag('prismic', 'max');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
