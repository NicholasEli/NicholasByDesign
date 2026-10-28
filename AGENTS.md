# Project Instructions

## General

- Read `README.md` before making changes and update it when behavior or setup changes.
- Default to JavaScript for new standalone code. Preserve this project's existing TypeScript and TSX source files and generated Prismic types.
- Use `snake_case` for application variables and helper functions. Use PascalCase for React components, classes, and TypeScript types.
- Preserve framework-required exports and signatures, external API property names, and generated-code contracts. Alias camelCase props to snake_case locals when destructuring.
- Add file-level JSDoc to every maintained JavaScript/TypeScript source file and JSDoc to every function. JSON, Markdown, tool-owned declarations, and generated files are exempt.
- Pass function parameters as an object. Framework handlers, callbacks, and library-required signatures are exempt.
- Prefer early returns or separate `if` statements over `else` and `else if`.
- Do not nest ternary operators. Each ternary must have only two outcomes.
- Use explicit return values. Use `null` for an intentional empty value and an empty fragment for intentionally empty JSX, except where a framework requires another return contract.
- Preserve existing environment URLs, connection settings, and commented environment alternatives unless the user requests changing them.

## Import Order

Separate applicable import groups with a blank line:

1. React
2. Third-party packages, including Next.js and Prismic
3. Components
4. Data
5. API
6. Helpers, with `theme_variables` last when present
7. Styles

Use type-only imports for TypeScript types. Preserve directive placement such as `'use client'` before imports.

## React Structure and State

- Keep supporting functions inside their component by default. Extract them when shared, needed for memoization/performance, or when separation is necessary.
- Keep state values in snake_case and React setters in the `setState` convention, following the Local Legends `[set_state, setState] = useState(...)` naming pattern.
- Pass component props as an object.

## CSS / Styling

- Use BEM (`block__element--modifier`) class names.
- Reuse the shared section heading/body styles and body typography tokens for new sections. Treat current user-adjusted typography as the source of truth; do not introduce separate title/body font scales unless requested.
- Write mobile-first CSS: put the smallest-screen layout in base declarations and add larger-screen enhancements with ascending `@media (min-width: ...)` breakpoints.
- Reserve `max-width` media queries for a specific bounded or small-screen-only exception, and document why a mobile-first override cannot express it cleanly.
- `max-width` sizing properties remain appropriate for content containers, readable line lengths, and responsive media; this breakpoint preference does not prohibit those size constraints.
- Use this CSS property order:
  1. `width` / `height`
  2. Positioning, including `position`, `top`, `right`, `bottom`, `left`, and `z-index`
  3. `transform`
  4. Display and layout, preferring flexbox where practical
  5. `margin` / `padding`
  6. Font and text styles
  7. Background styles
  8. `overflow`
  9. `transition`
  10. `animation`
- Keep media queries after the base declaration they modify.
- Prefer flexbox unless another layout pattern is clearly better suited.

## Formatting and Generated Files

- Use the checked-in Prettier and EditorConfig settings: 100-column width, two spaces, single quotes, no trailing commas, semicolons, and parenthesized arrow parameters.
- Run `npm run format` to format maintained files and `npm run format:check` to check them. VS Code format-on-save is configured in `.vscode/settings.json`.
- Infer the parser from each file so TSX, JSON, and Markdown use their correct parsers; do not globally force Babel.
- Do not manually edit Prismic model JSON, generated slice indexes, generated declarations, or Next.js-owned declaration files. Use the Prismic CLI for model changes and generation.
- Follow `.prettierignore` so formatting does not rewrite generated files or Prismic models.
- Run `npm run typecheck` and `npm run build` for source changes that affect compilation or rendering.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
