# mikedemar.com — Portfolio

Personal portfolio for Mike DeMar, UX/Product Designer (Cary, NC). Goal: a distinctive, editorial, accessible site that presents work through narrative case studies. Not a template.

Source of truth: `docs/` (brief, design direction, design system, components, sitemap, decisions, plan). Mike's design images (in `design/reference/`) override anything here or in my proposals.

## How we work
- Mike leads creative direction. Claude acts as senior designer + frontend engineer: recommend, explain why, challenge weak assumptions.
- Get approval before major design or architecture changes; log the decision in `docs/technical-decisions.md` or `docs/design-direction.md`.
- Explore and plan before building. Ask when requirements are unclear, a few questions at a time.
- Never delete or overwrite existing assets or content without understanding them first.
- Keep docs current in the same change as the code they describe.
- Branch per phase/feature; commit or push only when asked.

## Stack
- Astro 7, static output, TypeScript strict. Deployed to GitHub Pages via `withastro/action` (custom domain `mikedemar.com`).
- Plain CSS: tokens as custom properties, `@layer reset, tokens, base, layout, components, utilities`. No Tailwind, no CSS-in-JS.
- Zero client JS by default. Interactivity = small vanilla scripts in components; a framework island needs a documented reason.
- No new dependency without stating why and the alternative.
- Commands: `npm run dev` · `npm run build` · `npm run preview` · `npm run check` · `npm run test` (Playwright + axe) · `npm run lint`.

## Structure
- `src/styles/` tokens, reset, typography, layout
- `src/components/{primitives,layout,patterns,sections}/`: dependencies flow downward only
- `src/layouts/` BaseLayout → PageLayout, CaseStudyLayout
- `src/content/projects/<slug>/index.mdx` + images; schema in `src/content.config.ts`
- `src/pages/` thin: load content, choose a layout

## Components
- Reuse before creating. Extend with a prop/variant before adding a near-duplicate.
- Every component: typed `Props`, semantic tokens only (no raw hex/px outside `tokens.css`), works in all 3 themes and at all breakpoints, keyboard + screen-reader correct.
- Document each in `docs/component-library.md` (purpose, props, variants, a11y notes, example) when created or changed.
- Avoid speculative abstraction; three real uses before generalizing.

## Design principles
- Editorial and typography-led; whitespace is structure. One accent colour, low-chroma neutrals. No gradients, glass or decorative effects.
- Outcome first: every project surfaces outcome + Role / Years / Scope.
- Type: Instrument Serif (display), Instrument Sans (text), Geist Mono (metadata labels), self-hosted via Fontsource. Fluid sizes via `clamp()`; body ≥ 17px; measure 60–75ch. Scale in `docs/design-system.md`.
- Grid: 12 / 8 / 4 columns (desktop / tablet / mobile), 4px spacing base.

## Responsive
- Design each viewport deliberately; mobile is not a shrunken desktop. Check 360, 768, 1024, 1280, 1920 px.
- Touch targets ≥ 44×44px. Don't block zoom. No horizontal scroll at 320px or 400% zoom.

## Accessibility (WCAG 2.1 AA minimum)
- Semantic landmarks, one `h1` per page, no skipped heading levels, skip link.
- Contrast: 4.5:1 text, 3:1 large text/UI; high-contrast theme targets 7:1.
- Visible `:focus-visible` ring from `--color-focus` in every theme; logical tab order; no keyboard traps.
- Meaningful `alt` required by schema; decorative images `alt=""`.
- No single-key shortcuts, scroll-jacking, or custom cursors. Never render content that only appears after animation.

## Themes
- `light`, `dark`, `contrast` via `[data-theme]` on `<html>`. Primitive tokens → semantic tokens; components use semantic only.
- Resolution: saved choice → `prefers-contrast: more` → `prefers-color-scheme` → light. Inline head script prevents flash. Persist in `localStorage` (wrapped in try/catch).
- Contrast theme is its own design: pure surfaces, borders on interactive elements, underlined links, thick focus; also support `forced-colors`.
- Switcher is a labelled radio group, announced to screen readers.

## Motion
- Purposeful and quick: 150–400ms, tokenised easings. Prefer opacity/transform.
- Respect `prefers-reduced-motion`: no movement, instant or fade-only. Content is visible without JS.
- View Transitions for page changes; small reveal-on-scroll utility; no scroll-snap.

## Content & case studies
- Content model and sections: `docs/sitemap.md`. Adding a case study = new folder in `src/content/projects/`; no new page code.
- Write in Mike's first-person, plain voice. Don't invent metrics, quotes or outcomes. Leave `TODO(mike):` markers.

## Confidential content
- Password-protected case studies are deferred (v1 is all public). This repo is public: never commit confidential text, images or metrics.
- Case studies show only what is publicly released plus Mike's own process story; flag anything that looks internal and ask.
- If protected work returns, the agreed approach is a private repo on Cloudflare Pages + Access (`docs/technical-decisions.md`), never a client-side password.

## Verify before calling it done
- `npm run check && npm run build && npm run test` pass.
- Look at it in the built-in browser at mobile/tablet/desktop in all three themes, keyboard-only, and with reduced motion.
- axe: zero violations. Lighthouse: Performance ≥ 95, Accessibility 100, SEO 100.
- Report what was verified and what was not.

## Claude Code skills to use
- `frontend-design`: when designing/building UI (install from plugin directory).
- Design plugin: `accessibility-review` at each phase gate, `design-critique` on builds vs reference images, `ux-copy` for case-study text, `design-system` for token docs.
- `code-review` on each phase diff; `simplify` after component work; `security-review` before launch and for hosting changes; `run` to drive the dev server.
- Parallel subagents for QA: accessibility audit, visual QA across viewports × themes, code review.
