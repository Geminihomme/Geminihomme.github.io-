# Foot Locker UK — PDP Product Description Proposal

A prototype exploring how to give the **product description** on a Foot Locker UK
product detail page (PDP) more prominence. Currently the description sits collapsed
at the very bottom of the page; this prototype presents three alternative treatments
on an identical, recreated PDP so they can be compared side by side.

> Built as a portfolio / assignment piece. Product imagery belongs to Nike / Foot Locker
> and is used here for demonstration only.

## Proposal document

See **[Foot-Locker-PDP-Proposal.pdf](Foot-Locker-PDP-Proposal.pdf)** for the full write-up:
the brief analysis, current-state audit, KPIs, the three options, and the recommendation.

## Live demo

Open `index.html` in any browser, or enable **GitHub Pages** (Settings → Pages → deploy
from `main` / root) to host it.

## The problem

On the live PDP, the product description is collapsed inside a "Details" accordion as the
*last* element on the page — below the buy box, shipping selector and the discount notice.
The content itself is fine; its placement and presentation make it effectively invisible.

## The three treatments

Use the demo toggle under the buy box to switch between them:

- **A — Surface & Structure** *(low effort, low risk)*
  Expands the existing copy by default and turns the flat spec list into a scannable
  spec grid with icons. Fastest to ship; ideal as an A/B-test baseline.

- **B — Tabbed Sections** *(medium effort)*
  Organises product info into Overview / Features & Specs / Delivery & Returns behind a
  tab bar, keeping the page compact while giving the description structure that scales
  across product types.

- **C — Editorial Story** *(high effort, high impact)*
  An image-paired, scrolling narrative that treats the description as an experience.
  Best reserved for hero / launch products that justify dedicated photography.

## KPIs to evaluate

- **Primary:** PDP → add-to-bag rate, PDP → purchase conversion
- **Description engagement:** view/expand rate, scroll depth, time on description
- **Returns rate** (better fit/material comms should reduce "not as expected" returns)
- **SEO:** organic entrances, dwell time (on-page content beats hidden content)
- **Guardrails:** Core Web Vitals / page weight, scroll-distance-to-CTA

## Recommendation

Ship **A** behind a feature flag and A/B test it against the current collapsed accordion.
Architect the content model so **B** and **C** are progressive enhancements rather than
rewrites. Let the data earn B/C rather than assuming "bigger = better".

## Tech

Plain HTML/CSS/JS — no build step, no dependencies. Accessible by design: real
buttons/links, `aria` state on all interactive controls, visible keyboard focus, and
semantic image `alt` text.

## Project structure

```
.
├── index.html          # the prototype (all CSS + JS inline)
├── Foot-Locker-PDP-Proposal.pdf  # the written proposal
├── assets/             # product imagery
│   ├── af1-side.jpg
│   ├── af1-alt-side.jpg
│   ├── af1-heel.jpg
│   ├── af1-outsole.jpg
│   └── af1-pair.jpg
└── README.md
```
