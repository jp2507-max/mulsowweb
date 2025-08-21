# Implementation Plan

## Global Animation Constraints
- **CRITICAL**: Animate ONLY `transform` and `opacity` properties - never animate layout/paint properties (top/left/width/height, box-shadow, filter)
- **Performance Target**: No Long Tasks > 50ms during scroll/navigation; Lighthouse Mobile ≥ 90
- **Content Safety**: Base styles render content visible; JavaScript only enhances (no blank content if JS fails)

> Deduplication sync (2025-08-19): Several items below are already implemented in the live codebase (see `app/globals.css`, `components/utility/{PageFadeController,ScrollRevealController}.tsx`, `components/ui/Button.tsx`, `components/sections/{Hero,SponsorTeaser}.tsx`). Those tasks are now marked as completed to avoid duplication with the executed "mulsower-sv-website" plan.

- [x] 1. Set up animation foundation and configuration
  - Create Tailwind configuration extensions with custom timing functions and durations
  - Add CSS custom properties for centralized motion tokens (easing curves, durations)
  - Implement base animation utility classes with transform/opacity-only animations (NO layout/paint properties)
  - Add mandatory reduced motion fallbacks with complete animation disable
  - Ensure content is visible by default - JavaScript only adds enhancement classes
  - _Requirements: 6.1, 6.2, 6.3, 6.4_
