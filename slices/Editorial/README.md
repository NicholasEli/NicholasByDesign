# Editorial

Edit the layout in `index.tsx`. Prismic supplies `slice.primary.heading`,
`slice.primary.body`, and `slice.primary.image`. The component uses generated
`Content.EditorialSlice` types and renders an image only when it is filled.

The shared slice model is pushed to Prismic and enabled on the **Home Page** type.
Add it to a Home Page document in Prismic's Page Builder and publish the document
to see it at `/`. Live editing previews use the `/slice-simulator` route while
the Next.js development server is running.

Standalone documents of the existing Editorial custom type are separate content;
the shared slice does not change or migrate them.
