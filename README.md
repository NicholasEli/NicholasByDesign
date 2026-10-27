# NicholasByDesign

Next.js App Router, React, Prismic, and Netlify.

## How Prismic content fits together

The structure goes from **page type → page document → slices → fields**.

### 1. Page types — the blueprints

A page type defines the structure available for a kind of page: its fields,
SEO metadata, and which slices editors can add. For example, a Home Page type
can allow Hero and Editorial slices, while a Blog Post type can have author
and publication-date fields plus article slices.

In this project, **Home Page** (`home_page`) is a page type. Its model lives in
`customtypes/home_page/index.json`, and it allows the Editorial slice.

### 2. Page documents — the actual pages

A page document is created from a page type and filled with content in Prismic.
It contains the entered field values and its ordered list of slices. Publish
the document to make its content available to the website's normal queries.

Our Home Page type is a singleton, so it allows one document. Other page types
can be repeatable, such as a Blog Post type used for many individual posts.

### 3. Slices — reusable page sections

Slices are reusable sections containing editable content fields. Editors add,
remove, and reorder them within a page's Slice Zone. A page might contain a
Hero slice, an Editorial slice, an Image Gallery slice, and a Call to Action slice.
The page type determines which of those sections are available.

Each slice has a model describing its editable fields and a local React component
controlling its JSX layout. Our Editorial component lives in
`slices/Editorial/index.tsx`; `SliceZone` renders it when a page contains a slice
with the API ID `editorial`.

### 4. Fields — the content inside pages and slices

Fields hold individual values such as text, rich text, images, links, and dates.
They can belong directly to a page or to a slice. Our Home Page has a page-level
heading, while each Editorial slice has its own heading, body, and optional image.

For example, a Home Page document could contain:

```text
Home Page document (created from the Home Page type)
├── Heading: "Welcome"
└── Slices
    ├── Editorial
    │   ├── Heading: "Our story"
    │   ├── Body: rich text about the studio
    │   └── Image: a studio photo
    └── Editorial
        ├── Heading: "Our approach"
        ├── Body: rich text about the process
        └── Image: a project photo
```

Prismic stores the models and document content. The local React components
determine how that content appears on the website.

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

## Directory guide

### `app/` — routes and server-side page loading

Next.js uses this directory to decide which code runs for each URL.

- `app/page.tsx`: Handles `/`, fetches content from Prismic, and passes it to the HomePage component.
- `app/layout.tsx`: Provides the shared HTML document, metadata, and Prismic preview toolbar.
- `app/home-page/page.tsx`: Redirects `/home-page` to `/`.
- `app/slice-simulator/page.tsx`: Renders slices in isolation for Prismic's live previews.
- `app/api/`: Contains server endpoints for entering/exiting previews and revalidating cached content.

Add a folder with a `page.tsx` file to create another page route. For example,
`app/about/page.tsx` would handle `/about`.

### `components/` — reusable React presentation

This directory contains React components used by routes or other components.
Components define the JSX and presentation; they do not create URL routes.

`components/HomePage.tsx` receives the fetched page as a prop, renders its heading,
and uses `SliceZone` to render its ordered slices. Add shared UI such as navigation,
buttons, cards, and page layouts here.

### `customtypes/` — Prismic page and content field definitions

The folder is named `customtypes/` in lowercase. Each type has an `index.json`
model that describes its fields and, for page types, its available slices.

- `customtypes/home_page/`: The singleton Home Page type, with a heading, Slice Zone, and SEO fields.
- `customtypes/heading1/`: The existing standalone heading type used as the homepage fallback.
- `customtypes/editorial/`: The existing standalone Editorial content type. It is separate from the shared Editorial slice.

These models describe what editors can enter. The actual heading text, body copy,
and selected images live in documents in Prismic and are fetched through its API.
Use the Prismic CLI or Type Builder to change models rather than editing their
JSON files manually.

### `slices/` — reusable Prismic page sections

A slice pairs a content model with a local React component. Editors select and
reorder these sections in Prismic's Page Builder.

- `slices/Editorial/model.json`: Defines the Editorial slice's heading, body, and image fields.
- `slices/Editorial/index.tsx`: Defines the React/JSX layout that displays those fields.
- `slices/Editorial/README.md`: Describes the slice's implementation and usage.
- `slices/index.ts`: A generated mapping from slice API IDs to React components, consumed by `SliceZone`.

