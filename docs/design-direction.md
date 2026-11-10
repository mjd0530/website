# Design direction

_Last updated: 2026-11-10_

Mike's design images in `design/reference/` are the source of truth. This file records the direction and the decisions behind it.

## Reference designs (2026-11-10)
Two desktop frames at 1440px: `home page.png` (1440×1554) and `subpage.png` (1440×4323, the Magic Move case study). Mobile and tablet frames are not provided yet.

### What the designs establish
- **Two-column shell.** A left rail (x 120–305) and a wide content column (x 384–1335, about 950px). A gutter of about 80px sits between them; margins are 120px left and about 105px right.
- **Top nav.** Text links Home · About · Resume, top-left. The active page is bold; there is no underline or pill. The designs show no logo, theme switcher, Work or Contact link.
- **Typography.** A condensed, high-contrast serif for names and headings, consistent with Instrument Serif (as decided). A neutral grotesk for body and nav, consistent with Instrument Sans, at about 16px. Gray sans labels (Role, Scope, Awards) and a gray sans subtitle ("Headline"). Nothing in the designs uses a monospace face.
- **Surface.** A very pale blue-lavender wash with soft, blotchy gradients across the whole page, and black text. All color comes from the project imagery (Lenovo magenta/purple gradients); the UI chrome stays neutral.
- **Cards.** White fill, a hairline border, a large radius (~28px), and generous size (458×258 on a 2-up grid with a 32px gap; a 950px-wide single hero).

### Home
- **Left rail:** "Hi, I'm Mike DeMar" in serif; an 80px circular portrait; three short paragraphs (the Cary line, a one-line philosophy, and the current role "leading a team of designers on the Software UXD team @ Lenovo").
- **Right column:** a "Work" heading, then a 2×2 grid of project cards. The only filled card is Magic Move, a full-bleed cover with a "LENOVO UXD" eyebrow, a "PROJECT FUJI" eyebrow, a large sans title and an accent rule.
- **Below the grid:** a project spotlight. The rail holds the title "Magic Move / Smart Share", a gray "Headline", a paragraph and "View case study →". The column holds one large image (950×378) above two 2-up images.

### Case study
- **Left rail:** "← Back" and a section list (Overview · Impact · Process · Delivery · Outcome) with the current section in bold. This is the sticky TOC.
- **Header:** serif title, gray subtitle, intro paragraph, then a meta row (Role | Scope) and an Awards entry. A full-width hero image follows.
- **Body:** serif `h2`s with paragraphs (Challenge, Impact, Collaboration), then process sections (heading, paragraph, wide image card). The process cards peek a second card at the right edge, which implies a horizontal gallery. Delivery is a 2×2 image grid.

