# Implementation Plan

- [ ] 1. Project Setup and Configuration
  - Initialize Next.js 14 project with TypeScript and static export configuration
  - Configure Tailwind CSS with custom design tokens and modern color palette
  - Set up next/font for self-hosted Inter and Oswald fonts
  - Create project structure with app router directories
  - _Requirements: 12.1, 12.2, 10.1, 10.5_

- [ ] 2. Design System and Component Foundation
  - [ ] 2.1 Create Tailwind theme configuration with modern sports palette
    - Define brand colors (#C1121F primary, accent colors, neutral grays)
    - Set up typography scale with Oswald headings and Inter body text
    - Configure responsive breakpoints and spacing system
    - Add modern component utility classes (buttons, cards, containers)
    - _Requirements: 10.1, 10.5_

  - [ ] 2.2 Build core UI component library
    - Create Button component with primary, outline, and ghost variants
    - Build Card component for sponsors and content display
    - Implement static image strategy: use plain `<img>` tags with width/height and native lazy loading
    - Create ExternalLink component with `rel="noopener noreferrer"` security attributes
    - _Requirements: 7.1, 7.2, 7.5, 8.6_

- [ ] 3. Layout Components with Modern Design Inspiration
  - [ ] 3.1 Design and implement Header component using Mobbin Sites inspiration
    - Research modern header patterns on Mobbin Sites for sports/business websites
    - Create responsive navigation with logo left, menu right layout
    - Implement no-JS-friendly mobile menu (always-visible nav on small screens for graceful degradation)
    - Add hover states and active link highlighting
    - Ensure keyboard navigation and focus states
    - _Requirements: 5.1, 5.2, 7.2, 7.4_

  - [ ] 3.2 Create Footer component with professional styling
    - Design clean footer layout with contact information and copyright
    - Implement responsive typography and spacing
    - Add dynamic copyright year functionality
    - Ensure consistent branding with header
    - _Requirements: 5.3, 5.5_

- [ ] 4. Home Page Implementation with Modern Hero Design
  - [ ] 4.1 Build performance-optimized Hero section
    - Use Mobbin Sites to research modern hero patterns for sports organizations
    - Implement responsive hero with bold typography (text-5xl to text-6xl)
    - Create three-CTA grid layout with primary actions
    - Add subtle background gradients and organic shapes
    - Hero must NOT force full viewport height if it pushes important content below fold
    - Verify with Lighthouse screenshot that LCP element is optimally positioned
    - _Requirements: 1.1, 2.1, 3.1, 8.1, 8.2_

  - [ ] 4.2 Implement sponsor teaser section
    - Create responsive grid for 6 sponsor tiles (2-3-6 columns)
    - Build sponsor cards with hover effects and transitions
    - Ensure sponsor teaser appears above the fold for performance
    - Add loading states and smooth animations
    - _Requirements: 4.1, 4.2, 8.1, 8.2_

  - [ ] 4.3 Add contact snippet section
    - Display club address and email in clean, readable format
    - Use modern typography and spacing for professional appearance
    - Ensure responsive layout on all screen sizes
    - _Requirements: 5.4_

- [ ] 5. Static Data Management and Sponsor System
  - [ ] 5.1 Create centralized sponsor data structure
    - Build single canonical source of truth in app/data/sponsors.ts (no JSON alternatives)
    - Define TypeScript interfaces for sponsor data
    - Add placeholder sponsor entries with proper structure
    - Plan for future PNG/SVG logo integration
    - _Requirements: 4.4, 4.5_

  - [ ] 5.2 Implement sponsor showcase page (/sponsoren)
    - Create responsive sponsor grid (2-3-4 columns)
    - Build detailed sponsor cards with modern hover effects
    - Add smooth transitions and micro-animations
    - Implement external link handling with `rel="noopener noreferrer"` for all `target="_blank"` links
    - Set sponsor logo alt text to sponsor name; hide decorative icons from assistive technology
    - _Requirements: 4.2, 4.3, 7.5_

- [ ] 6. Schedule and External Integration Pages
  - [ ] 6.1 Build schedule page (/spielplan) with clear CTA
    - Create prominent CTA button linking to FUSSBALL.DE
    - Use modern button styling with hover effects
    - Ensure external link opens in new tab with `rel="noopener noreferrer"` security attributes
    - Add clear messaging about external schedule source
    - _Requirements: 1.2, 1.3, 1.4, 7.5_

  - [ ] 6.2 Implement membership page (/mitgliedschaft)
    - Design clean layout with membership information
    - Create download button for PDF membership application
    - Display club contact information (address and email)
    - Ensure PDF download functionality works correctly
    - _Requirements: 3.1, 3.3, 3.4_

- [ ] 7. Legal and Error Pages
  - [ ] 7.1 Create Impressum page with legal compliance
    - Implement required German legal sections (§5 DDG, representation, etc.)
    - Mark incomplete sections as TODOs clearly
    - Display club address and email information
    - Ensure proper heading hierarchy and accessibility
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 7.2 Build custom 404 page (app/not-found.tsx)
    - Create helpful 404 page with navigation options
    - Maintain consistent branding and layout
    - Add links back to main site sections
    - Ensure proper styling and responsive design
    - _Requirements: 11.1, 11.3_

- [ ] 8. SEO and Metadata Implementation
  - [ ] 8.1 Set up centralized site configuration
    - Create app/config/site.ts with base URL and site metadata
    - Define single OG image with correct dimensions for all pages
    - Set up German language configuration (`lang="de"` and `og:locale="de_DE"`)
    - Add favicon and app icons as part of SEO/meta deliverables
    - _Requirements: 9.1, 9.2, 9.5, 7.6_

  - [ ] 8.2 Implement App Router metadata for all pages
    - Add unique titles and descriptions for each page
    - Configure Open Graph metadata using centralized config
    - Set up canonical URLs using base URL
    - Ensure proper meta tags for German content
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ] 8.3 Create SEO infrastructure files
    - Generate dynamic sitemap (app/sitemap.ts) using centralized base URL
    - Create static robots.txt file (app/robots.txt)
    - Ensure proper URL structure for static export
    - _Requirements: 9.5, 9.6_

