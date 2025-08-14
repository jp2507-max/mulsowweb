# Design Document

## Overview

The Mulsower SV 61 website is designed as a fast, minimal static website built with Next.js App Router and deployed as a static export to IONOS hosting. The architecture prioritizes simplicity, maintainability, and performance while ensuring excellent accessibility and SEO.

The design follows a component-based approach with consistent branding, semantic HTML structure, and responsive layouts. All data is static, eliminating the need for a backend, with external integrations handled through redirects and links.

## Architecture

### Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Fonts**: Self-hosted via next/font (Inter + Oswald) - no external requests
- **Build**: Static export only (`output: 'export'`) - no SSR, middleware, or server functions
- **Hosting**: IONOS static hosting with Apache .htaccess configuration
- **Images**: Regular `<img>` tags (no Next.js image optimization in static export)
- **Routing**: Client-side routing with server-side 404 handling

### Project Structure
```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx               # Home page
├── spielplan/
│   └── page.tsx           # Schedule page
├── sponsoren/
│   └── page.tsx           # Sponsors page
├── mitgliedschaft/
│   └── page.tsx           # Membership page
├── impressum/
│   └── page.tsx           # Legal page
├── not-found.tsx          # 404 page
├── robots.txt             # SEO robots file
├── sitemap.ts             # Dynamic sitemap generation
└── globals.css            # Global styles

components/
├── ui/
│   ├── Header.tsx         # Site navigation
│   ├── Footer.tsx         # Site footer
│   ├── Button.tsx         # Reusable button component
│   └── Card.tsx           # Sponsor/content cards
└── sections/
    ├── Hero.tsx           # Home page hero
    ├── SponsorTeaser.tsx  # Home sponsor preview
    └── ContactSnippet.tsx # Contact information

data/
└── sponsors.ts            # Static sponsor data

public/
├── logo.pdf               # Temporary logo (to be replaced)
├── Mitgliedsantrag.pdf    # Membership application
└── .htaccess              # Server configuration

next.config.mjs            # Next.js configuration
tailwind.config.js         # Tailwind customization
```

## Components and Interfaces

### Core Components

#### Header Component
```typescript
interface HeaderProps {
  className?: string;
}

// Features:
// - Logo/club name on left
// - Navigation menu on right (Spielplan, Sponsoren, Mitgliedschaft, Impressum, Fanshop)
// - Responsive mobile menu
// - Active link highlighting
```

#### Footer Component
```typescript
interface FooterProps {
  className?: string;
}

// Features:
// - Club address and email
// - Dynamic copyright year
// - Consistent spacing and typography
```

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: '_blank';
  download?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Features:
// - Primary and outline variants
// - Support for links and downloads
// - Accessible focus states
// - Consistent styling with Tailwind classes
```

#### Card Component
```typescript
interface CardProps {
  title: string;
  href?: string;
  target?: '_blank';
  children?: React.ReactNode;
  className?: string;
}

// Features:
// - Flexible content container
// - Optional link functionality
// - Hover states and transitions
// - Responsive design
```

### Page Components

#### Hero Section (Optimized for Performance)
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  ctas: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'outline' | 'ghost';
    target?: '_blank';
    icon?: React.ReactNode;
  }>;
}

// Performance-Optimized Features:
// - Responsive height (not forced full viewport) for better LCP
// - Bold, large typography (text-5xl to text-6xl) for impact
// - Streamlined content - only essential information
// - Three prominent CTAs in responsive grid
// - Important content (sponsor teaser) appears above the fold
// - Subtle background gradients (CSS-only, no images)
// - Micro-animations with reduced-motion support
// - Strong visual hierarchy with typography contrast
// - Clean, minimal design avoiding clutter
```

