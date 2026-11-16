# Jaribio Lab website

Astro static site for jaribiolab.com. Dark, playful, highly animated, built from a small shape library.

## Commands

```bash
npm run dev            # http://localhost:4321
npm run build          # runs check:private, then builds to dist/
npm run check          # Astro + TypeScript type check
npm run check:private  # fails if any private term appears in the repo
```

Node 24 (see `.nvmrc`; run `nvm use` first). Astro 7 needs Node 22.23.4 or newer. Keep TypeScript on 6.x until `@astrojs/check` supports 7.

## Map

| Path | What |
|---|---|
| `src/styles/tokens.css` | Every color, font, radius and easing. The only place raw hex lives (plus `src/lib/brand.ts` for TS). |
| `src/styles/global.css` | Base styles, headings, `.wrap`, `.reveal`, `.prose` for Markdown. |
| `src/lib/brand.ts` | Colors for TS, statuses, nav, social links. |
| `src/lib/shapes.ts` | The shape library. Shared by the server and browser. |
| `src/scripts/motion.ts` | Site-wide motion: `.reveal`, `data-count`, `data-magnet`, `data-tilt`. |
| `src/components/` | Reusable components. Each has scoped styles and, if needed, its own script. |
| `src/components/demos/` | Interactive demos attached to experiments via the `demo` frontmatter field. |
| `src/content/experiments/` | One Markdown file per experiment. Schema in `src/content.config.ts`. |
| `src/content/explained/` | One Markdown file per explainer episode. |
| `src/pages/` | Routes. `components.astro` is the component gallery at `/components`. |

## Rules

1. **Privacy.** Read `CLAUDE.local.md` if it exists and follow it. Never copy code, text or assets from other projects or employers into this repo. Run `npm run check:private` before every commit; a pre-commit hook also runs it.
2. **Never invent results.** Experiment numbers, costs and charts come only from real runs. Until then, show the plan and the budget. Illustrations must say on screen that they are illustrations.
3. **Build from components.** Check `/components` first. If a page needs something new, make it a component in `src/components/`, then add a specimen to `src/pages/components.astro` in the same change.
4. **Tokens only.** Use CSS variables from `tokens.css`. No raw hex in components except SVG fills that must be static.
5. **Shapes, not icons or stock art.** Illustrations use `Shape.astro` (donut, ring, dot, half, leaf, bubble, flower, face) in the accent colors. Do not add icon fonts or image illustrations.
6. **Motion with care.** Use the helpers in `motion.ts` before writing new scripts. Every animation must stop under `prefers-reduced-motion`. Animate `transform` and `opacity`, not layout.
7. **Phones first-class.** Check every page at 375px wide. No horizontal scroll. Grid columns that hold text use `minmax(0, 1fr)`.
8. **Writing.** Sentence case. Short sentences. No "simply", "just" or "easy". Numbers next to claims. Credit prior work.
9. **Done means verified.** `npm run check` and `npm run build` pass, and the page was opened in a browser at phone and desktop width.

## Skills

- `.claude/skills/site-components/` for building pages and components.
- `.claude/skills/add-experiment/` for adding or updating an experiment or explainer.