Change the JSX to change how a slice looks. Change its model when you need new
editable fields. Push model changes to Prismic and deploy React changes to Netlify.

## Pages and Prismic content

`app/page.tsx` fetches a published `home_page` document and renders
`components/HomePage.tsx`. Until a Home Page is published, it falls back to the
existing published `heading1` document. Other API errors are surfaced normally.

The shared client is configured in `prismicio.ts`, using the repository and
document URLs in `prismic.config.json`. Add routes under `app/` and query content:

```tsx
import { create_client } from '@/prismicio';

const client = create_client();
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

## Prismic commands and content fetching

Run CLI commands from the project root. They use the repository configured in
`prismic.config.json`. If prompted to authenticate, run `npx prismic login`.

### Check what changed

```sh
npx prismic status
```

This compares local models with Prismic and reports additions, updates, deletions,
and any model changes that must be committed before syncing.

### Push local models to Prismic

After changing models with the CLI, review and commit the relevant model files,
then push them:

```sh
npx prismic status
git diff -- customtypes/ slices/Editorial/model.json
git add customtypes/ slices/Editorial/model.json
git diff --cached
git commit -m "Update Prismic content models"
npx prismic push
```

Adjust the slice paths when working on other slices. Include any additional
changed model files reported by `status` and review the staged changes before
committing.

`push` sends model definitions to Prismic. React components remain in Git and are
deployed to Netlify. Document text and images are edited and published in Prismic.
Review deletion reports carefully; the CLI requires an explicit force option to
delete remote models.

### Pull model changes from Prismic

After editing fields or slices in Prismic's Type Builder, first commit any local
model changes you want to keep, then run:

```sh
npx prismic status
npx prismic pull
npm run typecheck
```

`pull` makes local model files match Prismic, regenerates TypeScript types, and
can scaffold missing page/slice components. Review the resulting Git diff. It
syncs model definitions; it does not download published documents into this repo.

### Fetch document content in the app

Content is loaded with the SDK inside server-side pages, rather than with the
CLI's `pull` command:

```tsx
import { create_client } from '@/prismicio';

const client = create_client();

// Fetch the published singleton homepage.
const home_page = await client.getSingle('home_page');

// Fetch all published standalone Editorial documents.
const editorial_documents = await client.getAllByType('editorial');
```

For a repeatable page type with a UID field, use
`client.getByUID('your_type', 'your-uid')` instead. Document fields are in
`home_page.data`, and its ordered slice content is in `home_page.data.slices`.
Render those fields with Prismic's React components and `SliceZone`.

Queries normally return published documents. An empty query can throw
`NotFoundError`; publish a matching document or handle the missing content in the
route. Draft documents are available through the configured preview flow.

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

## Coding standards

### Global colors and typography

`app/styles.css` is imported by the root layout and applies to every page.
Use its CSS custom properties when styling components:

| Token               | Value     | Usage                           |
| ------------------- | --------- | ------------------------------- |
| `--color-primary`   | `#7C3AED` | Main brand purple               |
| `--color-secondary` | `#A78BFA` | Lavender accents and links      |
| `--color-tertiary`  | `#38BDF8` | Cyan accents and keyboard focus |
| `--color-neutral`   | `#090D16` | Dark page background            |

Headings use **Plus Jakarta Sans**, body text uses **Inter**, and labels, buttons,
and code use **JetBrains Mono**. The `.label` class applies label typography to
other elements. The fonts are loaded through `next/font/google`, downloaded at
build time, and served by the application. Supporting surface/text colors and
responsive heading sizes are also defined in the global stylesheet.

### Source formatting

`AGENTS.md` adapts the shared Local Legends web and mobile coding conventions
to this Next.js project. Maintained source files use snake_case variables and
helpers, PascalCase components and types, JSDoc, object parameters, grouped
imports, and BEM class names. Framework signatures and external API names are
preserved. Existing TypeScript remains in place.

```sh
npm run format
npm run format:check
```

Prettier uses the correct parser for each file and the shared 100-column,
two-space, single-quote, no-trailing-comma settings. EditorConfig and VS Code
format-on-save settings are included; install the Prettier VS Code extension
to use the configured editor formatter. Generated Prismic and Next.js files,
content models, and lockfiles are excluded from formatting.