- [ ] 2. Implement performance-optimized hover effects system
  - [x] 2.1 Create button hover animations using transform and opacity only
    - Write CSS classes for button hover effects with translateY and scale transforms
    - Remove box-shadow from transitions (paint-heavy) - use transform/opacity only: `transition: transform 150ms var(--ease), opacity 150ms var(--ease)`
    - Implement media queries for hover vs touch device differentiation
    - Add touch feedback with :active states and shorter durations (80-120ms)
    - _Requirements: 1.1, 1.4, 1.5_

  - [x] 2.2 Implement sponsor card hover effects with pseudo-element shadows
    - Create sponsor card hover animations using transform properties only
    - Implement pseudo-element shadow animation technique: animate opacity of ::before pseudo-element, not box-shadow
    - Code implementation: `.sponsor-card{position:relative;transition:transform .18s var(--ease)} .sponsor-card::before{content:"";position:absolute;inset:0;box-shadow:0 20px 40px -10px rgba(0,0,0,.15);opacity:0;transition:opacity .18s var(--ease);pointer-events:none} .sponsor-card:hover{transform:translateY(-2px) scale(1.02)} .sponsor-card:hover::before{opacity:1}`
    - Remove staggered hover timing (hover doesn't arrive predictably and can feel laggy)
    - _Requirements: 1.1, 1.2, 4.1_
    - Implementation notes: Added `.sponsor-card` CSS to `app/globals.css` (pseudo-element shadow / media queries / reduced-motion support) and applied `sponsor-card` class to Card instances in `components/sections/SponsorTeaser.tsx`.

  - [x] 2.3 Add navigation and logo micro-interactions
    - Implement navigation link hover effects with underline animations
    - Create subtle logo hover animation with rotation or scale (≤ 3° or ≤ 1.03 scale)
    - Add smooth focus states for keyboard navigation with visible focus rings (no animation-only signals)
    - Ensure keyboard-visible focus state meets accessibility requirements
    - _Requirements: 1.3, 4.4_

- [ ] 3. Create scroll reveal animation system
  - [x] 3.1 Implement Intersection Observer controller with safe defaults
    - Write ScrollRevealController class with resilient error handling
    - Configure observer with 0.15 threshold and percentage-based rootMargin for screen consistency: `const io = new IntersectionObserver(cb, { threshold: 0.15, rootMargin: '0px 0px -15% 0px' })`
    - Ensure content is visible by default (no blank page if JavaScript fails)
    - Add .reveal class only after observer initialization to prevent blank content
    - If IO errors, immediately add .in class to all .reveal targets for fallback visibility
    - _Requirements: 2.1, 2.4_

  - [x] 3.2 Build staggered animation system for content groups
    - Create CSS classes for staggered reveal animations with 60ms delays
    - Implement maximum 400ms total group delay constraint (hard limit)
    - Add content-visibility optimization: `section[data-heavy]{content-visibility:auto;contain-intrinsic-size:1px 800px;}` for large sections
    - Write JavaScript to handle stagger timing and group management
    - Apply content-visibility to sponsor grids, galleries, and long content lists
    - _Requirements: 2.2, 2.3_

  - [x] 3.3 Add scroll reveal utilities and reveal candidates
    - Create .reveal-candidate class system for elements that should animate on scroll
    - Implement fade-in, slide-up, and scale-in animation variants
    - Add automatic reveal class application after DOMContentLoaded
    - Write unit tests for scroll reveal functionality
    - _Requirements: 2.1, 2.4_

- [ ] 4. Implement page transition and loading systems
  - [x] 4.1 Create global page fade animation with BFCache support
    - Write PageTransitionController with opacity-based page fade
    - Implement BFCache handling to prevent flash: `window.addEventListener('pageshow', e => { if (e.persisted) document.body.style.opacity='1'; })`
    - Add requestAnimationFrame-based timing for smooth transitions
    - Code implementation: `document.body.style.opacity='0'; requestAnimationFrame(()=>{document.body.style.transition='opacity 180ms cubic-bezier(0.2,0,0,1)';document.body.style.opacity='1'})`
    - _Requirements: 3.2, 3.4_

  - [x] 4.2 Add CSS-based smooth scroll with reduced motion support
    - Implement CSS media queries for smooth scroll behavior: `@media (prefers-reduced-motion: no-preference){ html{ scroll-behavior:smooth } }`
    - Add automatic disable for prefers-reduced-motion users
    - Create smooth scroll utilities for internal navigation
    - Ensure smooth scroll is completely disabled under reduced motion preference
    - _Requirements: 3.1, 3.4_

  - [x] 4.3 Implement hero animation with image decode timing
    - Create hero section entrance animation triggered after image decode to avoid LCP jank
    - Code implementation: `document.querySelector('#hero-img')?.decode?.().finally(()=>document.documentElement.classList.add('hero-ready'))`
    - Add fallback timing if image decode fails or is unsupported
    - Ensure hero image is not loading="lazy" and has dimensions set
    - Implement hero-ready class system for coordinated animations
    - _Requirements: 3.2, 4.4_

- [ ] 5. Add visual polish and modern CSS effects
  - [ ] 5.1 Implement backdrop blur effects with browser support detection
  - [x] 5.1 Implement backdrop blur effects with browser support detection
    - Create overlay components with backdrop-filter and solid fallbacks
    - Add @supports queries for safe backdrop blur implementation
    - Code implementation: `.overlay{ background: rgba(255,255,255,.75) } @supports (backdrop-filter: blur(6px)){ .overlay{ backdrop-filter: blur(6px); background: rgba(255,255,255,.4) } }`
    - Implement rgba background fallbacks for unsupported browsers (Safari quirks)
    - _Requirements: 4.3, 6.4_

  - [x] 5.2 Create modern focus states and accessibility enhancements
    - Implement modern focus indicators with smooth transitions
    - Add high contrast mode support for focus states
    - Ensure AA contrast ratios for all interactive states (focus/hover/active)
    - Remove any focus animations under reduced motion preference
    - Create keyboard navigation enhancements with visible focus rings
    - _Requirements: 4.4, 6.2, 7.2_

  - [x] 5.3 Add gradient effects and visual depth
    - Implement subtle gradient effects for buttons and cards
    - Create depth effects using fixed shadow tiers (shadow-sm, shadow-md)
    - Add visual polish without performance-heavy effects
    - _Requirements: 4.2, 4.1_

- [ ] 6. Implement mobile optimization and touch interactions
  - [x] 6.1 Create touch-optimized animation timing and effects
    - Implement 20% longer animation durations for touch devices
    - Add :active state animations with scale and opacity effects
    - Create touch-specific media queries for interaction feedback
    - _Requirements: 5.3, 5.1_

  - [x] 6.2 Add device capability detection and performance adaptation
    - Implement saveData and deviceMemory feature detection with safe fallbacks (limited browser support)
    - Code implementation: `const saveData = 'connection' in navigator && (navigator as any).connection?.saveData === true; const lowRam = 'deviceMemory' in navigator && (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4`
    - Create automatic animation reduction for low-end devices
    - Add progressive enhancement for animation complexity (treat as enhancement only)
    - Write device capability utilities with safe fallbacks
    - _Requirements: 5.4, 5.5_

  - [x] 6.3 Optimize mobile performance and 60fps maintenance - Completed (2025-08-19)
    - Limit concurrent animations to one transform per component (strict rule)
    - Implement content-visibility for off-screen content: `section[data-heavy]{content-visibility:auto;contain-intrinsic-size:1px 800px;}`
    - Add performance monitoring for development builds only (behind NODE_ENV !== 'production')
    - Apply content-visibility to long scroll lists, sponsor grids, galleries
    - _Requirements: 5.2, 6.1_

- [ ] 7. Add accessibility compliance and reduced motion support
  - [x] 7.1 Implement comprehensive reduced motion fallbacks
    - Add prefers-reduced-motion media queries to disable all animations
    - Create data-motion="reduced" override system
    - Implement transition: none fallbacks for all animated elements
    - Ensure no information is conveyed by animation alone
    - _Requirements: 6.2, 7.1, 7.3_

  - [x] 7.2 Create accessible focus management and keyboard navigation
    - Implement focus trap management for animated overlays
    - Add skip links that work with animated content
    - Create keyboard navigation enhancements for animated elements
    - _Requirements: 7.4, 7.2_

  - [x] 7.3 Add accessibility testing and compliance verification
    - Integrate axe-core testing for animated states
    - Create automated tests for reduced motion compliance
    - Add contrast ratio verification for all animation states
    - Write accessibility test suite for keyboard navigation
    - _Requirements: 7.5, 9.2_

im not sure if all tasks before task 8 are implemented properly

- [ ] 8. Implement error handling and graceful degradation
  - [x] 8.1 Create animation error recovery mechanisms
    - Write AnimationErrorHandler class with fallback strategies
    - Implement Intersection Observer error handling with immediate visibility fallback
    - Add performance issue detection and automatic animation reduction
    - Create safe reveal initialization to prevent blank content
    - _Requirements: 6.5, 2.4_
    - Implementation notes: added `lib/utils/animationErrorHandler.mjs` and wired into `lib/utils/scrollReveal.mjs` to ensure safe fallback when IntersectionObserver is unavailable or errors. (2025-08-19)

  - [x] 8.2 Add browser compatibility and feature detection
    - Implement @supports queries for advanced CSS features
    - Create fallbacks for unsupported animation properties
    - Add polyfill detection and graceful degradation
    - Write cross-browser compatibility tests
    - _Requirements: 6.4, 8.4_

  ## Progress note (2025-08-19)

  - Implemented Task 6.1: touch-optimized CSS utilities and client-side motion heuristics are now in place.
    - Files changed:
      - `app/globals.css`: Added/adjusted touch-duration variables and enhanced `.touch-feedback` rules under `@media (hover: none) and (pointer: coarse)` to use the touch timing tokens (20% longer) and provide snappy :active scale/opacity feedback.
      - `lib/utils/deviceCapabilities.ts`: New, tiny, safe device capability helpers (`shouldReduceAnimations`, `isTouchDevice`, `saveData`, `isLowMemory`, etc.) used to drive motion decisions.
      - `components/utility/DeviceMotion.tsx`: Client initializer (already present) uses the device heuristics to set `html[data-motion="reduced"]` when appropriate.
      - `components/ui/Button.tsx`: Buttons include the `touch-feedback` utility so touch users receive short :active feedback automatically.

  Next steps: verify touch-feedback on additional interactive elements (header logo, sponsor cards) on real devices and optionally add small tests for `deviceCapabilities`.

- [ ] 9. Performance optimization and monitoring
  - [x] 9.1 Implement will-change optimization and layer management




    - Add will-change property management: apply just before expensive animation and remove after (never leave permanently)
    - Implement GPU layer optimization for transform animations
    - Create animation performance utilities
    - Avoid permanent will-change as it can hurt performance by pinning layers
    - _Requirements: 6.3, 4.5_

  - [x] 9.2 Add performance budgets and monitoring





    - Implement Lighthouse performance score monitoring (Mobile ≥ 90 with Fast 3G + 4× CPU throttle)
    - Add CLS prevention: never lazy-load LCP image, preload if needed, set width/height or aspect-ratio for images
    - Use font-display: swap or optional to keep text visible during webfont load
    - Create performance budget enforcement for animation JavaScript (≤ 5KB gzipped)
    - Write performance regression tests
    - _Requirements: 6.1, 6.3_

  - [x] 9.3 Optimize bundle size and static export compatibility





    - Minimize animation JavaScript to ≤ 5KB gzipped
    - Ensure static export compatibility with no dynamic imports
    - Bundle all animation code to avoid CSP issues
    - Create tree-shaking optimizations for unused animations
    - _Requirements: 6.4, 8.4_

- [ ] 10. Quality assurance and testing implementation
  - [ ] 10.1 Create comprehensive animation test suite
    - Write unit tests for animation controllers and utilities (test class toggling and timing logic, not visual animation)
    - Create integration tests for scroll reveal and hover effects
    - Add performance regression tests for animation timing
    - Keep tests deterministic - animations are hard to assert visually
    - _Requirements: 6.1, 6.3_

  - [ ] 10.2 Add cross-browser and device testing
    - Create automated tests for iOS Safari and Android Chrome on real devices for smoothness
    - Test Intersection Observer, backdrop-filter, and smooth-scroll differences across browsers
    - Implement keyboard-only navigation testing
    - Add high contrast mode and reduced motion testing
    - Write device capability detection tests
    - _Requirements: 6.1, 6.4_

  - [ ] 10.3 Implement accessibility and compliance testing
    - Add axe-core integration for automated accessibility testing (include animated states)
    - Create manual testing checklist for animation accessibility
    - Implement contrast ratio verification for all animation states
    - Add screen reader compatibility testing
    - Test keyboard-only navigation through interactive elements (focus ring must stay visible)
    - _Requirements: 6.2, 7.2_

- [ ] 11. Integration and final polish
  - [x] 11.1 Integrate animations with existing website components



    - check whats already there ( most of these things are already in place)
    - Apply hover effects to existing buttons and navigation elements
    - Add scroll reveals to sponsor cards and content sections
    - Integrate page transitions with existing routing
    - Update existing components to use new animation utilities
    - Ensure hero image is not loading="lazy" and animate hero text only after image decode
    - _Requirements: 1.1, 2.1, 3.2_

  - [ ] 11.2 Final performance optimization and cleanup



    - Optimize animation timing and easing for best user experience
    - Remove unused animation code and utilities
    - Remove dev-only performance monitors from production builds (keep behind NODE_ENV !== 'production')
    - Verify all performance budgets are met (≤ 5KB JS, Lighthouse Mobile ≥ 90)
    - Conduct final Lighthouse audit and optimization
    - _Requirements: 6.1, 6.4_

  - [ ] 11.3 Documentation and maintenance setup
    - Create animation utility documentation for future development
    - Add code comments explaining performance optimizations
    - Create troubleshooting guide for animation issues
    - Document browser support and fallback strategies
    - Add "Do/Don't" table: transform/opacity ✅, box-shadow ❌, filter ❌, multiple concurrent transforms ❌
    - _Requirements: 6.4, 8.4_