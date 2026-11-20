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
| ThemeToggle | **Built.** No props. A single `<button role="switch">` named "Dark theme" (`aria-checked` = dark). Visible pill track (60×32, 1px `--color-border`) with a sun on the left and a moon on the right; an accent thumb slides under the active icon (motion off under `prefers-reduced-motion`). Space/Enter or click flips light ⇄ dark, applies `html[data-theme]` and saves to `localStorage`. 44px target. Hidden until JS runs. System colours under `forced-colors`. Replaced the ThemeSwitcher disclosure on 2026-11-19 when the high-contrast theme was paused. |
| NavMenu | **Built.** Props: `items: {label, href}[]`, `current: string` (pathname), `label?` (default "Primary"). Inline text links at every width (no hamburger); current page bold + `aria-current="page"` (underlined in high contrast); 44px tall targets. |
| ProjectCard | **Built.** Props: `href`, `title`, `client`, `cover`, `headingLevel?`, `priority?`. Whole card is one link (on home: `#project-<slug>`, a smooth in-page jump to that project's spotlight; the spotlight links to the case study); cover art fills the tile (art should show the project name); title + client are visually hidden for screen readers. Lift on hover (none under reduced motion). |
| MetaList | **Built.** Props: `items: {label, value: string \| string[]}[]`. Laid out by shape: text values share a row (first takes only its width, the next the rest; stacks below 640px); array values span the full width as plain text joined with " · ". Case study header order: Role, Awards, then Focus. |
| Figure | Image + caption, neutral tile, responsive sizes |
| MediaGrid | **Built.** Props: `items` (media), `ratio?`. 2 columns from 640px, 1 below. |
| Video | **Built.** Props: `src` (public path), `poster` (image), `title`, `captions?` (WebVTT path), `summary?` (one visible sentence in a `figcaption`), `description?` (in a "Video description" disclosure with a chevron that flips when open), `duration?`, `ratio?`. Never autoplays; `preload="none"`. Poster with a "Play video 0:53" pill in the corner (whole poster clickable); native controls take over once playing. Without JS, native controls from the start. Optional "Video description" disclosure, linked with `aria-describedby`. Captions required when there is speech. |
| Lightbox | **Built.** No props; rendered once by BaseLayout. Native `<dialog>` full-screen viewer for every `[data-lightbox]` card: full-resolution WebP (up to 3200px), caption = label, "n of N", previous/next (buttons and arrow keys) across all images on the page, Fit ⇄ Actual size (button, image click or Z) with scroll panning, Escape/close returns focus to the card. Frosted white backdrop (55% white + 20px blur, so the page shows through) in light and dark, with an 85% white toolbar strip that keeps caption, count and button outlines above AA over any page (worst case over a dark page: text 7.1:1, outlines 4.2:1). Solid black in high contrast (`--color-scrim*`, `--color-on-scrim*`). Image has a hairline edge. |
| Gallery | **Built.** Props: `label`, `items` (media), `ratio?` (default 3/1). All cards in a gallery share one size; images fill and crop from the centre. Horizontal scroller with next-item peek, prev/next buttons, "n of N" live count; focusable labelled region; native swipe; controls hidden without JS. |
| StatGrid | **Built.** Props: `items: {value, label}[]` (2–4). Headline impact numbers as a list (value then label, read as one phrase); cards share a row (2 columns on phones), and exactly four sit 2 × 2 so long values don't wrap; `tone="accent"` for results; display-face values; final values in HTML, no count-up. Used in MDX: `<StatGrid items={[…]} />`. |
| KeyExperiences | **Built.** Props: `items: {title, text}[]` (1–4), optional `label` (default "Key user experiences"). Short title + one muted line each, auto-fit grid. Used in MDX under the section that defines the experience: `<KeyExperiences items={[…]} />`. |
| Quote | Testimonial or pull quote with attribution |
| Callout | Annotated note / key decision |
| TOC | **Built.** Props: `sections: {id, label}[]`. Desktop: list in the sticky rail, current section bold (`aria-current`). Below 1024px: "On this page" `<details>` stuck under the header; closes after a jump. Links target `#section-{id}`. |
| SkimToggle | Full / Skim view switch for case studies |
| Reveal | Reduced-motion-safe on-scroll reveal wrapper |

## Sections — `src/components/sections/`
| Component | Purpose |
| --- | --- |
| SiteHeader | **Built.** Props: `current: string`. NavMenu (items from `src/data/site.ts`) left, ThemeToggle right. Sticky with a frosted backdrop (80% surface + 16px blur); hairline appears once scrolled. Solid in high contrast, under `prefers-reduced-transparency`, or without backdrop-filter. Height token `--header-height` offsets other sticky elements and anchor scrolling. |
| SiteFooter | **Built.** No props. Hairline rule within the content column, © year, LinkedIn · Dribbble · Resume (from `src/data/site.ts`). TODO(mike): public email. |
| Hero | Home positioning statement |
| FeaturedWork | Removed from home 2026-11-17; spotlights follow the intro directly |
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
