# Implementation plan

_Last updated: 2026-11-09 · Current phase: **2 → 3** (foundation docs done; waiting on design images)_

## Phase 1 — Discovery ✅
- [x] Inspect repos (`website` empty; `md-portfolio-website` = Next.js chat experiment; mikedemar.com = 2019 S3 site)
- [x] Analyze mikedemar.com and charleshonig.design
- [x] Framework, hosting and NDA assessment
- [x] Skills and capabilities review

## Phase 2 — Foundation and documentation ✅
- [x] CLAUDE.md
- [x] project-brief, design-direction, design-system (skeleton), sitemap, technical-decisions, component-library (plan), implementation-plan

## Phase 3 — Design strategy
- [ ] Mike adds design images to `design/reference/`
- [ ] Monogram SVG and new portrait
- [ ] Color palettes for light / dark / contrast with measured ratios
- [ ] Type scale and spacing values
- [ ] Navigation, interaction and motion details
- [ ] Case study page design (desktop + mobile)

## Phase 4 — Technical setup
- [ ] Scaffold Astro (TypeScript strict), Prettier, `astro check`
- [ ] Fontsource fonts
- [ ] Playwright + axe, Lighthouse CI
- [ ] GitHub Actions deploy to Pages; `CNAME`; DNS cut-over plan

## Phase 5 — Implementation
- [ ] Tokens + three themes + ThemeSwitcher
- [ ] BaseLayout, SiteHeader, SiteFooter, NavMenu
- [ ] Primitives and layout components
- [ ] Home
- [ ] Content collection + CaseStudyLayout
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
