# Project brief

_Last updated: 2026-11-09_

## Goal
Replace the 2019 mikedemar.com with a modern, minimal, editorial portfolio that shows how Mike thinks, not just what he made. It should feel art-directed, not templated.

## Who it's for
| Audience | What they need | In how long |
| --- | --- | --- |
| Hiring managers / design leads | Proof of judgment: problem, role, decisions, outcomes | 30 seconds to skim, 5 minutes to go deep |
| Recruiters | Role, seniority, current company, resume, contact | Under 30 seconds |
| Peers and collaborators | Process, systems thinking, craft | Browsing |

## About Mike (facts to reuse)
- UX/Product Designer, Cary, North Carolina ("Concentrated Area of Relocated Yankees").
- Currently at Lenovo. Previously Citrix, Bronto, Intuit.
- BFA, East Carolina University (Interactive Design and Animation).
- Design patents: Workspace Logo Spinner (USD931898S1, 2021); Combination Date & Time Picker (USD924265S1, 2021).
- Dribbble: dribbble.com/mikedemar

## Scope: v1
- Pages: Home, Work index, three case studies, About, Contact, Resume, 404.
- Lead case studies: **Magic Move**, **Hello Design System**, **Vantage**.
- Three themes: light, dark, high contrast.
- Hosted on GitHub Pages at mikedemar.com.

## Non-goals for v1
- Password-protected / NDA case studies (deferred; approach recorded in `technical-decisions.md`).
- AI chat ("Ask AI") from the `md-portfolio-website` experiment (needs a server; revisit later).
- CMS, blog, contact form backend.

## Success criteria
- WCAG 2.1 AA, with zero axe violations in all three themes.
- Lighthouse: Performance ≥ 95, Accessibility 100, SEO 100 on every page.
- Adding a fourth case study needs only content and images, no new page code.
- Mike would be proud to send the link to a design leader.

## Open questions
_Resolved 2026-11-09: domain is at Gandi with DNS in Route 53 (see ADR-003); Bronto and Intuit work is retired._
- Monogram as SVG; new portrait at full resolution.
