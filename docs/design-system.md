# Design system

_Status: Phase 3 values set 2026-11-10 from the reference designs. Source: `src/styles/tokens.css`. Verified with axe (0 violations in all three themes, desktop and mobile) on a temporary preview page._

## Token architecture
Primitive tokens (raw values) → semantic tokens (purpose) → components. Components use **semantic tokens only**; primitives never leave `tokens.css`.

## Color

### Where the values came from
Sampled from `design/reference/` with a canvas script:

| Sample | Value | Became |
| --- | --- | --- |
| Page wash (corners and middle) | #f7f9fd, #f4f7fe, #f2f7fe, #f0f9fe, #eef6ff | `--color-surface` #f4f7fe plus three wash stops |
| Card fill | #ffffff | `--color-surface-raised` |
| Card hairline | #e2e8f0 | `--color-border-subtle` |
| Text | #000000 | `--color-text` |
| Gray "Headline" and labels | #757575 | **Not used.** Only 4.0–4.3:1 on the wash, which fails AA. Replaced by #5f6470 (≥ 5.3:1). |
| Smart Share / Magic Move cover rule | #523cd1 | Accent, tuned to #4b35c9 |

### Semantic tokens, with measured contrast
Ratios are measured against every surface and wash stop in that theme; the worst case is shown.

| Token | Light | Dark | High contrast | Worst-case ratio (L / D / HC) | Requirement |
| --- | --- | --- | --- | --- | --- |
| `--color-surface` | #f4f7fe | #0c0e15 | #000000 | — | — |
| `--color-surface-raised` | #ffffff | #151926 | #000000 | — | — |
| `--color-wash-1/2/3` | #eef6ff / #f3f1fe / #f0f9fe | #141a2b / #1a1530 / #0e1a24 | #000 (flat) | — | Decorative |
| `--color-text` | #000000 | #f3f5f9 | #ffffff | 18.2 / 16.1 / 21 | 7:1 |
| `--color-text-muted` | #5f6470 | #a6adbb | #ffffff | 5.3 / 7.8 / 21 | 4.5:1 |
| `--color-accent` (links) | #4b35c9 | #a99bff | #ffd84d | 6.9 / 7.4 / 15.2 | 4.5:1 |
| `--color-focus` | #4b35c9 | #a99bff | #ffd84d (4px ring) | 6.9 / 7.4 / 15.2 | 3:1 |
| `--color-border` (controls) | #7c8598 | #6c7589 | #ffffff | 3.3 / 3.8 / 21 | 3:1 |
| `--color-border-subtle` (card hairline) | #e2e8f0 | #262c3c | #ffffff | decorative | Cards are identified by content, not edges; in HC they get full white edges |

The accent is violet, taken from the project cover art, rather than the legacy blue #1074bc. The reference designs show no blue anywhere in the UI.

### The wash
`body` paints three large radial gradients of `--color-wash-1/2/3` over `--color-surface`. In the dark theme they become navy, aubergine and teal. High contrast sets all three to black, so the page is flat.

## Themes
- Resolution order: saved choice → `prefers-contrast: more` → `prefers-color-scheme` → light.
- An inline `<head>` script sets `data-theme` before first paint.
- **High contrast** is its own design: flat black, white text and edges, yellow accent and focus, a 4px focus ring, underlined links, no wash. It also respects `forced-colors: active`.

## Typography
Families: Instrument Serif (display: h1, h2), Instrument Sans (everything else). Geist Mono is still loaded, but **no token uses it**: the reference labels are gray sans. Whether to remove it is still open.

Sizes are fluid between 375px and 1440px viewports.

| Token | Use (from the reference) | Mobile → desktop | Family | Line height |
| --- | --- | --- | --- | --- |
| `--text-display` | Reserved for a future hero | 36 → 56px | Serif | 1.1 |
| `--text-h1` | Page / case-study title | 30 → 44px | Serif | 1.1 |
| `--text-h2` | "Work", intro name, section heads ("Challenge") | 24 → 28px | Serif | 1.2 |
| `--text-h3` | Sub-sections | 20 → 22px | Sans 600 | 1.2 |
| `--text-h4` | Minor heads | 17 → 18px | Sans 600 | 1.2 |
| `--text-subtitle` | Gray "Headline" under titles (`.subtitle`) | 18 → 20px | Sans, muted | 1.2 |
| `--text-body` | Paragraphs | 17 → 18px | Sans | 1.55 |
| `--text-ui` | Nav, rail copy, controls | 15px | Sans | 1.3 |
| `--text-small` | Captions | 15px | Sans | 1.4 |
| `--text-label` (`--text-meta`) | Role / Scope / Awards labels (`.meta`) | 13px | Sans, muted | 1.3 |

- Serif headings use `--tracking-display` (-0.01em).
- Measure: `--measure` 70ch for prose. Images run the full column width.
- **Deviation from the reference:** body copy in the frames is about 15px with tight leading. We use 17–18px at 1.55, per the accessibility and readability standard in CLAUDE.md.

## Spacing and layout
| Token | Value | Source |
| --- | --- | --- |
| `--space-1` … `--space-12` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192px | 4px base |
| `--gutter` | 16 (mobile) · 32 (tablet ≥ 640) · fluid to 120px (desktop ≥ 1024) | 120px margins in the 1440 frame |
| `--content-max` | 91rem (1456px) | ~1200px of content at 1440 |
| `--rail-width` | 184px | Left rail in the reference |
| `--rail-gap` | fluid → 80px | Rail-to-content gap |
| `--card-gap` | 16 → 32px | Card grid gap |
| `--radius-card` | 20 → 28px | Card corners |
| `--radius-control` | 8px | Buttons, popover |
| `--section-gap` | 48 → 80px | Grid → spotlight, spotlight → spotlight |
| `--stack-gap` | 32 → 48px | Between case-study sections |
| `--tap-target` | 44px | Minimum target |

Breakpoints: 40em (640px) tablet, 64em (1024px) desktop. Verify at 360, 768, 1024, 1280 and 1920.

## Motion
| Token | Value | Use |
| --- | --- | --- |
| `--duration-fast` | 150ms | Hover, focus |
| `--duration-base` | 250ms | UI state changes, popover |
| `--duration-slow` | 400ms | Reveals, page transitions |
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | Entrances |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | State changes |

Under `prefers-reduced-motion: reduce`, there is no translation or scale; changes are instant or opacity-only (enforced globally in `base.css`).
