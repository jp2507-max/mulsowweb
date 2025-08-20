// Basic contrast check wrapper that uses axe-core via jsdom
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
  const script = window.document.createElement('script');
  script.textContent = axeCore.source;
  window.document.head.appendChild(script);

  const results = await new Promise((resolve, reject) => {
    window.axe.run(window.document, { runOnly: { type: 'tag', values: ['color-contrast'] } }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

  if (results.violations && results.violations.length > 0) {
    console.error('Contrast violations found:');
    results.violations.forEach(v => console.error(`- ${v.id}: ${v.description}`));
    process.exit(1);
  }

  console.log('No contrast violations detected.');
}

main().catch(err => { console.error(err); process.exit(3); });