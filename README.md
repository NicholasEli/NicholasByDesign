# NicholasByDesign

## TODO

-

Next.js App Router, React, Prismic, and Netlify.

## How Prismic content fits together

The structure goes from **page type → page document → slices → fields**.

### 1. Page types — the blueprints

A page type defines the structure available for a kind of page: its fields,
SEO metadata, and which slices editors can add. For example, a Home Page type
can allow Hero and Editorial slices, while a Blog Post type can have author
and publication-date fields plus article slices.

In this project, **Home Page** (`home_page`) is a page type. Its model lives in
`customtypes/home_page/index.json`. Its hero is fixed in React, while its description
is editable in Prismic.

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
controlling its JSX layout. `SliceZone` maps each slice API ID to a local component.
The fixed homepage hero is separate from this reorderable slice system.

### 4. Fields — the content inside pages and slices

Fields hold individual values such as text, rich text, images, links, and dates.
They can belong directly to a page or to a slice. Our Home Page has a page-level
`hero_description` field. The greeting and other hero labels are fixed in React.

For example, a page type configured to allow Editorial slices could contain:

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
- `app/layout.tsx`: Provides the shared HTML document, global navigation rail, metadata, and Prismic preview toolbar.
- `app/home-page/page.tsx`: Redirects `/home-page` to `/`.
- `app/slice-simulator/page.tsx`: Renders slices in isolation for Prismic's live previews.
- `app/api/`: Contains server endpoints for entering/exiting previews and revalidating cached content.

Add a folder with a `page.tsx` file to create another page route. For example,
`app/about/page.tsx` would handle `/about`.

### `components/` — reusable React presentation

This directory contains React components used by routes or other components.
Components define the JSX and presentation; they do not create URL routes.

`components/HomePage.tsx` receives the fetched page as a prop, renders the fixed
`HomeHero` component, and uses `SliceZone` to render any subsequent slices. Add shared UI such as navigation,
buttons, cards, and page layouts here. `components/SiteFooter.tsx` renders the
footer after the homepage's main content.

### `customtypes/` — Prismic page and content field definitions

The folder is named `customtypes/` in lowercase. Each type has an `index.json`
model that describes its fields and, for page types, its available slices.

- `customtypes/home_page/`: The singleton Home Page type, with the hero description, Slice Zone, and SEO fields.

Local models follow the current Prismic repository. The former standalone heading
and Editorial models were removed there and are no longer defined locally.

These models describe what editors can enter. The actual heading text, body copy,
and selected images live in documents in Prismic and are fetched through its API.
Use the Prismic CLI or Type Builder to change models rather than editing their
JSON files manually.

### `slices/` — reusable Prismic page sections

A slice pairs a content model with a local React component. Editors select and
reorder these sections in Prismic's Page Builder.

- `slices/IntroHero/model.json`: The existing IntroHero model pulled from Prismic and preserved unchanged.
- `slices/IntroHero/index.tsx`: The generated scaffold for that model; it is separate from the fixed hero.
- `slices/EngineeringPillars/index.tsx`: The reorderable engineering disciplines section, with an editable heading and introduction and fixed skill cards.
- `slices/AiArchitecture/index.tsx`: The reorderable AI convergence architecture section, with an editable heading and introduction and fixed flow/capability cards.
- `slices/Contact/index.tsx`: The contact section with editable introductory copy, fixed contact details, and an unconnected dispatch panel.
- `slices/Editorial/index.tsx`: The preserved Editorial implementation, currently unregistered because its model no longer exists in Prismic.
- `slices/index.ts`: A generated mapping from slice API IDs to React components, consumed by `SliceZone`.

Change the JSX to change how a slice looks. Change its model when you need new
editable fields. Push model changes to Prismic and deploy React changes to Netlify.

## Pages and Prismic content

`app/page.tsx` fetches a published `home_page` document and renders
`components/HomePage.tsx`. If no Home Page is published, the route returns a 404.
Other API errors are surfaced normally.

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

## Fixed homepage hero

`components/HomeHero.tsx` renders the homepage introduction before the Slice Zone.
It is fixed to the singleton Home Page and is not a reorderable slice. The existing
`intro_hero` model is preserved independently and is not automatically inserted.

To change the paragraph, open the Home Page document in Prismic, edit **Hero
description** (`hero_description`), and publish. This field accepts one paragraph.
An empty field displays the mockup's “Bridging the chasm…” copy. The greeting,
role labels and “INTEGRATE ME” button are maintained in React. The availability
line calculates the current quarter using `Math.ceil(current_month / 3)`, with
the month evaluated in `America/Los_Angeles`, and displays “Ready for Q4 Direct
Engagements”, for example. It updates on the next page request after a quarter changes.