#### Sponsor Components
```typescript
interface Sponsor {
  id: string;
  name: string;
  url: string;
  logo?: string; // Optional for future use
}

interface SponsorGridProps {
  sponsors: Sponsor[];
  maxItems?: number; // For teaser display
  className?: string;
}

// Features:
// - Responsive grid (2-4 columns)
// - Hover effects and transitions
// - External link handling with security attributes
```

## Data Models

### Sponsor Data Structure (Single Source of Truth)
```typescript
// app/data/sponsors.ts - ONLY source for sponsor data
export interface Sponsor {
  id: string;
  name: string;
  url: string;
  logo?: string; // PNG/SVG path (not PDF)
  description?: string;
}

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Local Business Name',
    url: 'https://example.com',
    // logo: '/images/sponsors/sponsor-1.png' - to be added later
  },
  // ... additional sponsors (single file, no alternatives)
];
```

### Site Configuration & Metadata
```typescript
// app/config/site.ts - Centralized configuration
export const siteConfig = {
  baseUrl: 'https://mulsower-sv61.de', // Single source for all URLs
  name: 'Mulsower SV 61',
  description: 'Offizieller Internetauftritt des Mulsower SV 61 - Amateurfußballverein',
  locale: 'de',
  ogImage: '/og-image.png', // Single OG image reference
};

// Per-page metadata using App Router Metadata API
interface PageMetadata {
  title: string;
  description: string;
  openGraph?: {
    title: string;
    description: string;
    images?: string[];
  };
  alternates?: {
    canonical: string;
  };
}
```

### Asset Management
```typescript
// Static assets structure
interface AssetPaths {
  logo: '/logo.png'; // Will replace temporary PDF
  membershipPdf: '/Mitgliedsantrag.pdf'; // Remains as PDF
  ogImage: '/og-image.png'; // Single OG image for all pages
  sponsors: '/images/sponsors/'; // Directory for sponsor logos
}
```

## Error Handling

### 404 Error Page
- Custom `app/not-found.tsx` component
- Helpful navigation back to main sections
- Consistent branding and layout
- Server-side configuration via `.htaccess`

### External Link Security
- All external links include `rel="noopener noreferrer"`
- Target="_blank" for external navigation
- Clear visual indicators for external links

### Graceful Degradation
- Progressive enhancement approach
- Functional without JavaScript
- Accessible keyboard navigation
- Screen reader compatibility

## Testing Strategy

### Performance Testing
- Lighthouse audits targeting ≥90 performance score
- Core Web Vitals monitoring:
  - LCP (Largest Contentful Paint) ≤ 2.5s
  - CLS (Cumulative Layout Shift) < 0.1
  - INP (Interaction to Next Paint) ≤ 200ms

### Accessibility Testing
- Automated testing with axe-core
- Manual keyboard navigation testing
- Screen reader compatibility verification
- Color contrast validation
- Focus state visibility testing

### Cross-browser Testing
- Modern browser compatibility
- Mobile responsiveness testing
- Static export functionality verification

### Code Quality
- TypeScript strict mode compliance
- ESLint configuration for consistency
- No console errors in production build
- Clean build process without warnings

## Design System

### Modern Visual Design Approach

Based on 2024 design trends research, the website will incorporate:

**Hero Section Design (2024 Trends)**
- **Bold Typography Focus**: Large, impactful headings using Oswald font family
- **Streamlined Content**: Clean, minimal hero with only essential information (club name, tagline, 3 CTAs)
- **Dynamic Visual Elements**: Subtle animations and hover effects for engagement
- **Organic Shapes**: Modern curved elements and soft shadows for visual interest

**Sports-Specific Design Elements**
- **Athletic Typography**: Strong, condensed fonts (Oswald) for headings to convey energy
- **Action-Oriented Colors**: Bold red primary color with high contrast
- **Clean Grid Layouts**: Structured, professional appearance using CSS Grid
- **Interactive Elements**: Hover states and micro-interactions for modern feel

