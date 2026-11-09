# Design direction

_Last updated: 2026-11-09_

Mike's design images in `design/reference/` are the source of truth. This file records the direction and the decisions behind it.

## Concept: "Annotated editorial"
Outcome-first calm, plus a systems designer's annotation layer.
- **Typography leads.** A large serif display for hero and titles; a quiet sans for reading; a small mono for metadata (Role, Years, Scope, patent numbers). The mono layer is the "redline" annotation.
- **One accent, low chroma elsewhere.** Warm off-white and near-black neutrals with one accent from the brand-blue lineage (#1074bc). No gradients, glass or decorative effects.
- **The monogram is the anchor.** An SVG in the header, also used as favicon and as a focus/loading motif.
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
| Monogram logo | Keep; redraw as SVG with `currentColor` |
| First-person voice, Cary line | Keep |
| True North statement | Condense into a one-line point of view on About |
| Personal photo | Replace with the new portrait, cropped tighter |
| Brand blue #1074bc | Keep as accent lineage, retuned per theme |
| Thumbnail grid and lightbox | Retire |
| Bronto / Intuit projects | Open: archive or retire |
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
