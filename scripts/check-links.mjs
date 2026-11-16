// Fails if any link in the built site leaves jaribiolab.com without opening a new tab.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;
if (!existsSync(dist)) { console.error('check:links needs a build. Run npm run build first.'); process.exit(1); }

const own = /^https?:\/\/(www\.)?jaribiolab\.com/i;
const bad = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) { walk(path); continue; }
    if (!name.endsWith('.html')) continue;
    const html = readFileSync(path, 'utf8');
    for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
      const href = tag.match(/href="([^"]*)"/i)?.[1] ?? '';
      const external = /^(https?:)?\/\//i.test(href) && !own.test(href);
      if (external && !/target="_blank"/i.test(tag)) bad.push(`${relative(dist, path)}: ${href}`);
    }
  }
}

walk(dist);
if (bad.length) {
  console.error('check:links failed. External links must open in a new tab:\n  ' + bad.join('\n  '));
  process.exit(1);
}
console.log('check:links passed');
