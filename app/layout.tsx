/**
 * Shared HTML document metadata and Prismic preview integration.
 */
import type { ReactNode } from 'react';

import { PrismicPreview } from '@prismicio/next';
import type { Metadata } from 'next';

import { repository_name } from '../prismicio';

export const metadata: Metadata = {
  title: 'NicholasByDesign'
};

/**
 * Wrap all routes in the document shell and enable Prismic's preview toolbar.
 * @param props - The nested route content.
 * @returns The root HTML document.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PrismicPreview repositoryName={repository_name} />
      </body>
    </html>
  );
}
