import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jaribiolab.com',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
