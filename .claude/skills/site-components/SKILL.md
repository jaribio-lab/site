---
name: site-components
description: Build or change pages, sections and UI components on the Jaribio Lab website (Astro). Use for any visual or layout work in this repo, new pages, new components, animations, or styling fixes.
---

# Building UI on the Jaribio Lab site

Read `CLAUDE.md` first. This skill is the how-to.

## 1. Start from the gallery

Run `npm run dev` and open `/components`. Reuse what's there. The main pieces:

| Need | Use |
|---|---|
| Any illustration | `Shape` with `kind`, `color`, `size`, `motion` |
| Page top on inner pages | `PageHero` (kicker, title, lede, up to 4 shapes) |
| Section top | `SectionHeader` (kicker, title, lede) |
| Buttons and links | `Button` (primary, ghost, dark, light), `Tag` |
| Numbers | `Stat` (counts up) |
| Experiments | `ExperimentCard`, `ExperimentFeature`, `StatusBadge`, `ResultBars` |
| Explainers | `ExplainerRow` |
| Explaining a process | `StepCard`, `Pipeline` |
| Closing a page | `CtaBlock` |

## 2. Page skeleton

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHero from '../components/PageHero.astro';
import SectionHeader from '../components/SectionHeader.astro';
---
<BaseLayout title="Page name" description="One sentence for search and link previews.">
  <PageHero kicker="Section" title="Says one thing." lede="One or two sentences." />
  <section class="wrap">
    <SectionHeader kicker="Part" title="A heading." />
    <!-- components -->
  </section>
</BaseLayout>
```

Every top-level block is a `<section class="wrap">`. Spacing comes from `section`; don't add margins between sections.

## 3. Making a new component

1. One file in `src/components/`, PascalCase. Start with a one-line comment saying what it is.
2. Typed `Props` interface. Colors are `AccentName` from `src/lib/brand.ts`, shapes are `ShapeKind` from `src/lib/shapes.ts`.
3. Scoped `<style>` using tokens: `var(--teal)`, `var(--r-lg)`, `var(--spring)`. Set `--shape-hole` to the surface color behind any shapes so donut holes match.
4. Add `class="reveal"` to animate in on scroll. Use `data-tilt`, `data-magnet`, `data-count` before writing new pointer code.
5. If it needs JS, put a `<script>` in the component. Query by a `data-*` attribute and loop with `querySelectorAll` so several instances work. Import `reduceMotion` from `src/scripts/motion.ts` and skip ambient animation when it's true.
6. Add a `Specimen` for it in `src/pages/components.astro` and a link in the `toc` list there.

## 4. Motion vocabulary

- Entrances: rise 30 to 40px and fade, `var(--ease)`, 0.8 to 0.9s, staggered 70ms.
- Playful responses (hover, click): `var(--spring)` overshoot, 0.25 to 0.5s.
- Ambient loops (float, spin, bob): slow, 3 to 14s, small distances.
- Cross-page morphs: give matching elements the same `transitionName` on `Shape` (see `ExperimentCard` and the experiment page).
- Never animate width, height or top/left in loops. Pause canvas or SVG loops when off screen.

## 5. Check before you finish

- `npm run check` and `npm run build` pass. The build also fails if an external link doesn't open in a new tab; prefer `Button` or `Tag`, which handle it.
- Open the page at 375px and desktop width. Run this in the console; it must print the viewport width or less: `document.documentElement.scrollWidth`.
- No console errors.
- Turn on reduced motion in the OS and confirm nothing loops.
- `npm run check:private` passes.