The title uses Plus Jakarta Sans, supporting copy uses Inter, labels use
JetBrains Mono, and decorative HTML tags use La Belle Aurore. `app/hero.css`
contains the responsive layout and hero-scoped neon colors. The shared page
background is defined in `app/styles.css`. The SVG network forms an extruded **N** without filled letter
faces. A permanent outline, lattice rails, and crossbars keep it recognizable;
local cell diagonals randomly reconnect about every 0.98 seconds with fading
lines. Cyan, violet, and magenta outline accents and colored nodes add depth.
The existing floating rotation loop takes about 7.11 seconds and connection
fades take 400ms. The name's cyan/magenta offsets stay static. Reduced-motion
preferences stop rotation, rewiring, transitions, and smooth scrolling.

The contact button has a subtle cyan shadow that orbits on hover or keyboard focus;
reduced motion uses a static glow. Its native `#contact` link scrolls smoothly to
the first Contact slice when present, with automatic scrolling for reduced motion.
Styles use mobile-first base declarations. At `min-width: 481px`,
tablet typography and spacing are applied; at `min-width: 1024px`, the hero
switches to the desktop two-column layout. On smaller screens the wireframe
sits behind the text as a decorative layer.

## Engineering pillars

The **EngineeringPillars** slice (`engineering_pillars`) is available on Home Page.
Its first instance appears directly below the fixed hero. Editors can reorder or
remove it in the Slice Zone. Edit **Heading** (one H2) and **Description** (one
paragraph), then publish. Empty fields use the supplied mockup copy.

The eyebrow, compiled status, three cards, icons, feature lists, and stack chips
are maintained in React. Headings use Plus Jakarta Sans, prose uses Inter, and
labels/chips use JetBrains Mono. The decorative section tag uses La Belle Aurore.
Cards stack on mobile and tablet and form three equal columns at `min-width: 1024px`.
The section adds no animation or interactive card behavior.

