// Site-wide motion. Loaded once by BaseLayout. Works through data attributes and
// classes so components don't need their own scripts for common effects:
//   .reveal          fades and rises in when scrolled into view (stagger among siblings)
//   [data-count]     counts up from 0 when revealed; optional data-prefix / data-suffix
//   [data-magnet]    pulls toward the cursor
//   [data-tilt]      tilts in 3D under the cursor

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

function countUp(el: HTMLElement) {
  const end = Number(el.dataset.count);
  const pre = el.dataset.prefix ?? '';
  const suf = el.dataset.suffix ?? '';
  if (reduceMotion) { el.textContent = pre + end + suf; return; }
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / 1200);
    el.textContent = pre + Math.round(end * (1 - Math.pow(1 - k, 3))) + suf;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const el = en.target as HTMLElement;
      el.classList.add('on');
      if (el.dataset.count) countUp(el);
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
      io.unobserve(el);
    }
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    const sibs = [...(el.parentElement?.children ?? [])].filter(c => c.classList.contains('reveal'));
    el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 6) * 70}ms`;
    io.observe(el);
  });
  document.querySelectorAll<HTMLElement>('[data-count]:not(.reveal [data-count]):not(.reveal[data-count])').forEach(el => io.observe(el));
}

function initMagnets() {
  document.querySelectorAll<HTMLElement>('[data-magnet]').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * .25}px`);
      b.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * .35}px`);
    });
    b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
  });
}

function initTilt() {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(c => {
    const max = Number(c.dataset.tilt) || 10;
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * max}deg`);
      c.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - .5) * max}deg`);
    });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
  });
}

initReveal();
if (!reduceMotion && finePointer) {
  initMagnets();
  initTilt();
}
