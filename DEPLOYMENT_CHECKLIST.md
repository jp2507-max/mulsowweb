# IONOS Deployment Checklist - Mulsower SV 61 Website

## Pre-Deployment Verification ✅

### Build Verification
- [x] **Static export generated successfully** - `npm run build` completed without errors
- [x] **TypeScript compilation clean** - No TypeScript errors in strict mode
- [x] **All pages generated** - All routes exported as static HTML files
- [x] **Assets included** - All images, PDFs, fonts, and static assets present in `/out`

### File Structure Verification
- [x] **Root files present**:
  - `index.html` (home page)
  - `404.html` (custom error page)
  - `.htaccess` (server configuration)
  - `robots.txt` (SEO)
  - `sitemap.xml` (SEO)
  - `manifest.json` (PWA)

- [x] **Page directories present**:
  - `spielplan/index.html`
  - `sponsoren/index.html`
  - `mitgliedschaft/index.html`
  - `impressum/index.html`

- [x] **Static assets present**:
  - All favicon files (16px, 32px, ICO, SVG)
  - Logo files (128px, 256px, 512px, 1024px, SVG)
  - OG image (`og-msv61-redwhite-1200x630.png`)
  - Membership PDF (`05_2025_Aufnahmeantrag.pdf`)
  - Apple touch icon (`apple-touch-icon-180.png`)

- [x] **Next.js assets present**:
  - `_next/static/` directory with CSS and JS bundles
  - Font files (Inter and Oswald WOFF2)
  - Optimized JavaScript chunks

### .htaccess Configuration Verification
- [x] **Fanshop redirect configured**: `Redirect 302 /fanshop https://msv61.fan12.de/`
- [x] **Custom 404 page**: `ErrorDocument 404 /404.html`
- [x] **Security headers configured**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - Basic Content Security Policy
- [x] **Caching rules configured**:
  - Static assets: 1 year cache (`max-age=31536000`)
  - HTML files: 1 hour cache (`max-age=3600`)
  - JSON files: 1 day cache (`max-age=86400`)
- [x] **Compression enabled**: Gzip compression for text files
- [x] **Security protections**: Hidden dot files and sensitive extensions

## IONOS Upload Process 📤

### Step 1: Access IONOS Control Panel
1. Log into IONOS Control Panel
2. Navigate to your hosting package
3. Access "Webspace Explorer" or use FTP client

### Step 2: Backup Current Site (if applicable)
1. Download current `htdocs` contents to local backup folder
2. Note: This is a new deployment, so backup may not be necessary

### Step 3: Upload Static Files
1. **Clear htdocs directory** (if not a fresh installation)
2. **Upload ALL contents from `/out` directory to `htdocs/`**
   - Upload `index.html` to root of `htdocs/`
   - Upload `.htaccess` to root of `htdocs/` (same level as `index.html`)
   - Upload all subdirectories (`spielplan/`, `sponsoren/`, etc.)
   - Upload `_next/` directory with all assets
   - Upload all static files (images, PDFs, etc.)

### Step 4: File Permissions
1. Ensure `.htaccess` has proper permissions (typically 644)
2. Ensure all HTML files have read permissions (644)
3. Ensure directories have proper permissions (755)

## Post-Deployment Testing 🧪

### Step 1: Basic Functionality Tests
- [ ] **Home page loads**: Visit `https://mulsower-sv.de/`
- [ ] **All pages accessible**:
  - [ ] `/spielplan/` - Schedule page
  - [ ] `/sponsoren/` - Sponsors page  
  - [ ] `/mitgliedschaft/` - Membership page
  - [ ] `/impressum/` - Legal page
- [ ] **404 page works**: Visit non-existent URL (e.g., `/test-404`)

### Step 2: Redirect and Download Tests
- [ ] **Fanshop redirect**: Visit `/fanshop` → should redirect to `https://msv61.fan12.de/`
- [ ] **PDF download**: Click membership application download button
- [ ] **External links**: Test FUSSBALL.DE link opens in new tab

### Step 3: Performance and SEO Tests
- [ ] **Page load speed**: All pages load quickly (< 3 seconds)
- [ ] **Mobile responsiveness**: Test on mobile device or browser dev tools
- [ ] **SEO files accessible**:
  - [ ] `/robots.txt` - Should display robots file
  - [ ] `/sitemap.xml` - Should display XML sitemap
