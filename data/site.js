/**
 * Public identity, canonical URL, and search/social defaults shared by server metadata.
 */
export const site = {
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nicholasbydesign.com'),
  name: 'NicholasByDesign',
  author: 'Nicholas Eli',
  title: 'NicholasByDesign | Development, Design & Automation',
  description:
    'Nicholas Eli builds thoughtful UI/UX, full-stack applications, service integrations, and AI-powered workflows for teams ready to move forward.',
  keywords: [
    'NicholasByDesign',
    'Nicholas Eli',
    'UI/UX design',
    'frontend development',
    'full-stack JavaScript',
    'service integration',
    'process automation',
    'AI integration',
    'Vancouver Washington'
  ],
  social_image: {
    url: '/nicholasbydesign-preview.jpg',
    width: 1000,
    height: 578,
    alt: 'NicholasByDesign — forward deploy engineer and devsigner, with a neon wireframe N.'
  },
  social_profiles: [
    'https://www.linkedin.com/in/nicholasbydesign/',
    'https://github.com/NicholasEli/'
  ]
};
