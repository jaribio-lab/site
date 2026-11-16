import { defineConfig } from 'astro/config';
import rehypeExternalLinks from './src/lib/rehype-external-links.mjs';

export default defineConfig({
  site: 'https://jaribiolab.com',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
    rehypePlugins: [rehypeExternalLinks],
  },
});
