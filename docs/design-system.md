# Design system

_Status: skeleton. Values are filled in during Phase 3 from Mike's design images._

## Token architecture
Primitive tokens (raw values) → semantic tokens (purpose) → components. Components use **semantic tokens only**.

```css
/* primitives — never used directly by components */
--blue-600: #1074bc;
--neutral-0: #ffffff;  --neutral-950: #0b0b0c;

/* semantic — redefined per theme */
[data-theme="light"]    { --color-surface: …; --color-text: …; --color-accent: …; --color-focus: …; }
[data-theme="dark"]     { … }
[data-theme="contrast"] { … }
```

## Color (per theme)
| Semantic token | Light | Dark | Contrast | Min ratio |
| --- | --- | --- | --- | --- |
| `--color-surface` | TBD | TBD | #000 or #fff | — |
| `--color-surface-raised` | TBD | TBD | TBD | — |
| `--color-text` | TBD | TBD | TBD | 4.5:1 (7:1 in contrast) |
| `--color-text-muted` | TBD | TBD | n/a (use text) | 4.5:1 |
| `--color-border` | TBD | TBD | TBD | 3:1 |
| `--color-accent` | TBD | TBD | TBD | 4.5:1 as text |
| `--color-focus` | TBD | TBD | TBD | 3:1 vs adjacent |

Record measured contrast ratios when values are set.

## Themes
- Resolution order: saved choice → `prefers-contrast: more` → `prefers-color-scheme` → light.
- An inline `<head>` script sets `data-theme` before first paint.
- **High contrast** is its own design: pure surfaces, borders on all interactive elements, underlined links, thick focus rings, no information carried by tint alone. Also respect `forced-colors: active`.

## Typography
Families: Instrument Serif (display), Instrument Sans (text), Geist Mono (meta).

| Token | Use | Size (fluid) | Line height |
| --- | --- | --- | --- |
| `--text-display` | Hero | TBD `clamp()` | 1.0–1.1 |
| `--text-h1` … `--text-h4` | Headings | TBD | 1.1–1.3 |
| `--text-body` | Body | ≥ 17px | 1.5–1.6 |
| `--text-small` | Captions | ≥ 14px | 1.4 |
| `--text-meta` | Mono labels | TBD | 1.3 |

Measure: 60–75ch for prose.

## Spacing and layout
- 4px base: `--space-1` (4) … `--space-12` (TBD).
- Grid: 12 columns desktop (content max ~1280px; imagery may bleed), 8 tablet, 4 mobile.
- Breakpoints to verify: 360, 768, 1024, 1280, 1920.
- Touch targets ≥ 44×44px.

## Motion
| Token | Value | Use |
| --- | --- | --- |
| `--duration-fast` | 150ms | Hover, focus |
| `--duration-base` | 250ms | UI state changes |
| `--duration-slow` | 400ms | Reveals, page transitions |
| `--ease-out` | TBD cubic-bezier | Entrances |
| `--ease-in-out` | TBD | State changes |

Under `prefers-reduced-motion: reduce`: no translation or scale; instant or opacity-only.
