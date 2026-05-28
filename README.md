# The Semio Group — Landing Page

Production React/Next.js build of the marketing landing page for **The Semio Group**, a strategic advisory firm for SaaS companies. Single-page scrolling site, fully static content, deployable to Vercel.

Built from the handoff in this folder (`CLAUDE.md`, `semio-mockup.html`, `content.json`, `assets/`).

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first `@theme` tokens; the clamp()-heavy section styles live in `globals.css`)
- **Space Grotesk** via `next/font/google` (weights 300/400/500/700)
- Inline SVG brand mark (no icon library); single `IntersectionObserver` for reveals; pure-CSS marquee & animations
- No runtime dependencies beyond React/Next

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
npm start          # serve the production build
npm run lint
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx        Font, metadata/OG tags, <IconDefs/> + <ScrollProgress/>
│   ├── page.tsx          Composes the 10 sections
│   └── globals.css       Design tokens (@theme + :root) and all section styles
├── components/
│   ├── Icon.tsx          ICON_PATH + <IconDefs/> (symbol & clipPath) + <Icon/>
│   ├── Logo.tsx          "semio" wordmark
│   ├── LogoLockup.tsx    "the / semio / group" lockup (footer)
│   ├── logoMarkup.ts     Auto-generated inlined SVG strings (namespaced ids)
│   ├── Reveal.tsx        IntersectionObserver fade-up wrapper (client)
│   ├── ScrollProgress.tsx  2px gradient scroll bar (client)
│   ├── Nav.tsx           Sticky nav, transparent → solid on scroll (client)
│   ├── Hero.tsx          Headline clip-reveal + grain-textured icon (client)
│   ├── IntroStatement.tsx
│   ├── Services.tsx
│   ├── ApproachBand.tsx
│   ├── WhyUs.tsx
│   ├── AdvisoryMarquee.tsx
│   ├── Clients.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/em.tsx            {{em:...}} token parser → weight-500 spans
└── content.json         All copy and lists (mapped, never hardcoded)

public/assets/            Brand SVGs, grain texture, 3D glass icon
```

## Content

All copy and lists live in `src/content.json`. Strings may contain `{{em:...}}`
tokens — these are rendered as weight-500 spans via `renderWithEm()` (see
`src/lib/em.tsx`), echoing the wordmark's `sem`-bold / `io`-light contrast.

## Brand icon

The mark is defined once as an SVG `<symbol>` and a `<clipPath>` in `Icon.tsx`,
rendered at the root via `<IconDefs/>`. Everything else references it with
`<use href="#semio-icon"/>` (`<Icon/>`), and the hero's grain-textured shape
uses the CSS `clip-path: url(#semio-icon-clip)`.

The two wordmark SVGs (`semio-logo.svg`, `semio-lockup-group.svg`) reuse the
same clipPath ids internally, so `src/components/logoMarkup.ts` inlines them
with namespaced ids to avoid collisions. Regenerate that file if the source
SVGs change.

## Deploy

Push to a Git remote and import into **Vercel** — zero config. The page is
statically prerendered (`○ (Static)` in the build output).

## Notes

- Animations respect `prefers-reduced-motion: reduce` (forces final reveal state).
- The Contact `mailto:` uses `brand.contactEmail` from `content.json`.
- `semio-mockup.html` and `CLAUDE.md` remain in the repo as the design reference.
