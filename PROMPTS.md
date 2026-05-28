# PROMPTS.md — Sequenced Build Prompts for Claude Code

Each prompt below is one focused step. Paste them into Claude Code one at a time, review the result, then move on. Every prompt assumes Claude Code can read `CLAUDE.md`, `content.json`, `semio-mockup.html`, and everything in `assets/`.

> **Tip:** Start by telling Claude Code: *"Read `CLAUDE.md` end-to-end and skim `semio-mockup.html`. Don't write any code yet — confirm you understand the design system, component map, and asset usage."* That primes it before you start step 1.

---

## Step 0 — Project Bootstrap *(skip if you already have a Next.js project)*

```
Bootstrap a fresh Next.js 15 project named "semio" with TypeScript, Tailwind CSS v4, App Router, ESLint, and the `src/` directory. Don't add any other dependencies yet. After scaffolding, copy the entire `assets/` folder into `public/assets/`, and copy `content.json` to `src/content.json`. Show me the resulting file tree, then stop for review.
```

---

## Step 1 — Design Tokens, Fonts, Globals

```
Read CLAUDE.md section 3 (Design System). Then:

1. In `src/app/layout.tsx`, load Space Grotesk via `next/font/google` with weights 300, 400, 500, 700 and a CSS variable `--font-grotesk`.
2. In `src/app/globals.css`, define every design token from section 3.1 as a CSS variable on `:root`. Set body to use the font variable, weight 300, antialiased.
3. Implement the universal reset, container utility (max-width 1380px, padding-inline clamp(20px,5vw,84px)), the `.eyebrow` class, and the `prefers-reduced-motion` guard.
4. In `tailwind.config.ts`, extend the theme with the color tokens, font family, and easing — but plan to use CSS for clamp() type sizes (Tailwind doesn't handle them gracefully).

Don't build any components yet. Show me the globals.css and layout.tsx, then stop.
```

---

## Step 2 — Brand Icon Primitives

```
Read CLAUDE.md section 4 (Assets) and the snippet about the icon reuse pattern. Then:

1. Create `src/components/Icon.tsx` exporting three things:
   - `ICON_PATH` — the `d` attribute value copied verbatim from `public/assets/semio-icon.svg`.
   - `IconDefs` — a hidden SVG holding a `<symbol id="semio-icon">` and a `<clipPath id="semio-icon-clip" clipPathUnits="objectBoundingBox">` (path transform=scale(0.004 0.0039995)).
   - `Icon` — a tiny `<svg><use href="#semio-icon"/></svg>` that takes a className.

2. Create `src/components/Logo.tsx` and `src/components/LogoLockup.tsx` — each inlines its SVG from `public/assets/semio-logo.svg` and `public/assets/semio-lockup-group.svg` respectively, with `fill="currentColor"`.

3. Render `<IconDefs />` once at the top of `src/app/layout.tsx` body.

Test that `<Icon className="w-6 h-6 text-black" />` renders the mark on a temp page. Then stop.
```

---

## Step 3 — Reveal + ScrollProgress Primitives

```
Read CLAUDE.md section 3.4 (Motion). Then:

1. Create `src/components/Reveal.tsx` — a client component that wraps children, uses a single `IntersectionObserver` to add an `in-view` class once visible (threshold 0.14, rootMargin '0px 0px -8% 0px'), and supports `delay` prop with `d1` / `d2` / `d3` modifiers.
2. Create `src/components/ScrollProgress.tsx` — a client component that renders a 2px fixed top bar whose width matches scroll percentage, colored with the brand grain accent gradient.
3. Add the `.reveal` / `.reveal.in-view` / `.reveal.d1/d2/d3` CSS to `globals.css`.

Render `<ScrollProgress />` once in `layout.tsx`. Then stop.
```

---

## Step 4 — Nav

```
Build `src/components/Nav.tsx` matching the `.nav` section in `semio-mockup.html`:

- Fixed at top, transparent by default
- Scroll listener (or sticky observer) adds `scrolled` state at >40px → background `rgba(255,255,255,0.86)`, `backdrop-filter:blur(10px)`, hairline bottom border, tighter padding
- Left: `<Logo />` linking to `#top`, 22px tall
- Right: 3 nav links + a `.nav__cta` Contact pill — map over `content.nav` from `content.json`
- Hover: nav links get a left-anchored underline that grows
- Mobile (≤760px): hide the nav links, keep only Logo + Contact pill