### Color Palette
```css
/* Tailwind theme extension - Modern Sports Palette */
colors: {
  brand: {
    primary: '#C1121F',     // Bold club red
    secondary: '#8B0000',   // Deep red variant
    accent: '#FF4444',      // Bright red for highlights
    light: '#FFE5E5',       // Light red for backgrounds
  },
  ink: {
    primary: '#0F172A',     // Rich black for headings
    secondary: '#475569',   // Medium gray for body text
    tertiary: '#94A3B8',    // Light gray for subtle text
    muted: '#CBD5E1',       // Very light gray for borders
  },
  neutral: {
    50: '#F8FAFC',          // Pure white alternative
    100: '#F1F5F9',         // Light background
    200: '#E2E8F0',         // Border color
    800: '#1E293B',         // Dark elements
    900: '#0F172A',         // Darkest elements
  },
  success: '#10B981',       // Green for positive actions
  warning: '#F59E0B',       // Orange for attention
}
```

### Typography Scale (Modern Sports Aesthetic)
```css
/* Font configuration - Athletic & Professional */
--font-heading: 'Oswald', 'Arial Narrow', sans-serif;  /* Bold, condensed sports feel */
--font-body: 'Inter', system-ui, sans-serif;           /* Clean, readable body text */

/* Modern heading hierarchy with strong visual impact */
h1: text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight
h2: text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight  
h3: text-2xl md:text-3xl font-semibold font-heading
h4: text-xl md:text-2xl font-semibold font-heading
body: text-base md:text-lg leading-relaxed font-body
small: text-sm md:text-base font-body
```

### Modern Layout System
```css
/* 2024 Design Patterns - Responsive & Clean */
section: py-16 md:py-24 lg:py-32           /* Generous vertical spacing */
container: px-4 md:px-6 lg:px-8 max-w-7xl mx-auto
hero-section: min-h-screen flex items-center /* Full viewport hero */
card-modern: p-8 md:p-10 rounded-2xl       /* Larger, softer cards */
grid-responsive: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

### Component Design Patterns

#### Modern Button System
```css
/* Primary Action Button - Bold & Athletic */
.btn-primary: 
  bg-brand-primary text-white font-semibold
  px-8 py-4 rounded-xl text-lg
  hover:bg-brand-secondary hover:scale-105
  active:scale-95 transition-all duration-200
  shadow-lg hover:shadow-xl

/* Outline Button - Clean & Professional */
.btn-outline: 
  border-2 border-brand-primary text-brand-primary font-semibold
  px-8 py-4 rounded-xl text-lg bg-transparent
  hover:bg-brand-primary hover:text-white hover:scale-105
  active:scale-95 transition-all duration-200

/* Ghost Button - Subtle Actions */
.btn-ghost:
  text-ink-primary font-medium px-6 py-3 rounded-lg
  hover:bg-neutral-100 transition-colors duration-200
```

#### Modern Card System
```css
/* Sponsor Cards - Clean & Interactive */
.card-sponsor:
  bg-white rounded-2xl p-8 shadow-sm border border-neutral-200
  hover:shadow-xl hover:scale-105 hover:border-brand-light
  transition-all duration-300 cursor-pointer

/* Content Cards - Information Display */
.card-content:
  bg-neutral-50 rounded-xl p-6 md:p-8
  border-l-4 border-brand-primary

/* Hero Cards - Feature Highlights */
.card-hero:
  bg-gradient-to-br from-white to-neutral-50
  rounded-2xl p-8 shadow-lg border border-neutral-200
```

#### Modern Grid Layouts
```css
/* Responsive Sponsor Grid - 2024 Pattern */
.sponsor-grid:
  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
  gap-6 md:gap-8

/* Hero CTA Grid - Balanced Layout */
.cta-grid:
  grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6
  max-w-4xl mx-auto

/* Content Grid - Information Architecture */
.content-grid:
  grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16
  items-center