### Implementation notes and flags
| Topic | Note / proposal |
| --- | --- |
| Body measure | Case-study paragraphs run the full 950px, about 140 characters a line. Proposal: cap text at ~70ch and keep images at full column width. |
| Horizontal galleries | Peeking cards need an accessible pattern: a native horizontal scroll region with `tabindex="0"` and a label, prev/next buttons, and no autoplay. On touch screens it stays a swipeable row with a visible peek and an "n of N" count; tapping an image opens it full size. |
| TOC vs headings | The TOC lists Overview / Impact / Process / Delivery / Outcome; the body has Challenge, Impact, Collaboration, three process sections and Delivery, with no Outcome yet. Proposal: TOC items map to the section groups in the content model. |
| Gray text | Gray labels and subtitles must hold 4.5:1 on the tinted background (target about #5c6270 or darker on the lightest wash). |
| Gradient wash | Needs a dark-theme counterpart (deep navy/aubergine wash) and is replaced by a flat surface in high contrast. |
| Typos in placeholders | "Challange" should be "Challenge". Project title resolved: **Smart Share / Magic Move** (2026-11-10). |
| Theme switcher (decided) | A compact button at the right end of the nav row, showing the current theme's icon and a visible label ("Theme"). It opens a small popover holding a labelled radio group (Light / Dark / High contrast). Escape closes it and focus returns to the button. On mobile it stays in the nav row as an icon-only button with an accessible name ("Theme: Light"). |
| Contact (decided) | A fourth text link after Resume, styled like the others. No separate CTA button, to keep the nav quiet. |
| Spotlights (decided) | One per project, in `order`, below the grid. Grid cards and spotlights both link straight to the case study. Spotlight images come from the case study frontmatter (`spotlight: [hero, a, b]`). |
| Rail on smaller screens | Below 1024px the rail stacks above the content; the case-study TOC becomes a sticky "On this page" disclosure. See the responsive proposal below. |

### Responsive layout (proposed by Claude, approved by Mike 2026-11-10)
Mike asked for a proposal for tablet and mobile, since the reference frames are desktop only.

| | Desktop ≥ 1024 | Tablet 640–1023 | Mobile < 640 |
| --- | --- | --- | --- |
| Gutters | 120px at 1440 (fluid `clamp(24px, 8vw, 120px)`) | 32px | 16px |
| Nav | Text links left, theme button right | Same | Same 4 links inline (they fit at 360px); wrap to two lines only under ~340px or at high zoom. No hamburger: four short links don't need hiding. Theme button becomes icon-only. |
| Home intro | Left rail, sticky while the Work grid scrolls | A band above Work: 96px portrait left, name and the three paragraphs right | Stacked: 64px portrait beside the name, paragraphs below |
| Work grid | 2×2 | 2×2 (cards ~340px) | 1 column; cards keep a 16:9 cover |
| Spotlight | Rail text left; hero over two 2-up images right | Text above images; hero full width, 2-up below | Text above images; hero, then the two images as a swipe row |
| Case study nav | Left rail: Back plus section list, sticky | "← Back" above the title; sticky "On this page" bar under the nav that expands to the section list | Same as tablet |
| Case study header | Title, subtitle, intro, Role \| Scope, Awards | Same; Role and Scope stay side by side | Role and Scope stack |
| Process galleries | Peeking horizontal row with prev/next buttons | Same | Swipe row with peek and count; tap opens full size |
| Delivery grid | 2×2 | 2×2 | 1 column |
| Type | Display ~44px titles | ~36px | ~30px (fluid `clamp()`); body stays 17px |

Principles: content order never changes between sizes (only layout does); no content hidden on small screens; every target is at least 44px; sticky elements stay under 56px tall so they don't eat small screens.

## Concept: "Annotated editorial"
Outcome-first calm, plus a systems designer's annotation layer.
- **Typography leads.** A large serif display for hero and titles; a quiet sans for reading; a small mono for metadata (Role, Years, Scope, patent numbers). The mono layer is the "redline" annotation.
- **One accent, low chroma elsewhere.** Warm off-white and near-black neutrals with one accent from the brand-blue lineage (#1074bc). No gradients, glass or decorative effects.
- **No monogram for now** (decided 2026-11-10). The header is text-only, as in the reference designs. The legacy logo stays in `design/legacy/` in case it returns; the favicon uses a simple "MD" wordmark until then.
- **Work as stories, not tiles.** Every project card shows a one-line outcome plus Role / Years / Scope. Imagery sits on neutral tiles so mixed screenshots read as one art direction.

## Typography (decided 2026-11-09)
| Role | Family | Notes |
| --- | --- | --- |
| Display | Instrument Serif | Hero line, page and case-study titles |
| Text | Instrument Sans (variable) | Body, UI, nav |
| Meta | Geist Mono | Labels, metadata, captions |

Poppins and Roboto were considered and rejected: both read as template defaults and are weaker for long-form reading.

## From mikedemar.com (2019)
| Element | Decision |
| --- | --- |
| Monogram logo | Parked (2026-11-10): not used in v1; kept in `design/legacy/` |
| First-person voice, Cary line | Keep |
| True North statement | Condense into a one-line point of view on About |
| Personal photo | Replace with the new portrait, cropped tighter |
| Brand blue #1074bc | Keep as accent lineage, retuned per theme |
| Thumbnail grid and lightbox | Retire |
| Bronto / Intuit projects | Retired (2026-11-09). Not shown on the site; no "Earlier work" section |
| jQuery, Skeleton, Shadowbox, Universal Analytics, zoom-blocking viewport | Retire |

## From charleshonig.design (inspiration, not a spec)
**Borrow:** outcome-first summaries; Role / Years / Scope metadata; sticky case-study table of contents; a Full / Skim toggle; restraint in palette and type.
**Avoid:** scroll-snap, one project per viewport; single-key shortcuts; custom cursor; count-up stats that render "0" to screen readers; blur reveals that hide content.

## Decisions log
| Date | Decision |
| --- | --- |
| 2026-11-09 | Concept "Annotated editorial" accepted |
| 2026-11-09 | Instrument Serif / Instrument Sans / Geist Mono |
| 2026-11-09 | Design reference comes from images, not the Figma connector |
| 2026-11-10 | First reference frames received (home, Magic Move case study, desktop only); analysis above |
| 2026-11-10 | No monogram in v1 |
| 2026-11-10 | Project title: "Smart Share / Magic Move" (slug stays `magic-move`) |
| 2026-11-10 | Nav: Home · About · Resume · Contact, left-aligned as designed; theme switcher at the right end of the same row (Claude's call, delegated by Mike) |
| 2026-11-10 | Home: every project gets a spotlight below the 2×2 grid, in the Magic Move pattern |
| 2026-11-10 | Mobile and tablet layout approved (see Responsive layout) |
