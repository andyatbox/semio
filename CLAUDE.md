# CLAUDE.md — Build Spec for The Semio Group Landing

This is the source of truth for building the Semio landing page. Read this first, then look at `semio-mockup.html` for the visual reference, and pull data from `content.json`. Sequenced prompts for vibe-coding live in `PROMPTS.md`.

The mockup is a complete, working single-file HTML. Treat it as a high-fidelity reference, not the architecture — the React build should reorganize it into clean components, but the visual output should match.

---

## 1. Project

- **Product**: Marketing landing page for *The Semio Group* — a strategic advisory firm for SaaS companies.
- **Scope**: Single-page scrolling site. No CMS. Content is static (lives in `content.json`).
- **Deliverable**: Production-ready React/Next.js app, responsive, accessible, deployable to Vercel.

## 2. Tech Stack

Recommended (matches Andy's usual stack):

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + CSS variables for design tokens (the mockup is already token-driven; tokens map straight to Tailwind theme)
- **Font**: Space Grotesk via `next/font/google` (weights 300, 400, 500, 700)
- **Icons / brand mark**: Inline SVG component (no icon library)
- **Animation**: CSS keyframes + a single `IntersectionObserver` for scroll reveals. No animation library required, but `framer-motion` is fine if preferred for reveals.
- **Deployment**: Vercel

Alternative stacks (Vite + React, Astro) are fine — the mockup is framework-agnostic.

## 3. Design System

### 3.1 Color

The site is **mostly black on white**. The grain gradient texture and the 3D glass icon are the only color/material moments.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#000000` | Default text, lines, logo |
| `--paper` | `#ffffff` | Page background |
| `--paper-soft` | `#f4f3f0` | Reserved (subtle off-white if needed) |
| `--muted` | `#6c6c6c` | Eyebrows, secondary labels |
| `--hairline` | `rgba(0,0,0,0.14)` | Section dividers, grid lines on white |
| `--hairline-light` | `rgba(255,255,255,0.18)` | Grid lines on black |
| `--g-red` | `#c43a5b` | Brand grain accent (red highlight) |
| `--g-purple` | `#6a4f93` | Brand grain accent (mid) |
| `--g-blue` | `#2f4a93` | Brand grain accent (deep) |

Per the brand book, the **logo wordmarks render only in pure `#000` or pure `#FFF`** — never colored. The brand grain texture only appears in the Hero icon, the Approach band, and the Contact button micro-accent.

### 3.2 Typography

- **Family**: Space Grotesk (Google Fonts variable, weights 300–700)
- **Dominant weight**: 300 (light). Heaviness comes from scale, not weight.
- **Weight contrast**: Selected words in headlines bump to 500 to echo the wordmark's `sem`-bold / `io`-light contrast. Mark these with `<span class="em">` (or a React `<Em>` component) — the brand book confirms this contrast pattern.
- **Letter-spacing**: `-0.02em` to `-0.04em` on display sizes. Slightly negative on body.
- **Line-height**: 0.95–1.05 on display, 1.4–1.55 on body.

Scale (use `clamp()` so all sizes are fluid):

| Token | clamp() |
|---|---|
| Display (hero headline) | `clamp(2.6rem, 6.4vw, 6.2rem)` |
| Section head | `clamp(2.2rem, 5.5vw, 4.4rem)` |
| Service row title | `clamp(1.9rem, 4.4vw, 3.9rem)` |
| Lead paragraph | `clamp(1.45rem, 3vw, 2.65rem)` |
| Body | `clamp(1rem, 1.25vw, 1.18rem)` |
| Eyebrow / label | `0.72rem` with `letter-spacing:0.22em` uppercase |

### 3.3 Spacing & Layout

- **Container max-width**: 1380px, centered.
- **Container padding-inline**: `clamp(20px, 5vw, 84px)`
- **Section vertical padding**: `clamp(80px, 11vw, 190px)`
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`

### 3.4 Motion

- **Hero load-in**: lines of the headline clip-reveal upward in sequence (~0.15s, 0.27s, 0.39s delays). Eyebrow, positioning copy, and scroll cue fade in after.
- **Headline reveal mask**: wrap each line in `overflow:hidden` with `padding-bottom:0.14em; margin-bottom:-0.14em` so descenders (`g`, `p`, `y`) aren't clipped.
- **Scroll progress bar**: 2px gradient bar fixed at the top, width = scroll percent.
- **Sticky nav**: transparent until ~40px scrolled, then `background:rgba(255,255,255,0.86)` + `backdrop-filter:blur(10px)` + hairline border, with shorter padding.
- **Reveal-on-scroll**: every section element with class `reveal` (or React `<Reveal>` wrapper) fades up 34px on intersection. Single `IntersectionObserver` with threshold 0.14, rootMargin `0px 0px -8% 0px`.
- **Hero icon float**: 9s ease-in-out infinite, translateY 0 → -22px, scale 1 → 1.025.
- **Service row hover**: title shifts right by ~clamp(6px,1vw,18px); the brand-icon "ball" scales/rotates in (from `rotate(-30deg) scale(0.6)` to `rotate(0) scale(1)` + width 0 → full); a `↗` arrow fades in on the right.
- **Marquee**: 38s linear infinite. Track is duplicated x2 and translateX from 0 to -50% for a seamless loop. Pauses on hover.
- **Contact button**: gap grows 14 → 22px on hover; dot icon rotates 45°; bg fills black, text/icon invert.
- **Client cards**: bg fills black on hover, text inverts.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables all animations and forces final reveal state.

### 3.5 Breakpoints

- **Desktop (default)**: ≥ 901px
- **Tablet / small desktop**: ≤ 900px — hero icon repositions
- **Mobile**: ≤ 820px — grids collapse, nav links hide (Contact pill remains), contact stacks
- **Narrow mobile**: ≤ 680px and ≤ 520px — further grid collapses (why-us 2→1 col, clients 3→2→1 col)

---

## 4. Assets

All assets live in `assets/`. In Next.js, move them to `/public/assets/` and reference via `/assets/filename`.

| File | Type | Use |
|---|---|---|
| `semio-logo.svg` | SVG, single path, `fill="currentColor"` | Primary wordmark "semio" — nav, anywhere the simple wordmark is needed. Black on white, white on black. Never colored. |
| `semio-lockup-group.svg` | SVG, single path, `fill="currentColor"` | Stacked "the / semio / group" lockup — footer hero element, large. |
| `semio-icon.svg` | SVG, single path on `viewBox="0 0 250 250.0296"` | The brand icon mark (S with four lobes). Used as: service-row hover ball, marquee bullets, contact button dot, hero icon shape (via clipPath). |
| `semio-icon-color.png` | 908×908 PNG, RGB (black bg) | Reference asset. **Don't use directly on white** — its bg is black. Instead, fill the SVG icon shape with the grain texture using a clipPath. |
| `semio-icon-3d.jpg` | 1200×1200 JPG (white bg) | Photographed glass version of the icon — used as the right-side anchor in the Contact section. Apply `mix-blend-mode: multiply` so the white bg dissolves into the section. |
| `retro-o.jpg` | 1400×934 JPG | The brand grain gradient texture. Used as: hero icon fill (via clipPath), full-bleed Approach band background. |

### Icon reuse pattern

Define the brand icon path once via SVG `<symbol>` and reference it everywhere via `<use>`. This is the cleanest React pattern:

```tsx
// components/Icon.tsx
export function IconDefs() {
  return (
    <svg width="0" height="0" style={{position:'absolute'}} aria-hidden>
      <defs>
        <symbol id="semio-icon" viewBox="0 0 250 250.0296">
          <path d={ICON_PATH} fill="currentColor" />
        </symbol>
        <clipPath id="semio-icon-clip" clipPathUnits="objectBoundingBox">
          {/* viewBox 250x250.0296 → scale 1/250, 1/250.0296 */}
          <path d={ICON_PATH} transform="scale(0.004 0.0039995)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 250.0296" className={className} aria-hidden>
      <use href="#semio-icon" />
    </svg>
  )
}
```

Render `<IconDefs />` once at the root layout, then drop `<Icon />` anywhere.

The grain-textured hero icon uses CSS `clip-path: url(#semio-icon-clip)` on a `<div>` with `background-image: url('/assets/retro-o.jpg')`. Pure SVG and CSS — no extra image processing needed.

The actual path data is the `d=""` attribute inside `assets/semio-icon.svg`. Copy it once into a constant (`ICON_PATH`) in `components/Icon.tsx`.

---

## 5. Component Map

Each `<section data-component>` in the mockup maps to one React component. Build in this order — each one is self-contained.

| # | Component | Mockup section | Notes |
|---|---|---|---|
| 1 | `<Nav />` | `.nav` | Sticky, transparent → solid on scroll. Holds wordmark + 3 links + Contact pill. |
| 2 | `<Hero />` | `.hero` | Eyebrow, big headline with line-by-line reveal, positioning copy, index, scroll cue. The brand-icon shape filled with the grain texture floats on the right and animates a subtle 9s float. |
| 3 | `<IntroStatement />` | `.intro` | 2-column: sticky `(About) / 02` label on left, lead paragraph + 2 body paragraphs on right. Lead uses `<Em>` on the key terms. |
| 4 | `<Services />` | `.services` | Section header + 4 numbered hover rows. Each row: number, title with hover ball, description, `↗` arrow. Data-driven from `content.services`. |
| 5 | `<ApproachBand />` | `.approach` | Full-bleed grain texture, dark overlay, white text. Big statement + 4 numbered focus cells in a hairline grid. |
| 6 | `<WhyUs />` | `.why` | Section header + 2×2 grid of differentiators on hairline grid. Data-driven from `content.whyUs`. |
| 7 | `<AdvisoryMarquee />` | `.marquee` | Black band with `Core Advisory Areas` label, then a horizontal infinite-scrolling list of 8 areas separated by the brand-icon mark. Track duplicated for seamless loop. Pauses on hover. |
| 8 | `<Clients />` | `.clients` | Section header + 3×2 grid of client types. Cells invert (black bg, white text) on hover. Data-driven from `content.clients`. |
| 9 | `<Contact />` | `.contact` | Big "Let's build growth together." headline left. Copy + Contact Us pill right. The 3D glass icon sits absolute on the right at low z-index, blended via `mix-blend-mode:multiply`. |
| 10 | `<Footer />` | `.footer` | Black anchor. Large white "the semio group" lockup, tagline, link nav, copyright + tagline line. |

### Plumbing components

- `<IconDefs />` — render once in root layout.
- `<Icon />` — the brand icon `<use>` (used in service hover, marquee bullets, contact button, anywhere a "ball" appears).
- `<Logo />` — semio wordmark (`semio-logo.svg`).
- `<LogoLockup />` — group lockup (`semio-lockup-group.svg`).
- `<Reveal>` — wrapper that uses IntersectionObserver to add `in-view` class for scroll-up fade.
- `<ScrollProgress />` — fixed 2px gradient bar at top, width = scroll percent.

### Helpers

- `<Em>{text}</Em>` → `<span className="font-medium">{text}</span>`. Used by content marked with `{{em:...}}` tokens in `content.json` (lead paragraph, contact headline).

---

## 6. Accessibility

- Semantic `<header>`, `<main>`, `<section>`, `<footer>` (already in the mockup).
- Each section gets an `aria-label` if it lacks a heading.
- Brand icon SVGs are decorative — set `aria-hidden="true"` on every `<Icon>` and on the hero/contact glass elements.
- Marquee: `aria-label="Core advisory areas"` on the wrapper. The duplicate track for the loop is `aria-hidden="true"`.
- Color contrast: black on white passes AAA. Eyebrows use `--muted` (#6c6c6c) which is ~4.7:1 on white — passes AA for small text at 0.72rem only at 500 weight; nudge to `#5e5e5e` if a contrast tool flags it.
- Focus rings: don't suppress browser defaults. The nav links have a CSS underline animation but keep `:focus-visible` outline.
- Reduced motion: implemented in mockup CSS — preserve it.

## 7. Responsive Behaviour

Already specified in the mockup. Verify after every component build:

- **≤ 900px**: hero icon repositions to bottom-right, lower opacity (atmospheric).
- **≤ 820px**: nav links hide (only logo + Contact pill remain); approach focus grid 4 → 2 cols; service row main grid becomes 1 col; contact stacks; clients grid 3 → 2 cols.
- **≤ 680px**: why-us grid 2 → 1 col.
- **≤ 520px**: approach focus 2 → 1 col; clients 2 → 1 col.

## 8. Content

All content lives in `content.json`. Two conventions:

- **`{{em:...}}` tokens**: Wrap the marked text in an `<Em>` component. Example: `"The Semio Group is a consulting and advisory firm helping SaaS companies accelerate growth through {{em:channel partnerships, enterprise relationships, data monetization,}} and go-to-market strategy."`
- **Arrays**: Always render via `.map()`. Don't hardcode service titles, client names, or advisory areas — they all come from `content.json`.

A simple parser:

```tsx
function renderWithEm(text: string) {
  return text.split(/(\{\{em:[^}]+\}\})/).map((part, i) =>
    part.startsWith('{{em:')
      ? <span key={i} className="font-medium">{part.slice(5, -2)}</span>
      : part
  )
}
```

## 9. Performance

- Self-host Space Grotesk via `next/font/google` so it's preloaded.
- All assets are static — drop them in `/public/assets/` and use `<Image>` with `priority` for the hero/contact decorative images.
- The grain texture (`retro-o.jpg`) is ~290KB. Consider providing a `.webp` alongside (~80–120KB) and using `<picture>` if you want to optimize further. Same for the 3D glass JPG.
- The mockup uses base64-inlined images for portability. The React build should reference files from `/public` instead.

## 10. Definition of Done

- All 10 components built and visually match the mockup at 1440px, 1024px, 768px, 390px.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- All animations respect `prefers-reduced-motion`.
- Marquee pauses on hover; no layout shift.
- Contact `mailto:` link works.
- No console errors, no hydration warnings.
- Repo includes a `README.md` and `.env.example` if any env vars get added later.
