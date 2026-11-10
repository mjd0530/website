# Sitemap and content model

_Last updated: 2026-11-09_

## Pages
| URL | Page | Template | Content |
| --- | --- | --- | --- |
| `/` | Home | PageLayout | Left rail: intro (name, portrait, Cary line, philosophy, current role). Right: "Work" 2×2 project card grid, then one ProjectSpotlight per project |
| `/work/` | Work | PageLayout | All projects, featured first |
| `/work/magic-move/` | Case study | CaseStudyLayout | Magic Move |
| `/work/hello-design-system/` | Case study | CaseStudyLayout | Hello Design System |
| `/work/vantage/` | Case study | CaseStudyLayout | Vantage |
| `/about/` | About | PageLayout | Portrait, bio, point of view, experience, patents, resume links |
| `/contact/` | Contact | PageLayout | Email, LinkedIn, Dribbble, resume |
| `/resume/` | Resume | PageLayout | Accessible HTML resume + PDF download |
| `/404` | Not found | PageLayout | Friendly message, links home and to Work |

## Navigation
- Primary: Home · About · Resume · Contact (text links, left-aligned; active page bold, `aria-current="page"`). No logo in v1. Theme switcher at the right end of the nav row.
- Mobile: the same four links stay inline (no hamburger); the theme button becomes icon-only. The header is sticky with a frosted backdrop at every size.
- Footer: © year, LinkedIn, Dribbble, Resume.

## Case study content model
One folder per project: `src/content/projects/<slug>/index.mdx` plus its images. The schema lives in `src/content.config.ts`; a missing required field fails the build.

```yaml
title: Smart Share / Magic Move     # required
subtitle: One-line headline         # required, gray line under the title
summary: Outcome-first sentence(s). # required, home spotlight + case-study intro
client: Lenovo UXD · Project Fuji   # required (screen-reader text on the card)
years: "2024–2025"                  # required (not displayed yet)
role: Lead UX Designer              # required
scope: [Strategy, Research]         # required
awards: "…"                         # optional
team: "…"                           # optional
impact:                             # optional, 0–4
  - { value: "40%", label: "Faster UI build time" }
# Image slots: src optional while assets are gathered (placeholder tile shown)
cover: { src: ./cover.png, alt: "…", label: "…" }
hero: { src: ./hero.png, alt: "…" }
spotlight:                          # exactly 3: wide, then two
  - { src: ./wide.png, alt: "…" }
  - { src: ./a.png, alt: "…" }
  - { src: ./b.png, alt: "…" }
sections:                           # TOC; each id needs a <CaseStudySection id>
  - { id: overview, label: Overview }   # overview = the page header
  - { id: impact, label: Impact }
featured: true
order: 1
status: public                      # public | archive
```

### Body sections
Each group is a `<CaseStudySection id="…">` wrapping one or more `##` headings; the table of contents comes from the `sections` frontmatter, and a test checks every entry has a matching section. Overview is the page header.
1. Overview
2. Challenge and opportunity
3. Role and responsibilities
4. Research and discovery
5. Strategy and approach
6. Explorations
7. Final designs
8. Outcomes and impact

**Skim mode:** content wrapped in `<Summary>` stays visible when the reader chooses Skim. Full is the default, so the page works without JS.

### Writing rules
- First person, plain language, specific.
- Never invent metrics, quotes or outcomes; leave `TODO(mike):`.
- Use only publicly released material for shipped work (for example Magic Move).

## Adding images
Put each project's images in its own folder, next to its `index.mdx`:

```
src/content/projects/magic-move/
  index.mdx
  images/
    cover.png  hero.png  spotlight-wide.png  spotlight-a.png  spotlight-b.png
    process-mapping.png  delivery-tap-share.png …
```

- **One large file per image, no `@2x` suffix.** Export at 2× the largest display size; Astro generates the smaller sizes and modern formats at build.
- **Export widths:** cover 1000px (16:9-ish, 458:258) · hero 2000px (950:528) · spotlight wide 2000px (950:378) · spotlight pair 1000px (16:9) · process galleries 2000px (3:1) · delivery grid 1000px (16:9). Other ratios are cropped to fit (`object-fit: cover`).
- **Formats:** PNG for UI screenshots, JPG for photos. Lowercase-hyphen names.
- **Frontmatter images:** `hero: { src: ./images/hero.png, alt: "…", label: "…" }`.
- **Two texts per image:** `alt` is the full description for screen readers; `label` is a 2–5 word descriptor shown as the hover tooltip and the full-screen caption.
- **Originals:** keep full-resolution exports in `design/source/<project>/` (git-ignored). Make web copies in `images/` with:
  - boards and flows: `npm run image -- design/source/<project>/<file>.png src/content/projects/<slug>/images/<name>.png` (trims built-in white/grey margins so the content fills the card, adds an even 2% margin, caps at 3200px)
  - photos and renders: add `--photo` (no trim; 2400px JPG)
- **Cards are full bleed:** images fill their card. Every card in a gallery, grid or spotlight has a fixed shape (galleries 3:1) and crops from the centre, so cards line up. Clicking any image opens the full-screen viewer.
- **Body images (galleries, grids):** import at the top of the MDX, then pass the import:
  `import flow1 from './images/flow-1.png';` and `{ src: flow1, alt: '…' }`.
- **Portrait:** `src/assets/portrait.jpg`, square, at least 400px.
- Never commit confidential or unreleased material: this repo is public.
