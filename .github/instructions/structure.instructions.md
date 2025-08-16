---
applyTo: '**'
---
# Project Structure & Organization

## Directory Layout

```
app/                           # Next.js App Router
├── layout.tsx                 # Root layout with metadata & fonts
├── page.tsx                   # Home page with hero, sponsors, contact
├── globals.css                # Global styles & Tailwind imports
├── config/
│   └── site.ts               # Centralized site configuration
├── data/
│   └── sponsors.ts           # Single source of truth for sponsor data
├── spielplan/
│   └── page.tsx              # Schedule page (CTA to FUSSBALL.DE)
├── sponsoren/
│   └── page.tsx              # Sponsors showcase page
├── mitgliedschaft/
│   └── page.tsx              # Membership info & PDF download
├── impressum/
│   └── page.tsx              # Legal compliance page
├── not-found.tsx             # Custom 404 page
├── robots.txt                # SEO robots file
└── sitemap.ts                # Dynamic sitemap generation

components/                    # Reusable UI components
├── ui/
│   ├── Header.tsx            # Site navigation (logo left, menu right)
│   ├── Footer.tsx            # Contact info & copyright
│   ├── Button.tsx            # Primary/outline/ghost variants
│   ├── Card.tsx              # Sponsor & content cards
│   └── ExternalLink.tsx      # Secure external links
└── sections/
    ├── Hero.tsx              # Home page hero section
    ├── SponsorTeaser.tsx     # Home sponsor preview (6 tiles)
    └── ContactSnippet.tsx    # Contact information display

public/                       # Static assets
├── logo.pdf                  # Temporary logo (to be replaced with PNG)
├── Mitgliedsantrag.pdf      # Membership application download
├── .htaccess                # Server configuration (deploy to root)
└── images/                  # Future: sponsor logos directory
    └── sponsors/

.kiro/                       # Kiro IDE configuration
├── specs/                   # Project specifications
│   └── mulsower-sv-website/
└── steering/                # AI assistant guidance rules

Configuration Files:
├── next.config.mjs          # Static export configuration
├── tailwind.config.js       # Custom design tokens & theme
├── tsconfig.json           # TypeScript strict mode
└── package.json            # Dependencies & scripts
```

## Key Architectural Patterns

### Component Organization
- **UI Components**: Reusable, generic components in `components/ui/`
- **Section Components**: Page-specific sections in `components/sections/`
- **Page Components**: Route-specific pages in `app/` directories

### Data Management
- **Static Data**: Single source of truth in `app/data/`
- **Configuration**: Centralized in `app/config/site.ts`
- **No External APIs**: All data is static and build-time

### Routing Structure
- **App Router**: File-based routing with `page.tsx` files
- **Static Export**: All routes pre-generated at build time
- **External Redirects**: Handled via Apache `.htaccess`

### Asset Strategy
- **Bundled Fonts**: Via next/font (fonts included in build, served from IONOS)
- **Static Images**: Regular `<img>` tags with native lazy loading
- **PDF Downloads**: Direct links to files served from IONOS `/public` directory

## File Naming Conventions

### Components
- **PascalCase**: `Header.tsx`, `SponsorTeaser.tsx`
- **Descriptive Names**: Clear purpose indication
- **TypeScript**: All components use `.tsx` extension

### Pages
- **Lowercase**: `page.tsx` for App Router pages
- **German URLs**: `/spielplan`, `/sponsoren`, `/mitgliedschaft`
- **SEO-friendly**: Descriptive path names

### Data Files
- **camelCase**: `sponsors.ts`, `site.ts`
- **TypeScript**: Strongly typed interfaces
- **Single Source**: No duplicate data files

## Import Patterns

### Path Aliases
```typescript
// Use relative imports for local files
import { Button } from '../ui/Button'
import { sponsors } from '../../data/sponsors'

// Absolute imports for shared utilities
import { siteConfig } from '@/config/site'
```

### Component Exports
```typescript
// Named exports for components
export function Header() { }
export function Button() { }

// Default exports for pages
export default function HomePage() { }
```

## Deployment Structure

### Build Output (`/out`)
```
out/                         # Generated static files
├── index.html              # Home page
├── spielplan/
│   └── index.html
├── sponsoren/
│   └── index.html
├── _next/                  # Next.js assets
└── ...                     # Other static files
```

### IONOS Deployment
```
htdocs/                     # IONOS web root
├── index.html             # Copy from /out
├── .htaccess              # Server configuration
├── _next/                 # Static assets
└── ...                    # All /out contents
```

## Code Organization Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Colocation**: Related files grouped together
3. **Static First**: No dynamic server-side functionality
4. **Type Safety**: TypeScript strict mode throughout
5. **Performance**: Optimized for Core Web Vitals
6. **Accessibility**: WCAG 2.1 AA compliance built-in