```

### Visual Enhancement Elements

#### Modern Shadows & Effects
```css
/* Subtle depth - 2024 trend */
shadow-soft: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-medium: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
shadow-large: 0 25px 50px -12px rgb(0 0 0 / 0.25)

/* Interactive hover effects */
hover-lift: hover:translate-y-[-4px] transition-transform duration-200
hover-glow: hover:shadow-[0_0_20px_rgb(193_18_31_/_0.3)]
```

#### Organic Shapes & Modern Elements
```css
/* Curved sections - 2024 organic trend */
.section-curved:
  position-relative
  before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-light before:to-transparent
  before:rounded-[3rem] before:-z-10

/* Gradient backgrounds */
.bg-hero:
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)

.bg-accent:
  background: linear-gradient(135deg, #C1121F 0%, #8B0000 100%)
```

## SEO and Metadata Strategy

### Page-Level Metadata
Each page includes comprehensive metadata:
- Unique, descriptive titles
- Meta descriptions (150-160 characters)
- Open Graph tags for social sharing
- Canonical URLs
- Language declaration (`lang="de"`)

### Technical SEO
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Structured data where applicable
- Clean URL structure
- Sitemap generation via `app/sitemap.ts`
- Robots.txt configuration

### Content Strategy
- German language content throughout
- Local business optimization
- Clear information architecture
- Fast loading times for better rankings

## Deployment Configuration

### Next.js Configuration
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // No image optimization in static export - use regular <img> tags
};

export default nextConfig;
```

### Server Configuration (.htaccess in deploy root)
```apache
# .htaccess - Place in IONOS web root (same level as index.html)

# Fanshop redirect - handled at host level, not Next.js
Redirect 302 /fanshop https://msv61.fan12.de/

# Custom 404 page
ErrorDocument 404 /404.html

# Modern security headers (avoid deprecated ones)
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Optional minimal CSP (recommended)
Header always set Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'"

# Performance caching
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### Build and Deploy Process
1. `npm run build` - Generate static export in `/out` directory
2. Upload `/out` contents to IONOS web root (`htdocs`)
3. Place `.htaccess` in deploy root (same level as `index.html`)
4. Manual verification checklist:
   - Fanshop redirect works (`/fanshop` → external URL)
   - 404 page displays on invalid URLs
   - Membership PDF downloads correctly
   - No TypeScript errors in build
   - No console errors in browser
   - Lighthouse performance ≥ 90 on home page

### Performance Targets (Definition of Done)
- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **INP (Interaction to Next Paint)**: ≤ 200ms
- **Lighthouse Performance Score**: ≥ 90

This design provides a solid foundation for building a fast, accessible, and maintainable website that meets all the specified requirements while being optimized for static hosting on IONOS.
###
 Modern UI Patterns & Interactions

#### 2024 Design Trends Implementation

**Streamlined Hero Sections**
- Minimal content with maximum visual impact
- Bold typography as the primary visual element
- Clean three-CTA layout without overwhelming users
- Subtle background elements that don't compete with content

**Interactive Elements**
- Hover effects with scale transforms (hover:scale-105)
- Smooth transitions (duration-200 to duration-300)
- Micro-animations for engagement without distraction
- Focus states with visible outlines for accessibility

**Modern Grid Systems**
- CSS Grid for complex layouts (sponsor grids, content sections)
- Responsive breakpoints: mobile-first approach
- Consistent gap spacing (gap-6 to gap-8)
- Auto-fit columns for flexible sponsor display

**Typography-First Design**
- Large, bold headings (text-5xl to text-7xl) for impact
- Condensed sports fonts (Oswald) for athletic feel
- Generous line spacing (leading-relaxed) for readability
- Clear hierarchy with consistent font weights

#### Performance-Optimized Animations
```css
/* Smooth, performant animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

/* Staggered animations for lists */
.stagger-children > * {
  animation-delay: calc(var(--stagger-delay, 0) * 100ms);
}
```

#### Accessibility-First Interactive Design
```css
/* Focus states - highly visible */
.focus-visible:
  outline: 2px solid brand-primary
  outline-offset: 2px
  ring-2 ring-brand-primary ring-offset-2

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-fadeInUp,
  .hover-lift,
  .transition-all {
    animation: none;
    transition: none;
  }
}
```

### Component Layout Specifications

#### Header Navigation (Modern Sports Design)
```typescript
// Clean, professional navigation
interface HeaderDesign {
  layout: 'horizontal' | 'mobile-menu';
  logoPosition: 'left';
  navigationPosition: 'right';
  mobileBreakpoint: 'md'; // 768px
  styling: {
    background: 'bg-white/95 backdrop-blur-sm';
    shadow: 'shadow-sm border-b border-neutral-200';
    padding: 'px-4 md:px-6 lg:px-8 py-4';
    logoSize: 'h-8 md:h-10';
    linkStyling: 'text-ink-secondary hover:text-brand-primary font-medium';
  };
}
```

#### Footer Design (Professional & Clean)
```typescript
interface FooterDesign {
  layout: 'centered-content';
  sections: ['contact', 'copyright'];
  styling: {
    background: 'bg-neutral-900 text-white';
    padding: 'py-12 md:py-16';
    textAlign: 'center';
    contactInfo: 'text-lg md:text-xl font-medium';
    copyright: 'text-neutral-400 text-sm mt-8';
  };
}
```

#### Sponsor Showcase (Modern Grid Design)
```typescript
interface SponsorShowcaseDesign {
  homePageTeaser: {
    title: 'Unsere Partner'; // German for "Our Partners"
    layout: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
    maxItems: 6;
    cardStyle: 'minimal-logo-display';
  };
  fullPage: {
    title: 'Alle Sponsoren'; // German for "All Sponsors"
    layout: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    cardStyle: 'detailed-sponsor-cards';
    hoverEffects: 'scale-105 shadow-xl';
  };
}
```

This enhanced design incorporates modern 2024 web design trends while maintaining the professional, athletic aesthetic appropriate for a football club. The focus on bold typography, clean layouts, and subtle interactive elements will create a visually appealing website that stands out despite its minimal functionality.### Te
chnical Implementation Details

#### Image Handling (Static Export Compatible)
```typescript
// No Next.js Image component - use regular img tags
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

