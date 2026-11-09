# Technical decisions

ADR-style log. Each entry: context, options, decision, consequences.

---

## ADR-001 Framework: Astro
_2026-11-09 · Accepted_

**Context.** A content-first portfolio with a few interactive moments, statically hosted.
**Options.** Astro 5; Next.js static export (current `md-portfolio-website`); Eleventy; SvelteKit static.
**Decision.** Astro 5, `output: 'static'`, TypeScript strict.
**Why.** Zero client JS by default; typed content collections; built-in image optimization (`astro:assets`); built-in View Transitions; official GitHub Pages action. Next.js ships the React runtime on every page and loses image optimization in static export.
**Consequences.** Interactivity is vanilla scripts or opt-in islands. Content lives in MDX.

## ADR-002 Styling: plain CSS with tokens
_2026-11-09 · Accepted_

**Decision.** Custom properties for tokens; `@layer reset, tokens, base, layout, components, utilities`; scoped `<style>` in Astro components. No Tailwind.
**Why.** Three themes are cheap with semantic tokens; editorial typography is clearer in CSS than in utility classes; no build dependency.
**Revisit if** component styling becomes repetitive enough that utilities would help.

## ADR-003 Hosting: GitHub Pages + custom domain
_2026-11-09 · Accepted_

**Context.** mikedemar.com is currently a 2019 static site in AWS S3, served over HTTP only.
**Decision.** Deploy `mjd0530/website` to GitHub Pages via `withastro/action`; point mikedemar.com at it (`public/CNAME` plus DNS records); enforce HTTPS.
**Consequences.** The repo is public, so nothing confidential goes in it. `site: 'https://mikedemar.com'`, no `base` path needed. Retire the S3 bucket after cut-over.
**Open.** Registrar and DNS owner.

## ADR-004 Protected (NDA) case studies: deferred
_2026-11-09 · Deferred_

**Context.** GitHub Pages serves a public repo; client-side passwords don't protect anything that has been downloaded.
**Decision.** v1 has no protected content. If needed later: a separate **private repo on Cloudflare Pages behind Cloudflare Access** (email one-time code, per-viewer allowlist, revocable), at `private.mikedemar.com`, with `*.pages.dev` previews also locked.
**Rejected.** StatiCrypt-style encryption in a public repo (shared password, no revocation, ciphertext public forever).

## ADR-005 Motion
_2026-11-09 · Accepted_

**Decision.** CSS transitions; a small `IntersectionObserver` reveal utility; Astro View Transitions. No Framer Motion or GSAP by default.
**Rule.** Content is never hidden from no-JS or reduced-motion users.

## ADR-006 Quality gates
_2026-11-09 · Accepted_

`astro check`, Prettier, Playwright + `@axe-core/playwright` on every page in all three themes, Lighthouse CI budgets (Performance ≥ 95, Accessibility 100, SEO 100). All run in CI before deploy.

## ADR-007 Fonts
_2026-11-09 · Accepted_

Instrument Serif, Instrument Sans, Geist Mono, self-hosted via Fontsource; subset; `font-display: swap`; preload the display face.
