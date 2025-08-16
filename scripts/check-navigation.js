#!/usr/bin/env node

/**
 * Check navigation links for trailing slash consistency
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking navigation links for trailing slash consistency...\n');

const htmlPath = path.join(process.cwd(), 'out', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Extract navigation links specifically
const navLinkPattern = /href="(\/[^"]*?)"/g;
const matches = [...content.matchAll(navLinkPattern)];

console.log('Found navigation links:');
matches.forEach(match => {
  const url = match[1];
  // Skip external links, assets, and anchors
  if (!url.startsWith('http') && !url.includes('.') && !url.includes('#') && !url.includes('_next')) {
    const hasTrailingSlash = url.endsWith('/') || url === '/';
    console.log(`  ${url} ${hasTrailingSlash ? '✅' : '❌'}`);
  }
});

// Check specific pages for consistency
const pages = ['spielplan', 'sponsoren', 'mitgliedschaft', 'impressum', 'fanshop'];
console.log('\n📋 Checking specific page links:');

pages.forEach(page => {
  // Build safe regexes so `includes` doesn't produce false positives
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const p = escapeRegExp(page);

  // Match href="/page/" exactly
  const withSlash = new RegExp(`href=["']/${p}/["']`).test(content);
  // Match href="/page" only when not followed by a slash (negative lookahead)
  const withoutSlash = new RegExp(`href=["']/${p}(?!/)["']`).test(content);

  console.log(`  /${page}: with slash=${withSlash}, without slash=${withoutSlash}`);
});