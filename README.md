# NicholasByDesign

Next.js App Router, React, Prismic, and Netlify.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000/. Next.js updates the page as you edit components.
Use `netlify dev` when you need Netlify's local platform emulation.

```sh
npm run typecheck
npm run build
npm start
```

## Pages and Prismic content

`app/page.tsx` fetches a published `home_page` document and renders
`components/HomePage.tsx`. Until a Home Page is published, it falls back to the
existing published `heading1` document. Other API errors are surfaced normally.

The shared client is configured in `prismicio.ts`, using the repository and
document URLs in `prismic.config.json`. Add routes under `app/` and query content:

```tsx
import { createClient } from '@/prismicio';

const client = createClient();
const page = await client.getSingle('home_page');
```

Prismic's generated types live in `prismicio-types.d.ts`. The client fetches
content without caching, so published edits appear on the next page request.
If caching is added later, configure cache tags and a publication webhook.

For a private Content API, copy `.env.example` to `.env.local` and set
`PRISMIC_ACCESS_TOKEN`. In Netlify, set it with both Builds and Functions scopes.
The token remains on the server; public published content needs no token.

## Editorial slice

The `editorial` shared slice is connected to the Home Page type's `slices` zone.
It has rich text `heading` and `body` fields plus an optional `image` field.
Edit its React layout in `slices/Editorial/index.tsx`. The page's `SliceZone`
selects this component using the map in `slices/index.ts`.

In Prismic's Page Builder, create a **Home Page**, fill its heading, add an
**Editorial** slice, fill its fields, and publish. It will replace the legacy
heading at `/` automatically. Existing standalone Editorial documents are
separate from the new shared Editorial slice and have been preserved.

Models are in `customtypes/` and `slices/Editorial/model.json`. Use Prismic's
CLI or Type Builder to edit them; JSX and CSS stay in this repository.

```sh
npx prismic pull
npx prismic status
```

Prismic requires model changes to be committed before pushing. Review the model
changes and `npx prismic status` before `npx prismic push`.

## Previews

Prismic's development preview points to http://localhost:3000/api/preview and its
slice simulator points to http://localhost:3000/slice-simulator. Run the dev server
while previewing content in Prismic. The generated routes support draft preview,
exit preview, and isolated slice rendering. The root layout includes the Prismic
preview toolbar.

## Netlify

`netlify.toml` runs `npm run build` and publishes `.next`. Netlify automatically
uses its Next.js adapter. The previous Hono edge function and static index have
been removed so Next.js owns routing.

After deployment, add the deployed `/api/preview` URL in Prismic and update the
slice simulator URL to the deployed site. Local development URLs are already
configured.