Render it in `src/app/page.tsx` over a blank white viewport for now. Then stop.
```

---

## Step 5 — Hero

```
Build `src/components/Hero.tsx` matching the `.hero` section. This is the showpiece — get it pixel-close.

Structure:
- `<section className="hero container">` with `min-height:100svh`
- `<div className="hero__icon">` — absolute positioned right side, a div with background-image `/assets/retro-o.jpg` clipped by CSS `clip-path: url(#semio-icon-clip)`. 9s infinite float animation. Right-side positioning per CLAUDE.md section 7.
- `<div className="hero__top">` containing just the eyebrow "The Semio Group"
- `<h1 className="hero__headline">` with three lines, each wrapped in a `<span className="line"><span>...</span></span>` for the clip-reveal animation. The word "value." gets the Em treatment (font-weight:500).
- `<div className="hero__sub">` containing positioning copy (left), the small index "01 — Strategic Advisory for the Modern SaaS Economy" (middle), and a scroll cue with the animated dash (right).

Animation:
- On mount (use `useEffect` to add `.play` to body), trigger the staggered headline reveal and fade-up of eyebrow / positioning / index / scroll cue with delays 0.15s, 0.27s, 0.39s, 0.55s, 0.7s.
- Critical: each `.line` wrapper needs `overflow:hidden`, `padding-bottom:0.14em`, `margin-bottom:-0.14em` so the descender in "Driving" isn't clipped.

Replace `<main>` in page.tsx with `<main id="top"><Hero /></main>`. Then stop and let me eyeball it against the mockup.
```

---

## Step 6 — IntroStatement

```
Build `src/components/IntroStatement.tsx` matching the `.intro` section.

- 2-col grid: `minmax(0,0.32fr) minmax(0,1fr)` with large gap, stacks to 1 col under 820px
- Left col: sticky `(About) / 02` eyebrow
- Right col:
  - Lead paragraph from `content.intro.lead` — render through the `{{em:...}}` parser so the marked phrases bump to weight 500
  - Two body paragraphs from `content.intro.body`, each wrapped in `<Reveal delay="d1">` / `<Reveal delay="d2">`

Add it to page.tsx below `<Hero />`. Stop.
```

---

## Step 7 — Services

```
Build `src/components/Services.tsx` matching the `.services` section.

