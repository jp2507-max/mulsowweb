// Keyboard navigation checks: skip link presence, focusable elements, and axe-core keyboard checks
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const axeCore = require('axe-core');

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
  const btn = doc.querySelector('.btn');
  const sponsor = doc.querySelector('.sponsor-card');
  const focusableChecks = [];
  if (btn) focusableChecks.push({ el: btn, name: '.btn' });
  if (sponsor) focusableChecks.push({ el: sponsor, name: '.sponsor-card' });

  let failed = false;
  focusableChecks.forEach(item => {
    const hasTab = item.el.hasAttribute('tabindex') || ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(item.el.tagName);
    if (!hasTab) {
      console.error(`FAIL: ${item.name} is not keyboard-focusable (no tabindex and not a native control).`);
      failed = true;
    } else {
      console.log(`OK: ${item.name} appears focusable.`);
    }
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