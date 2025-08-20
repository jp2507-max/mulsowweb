#!/usr/bin/env node

/**
 * Bundle analysis script for performance optimization
 * Run with: node scripts/analyze-bundle.js
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

// Recursively walk a directory and return full paths for files with the given extension
function walkFiles(rootDir, ext) {
  const results = [];
  if (!fs.existsSync(rootDir)) return results;

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, ext));
    } else if (entry.isFile()) {
      if (!ext || fullPath.endsWith(ext)) results.push(fullPath);
    }
  }

  return results;
}

function analyzeBundle() {
  console.log('🔍 Analyzing bundle for performance optimization...\n');
  
  // Check if build exists
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    console.log('❌ Build not found. Run "npm run build" first.');
    return;
  }
  
  // Analyze static files
  const staticDir = path.join(outDir, '_next', 'static');
  if (fs.existsSync(staticDir)) {
    analyzeStaticFiles(staticDir);
  }
  
  // Check HTML files
  analyzeHtmlFiles(outDir);
  
  console.log('\n✅ Bundle analysis complete!');
  console.log('\n📊 Performance recommendations:');
  console.log('- Keep JavaScript bundles under 200KB');
  console.log('- Optimize images to WebP format when possible');
  console.log('- Use lazy loading for non-critical images');
  console.log('- Monitor Core Web Vitals with Lighthouse');
}

function analyzeStaticFiles(staticDir) {
  console.log('📦 Static files analysis:');
  
  const jsDir = path.join(staticDir, 'chunks');
  if (fs.existsSync(jsDir)) {
    const jsFiles = walkFiles(jsDir, '.js');
    let totalJsSize = 0;

    jsFiles.forEach(filePath => {
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      totalJsSize += sizeKB;
      const file = path.basename(filePath);

      if (sizeKB > 100) {
        console.log(`  ⚠️  Large JS file: ${file} (${sizeKB}KB)`);
      }
    });
    
    console.log(`  📊 Total JavaScript: ${totalJsSize}KB`);
    if (totalJsSize > 200) {
      console.log('  ❌ JavaScript bundle is large. Consider code splitting.');
    } else {
      console.log('  ✅ JavaScript bundle size is good.');
    }
  }
  
  const cssDir = path.join(staticDir, 'css');
  if (fs.existsSync(cssDir)) {
    // Use the same recursive walker as for JS so we include nested hashed subdirectories
    const cssFiles = walkFiles(cssDir, '.css');
    let totalCssSize = 0;

    cssFiles.forEach(filePath => {
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      totalCssSize += sizeKB;
      const file = path.basename(filePath);

      if (sizeKB > 100) {
        console.log(`  ⚠️  Large CSS file: ${file} (${sizeKB}KB)`);
      }
    });

    console.log(`  📊 Total CSS: ${totalCssSize}KB`);
    if (totalCssSize > 50) {
      console.log('  ⚠️  CSS bundle is large. Consider purging unused styles.');
    } else {
      console.log('  ✅ CSS bundle size is good.');
    }
  }
}

function analyzeHtmlFiles(outDir) {
  console.log('\n📄 HTML files analysis:');
  
  // Recursively collect all .html files under outDir (includes nested index.html files)
  // Hidden directories (dot-prefixed) are traversed as well by design.
  const htmlFiles = walkFiles(outDir, '.html');

  htmlFiles.forEach(filePath => {
    // Display path relative to the outDir for more readable logs
    const displayPath = path.relative(outDir, filePath) || path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
  // Check for performance issues
    
    if (content.includes('loading="lazy"')) {
      console.log(`  ✅ ${displayPath}: Uses lazy loading`);
    }
    
    if (content.includes('preload')) {
      console.log(`  ✅ ${displayPath}: Uses resource preloading`);
    }
    
    if (content.includes('font-display:swap')) {
      console.log(`  ✅ ${displayPath}: Optimized font loading`);
    }
    
    // Check for large inline styles/scripts
    const inlineStyleMatches = content.match(/<style[^>]*>[\s\S]*?<\/style>/g);
    if (inlineStyleMatches) {
      const totalInlineCSS = inlineStyleMatches.join('').length;
      if (totalInlineCSS > 5000) {
        console.log(`  ⚠️  ${displayPath}: Large inline CSS (${Math.round(totalInlineCSS/1024)}KB)`);
      }
    }
  });
}

// Run analysis
analyzeBundle();