# AgenticDraft — company website

The AgenticDraft one-pager, built with [Astro](https://astro.build) and editable through
[TinaCMS](https://tina.io/). Content is stored in the repo as JSON; the CMS writes commits
rather than talking to a database.

## Getting started

```sh
pnpm install
pnpm dev
```

- Site: http://localhost:4321
- CMS: http://localhost:4321/admin/

## How the content is modelled

The page is a **fixed layout with editable fields**, not a block builder — editors can change
copy, links and images, but can't delete or reorder sections, so the design can't be broken.

| Collection | File | What it holds |
|---|---|---|
| Home page | `src/content/page/home.json` | Hero, Approach, Workflow, Closing |
| Site settings | `src/content/config/config.json` | Site name, logo, nav, header button, footer tagline |

Both are declared in `tina/collections/`. The schema is the source of truth: change a field
there and the admin updates on the next `pnpm dev`.

Section numbers (`01`, `02` …) are generated from the list index, so adding a principle or a
workflow step can't leave a stale number behind. Headings that the design breaks across two
lines have a separate "second line" field so editors never have to type HTML.

## How the rendering works

```
tina/collections/*        schema
src/content/**/*.json     content
src/lib/data.ts           loaders (getHome, getConfig) over the generated Tina client
src/lib/islands.ts        registry of live-editable regions
src/components/sections/  Hero, Approach, Workflow, Closing
src/components/           BaseHead, Header, Footer
src/layouts/Base.astro    document shell
src/styles/global.css     the site's CSS
```

Styling is one hand-written global stylesheet — the original site's CSS, ported verbatim.
There is no CSS framework: the design is bespoke and a utility framework's reset would fight
it. Section markup uses the original class names.

Visual editing is wired through `@tinacms/astro`: each editable region is an "island" in
`src/lib/islands.ts`, and `/tina-island/[name]` re-renders just that region when an editor
changes a field. Note that an island's `wrapper` only accepts `{ tag, className }`, so the
page wrapper is a `div` and `<main id="main">` is rendered inside it by `PageBody.astro`.

## Building

```sh
pnpm build        # builds against TinaCloud — needs credentials
pnpm build:local  # offline build, no cloud checks
```

`pnpm build` requires TinaCloud credentials and fails fast with `ERR_MISSING_CLOUD_CREDS`
without them. Create a project at [app.tina.io](https://app.tina.io), then set
`PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` in `.env` (and in your host's environment
variables). For a purely local build use `pnpm build:local`, which skips the cloud checks.

## Deploying

Host-neutral. Every content page prerenders to static HTML; the only on-demand route is
`/tina-island`, which powers live visual editing.

`astro.config.mjs` picks the adapter from the platform's build environment —
[Vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/),
[Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) (Pages or
Workers) and [Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify/) are
detected automatically, and anything else falls back to a portable
[Node](https://docs.astro.build/en/guides/integrations-guide/node/) server
(`node ./dist/server/entry.mjs`).

Set `SITE_URL` to your production URL — it feeds the sitemap, canonical and OpenGraph tags.
Most platforms inject their own deploy URL as a fallback, but Cloudflare Workers exposes none.

## A note on React

`react` and `react-dom` are pinned to the same version (`^19.2.7`) in `devDependencies` for
the TinaCMS admin UI build only — the site itself ships zero React. The pin keeps the two in
lockstep; without it pnpm's peer auto-install can pair mismatched versions and the admin
crashes on init. Tracked in [tinacms#6985](https://github.com/tinacms/tinacms/issues/6985).
