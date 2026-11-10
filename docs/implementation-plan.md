# Implementation plan

_Last updated: 2026-11-09 · Current phase: **3 + 4** (Phase 4 tooling done on `phase-4-setup`; Phase 3 waiting on design images)_

## Phase 1 — Discovery ✅
- [x] Inspect repos (`website` empty; `md-portfolio-website` = Next.js chat experiment; mikedemar.com = 2019 S3 site)
- [x] Analyze mikedemar.com and charleshonig.design
- [x] Framework, hosting and NDA assessment
- [x] Skills and capabilities review

## Phase 2 — Foundation and documentation ✅
- [x] CLAUDE.md
- [x] project-brief, design-direction, design-system (skeleton), sitemap, technical-decisions, component-library (plan), implementation-plan

## Phase 3 — Design strategy
- [x] Mike adds design images to `design/reference/` (home, case study)
- [x] New portrait (src/assets/portrait.jpg; monogram parked)
- [x] Color palettes for light / dark / contrast with measured ratios
- [x] Type scale and spacing values
- [ ] Navigation, interaction and motion details
- [x] Case study page design (desktop reference + approved responsive layout)

## Phase 4 — Technical setup
- [x] Scaffold Astro 7 (TypeScript strict), Prettier, ESLint, `astro check`
- [x] Fontsource fonts
- [x] Playwright + axe, Lighthouse CI
- [x] GitHub Actions deploy to Pages; `CNAME`; DNS cut-over plan (ADR-003)
- [x] Mike: set Pages source to GitHub Actions (2026-11-09)
- [ ] Merge `phase-4-setup` to `main` for first deploy

## Phase 5 — Implementation
- [x] Tokens + three themes + ThemeSwitcher
- [x] BaseLayout, SiteHeader, SiteFooter, NavMenu (+ ThemeSwitcher; stub About / Resume / Contact pages)
- [ ] Primitives and layout components
- [x] Home (placeholder images and copy)
- [x] Content collection + case study template (placeholder images and copy)
- [ ] Case studies: Magic Move, Hello Design System, Vantage
- [ ] Work, About, Contact, Resume, 404
- [ ] Motion polish

## Phase 6 — QA and launch
- [ ] axe: zero violations × 3 themes; keyboard and screen-reader pass (VoiceOver)
- [ ] Responsive: 360 / 768 / 1024 / 1280 / 1920; 400% zoom
- [ ] Reduced motion; no-JS rendering
- [ ] Lighthouse budgets; image weights
- [ ] SEO: titles, descriptions, OG images, sitemap.xml, robots.txt
- [ ] `security-review`, `code-review`
- [ ] DNS cut-over; HTTPS enforced; retire S3 bucket

## Gates (each phase)
Build, check and tests pass · visual QA in the browser · docs updated · Mike approves.
