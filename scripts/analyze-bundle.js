#!/usr/bin/env node

/**
 * Bundle analysis script for performance optimization
 * Run with: node scripts/analyze-bundle.js
 */

const fs = require('fs');
const path = require('path');

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
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    let totalJsSize = 0;
    
    jsFiles.forEach(file => {
      const filePath = path.join(jsDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      totalJsSize += sizeKB;
      
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
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    let totalCssSize = 0;
    
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      totalCssSize += sizeKB;
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
  
  const htmlFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    const filePath = path.join(outDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for performance issues
    const issues = [];
    
    if (content.includes('loading="lazy"')) {
      console.log(`  ✅ ${file}: Uses lazy loading`);
    }
    
    if (content.includes('preload')) {
      console.log(`  ✅ ${file}: Uses resource preloading`);
    }
    
    if (content.includes('font-display:swap')) {
      console.log(`  ✅ ${file}: Optimized font loading`);
    }
    
    // Check for large inline styles/scripts
    const inlineStyleMatches = content.match(/<style[^>]*>[\s\S]*?<\/style>/g);
    if (inlineStyleMatches) {
      const totalInlineCSS = inlineStyleMatches.join('').length;
      if (totalInlineCSS > 5000) {
        console.log(`  ⚠️  ${file}: Large inline CSS (${Math.round(totalInlineCSS/1024)}KB)`);
      }
    }
  });
}

// Run analysis
analyzeBundle();