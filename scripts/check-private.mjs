// Fails if any term from the local, git-ignored `.private-terms` file appears
// in the project. The terms themselves never live in the repo.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const termsFile = join(root, '.private-terms');

if (!existsSync(termsFile)) {
  console.log('check:private skipped (no .private-terms file on this machine)');
  process.exit(0);
}

const terms = readFileSync(termsFile, 'utf8')
  .split('\n')
  .map(t => t.trim().toLowerCase())
  .filter(t => t && !t.startsWith('#'));

const skip = new Set(['node_modules', 'dist', '.astro', '.git', '.private-terms', 'CLAUDE.local.md', 'package-lock.json']);
const binary = /\.(png|jpe?g|gif|webp|ico|woff2?|mp4|webm|pdf)$/i;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) { walk(path); continue; }
    if (binary.test(name)) continue;
    const lines = readFileSync(path, 'utf8').toLowerCase().split('\n');
    lines.forEach((line, i) => {
      for (const t of terms) if (line.includes(t)) hits.push(`${relative(root, path)}:${i + 1}`);
    });
    for (const t of terms) if (name.toLowerCase().includes(t)) hits.push(relative(root, path));
  }
}

walk(root);

if (hits.length) {
  console.error('check:private failed. Private terms found in:\n  ' + hits.join('\n  '));
  process.exit(1);
}
console.log(`check:private passed (${terms.length} terms)`);