The pillar icons use SVG Repo's [info circle](https://www.svgrepo.com/svg/525388/info-circle),
[Git](https://www.svgrepo.com/svg/473619/git), and
[copy](https://www.svgrepo.com/show/527658/copy.svg) vectors in that order. Their
geometry is stored inline and inherits each card's existing accent color; the
copy icon retains its duotone opacity.

`app/styles.css` owns shared `--color-neon-*` accents, muted/tag colors,
`--section-max-width`, and `--section-gutter`. Use `.section-shell` for horizontal
gutters, `.section-shell__container` for centered content, and
`.section-shell__tag` for decorative code annotations. These styles are shared by
the hero and pillars; the global brand palette is unchanged. Pillar card styling
lives in `app/pillars.css`, while hero-specific styling stays in `app/hero.css`.

## AI convergence architecture

The **AiArchitecture** slice (`ai_architecture`) follows Engineering Pillars on
Home Page. Editors can reorder or remove it in the Slice Zone. Only **Heading**
(one H2) and **Description** (one paragraph) are editable; empty fields use the
mockup's “AI-Augmented Systems Architecture” title and introduction.

The three ordered stages, code labels, inference metrics, icons, and three
capability cards are fixed in React. Metrics are illustrative design copy, not
live measurements. Both card rows stack on small screens and become three equal
columns at `min-width: 1024px`. The panel grain and shadows are static.

The slice uses the shared section container, tag, heading, description, fonts,
neon accents, panel/card colors, and border tokens in `app/styles.css`.
`.section-shell__heading` and `.section-shell__description` are also used by
Engineering Pillars. Architecture-specific styles live in `app/architecture.css`.

## Contact section

The **Contact** slice (`contact`) follows AI Architecture on Home Page. Only
**Heading** (one H2) and **Description** (one paragraph) are editable. Empty fields
use the mockup's “Let's Integrate.” title and introductory paragraph. The first
Contact instance gets `id="contact"`, even when reordered, so the hero button
scrolls to it. Additional instances get unique IDs.

The contact details, advisory note, and form labels are fixed in React.
`components/ContactForm.tsx` collects **name**, **email address**, **subject**, and
**message**, with native required-field and email validation. **Open Email Draft**
opens the visitor's configured mail application, addressed to
`nicholasbydesign@gmail.com`. The subject becomes the email subject; name, email,
and message become its body. Special characters and line breaks are URL-encoded.
The visitor reviews the draft and presses Send in their mail application. This
requires a configured `mailto:` handler; the website does not send or store the
entered information. Form values remain available after opening the draft.

Contact uses the existing `.section-shell__heading` and
`.section-shell__description` styles without its own heading/body scale. Form
controls reuse `--font-size-section-body`, `--font-weight-section-body`, and
`--line-height-section-body`, preserving the current Inter 300 / 1.55 treatment
and mobile/desktop sizes. `.section-shell__eyebrow` is shared with Engineering
Pillars, and `.section-shell__panel` shares static panel grain with AI Architecture.
Contact layout styles live in `app/contact.css`. The layout stacks below 1024px;
the name/email fields sit side by side from 768px.

## Global navigation

`components/SiteNavigation.tsx` renders a fixed left rail from the root layout,
shared by public pages. It contains the neon N refresh button, four main section
links and two social profile links. The primary links smoothly scroll to Home
(`#top`), Multidisciplinary Pillars (`#pillars`), AI-Augmented Architecture
(`#ai_architecture`), and Contact (`#contact`). Reduced-motion preferences use
automatic scrolling. From another public page, the links navigate to the
corresponding homepage section. The highlighted item follows the URL fragment,
including browser Back/Forward navigation. Clicking the N logo performs a full
refresh of the current page.

The secondary links open [LinkedIn](https://www.linkedin.com/in/nicholasbydesign/)
and [GitHub](https://github.com/NicholasEli) in new tabs. The LinkedIn URL matches
Contact, and the GitHub URL uses this repository's owner. All links and the
refresh button have accessible names and visible keyboard focus states.

The Pillars icon uses the supplied
[house of three pillars SVG](https://www.svgrepo.com/svg/148749/house-of-three-pillars).
Architecture uses the Process Improvement card's icon. Social icons come from
[Bootstrap Icons](https://github.com/twbs/icons), with the MIT license included in
`public/licenses/bootstrap-icons.txt`.

`app/navigation.css` reserves 56px beside the content on small screens and 80px
from `min-width: 1024px`. The rail
scrolls independently on short screens so every control remains reachable.
Page typography continues to use the existing shared styles.
The Next.js development badge is placed at the bottom-right to keep the bottom
social link accessible in local development.

Pillars and architecture keep their canonical anchor on the first matching slice
regardless of Slice Zone order. Repeated instances receive unique IDs.

The isolated `/slice-simulator` route omits the rail and its content offset so
editor previews keep their full canvas width. API handlers are unaffected.

## Footer

`components/SiteFooter.tsx` renders the fixed footer after the homepage content.
The copyright uses **NicholasByDesign** and calculates the current year on each
page request in `America/Los_Angeles`, matching the availability line's timezone.
No annual copy edit or deployment is required to advance the year.

The footer reuses shared gutters, container sizing, headline typography for the
brand, and JetBrains Mono label typography for the status and copyright. It stacks
and wraps on smaller screens, then uses a wrapping horizontal layout from 1024px.
Its styles live in `app/footer.css`. “All systems nominal” is fixed design copy.

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
git diff -- customtypes/ slices/IntroHero/model.json
git add customtypes/ slices/IntroHero/model.json
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

// Read the editable hero paragraph and ordered slices.
const hero_description = home_page.data.hero_description;
const slices = home_page.data.slices;
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

The main content wrapper uses one continuous vertical purple → blue → cyan →
magenta gradient based on the supplied background reference. It spans the full
page height through the footer, rather than restarting in each section. The
hero, content sections, and footer are transparent over it; navigation and card
surfaces retain their dark colors. `--site-background-gradient` defines the color
stops and `--site-background-tint` adds a 72% dark overlay for readable foreground
text. Lower the tint's opacity for a more vivid background. This is CSS-only and
does not load the reference image as an asset.

Use its CSS custom properties when styling components:

| Token               | Value     | Usage                           |
| ------------------- | --------- | ------------------------------- |
| `--color-primary`   | `#7C3AED` | Main brand purple               |
| `--color-secondary` | `#A78BFA` | Lavender accents and links      |
| `--color-tertiary`  | `#38BDF8` | Cyan accents and keyboard focus |
| `--color-neutral`   | `#090D16` | Dark page background            |

Headings use **Plus Jakarta Sans**, body text uses **Inter**, and labels, buttons,
and code use **JetBrains Mono**. Decorative hero tags use **La Belle Aurore**. The `.label` class applies label typography to
other elements. The fonts are loaded through `next/font/google`, downloaded at
build time, and served by the application. Supporting surface/text colors and
responsive heading sizes are also defined in the global stylesheet.

### Source formatting

`AGENTS.md` adapts the shared Local Legends web and mobile coding conventions
to this Next.js project. Maintained source files use snake_case variables and
helpers, PascalCase components and types, JSDoc, object parameters, grouped
imports, and BEM class names. Framework signatures and external API names are
preserved. Existing TypeScript remains in place.

Responsive CSS uses mobile-first base styles and ascending `min-width` media
queries. Use `max-width` media queries only for a documented special case.
Container and media sizing may still use `max-width` properties.

```sh
npm run format
npm run format:check
```

Prettier uses the correct parser for each file and the shared 100-column,
two-space, single-quote, no-trailing-comma settings. EditorConfig and VS Code
format-on-save settings are included; install the Prettier VS Code extension
to use the configured editor formatter. Generated Prismic and Next.js files,
content models, and lockfiles are excluded from formatting.
