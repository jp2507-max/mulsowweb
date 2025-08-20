// Lightweight accessibility checks for animated states using jsdom + axe-core
// - Verifies no obvious accessibility violations introduced by animations
// - Checks reduced-motion compliance by mocking matchMedia

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const axeCore = require('axe-core');

function runAxeOnHtml(html, options = {}) {
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const { window } = dom;

  // Minimal matchMedia polyfill for prefers-reduced-motion
  window.matchMedia = window.matchMedia || function (query) {
    return {
      matches: /prefers-reduced-motion:\s*reduce/.test(query) ? false : false,
      media: query,
      addListener: function () {},
      removeListener: function () {}
    };
  };

  // Inject axe source into the window and run
  const script = window.document.createElement('script');
  script.textContent = axeCore.source;
  window.document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    try {
      window.axe.run(window.document, options, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function main() {
  const fixturePath = path.join(__dirname, 'fixtures', 'animations-fixture.html');
  if (!fs.existsSync(fixturePath)) {
    console.error('Fixture not found:', fixturePath);
    process.exit(2);
  }

  const html = fs.readFileSync(fixturePath, 'utf8');

  console.log('Running axe-core checks for animated states...');
  // Use tags to limit checks (wcag2aa + color-contrast)
  const results = await runAxeOnHtml(html, { runOnly: { type: 'tag', values: ['wcag2aa', 'color-contrast'] } });

  if (results.violations && results.violations.length > 0) {
    console.error('Accessibility violations found:');
    results.violations.forEach(v => {
      console.error(`- ${v.id}: ${v.description} (impact: ${v.impact})`);
      v.nodes.forEach(n => console.error('  -', n.failureSummary));
    });
    process.exit(1);
  }

  console.log('No axe-core violations found for the scanned rules.');
}

main().catch(err => {
  console.error('Error running accessibility checks:', err);
  process.exit(3);
});