#!/usr/bin/env node

/**
 * Performance verification script for task 10.3
 * Verifies all performance enhancements are implemented
 */

const fs = require('fs');
const path = require('path');

function verifyPerformanceEnhancements() {
  console.log('🔍 Verifying performance enhancements for task 10.3...\n');
  
  const checks = [
    checkNativeLazyLoading(),
    checkReducedMotionSupport(),
    checkFontOptimization(),
    checkBundleOptimization(),
  ];
  
  const passed = checks.filter(check => check.passed).length;
  const total = checks.length;
  
  console.log(`\n📊 Performance Enhancement Summary: ${passed}/${total} checks passed\n`);
  
  if (passed === total) {
    console.log('✅ All performance enhancements implemented successfully!');
    console.log('\n🎯 Task 10.3 Requirements Met:');
    console.log('  ✅ Native lazy loading for images');
    console.log('  ✅ Reduced motion support for animations');
    console.log('  ✅ Font display optimization for CLS prevention');
    console.log('  ✅ JavaScript bundle size minimization');
  } else {
    console.log('❌ Some performance enhancements need attention.');
  }
  
  return passed === total;
}

function checkNativeLazyLoading() {
  console.log('1️⃣ Checking native lazy loading implementation...');
  
  const imageComponentPath = path.join(process.cwd(), 'components/ui/Image.tsx');
  const headerComponentPath = path.join(process.cwd(), 'components/ui/Header.tsx');
  
  let passed = true;
  const issues = [];
  
  // Check if Image component exists
  if (!fs.existsSync(imageComponentPath)) {
    issues.push('Image component not found');
    passed = false;
  } else {
    const imageContent = fs.readFileSync(imageComponentPath, 'utf8');
    
    // Check for lazy loading implementation using regex to be robust to whitespace
    const loadingPropRegex = /loading\s*=\s*("[^"]*"|'[^']*'|\{[^}]*\})/; 
    // decoding should be either a literal "async" or an expression
    const decodingPropRegex = /decoding\s*=\s*("async"|\{[^}]*\})/;
    // presence test for priority prop (may be boolean shorthand or assigned)
    const priorityPropRegex = /\bpriority\b\s*(=\s*("[^"]*"|'[^']*'|\{[^}]*\}))?/;

    if (!loadingPropRegex.test(imageContent) && !/priority\s*\?\s*"eager"\s*:\s*"lazy"/.test(imageContent)) {
      issues.push('Native lazy loading not implemented in Image component');
      passed = false;
    }

    if (!decodingPropRegex.test(imageContent)) {
      issues.push('Async decoding not implemented');
      passed = false;
    }

    if (!priorityPropRegex.test(imageContent)) {
      issues.push('Priority loading option not available');
      passed = false;
    }
  }
  
  // Check if Header uses optimized Image component
  if (fs.existsSync(headerComponentPath)) {
    const headerContent = fs.readFileSync(headerComponentPath, 'utf8');
    if (!headerContent.includes('import { Image }')) {
      issues.push('Header not using optimized Image component');
      passed = false;
    }
  }
  
  if (passed) {
    console.log('  ✅ Native lazy loading implemented correctly');
  } else {
    console.log('  ❌ Issues found:');
    issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  return { passed, issues };
}

function checkReducedMotionSupport() {
  console.log('2️⃣ Checking reduced motion support...');
  
  const cssPath = path.join(process.cwd(), 'app/globals.css');
  
  let passed = true;
  const issues = [];
  
  if (!fs.existsSync(cssPath)) {
    issues.push('globals.css not found');
    passed = false;
  } else {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Check for comprehensive reduced motion support
    if (!cssContent.includes('@media (prefers-reduced-motion: reduce)')) {
      issues.push('Reduced motion media query not found');
      passed = false;
    }
    
    if (!cssContent.includes('animation-duration: 0.01ms !important')) {
      issues.push('Animation duration override not implemented');
      passed = false;
    }
    
    if (!cssContent.includes('transition-duration: 0.01ms !important')) {
      issues.push('Transition duration override not implemented');
      passed = false;
    }
    
    if (!cssContent.includes('scroll-behavior: auto !important')) {
      issues.push('Scroll behavior override not implemented');
      passed = false;
    }
  }
  
  if (passed) {
    console.log('  ✅ Comprehensive reduced motion support implemented');
  } else {
    console.log('  ❌ Issues found:');
    issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  return { passed, issues };
}

function checkFontOptimization() {
  console.log('3️⃣ Checking font optimization for CLS prevention...');
  
  const layoutPath = path.join(process.cwd(), 'app/layout.tsx');
  const cssPath = path.join(process.cwd(), 'app/globals.css');
  
  let passed = true;
  const issues = [];
  
  // Check layout.tsx for font optimization
  if (!fs.existsSync(layoutPath)) {
    issues.push('layout.tsx not found');
    passed = false;
  } else {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    if (!layoutContent.includes("display: 'swap'")) {
      issues.push('Font display swap not configured');
      passed = false;
    }
    
    if (!layoutContent.includes('adjustFontFallback: true')) {
      issues.push('Font fallback adjustment not enabled');
      passed = false;
    }
    
    if (!layoutContent.includes('preload: true')) {
      issues.push('Font preloading not enabled');
      passed = false;
    }
  }
  
  // Check CSS for font display optimization
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    if (!cssContent.includes('font-display: swap')) {
      issues.push('Font display swap not set in CSS');
      passed = false;
    }
  }
  
  if (passed) {
    console.log('  ✅ Font optimization for CLS prevention implemented');
  } else {
    console.log('  ❌ Issues found:');
    issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  return { passed, issues };
}

function checkBundleOptimization() {
  console.log('4️⃣ Checking JavaScript bundle optimization...');
  
  const configPath = path.join(process.cwd(), 'next.config.mjs');
  const packagePath = path.join(process.cwd(), 'package.json');
  const bundleOptimizerPath = path.join(process.cwd(), 'components/utility/BundleOptimizer.tsx');
  
  let passed = true;
  const issues = [];
  
  // Check next.config.mjs for optimizations
  if (!fs.existsSync(configPath)) {
    issues.push('next.config.mjs not found');
    passed = false;
  } else {
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    if (!configContent.includes('removeConsole')) {
      issues.push('Console removal not configured');
      passed = false;
    }
    
    if (!configContent.includes('splitChunks')) {
      issues.push('Bundle splitting not configured');
      passed = false;
    }
    
    if (!configContent.includes('turbopack')) {
      issues.push('Turbopack configuration not found');
      passed = false;
    }
  }
  
  // Check for bundle analysis script
  if (!fs.existsSync(packagePath)) {
    issues.push('package.json not found');
    passed = false;
  } else {
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    
    if (!packageContent.includes('"analyze"')) {
      issues.push('Bundle analysis script not added');
      passed = false;
    }
  }
  
  // Check for BundleOptimizer utility
  if (!fs.existsSync(bundleOptimizerPath)) {
    issues.push('BundleOptimizer utility not found');
    passed = false;
  }
  
  if (passed) {
    console.log('  ✅ JavaScript bundle optimization implemented');
  } else {
    console.log('  ❌ Issues found:');
    issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  return { passed, issues };
}

// Run verification
const success = verifyPerformanceEnhancements();
process.exit(success ? 0 : 1);