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
| Media | **Built.** Props: `src?`, `alt` (full description), `label?` (short descriptor), `ratio?` (default 16/9; `"auto"` = the image's own shape), `sizes?`, `priority?`, `decorative?`, `zoom?` (default true). Image fills the card edge to edge (cropped to `ratio`). With an image and not decorative: the card is a button that opens the Lightbox, and `label` shows as a tooltip on hover/focus (Escape hides it). Without `src`: striped placeholder showing `label`, announced as "Image placeholder: {alt}". |
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
| ProjectCard | **Built.** Props: `href`, `title`, `client`, `cover`, `headingLevel?`, `priority?`. Whole card is one link; cover art fills the tile (art should show the project name); title + client are visually hidden for screen readers. Lift on hover (none under reduced motion). |
| MetaList | **Built.** Props: `items: {label, value}[]`. `<dl>` of muted sans labels over values; wraps. |
| Figure | Image + caption, neutral tile, responsive sizes |
| MediaGrid | **Built.** Props: `items` (media), `ratio?`. 2 columns from 640px, 1 below. |
| Lightbox | **Built.** No props; rendered once by BaseLayout. Native `<dialog>` full-screen viewer for every `[data-lightbox]` card: full-resolution WebP (up to 3200px), caption = label, "n of N", previous/next (buttons and arrow keys) across all images on the page, Fit ⇄ Actual size (button, image click or Z) with scroll panning, Escape/close returns focus to the card. Dark scrim in every theme (`--color-scrim`, `--color-on-scrim*`). |
| Gallery | **Built.** Props: `label`, `items` (media), `ratio?` (default `"auto"`: each card takes its image's shape, so nothing is cropped). Horizontal scroller with next-item peek, prev/next buttons, "n of N" live count; focusable labelled region; native swipe; controls hidden without JS. |
| Stat | Impact number + label (final value in HTML) |
| Quote | Testimonial or pull quote with attribution |
| Callout | Annotated note / key decision |
| TOC | **Built.** Props: `sections: {id, label}[]`. Desktop: list in the sticky rail, current section bold (`aria-current`). Below 1024px: "On this page" `<details>` stuck under the header; closes after a jump. Links target `#section-{id}`. |
| SkimToggle | Full / Skim view switch for case studies |
| Reveal | Reduced-motion-safe on-scroll reveal wrapper |

## Sections — `src/components/sections/`
| Component | Purpose |
| --- | --- |
| SiteHeader | **Built.** Props: `current: string`. NavMenu (items from `src/data/site.ts`) left, ThemeSwitcher right. Sticky with a frosted backdrop (80% surface + 16px blur); hairline appears once scrolled. Solid in high contrast, under `prefers-reduced-transparency`, or without backdrop-filter. Height token `--header-height` offsets other sticky elements and anchor scrolling. |
| SiteFooter | **Built.** No props. Hairline rule within the content column, © year, LinkedIn · Dribbble · Resume (from `src/data/site.ts`). TODO(mike): public email. |
| Hero | Home positioning statement |
| FeaturedWork | "Work" heading + 2×2 grid of ProjectCards |
| ProjectSpotlight | **Built.** Props: `project` (collection entry). Rail: h2 title, small subtitle, summary, "View case study →". Column: wide image (950:378) over two 16:9 images; the pair is a swipe row on phones. One per project, in `order`. |
| CaseStudyHeader | Title, summary, MetaList, Stats, cover |
| CaseStudySection | **Built.** Props: `id`. TOC target (`id="section-{id}"`) wrapping h2 blocks in MDX; handles flow spacing. |
| NextProject | Link to the next case study |
| ContactCTA | Closing call to action |

## Layouts — `src/layouts/`
| Layout | Purpose |
| --- | --- |
| BaseLayout | `<head>`, SEO/OG meta, fonts, theme bootstrap script, header/footer, View Transitions. **Built (Phase 4, bare).** Props: `title: string`, `description: string`. Slot: default (inside `<main id="main">`). Renders skip link, SiteHeader (current = `Astro.url.pathname`) and SiteFooter on every page; canonical URL. View Transitions still to come. |
| PageLayout | Standard page |
| CaseStudyLayout | Built inline in `src/pages/work/[slug].astro` for now: rail (Back + TOC), header (title, subtitle, summary, Role/Scope, Awards, hero), MDX body. Extract when a second template needs it. NextProject still to come. |
