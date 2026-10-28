/**
 * Shared HTML document metadata and Prismic preview integration.
 */
import type { ReactNode } from 'react';

import { PrismicPreview } from '@prismicio/next';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, La_Belle_Aurore, Plus_Jakarta_Sans } from 'next/font/google';

import { repository_name } from '../prismicio';

import './styles.css';
import './hero.css';
import './pillars.css';
import './architecture.css';

const headline_font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans'
});

const body_font = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const label_font = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono'
});

const handwritten_font = La_Belle_Aurore({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-la-belle-aurore'
});

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
    <html
      lang="en"
      className={`${headline_font.variable} ${body_font.variable} ${label_font.variable} ${handwritten_font.variable}`}
    >
      <body>
        {children}
        <PrismicPreview repositoryName={repository_name} />
      </body>
    </html>
  );
}
