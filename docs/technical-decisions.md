# Technical decisions

ADR-style log. Each entry: context, options, decision, consequences.

---

## ADR-001 Framework: Astro
_2026-11-09 · Accepted_

**Context.** A content-first portfolio with a few interactive moments, statically hosted.
**Options.** Astro (5 at the time; now 7); Next.js static export (current `md-portfolio-website`); Eleventy; SvelteKit static.
**Decision.** Astro 7, `output: 'static'`, TypeScript strict. (Originally written as Astro 5; moved to 7 on 2026-11-09 because 7 was current at scaffold time. See ADR-008.)
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
**DNS (checked 2026-11-09).** Registrar: Gandi (renews 2027-05-20). DNS: AWS Route 53 (`awsdns` name servers); apex A records point at S3 website endpoints. No MX records, so no email depends on this zone.
**Cut-over plan.** Keep DNS in Route 53. Replace the apex A records with GitHub Pages' four A (185.199.108–111.153) and AAAA records; add `www` CNAME → `mjd0530.github.io`; set the custom domain in repo Settings → Pages, verify the domain, enforce HTTPS. Lower TTLs a day ahead. Keep the S3 bucket for a week as rollback, then delete it.

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

## ADR-008 Phase 4 tooling
_2026-11-09 · Accepted_

**Versions.** Astro 7.4, `@astrojs/mdx` 8, `@astrojs/sitemap`, TypeScript 6 (`@astrojs/check` does not yet support TS 7), ESLint 9 flat config with `typescript-eslint` and `eslint-plugin-astro`, Prettier 3 with `prettier-plugin-astro`, Playwright + `@axe-core/playwright`, `@lhci/cli`. Node ≥ 22.23 locally; CI uses Node 24 LTS.
**Content schema.** `src/content.config.ts` imports `z` from `astro/zod` (the `astro:content` export is deprecated in 7).
**Formatting.** Prettier ignores `*.md` so hand-written docs keep their formatting; MDX and code are formatted.
**Tests.** Playwright runs against `astro preview` on port 4329 with `--ignore-lock`, because Astro 7 allows only one preview server per project and a background one may already be running on 4321. Route list lives in `tests/pages.ts`; every route is axe-checked in all three themes on a desktop and a mobile device.
**Lighthouse.** `lighthouserc.json` asserts Performance ≥ 0.95, Accessibility 1, SEO 1 (Best Practices warns below 0.95). Reports are written to `.lighthouseci/reports`, not public storage.
**CI/CD.** `.github/workflows/ci.yml`: every push and PR runs check, lint, build, tests and Lighthouse; pushes to `main` then build with `withastro/action@v6` and deploy with `actions/deploy-pages@v5`.
**One-time setup (Mike).** Repo Settings → Pages → Source: GitHub Actions. Custom domain is set by `public/CNAME`; DNS cut-over follows ADR-003.
