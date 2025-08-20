// Keyboard navigation checks: skip link presence, focusable elements, and axe-core keyboard checks
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import * as axeCore from 'axe-core';

async function main() {
  const fixturePath = path.join(__dirname, 'fixtures', 'animations-fixture.html');
  if (!fs.existsSync(fixturePath)) {
    console.error('Fixture not found:', fixturePath);
    process.exit(2);
  }

  const html = fs.readFileSync(fixturePath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const { window } = dom;
  const doc = window.document;

  // 1) Skip link exists and points to an element with id
  const skip = doc.querySelector('.skip-link');
  if (!skip) {
    console.error('FAIL: Skip link (.skip-link) not found in fixture.');
    process.exit(1);
  }
  const href = skip.getAttribute('href') || '';
  if (!href.startsWith('#')) {
    console.error('FAIL: Skip link href does not point to a fragment id:', href);
    process.exit(1);
  }
  const target = doc.querySelector(href);
  if (!target) {
    console.error('FAIL: Skip link target not found for href:', href);
    process.exit(1);
  }
  console.log('OK: Skip link targets', href);

  // 2) Check that interactive elements are keyboard-focusable
  // Iterate all matches for .btn and .sponsor-card and apply tabbability rules:
  // - native controls (BUTTON, INPUT, SELECT, TEXTAREA) are tabbable
  // - anchors (A) are tabbable only if they have an href attribute
  // - tabindex="0" is tabbable
  // - tabindex="-1" or absence of tabindex on non-native, non-href anchors is not tabbable
  const selectors = [
    { selector: '.btn', name: '.btn' },
    { selector: '.sponsor-card', name: '.sponsor-card' }
  ];

  const nativeControls = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  let failed = false;

  selectors.forEach(({ selector, name }) => {
    const nodes = Array.from(doc.querySelectorAll(selector));
    if (nodes.length === 0) {
      console.warn(`WARN: No elements found for selector ${selector}`);
      return;
    }

    nodes.forEach((el, idx) => {
      const tag = el.tagName;
      const tabindexAttr = el.getAttribute('tabindex');
      let tabbable = false;

      if (nativeControls.includes(tag)) {
        tabbable = true;
      } else if (tag === 'A') {
        // Anchors only tabbable if they have an href attribute with a value
        tabbable = el.hasAttribute('href') && (el.getAttribute('href') || '').trim() !== '';
      } else if (tabindexAttr !== null && tabindexAttr === '0') {
        tabbable = true;
      } else {
        tabbable = false;
      }

      const desc = `${name}${nodes.length > 1 ? `[${idx}]` : ''} <${tag.toLowerCase()}>`;
      if (!tabbable) {
        console.error(`FAIL: ${desc} is not keyboard-focusable (tag=${tag}, tabindex=${tabindexAttr})`);
        failed = true;
      } else {
        console.log(`OK: ${desc} appears focusable.`);
      }
    });
  });

  if (failed) process.exit(1);

  // 3) Run axe-core accessibility keyboard-related checks
  const script = doc.createElement('script');
  script.textContent = axeCore.source;
  doc.head.appendChild(script);

  const results = await new Promise((resolve, reject) => {
    window.axe.run(doc, { runOnly: { type: 'tag', values: ['wcag2aa'] } }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

  if (results.violations && results.violations.length > 0) {
    console.error('Axe violations found:');
    results.violations.forEach(v => console.error(`- ${v.id}: ${v.description}`));
    process.exit(1);
  }

  console.log('Keyboard navigation checks passed (skip link, focusable elements, axe keyboard rules).');
}

main().catch(err => { console.error(err); process.exit(3); });