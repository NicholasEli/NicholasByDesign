import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '../prismicio';

export const metadata: Metadata = {
  title: 'NicholasByDesign',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