- [ ] 9. Static Export Configuration and Server Setup
  - [ ] 9.1 Configure Next.js for static export
    - Set up next.config.mjs with output: 'export'
    - Configure trailingSlash: true (recommended for Apache)
    - Use plain `<img>` tags everywhere (no Next.js image optimization)
    - Ensure TypeScript strict mode compliance
    - Test static build generation
    - _Requirements: 12.1, 8.3_

  - [ ] 9.2 Create .htaccess configuration for IONOS hosting
    - Set up fanshop redirect via Apache (302 to external URL) - NOT Next.js config
    - Configure custom 404 error document (wired via server config)
    - Add modern security headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy (NO legacy X-XSS-Protection)
    - Set up caching: do NOT long-cache HTML; DO long-cache static assets (images/CSS/JS)
    - _Requirements: 2.4, 2.5, 11.2, 7.5_

- [ ] 10. Performance Optimization and Testing
  - [ ] 10.1 Optimize for Core Web Vitals
    - Ensure LCP ≤ 2.5s by optimizing hero section loading
    - Minimize CLS < 0.1 with proper font loading and layout
    - Optimize INP ≤ 200ms - explicitly test interaction (e.g., opening mobile menu)
    - Test with Lighthouse to achieve ≥90 performance score
    - _Requirements: 8.1, 8.2_

  - [ ] 10.2 Implement accessibility features
    - Add visible focus states for all interactive elements
    - Ensure proper heading hierarchy throughout site
    - Add alt text for all images and icons
    - Test keyboard navigation functionality
    - Verify screen reader compatibility
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 10.3 Add performance enhancements
    - Implement native lazy loading for images
    - Add reduced motion support for animations
    - Confirm next/font uses display behavior that avoids layout shift (CLS < 0.1)
    - Minimize JavaScript bundle size
    - _Requirements: 8.4, 8.5, 8.6_

- [ ] 11. Final Integration and Deployment Preparation
  - [ ] 11.1 Complete end-to-end testing
    - Test all navigation links and external redirects
    - Verify PDF download functionality
    - Check responsive design on all screen sizes
    - Validate TypeScript compilation without errors
    - Ensure no console errors in browser
    - Test: directly visiting /fanshop returns temporary redirect to external shop
    - Test: directly visiting non-existing deep URL serves /404.html
    - Test: crawl deep links with and without trailing slash (no duplicates)
    - Content check: verify address/email correctness on /mitgliedschaft and /impressum
    - _Requirements: 8.3, 8.4, 12.4, 12.5_

  - [ ] 11.2 Prepare deployment package
    - Generate static export build in /out directory
    - Verify all static assets are properly included
    - Checklist: .htaccess lives in deploy root next to index.html (NOT under public/)
    - Verify caching rules: HTML not long-cached, static assets long-cached
    - Upload to staging subdirectory/domain at IONOS to validate .htaccess before going live
    - Create deployment checklist for IONOS upload
    - _Requirements: 12.2, 12.3, 12.4_

  - [ ] 11.3 Final performance and accessibility audit
    - Run Lighthouse audit on all pages
    - Verify Core Web Vitals targets are met (including CLS < 0.1 font loading)
    - Test accessibility with automated tools
    - Validate HTML and ensure semantic structure
    - Verify all `target="_blank"` links include `rel="noopener noreferrer"` to prevent reverse-tabnabbing
    - Test no-JS fallback for mobile menu functionality
    - _Requirements: 8.1, 8.2, 7.1, 7.5_