- Section header pattern: `<div className="section-head">` with `<h2>What We Do</h2>` + a "SERVICES / 04" count label
- Map over `content.services` to render 4 `.srow` blocks. Each row:
  - 2-col grid: number (`01`) | main content
  - Main grid: title + description
  - Title contains a `<span className="srow__dot"><Icon /></span>` that starts at width:0 (so it's hidden), with the title and description visible
  - On row hover: dot expands width from 0 to clamp(28px,3.4vw,52px) AND rotates from -30deg to 0; title shifts right; an `↗` arrow on the far right fades in
- Hairline borders between rows
- Stacks to 1 col under 820px (arrow hidden, dot still works inline)

Add it to page.tsx. Stop.
```

---

## Step 8 — ApproachBand

```
Build `src/components/ApproachBand.tsx` matching the `.approach` section.

- Full-bleed (escape the container) — give it `position:relative` and an absolute child `.approach__bg` with `background-image:/assets/retro-o.jpg`, `background-size:cover`, plus a darker overlay (`linear-gradient(180deg, rgba(10,15,40,0.28), rgba(10,15,40,0.42))`)
- White text
- Eyebrow: "Our Approach / 03"
- Statement: `content.approach.statement` — clamp(2rem,5vw,4.6rem), weight 300, max-width 18ch
- 4-cell focus grid from `content.approach.focuses` — semitransparent dividers, transparent backdrop-blur cells. 4 → 2 cols at ≤820px, 2 → 1 at ≤480px.

Add `id="approach"` to the section. Add it to page.tsx after IntroStatement-or-Services per the layout order (Services → Approach). Stop.
```

---

## Step 9 — WhyUs

```
Build `src/components/WhyUs.tsx` matching the `.why` section.

- Section header "Why The Semio Group" + "DIFFERENTIATORS / 04"
- 2×2 grid with 1px hairline gaps (use a hairline grid: container has `background:var(--hairline)` and gap:1px; each cell has `background:var(--paper)`)
- Each cell: number top, title bottom (margin-top:auto), description below title
- Map over `content.whyUs`
- 2 → 1 col under 680px

Add `id="why"` to the section. Add to page.tsx. Stop.
```

---

## Step 10 — AdvisoryMarquee

```
Build `src/components/AdvisoryMarquee.tsx` matching the `.marquee` section.

- Full-bleed black band, white text
- Inside the container: eyebrow "Core Advisory Areas" in muted-on-black
- Below: `.marquee__track` (display:flex, width:max-content) that animates `translateX` from 0 to -50% over 38s linear infinite
- Inside the track, render the items list TWICE so the loop is seamless. Each items list joins `content.advisoryAreas` with `<Icon className="bullet" />` separators
- The second copy is `aria-hidden`
- `:hover` on `.marquee` pauses the animation

Add to page.tsx. Stop.
```

---

## Step 11 — Clients

```
Build `src/components/Clients.tsx` matching the `.clients` section.

- Section header "Who We Work With" + "PARTNERS / 06"
- 3×2 grid with hairline gaps (same pattern as WhyUs)
- Each cell: number top, name bottom (margin-top:auto with large gap)
- Hover: cell bg becomes black, text white (transition both)
- 3 → 2 cols at ≤820px, 2 → 1 at ≤520px
- Map over `content.clients`

Add to page.tsx. Stop.
```

---

## Step 12 — Contact

```
Build `src/components/Contact.tsx` matching the `.contact` section.

- `<section id="contact" className="contact container">` with `position:relative` and `overflow:hidden`
- A `.contact__glass` `<img src="/assets/semio-icon-3d.jpg">` absolute positioned right side, mid height, rotated -4deg, width clamp(320px, 44vw, 580px), `mix-blend-mode:multiply`, `pointer-events:none`. Make sure it stays inside the section bounds (right:clamp(8px,2vw,40px), no negative offsets).
- `.contact__inner`: 2-col grid (`1fr / 0.65fr`), z-index above the glass
  - Left: huge headline from `content.contact.headline` (with Em on "growth")
  - Right: copy from `content.contact.copy` + a `.contact__btn` mailto link with `<Icon className="dot" />` + "Contact Us"
- Button hover: gap widens 14 → 22px, bg fills black, text/icon invert, dot rotates 45deg
- Mobile: stack to 1 col; glass moves to bottom-right contained, opacity:0.5

Add to page.tsx. Stop.
```

---

## Step 13 — Footer

```
Build `src/components/Footer.tsx` matching the `.footer` section.

- Black bg, white text, full width
- Big `<LogoLockup />` (white) at the top, height clamp(120px,20vw,230px)
- Then a row: tagline (`Strategic Advisory for the Modern SaaS Economy.`) on left, footer nav links on right (same items as nav + "Back to top ↑" that targets `#top`)
- Base row at bottom: copyright with current year (`new Date().getFullYear()`) + tagline line, both in muted white

Add to page.tsx as the last element. Stop.
```

---

## Step 14 — Polish & QA

```
1. Verify every section is wrapped in `<Reveal>` where appropriate (sections, service rows, why cells, client cells).
2. Confirm `<IconDefs />` is rendered once in layout.tsx and the brand icon `<use href="#semio-icon">` actually displays at every usage site (hero clip uses CSS clip-path, others use SVG use).
3. Add a 2px scroll-progress bar at top via `<ScrollProgress />`.
4. Make sure `prefers-reduced-motion: reduce` kills all transitions and forces reveal final state.
5. Run Lighthouse on the deployed Vercel preview, target ≥90/95/95/95.
6. Add `<head>` metadata: title "The Semio Group — Strategic Advisory for the Modern SaaS Economy", a brief description from the intro lead, Open Graph tags using the brand icon color PNG as the social image.

Show me a diff of any cleanup needed, then we're done.
```

---

## Bonus — Optional Niceties

If you want to polish further later, here are ideas Claude Code can implement in single prompts:

- **Cursor follower**: small filled icon that lerps toward the mouse cursor, hidden on touch devices.
- **Hero icon parallax**: subtle scroll-driven translate of the hero brand-icon — multiplier ~0.15.
- **Approach band parallax**: same idea on the grain texture background — `background-attachment:fixed` or transform-driven.
- **View-source easter egg**: ASCII art of the brand icon in an HTML comment at the top of the page.
- **Open Graph image generation**: use Next.js `opengraph-image.tsx` to render a dynamic OG card with the brand icon + tagline.
