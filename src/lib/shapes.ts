// The shape library. Every illustration on the site is built from these.
// Used on the server by Shape.astro and in the browser by the hero network,
// so a shape looks the same everywhere.

export const shapeKinds = ['donut', 'ring', 'dot', 'half', 'leaf', 'bubble', 'flower', 'face'] as const;
export type ShapeKind = (typeof shapeKinds)[number];

export type ShapePart = {
  tag: 'circle' | 'path' | 'rect';
  attrs: Record<string, number | string>;
  fill?: string;
  stroke?: string;
  role?: 'eye' | 'mouth' | 'dot';
};

// The "hole" color punches through a shape. It follows the surface behind it.
export const HOLE = 'var(--shape-hole, #0A0F16)';

const n = (v: number) => Math.round(v * 100) / 100;

export function shapeParts(kind: ShapeKind, color: string, r = 26): ShapePart[] {
  switch (kind) {
    case 'donut':
      return [
        { tag: 'circle', attrs: { r }, fill: color },
        { tag: 'circle', attrs: { r: n(r * .38) }, fill: HOLE },
      ];
    case 'ring':
      return [{ tag: 'circle', attrs: { r: n(r * .84), 'stroke-width': n(r * .32) }, fill: 'none', stroke: color }];
    case 'dot':
      return [{ tag: 'circle', attrs: { r }, fill: color }];
    case 'half':
      return [
        { tag: 'path', attrs: { d: `M${-r} ${n(r * .1)}A${r} ${r} 0 0 1 ${r} ${n(r * .1)}Z` }, fill: color },
        { tag: 'rect', attrs: { x: n(-r * .8), y: n(r * .32), width: n(r * 1.6), height: n(r * .18), rx: n(r * .09) }, fill: color },
      ];
    case 'leaf':
      return [{ tag: 'path', attrs: { d: `M${-r} ${-r}H0A${r} ${r} 0 0 1 ${r} 0V${r}H0A${r} ${r} 0 0 1 ${-r} 0Z` }, fill: color }];
    case 'bubble':
      return [
        { tag: 'rect', attrs: { x: n(-r * 1.1), y: n(-r * .72), width: n(r * 2.2), height: n(r * 1.44), rx: n(r * .5) }, fill: color },
        ...[-1, 0, 1].map(i => ({ tag: 'circle' as const, attrs: { cx: n(i * r * .42), r: n(r * .12) }, fill: HOLE, role: 'dot' as const })),
      ];
    case 'flower':
      return [
        ...[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([a, b]) => ({
          tag: 'circle' as const, attrs: { cx: n(a * r * .46), cy: n(b * r * .46), r: n(r * .5) }, fill: color,
        })),
        { tag: 'circle', attrs: { r: n(r * .28) }, fill: HOLE },
      ];
    case 'face':
      return [
        { tag: 'circle', attrs: { r }, fill: color },
        ...[-1, 1].map(s => ({ tag: 'circle' as const, attrs: { cx: n(s * r * .32), cy: n(-r * .12), r: n(r * .14) }, fill: HOLE, role: 'eye' as const })),
        {
          tag: 'path',
          attrs: { d: `M${n(-r * .3)} ${n(r * .24)}Q0 ${n(r * .5)} ${n(r * .3)} ${n(r * .24)}`, 'stroke-width': n(r * .11), 'stroke-linecap': 'round' },
          fill: 'none', stroke: HOLE, role: 'mouth',
        },
      ];
  }
}

export function partStyle(p: ShapePart) {
  return `fill:${p.fill ?? 'none'}${p.stroke ? `;stroke:${p.stroke}` : ''}`;
}
