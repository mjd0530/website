# Sitemap and content model

_Last updated: 2026-11-09_

## Pages
| URL | Page | Template | Content |
| --- | --- | --- | --- |
| `/` | Home | PageLayout | Hero (positioning line, current role, Cary NC), 3 featured projects, About teaser, contact CTA |
| `/work/` | Work | PageLayout | All projects, featured first |
| `/work/magic-move/` | Case study | CaseStudyLayout | Magic Move |
| `/work/hello-design-system/` | Case study | CaseStudyLayout | Hello Design System |
| `/work/vantage/` | Case study | CaseStudyLayout | Vantage |
| `/about/` | About | PageLayout | Portrait, bio, point of view, experience, patents, resume links |
| `/contact/` | Contact | PageLayout | Email, LinkedIn, Dribbble, resume |
| `/resume/` | Resume | PageLayout | Accessible HTML resume + PDF download |
| `/404` | Not found | PageLayout | Friendly message, links home and to Work |

## Navigation
- Primary: Work, About, Contact. The monogram links home. Theme switcher in the header.
- Mobile: a disclosure menu button (`aria-expanded`), full-width panel, focus managed; no hamburger-only icon without a label.
- Footer: contact links, resume, theme switcher (duplicate), copyright.

## Case study content model
One folder per project: `src/content/projects/<slug>/index.mdx` plus its images. The schema lives in `src/content.config.ts`; a missing required field fails the build.

```yaml
title: Hello Design System          # required
summary: Outcome-first sentence.    # required
client: Lenovo                      # required
years: "2023–2025"                  # required
role: Lead Product Designer         # required
scope: [Design systems, Tokens]     # required
team: "2 designers, 6 engineers"    # optional
impact:                             # optional, 0–4
  - { value: "40%", label: "Faster UI build time" }
cover: { src: ./cover.png, alt: "…" }   # alt required ("" only if decorative)
accent: "#1074bc"                   # optional, contrast-checked
featured: true
order: 1
status: public                      # public | archive (| locked, deferred)
```

### Body sections
Each is a `<CaseStudySection id="…" title="…">`; the table of contents builds from them. Overview and Outcomes are required.
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
