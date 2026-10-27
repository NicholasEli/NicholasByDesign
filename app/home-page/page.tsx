/**
 * Preserve the former home-page URL by redirecting to the root route.
 */
import { redirect } from 'next/navigation';

/**
 * Redirect visitors to the canonical home page.
 * @returns Never returns because Next.js handles the redirect.
 */
export default async function Page() {
  redirect('/');
}
