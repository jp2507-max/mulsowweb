---
trigger: always_on
---

# Technology Stack & Build System

## Core Technologies

### Framework & Language
- **Next.js 14+** with App Router
- **TypeScript** in strict mode
- **Static Export Only** (`output: 'export'`) - no SSR, middleware, or server functions

### Styling & Design
- **Tailwind CSS** with custom design tokens
- **Bundled fonts** via next/font (Inter + Oswald) - fonts included in build, no external CDN requests
- **Modern sports palette**: Primary red (#C1121F), neutral grays
- **All assets bundled** - no external dependencies, everything included in IONOS upload

### Image & Asset Handling
- **Regular `<img>` tags** - no Next.js image optimization (static export limitation)
- **Native lazy loading** with `loading="lazy"`
- **All assets bundled** - images, PDFs, fonts included in build and uploaded to IONOS
- **PDF downloads** for membership applications (served from IONOS)

### Hosting & Deployment
- **IONOS static hosting** with Apache server
- **Static HTML generation** in `/out` directory
- **Apache .htaccess** configuration for redirects and security

## Build Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Generate static export
npm run start        # Preview static build locally
```

### Deployment Process
```bash
npm run build        # Generates /out directory
# Upload /out contents to IONOS htdocs/
# Place .htaccess in web root (same level as index.html)
```

### Quality Checks
```bash
npm run type-check   # TypeScript validation
npm run lint         # ESLint code quality
# Manual: Lighthouse audit (target ≥90 performance)
# Manual: Accessibility testing with axe-core
```

## Key Configuration Files

### Next.js Config
```javascript
// next.config.mjs
output: 'export'
trailingSlash: true  // Recommended for Apache
```

### Server Configuration
```apache
# .htaccess (deploy root)
Redirect 302 /fanshop https://msv61.fan12.de/
ErrorDocument 404 /404.html
# Security headers (modern only)
```

## Architecture Constraints

### What's Included
- Static HTML generation for all pages
- Client-side routing between pages
- External redirects and PDF downloads
- SEO optimization for static content

### What's NOT Included
- No backend functionality or databases
- No server-side rendering or API routes
- No real-time features or user authentication
- No middleware or dynamic routing

## Performance Requirements
- Bundle size optimization
- Core Web Vitals compliance
- Accessibility (WCAG 2.1 AA)
- German language support (`lang="de"`)
- Mobile-first responsive design