// Simple image component for consistency
export function Image({ src, alt, width, height, className }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy" // Native lazy loading
    />
  );
}
```

#### Font Optimization (Self-Hosted)
```typescript
// app/layout.tsx - Self-hosted fonts via next/font
import { Inter, Oswald } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

// No external font requests - all self-hosted
```

#### SEO Implementation (App Router)
```typescript
// app/layout.tsx - Root layout with German language
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}

// app/sitemap.ts - Dynamic sitemap using centralized base URL
import { siteConfig } from '@/config/site';

export default function sitemap() {
  return [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.baseUrl}/spielplan`,
      lastModified: new Date(),
    },
    // ... other pages
  ];
}

// app/robots.txt - Static robots file
User-Agent: *
Allow: /
Sitemap: ${siteConfig.baseUrl}/sitemap.xml
```

#### External Link Security
```typescript
// Secure external link component
interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer" // Prevent reverse-tabnabbing
      className={className}
    >
      {children}
    </a>
  );
}
```

### Scope Limitations (Static Export Only)

#### What's NOT Included
- No backend functionality or server-side rendering
- No middleware or API routes
- No server functions or dynamic routing
- No real-time features or database connections
- No user authentication or dynamic content

#### What IS Included
- Static HTML generation for all pages
- Client-side routing between pages
- Static asset serving (images, PDFs, fonts)
- Form downloads (PDF membership application)
- External redirects (fanshop)
- SEO optimization for static content

This design provides a comprehensive foundation for building a modern, performant, and visually appealing static website that meets all technical requirements for IONOS hosting while ensuring excellent user experience and accessibility.