---
name: add-experiment
description: Add or update an experiment or an Explained episode on the Jaribio Lab website, including status changes, results, costs, links and interactive demos. Use whenever site content about an experiment or explainer changes.
---

# Adding an experiment or explainer

## Experiments

Create `src/content/experiments/NNN-short-slug.md`. The file name is the URL. The schema is in `src/content.config.ts` and the build fails on mistakes.

```yaml
---
number: "002"                 # three digits, matches the experiments repo folder
title: Short name
question: The one question, as the video hook would say it.
summary: One or two sentences on what we do.
status: planned               # planned | running | editing | published
date: 2026-12-01              # date the plan was written
color: teal                   # teal | coral | yellow | lav | pink, pick one not used by the previous experiment
shape: donut                  # donut | ring | dot | half | leaf | bubble | flower | face
tags: [fine-tuning]
budget: 20
models: [Model name and size]
facts:                        # up to 3 setup numbers
  - { value: 3, label: training sets }
links:
  code: https://github.com/jaribio-lab/experiments
---
```

Body sections, in this order, skipping any that don't apply yet: **The question**, **The setup**, **Guarding against forgetting**, **Results**, **What it means**, **Prior work we build on**, **Rerun it yourself**. Source the text from the plan in the `ideas` repo, rewritten for the public: no internal notes, no issue numbers.

### When status changes

- `running`: nothing else changes.
- Results are in: set `cost` to the real GPU spend, add `results` rows (`label`, `before` = control arm, `after`), add a **Results** section, and attach the forgetting checks next to them.
- `published`: add `links.video`, `links.dataset`, `links.model`.

### Honesty rules

- Never write a number that didn't come from a run. No placeholder results in content files.
- Compare against the control arm, not the base model, and say so.
- Publish negative results with the same care.
- Credit prior work with links.

### Demos

A demo is an interactive illustration in `src/components/demos/`. Wire it up by adding its name to the `demo` enum in `src/content.config.ts` and rendering it in `src/pages/experiments/[slug].astro` and `src/components/ExperimentFeature.astro`. It must say on screen that it is an illustration until real results exist. Add it to the component gallery.

## Explainers

Create `src/content/explained/slug.md`:

```yaml
---
title: Attention
summary: How a model decides what matters.
order: 4                      # position in the series
status: soon                  # soon | published
color: lav
shape: bubble
motion: float                 # pulse | spin | bob | float
minutes: 7                    # once published
video: https://www.youtube.com/embed/VIDEO_ID   # embed URL, once published
---
```

The body is a short plain-language intro, 2 to 4 short paragraphs.

## Then

Run `npm run build`, open the list page and the new page at phone and desktop width, and check the home page still picks the right latest experiment.
