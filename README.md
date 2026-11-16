# site

The Jaribio Lab website: open, reproducible AI and neuroscience experiments, plus animated explainers.

Built with [Astro](https://astro.build). No UI framework, no CSS framework. Everything animated is plain CSS, SVG and a little TypeScript.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:4321. The component gallery is at http://localhost:4321/components.

## Add content

- An experiment: add `src/content/experiments/NNN-slug.md`.
- An explainer: add `src/content/explained/slug.md`.

The fields are checked at build time. See `.claude/skills/add-experiment/SKILL.md` for the full guide, and `CLAUDE.md` for the project rules.

## License

- **Code** is licensed under the [MIT License](LICENSE).
- **Datasets, written content, figures and animations** are licensed under [CC BY 4.0](LICENSE-CONTENT). You may reuse them, including commercially, as long as you credit Jaribio Lab.
