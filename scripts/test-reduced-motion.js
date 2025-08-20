// Static check for reduced-motion CSS rules in the fixture
const fs = require('fs');
const path = require('path');

function findReducedMotionRules(cssText) {
  const marker = '@media';
  const idx = cssText.indexOf('prefers-reduced-motion: reduce');
  if (idx === -1) return null;
  // find the first '{' after this marker
  const open = cssText.indexOf('{', idx);
  if (open === -1) return null;
  // find matching closing brace
  let depth = 0;
  let i = open;
  for (; i < cssText.length; i++) {
    const ch = cssText[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (i >= cssText.length) return null;
  return cssText.slice(open + 1, i);
}

function checkSelectorsContainDisable(cssBlock, selectors = ['.btn', '.sponsor-card', '.reveal']) {
  if (!cssBlock) return false;
  // Ensure the block contains an instruction disabling transitions and references the selectors
  const disables = /transition\s*:\s*none/i.test(cssBlock) || /transition-duration\s*:\s*0(?:s|ms)?/i.test(cssBlock) || /transition\s*:\s*0(?:s|ms)?/i.test(cssBlock);
  if (!disables) return false;
  return selectors.every(sel => cssBlock.indexOf(sel) !== -1);
}

async function main() {
  const fixturePath = path.join(__dirname, 'fixtures', 'animations-fixture.html');
  if (!fs.existsSync(fixturePath)) {
    console.error('Fixture not found:', fixturePath);
    process.exit(2);
  }
  const html = fs.readFileSync(fixturePath, 'utf8');
  // Extract <style> contents
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const cssText = styleMatch ? styleMatch[1] : '';
  const reducedBlock = findReducedMotionRules(cssText);
  if (!reducedBlock) {
    console.error('FAIL: No @media (prefers-reduced-motion: reduce) block found in fixture CSS.');
    process.exit(1);
  }

  const ok = checkSelectorsContainDisable(reducedBlock, ['.btn', '.sponsor-card', '.reveal']);
  if (!ok) {
    console.error('FAIL: Reduced-motion block missing or not disabling transitions for required selectors (.btn, .sponsor-card, .reveal).');
    process.exit(1);
  }

  console.log('Reduced-motion CSS rule checks passed.');
}

main().catch(err => { console.error(err); process.exit(3); });