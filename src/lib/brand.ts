// Shared brand values for TypeScript. Keep in sync with src/styles/tokens.css.

export const colors = {
  teal: '#5BBABE',
  coral: '#FF8A7A',
  yellow: '#FFC23D',
  lav: '#B7A6FF',
  pink: '#FF8CC6',
  ink: '#E9EFF5',
  white: '#FFFFFF',
  dark: '#141022',
  bg: '#0A0F16',
} as const;

export type ColorName = keyof typeof colors;
export const accentNames = ['teal', 'coral', 'yellow', 'lav', 'pink'] as const;
export type AccentName = (typeof accentNames)[number];

export const statuses = ['planned', 'running', 'editing', 'published'] as const;
export type Status = (typeof statuses)[number];

export const statusMeta: Record<Status, { label: string; color: AccentName }> = {
  planned: { label: 'Planned', color: 'lav' },
  running: { label: 'Running', color: 'teal' },
  editing: { label: 'Editing', color: 'yellow' },
  published: { label: 'Published', color: 'coral' },
};

export const links = {
  youtube: 'https://www.youtube.com/@jaribiolab',
  github: 'https://github.com/jaribio-lab',
  experimentsRepo: 'https://github.com/jaribio-lab/experiments',
  discussions: 'https://github.com/jaribio-lab/experiments/discussions',
  huggingface: 'https://huggingface.co/jaribiolab',
  x: 'https://x.com/jaribiolab',
};

export const nav = [
  { href: '/experiments', label: 'Experiments' },
  { href: '/explained', label: 'Explained' },
  { href: '/about', label: 'About' },
];
