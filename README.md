# Foot Locker UK — PDP Description Prominence Prototype

A prototype exploring how to give the **product description** on a Foot Locker UK
product detail page (PDP) more prominence. Currently the description sits collapsed
at the very bottom of the page; this prototype presents three alternative treatments
on an identical, recreated PDP so they can be compared side by side.

> Built as a portfolio / assignment piece. Product imagery belongs to Nike / Foot Locker
> and is used here for demonstration only.

## Live demo

Open `pdp-prototype.html` in any browser, or enable **GitHub Pages** (Settings → Pages → deploy
from `main` / root) to host it.

## The problem

On the live PDP, the product description is collapsed inside a "Details" accordion as the
*last* element on the page — below the buy box, shipping selector and the discount notice.
The content itself is fine; its placement and presentation make it effectively invisible.

## The three treatments

Use the prototype switcher (the dark panel below the Wishlist button) to cycle between them:

- **Current State** *(baseline)*
  The exact pattern live today: three collapsed accordions — Description, Details,
  Delivery & Returns — each requiring a deliberate tap to reveal any content.

- **A — Surface & Structure** *(low effort, low risk)*
  Expands the description by default and replaces the flat spec list with a scannable
  icon spec grid. Fastest to ship; ideal as an A/B-test baseline.

- **B — Tabbed Sections** *(medium effort)*
  Organises product info into Overview / Features & Specs / Delivery & Returns behind a
  tab bar, keeping the page compact while giving the description structure that scales
  across product types.

- **C — Editorial Story** *(high effort, high impact)*
  An editorial narrative with a hero band, feature cards, and an origin callout that
  treats the description as an experience. Best reserved for hero / launch products.

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
buttons/links, `aria` state on all interactive controls (accordion `aria-expanded`,
tab `aria-selected`, treatment toggle `aria-pressed`), arrow-key tab navigation,
visible keyboard focus rings, and semantic SVG `aria-label` text on the shoe illustration.

## Project structure

```
.
├── pdp-prototype.html  # the prototype (all CSS + JS inline)
└── README.md
```

The repo also contains the separately built **Plimsoll** sneaker e-commerce site
(`index.html`, `products.html`, `cart.html`, `product-detail.html`, `style.css`, `script.js`)
from a prior project; the PDP prototype is self-contained and does not depend on those files.
