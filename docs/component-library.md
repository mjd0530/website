# Component library

_Status: planned. Each entry gains props, variants and an example when the component is built._

Layers, with dependencies flowing downward only: **tokens → primitives → layout → patterns → sections → layouts → pages**.

Every component must:
- have typed `Props`;
- use semantic tokens only;
- work in light, dark and contrast themes and at every breakpoint;
- be keyboard and screen-reader correct.

## Entry template
```md
### ComponentName
Purpose: …
Props: | name | type | default | notes |
Variants: …
Accessibility: …
Example: <ComponentName … />
```

## Primitives — `src/components/primitives/`
| Component | Purpose |
| --- | --- |
| Button | Actions; variants primary / secondary / ghost; renders `<a>` when given `href` |
| Link | Inline and standalone links; external-link indicator |
| Icon | Inline SVG icon set, `aria-hidden` unless labelled |
| Logo | _Parked:_ monogram not used in v1 |
| Tag | Scope/skill chips (static, not buttons) |
| Heading | Level vs visual size decoupled (`as="h2" size="h1"`) |
| Prose | Long-form typography wrapper for MDX |
| VisuallyHidden | Screen-reader-only text |

## Layout — `src/components/layout/`
| Component | Purpose |
| --- | --- |
| Container | Max-width and gutters |
| Grid | 12 / 8 / 4 column grid with span props |
| Stack | Vertical rhythm with a token gap |
| Section | Page section with consistent vertical spacing and an optional label |
| SkipLink | "Skip to content" |

## Patterns — `src/components/patterns/`
| Component | Purpose |
| --- | --- |
| ThemeSwitcher | **Built.** No props. Disclosure button (`aria-expanded`, accessible name "Theme: Light" etc.; visible "Theme" label from 640px up, icon-only below) opening a `fieldset` radio group Light / Dark / High contrast. Choosing applies `html[data-theme]` and saves to `localStorage`. Closes on Escape (focus returns to the button), outside click or focus leaving. Hidden until JS runs. Token-styled radios (3:1 ring in every theme); native radios under `forced-colors`. |
| NavMenu | **Built.** Props: `items: {label, href}[]`, `current: string` (pathname), `label?` (default "Primary"). Inline text links at every width (no hamburger); current page bold + `aria-current="page"` (underlined in high contrast); 44px tall targets. |
| ProjectCard | Cover, title, outcome, MetaList; variants `featured`, `compact`, `archive` |
| MetaList | Role / Years / Scope as a `<dl>` in mono |
| Figure | Image + caption, neutral tile, responsive sizes |
| MediaGrid | 2–4 image layouts for case studies |
| Stat | Impact number + label (final value in HTML) |
| Quote | Testimonial or pull quote with attribution |
| Callout | Annotated note / key decision |
| TOC | Sticky table of contents with current-section highlight; a disclosure on mobile |
| SkimToggle | Full / Skim view switch for case studies |
| Reveal | Reduced-motion-safe on-scroll reveal wrapper |

## Sections — `src/components/sections/`
| Component | Purpose |
| --- | --- |
| SiteHeader | **Built.** Props: `current: string`. NavMenu (items from `src/data/site.ts`) left, ThemeSwitcher right. |
| SiteFooter | **Built.** No props. Hairline rule within the content column, © year, LinkedIn · Dribbble · Resume (from `src/data/site.ts`). TODO(mike): public email. |
| Hero | Home positioning statement |
| FeaturedWork | "Work" heading + 2×2 grid of ProjectCards |
| ProjectSpotlight | Per-project home section: rail (title, subtitle, summary, "View case study →") + column (one wide image over two 2-up images). One per project, in `order` |
| CaseStudyHeader | Title, summary, MetaList, Stats, cover |
| CaseStudySection | Titled, anchored body section |
| NextProject | Link to the next case study |
| ContactCTA | Closing call to action |

## Layouts — `src/layouts/`
| Layout | Purpose |
| --- | --- |
| BaseLayout | `<head>`, SEO/OG meta, fonts, theme bootstrap script, header/footer, View Transitions. **Built (Phase 4, bare).** Props: `title: string`, `description: string`. Slot: default (inside `<main id="main">`). Renders skip link, SiteHeader (current = `Astro.url.pathname`) and SiteFooter on every page; canonical URL. View Transitions still to come. |
| PageLayout | Standard page |
| CaseStudyLayout | Header + TOC + MDX body + NextProject |