- [ ] **Favicon displays**: Check browser tab shows correct favicon

### Step 4: Security and Headers Tests
Use browser dev tools (F12 → Network tab) to verify:
- [ ] **Security headers present**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] **Caching headers correct**:
  - HTML files: `Cache-Control: public, max-age=3600`
  - CSS/JS files: `Cache-Control: public, max-age=31536000`
  - Images: `Cache-Control: public, max-age=31536000`

### Step 5: Content Verification
- [ ] **Contact information correct**:
  - Address displayed correctly on `/mitgliedschaft` and `/impressum`
  - Email address correct and clickable
- [ ] **Sponsor links functional**: All sponsor cards link to correct websites
- [ ] **Typography and styling**: Fonts load correctly (Oswald headings, Inter body)
- [ ] **Images display**: All logos, icons, and images load properly

## Staging Environment Testing (Recommended) 🚀

### Option 1: Subdirectory Testing
1. Create subdirectory in IONOS: `htdocs/staging/`
2. Upload all `/out` contents to `staging/` directory
3. Test via `https://mulsower-sv.de/staging/`
4. Verify all functionality before moving to production

### Option 2: Subdomain Testing
1. Create subdomain in IONOS (e.g., `staging.mulsower-sv.de`)
2. Upload all `/out` contents to subdomain's document root
3. Test all functionality on staging subdomain
4. Move to production domain after verification

## Performance Optimization Verification 📊

### Lighthouse Audit Targets
Run Lighthouse audit on deployed site:
- [ ] **Performance Score**: ≥ 90
- [ ] **Accessibility Score**: ≥ 95
- [ ] **Best Practices Score**: ≥ 95
- [ ] **SEO Score**: ≥ 95

### Core Web Vitals Targets
- [ ] **LCP (Largest Contentful Paint)**: ≤ 2.5 seconds
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1
- [ ] **INP (Interaction to Next Paint)**: ≤ 200ms

## Troubleshooting Common Issues 🔧

### Issue: 404 Errors for Pages
**Solution**: Ensure trailing slashes in URLs (`/spielplan/` not `/spielplan`)

### Issue: .htaccess Not Working
**Solutions**:
1. Verify `.htaccess` is in root directory (same level as `index.html`)
2. Check file permissions (should be 644)
3. Ensure no syntax errors in `.htaccess` file

### Issue: Fanshop Redirect Not Working
**Solutions**:
1. Verify redirect line in `.htaccess`: `Redirect 302 /fanshop https://msv61.fan12.de/`
2. Clear browser cache and test in incognito mode
3. Check IONOS control panel for any conflicting redirects

### Issue: Fonts Not Loading
**Solutions**:
1. Verify `_next/static/media/` directory uploaded correctly
2. Check font preload links in HTML head
3. Ensure proper MIME types for WOFF2 files

### Issue: Images Not Displaying
**Solutions**:
1. Verify all image files uploaded to correct paths
2. Check image paths in HTML (should be relative: `/logo.svg`)
3. Ensure proper file permissions for images

## Final Deployment Checklist ✅

### Pre-Go-Live
- [ ] All staging tests passed
- [ ] Performance targets met
- [ ] Content reviewed and approved
- [ ] Contact information verified
- [ ] Legal pages complete

### Go-Live Process
- [ ] Upload all files to production `htdocs/`
- [ ] Verify `.htaccess` in correct location
- [ ] Test all critical functionality
- [ ] Monitor for any errors in first hour
- [ ] Announce new website to stakeholders

### Post-Go-Live Monitoring
- [ ] Monitor website performance for 24 hours
- [ ] Check for any broken links or errors
- [ ] Verify search engine indexing (may take days/weeks)
- [ ] Set up regular backups of static files

## Build Information 📋

**Build Date**: August 16, 2025
**Next.js Version**: 15.4.6
**Build Output Size**: 
- Total bundle size: ~191 kB First Load JS
- Home page: 2.37 kB + 194 kB shared
- Other pages: 139 B + 191 kB shared

**Key Features Deployed**:
- Static HTML export for all pages
- Optimized font loading (Inter + Oswald)
- Responsive design with Tailwind CSS
- SEO optimization with metadata
- Security headers and caching
- External redirects and downloads

---

**Deployment Contact**: Development Team  
**Emergency Contact**: [To be filled by administrator]  
**IONOS Support**: Available via control panel or phone support