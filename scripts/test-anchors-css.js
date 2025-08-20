// Verify anchor offset CSS is present: --scroll-offset, html{scroll-padding-top}, [id]{scroll-margin-top}
const fs = require('fs');
const path = require('path');

function main() {
  const cssPath = path.join(process.cwd(), 'app', 'globals.css');
  if (!fs.existsSync(cssPath)) {
    console.error('globals.css not found at', cssPath);
    process.exit(2);
  }
  const css = fs.readFileSync(cssPath, 'utf8');
  const hasVar = /:root\s*{[\s\S]*--scroll-offset\s*:\s*\d+px;?[\s\S]*}/m.test(css);
  const hasScrollPadding = /html\s*{[\s\S]*scroll-padding-top\s*:\s*var\(--scroll-offset\)\s*;?[\s\S]*}/m.test(css);
  const hasScrollMargin = /\[id]\s*{[\s\S]*scroll-margin-top\s*:\s*var\(--scroll-offset\)\s*;?[\s\S]*}/m.test(css);

  if (!hasVar) {
    console.error('Missing --scroll-offset variable definition in :root');
    process.exit(1);
  }
  if (!hasScrollPadding) {
    console.error('Missing html { scroll-padding-top: var(--scroll-offset) }');
    process.exit(1);
  }
  if (!hasScrollMargin) {
    console.error('Missing [id] { scroll-margin-top: var(--scroll-offset) }');
    process.exit(1);
  }
  console.log('Anchor CSS checks passed.');
}

main();
