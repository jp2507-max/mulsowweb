import { initScrollReveal } from '../lib/utils/scrollReveal.mjs';

// Minimal DOM shim for Node (no external deps)
class MockClassList {
  constructor(el) { this._set = new Set(); this._el = el }
  add(...names) { for (const n of names) this._set.add(n); this._el.className = Array.from(this._set).join(' '); }
  contains(n) { return this._set.has(n); }
  remove(n) { this._set.delete(n); this._el.className = Array.from(this._set).join(' '); }
}

function createElement(id, classes = []) {
  const el = { id, className: classes.join(' '), dataset: {}, attributes: {},
    classList: null,
  };
  el.classList = new MockClassList(el);
  // initialize classList with provided classes
  el.classList.add(...classes);
  return el;
}

(async function run() {
  const a = createElement('a', ['reveal-candidate', 'reveal--slide-up']);
  const b = createElement('b', ['reveal-candidate', 'reveal--fade']);

  const elements = [a, b];

  global.document = {
    querySelectorAll(sel) {
      // very small selector support for .reveal-candidate
      if (sel === '.reveal-candidate') return elements;
      return [];
    },
    getElementById(id) { return elements.find(e => e.id === id) || null; }
  };

  // Fake IntersectionObserver that triggers intersections after observe()
  class FakeIO {
    constructor(cb) { this.cb = cb; this.elements = []; }
    observe(el) { this.elements.push(el); }
    unobserve() {}
    disconnect() {}
  }

  global.IntersectionObserver = function(cb, options) {
    const inst = new FakeIO(cb);
    // Simulate that everything is intersecting on next tick
    setTimeout(() => {
      const entries = inst.elements.map(el => ({ target: el, isIntersecting: true, intersectionRatio: 1 }));
      cb(entries, inst);
    }, 0);
    return inst;
  };

  // Run the initializer
  const cleanup = initScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -15% 0px' });

  // Wait a tick for fake IO to fire
  await new Promise((r) => setTimeout(r, 20));

  console.log('a classes:', a.className);
  console.log('b classes:', b.className);

  if (!a.classList.contains('in') || !b.classList.contains('in')) {
    console.error('Test failed: elements were not revealed');
    process.exit(1);
  }

  console.log('Test passed: reveal classes applied');

  if (typeof cleanup === 'function') cleanup();
  process.exit(0);
})();
