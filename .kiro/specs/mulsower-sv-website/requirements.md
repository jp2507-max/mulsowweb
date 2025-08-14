# Requirements Document

## Introduction

This document outlines the requirements for building a fast, minimal website for the amateur football club "Mulsower SV 61". The website will serve as the club's digital presence, providing essential information about schedules, sponsors, membership, and contact details. The solution prioritizes simplicity, maintainability, and performance while ensuring good accessibility and SEO practices.

## Requirements

### Requirement 1

**User Story:** As a football club visitor, I want to quickly access the club's schedule and results, so that I can stay updated on match information.

#### Acceptance Criteria

1. WHEN a user visits the home page THEN the system SHALL display a prominent CTA button linking to "Schedule on FUSSBALL.DE"
2. WHEN a user clicks the schedule CTA THEN the system SHALL redirect to https://www.fussball.de/verein/mulsower-sv-61-mecklenburg-vorpommern/-/id/00ES8GNBNG000024VV0AG08LVUPGND5I#!/ in a new tab
3. WHEN a user visits /spielplan THEN the system SHALL display a clear CTA button linking to the club's FUSSBALL.DE page
4. WHEN a user clicks the FUSSBALL.DE link THEN the system SHALL open the link in a new tab with target="_blank"

### Requirement 2

**User Story:** As a potential club supporter, I want to access the fanshop easily, so that I can purchase club merchandise.

#### Acceptance Criteria

1. WHEN a user visits the home page THEN the system SHALL display a "Fanshop" CTA button
2. WHEN a user clicks on "Fanshop" from any page THEN the system SHALL redirect (302) to https://msv61.fan12.de/
3. WHEN a user navigates to /fanshop THEN the system SHALL automatically redirect to the external fanshop URL
4. WHEN the redirect occurs THEN the system SHALL use host-side redirect via IONOS domain forwarding or .htaccess
5. WHEN the .htaccess file is configured THEN the system SHALL include "Redirect 302 /fanshop https://msv61.fan12.de/"

### Requirement 3

**User Story:** As someone interested in joining the club, I want to easily access membership information and application forms, so that I can become a member.

#### Acceptance Criteria

1. WHEN a user visits the home page THEN the system SHALL display a "Become a member" CTA button
2. WHEN a user visits /mitgliedschaft THEN the system SHALL display membership information and a download button
3. WHEN a user clicks the membership application button THEN the system SHALL download the PDF from public/Mitgliedsantrag.pdf
4. WHEN a user is on the membership page THEN the system SHALL display the club's mailing address and email

### Requirement 4

**User Story:** As a club visitor, I want to see information about club sponsors, so that I can learn about businesses supporting the club.

#### Acceptance Criteria

1. WHEN a user visits the home page THEN the system SHALL display a sponsor teaser with 6 sponsor tiles
2. WHEN a user visits /sponsoren THEN the system SHALL display a responsive grid of all sponsor cards
3. WHEN a user clicks on a sponsor tile THEN the system SHALL navigate to the sponsor's website
4. WHEN the sponsor data is updated THEN the system SHALL read from app/data/sponsors.ts or public/sponsors.json
5. WHEN displaying sponsors THEN the system SHALL use a responsive grid layout (2-4 columns based on screen size)

### Requirement 5

**User Story:** As a website visitor, I want to easily navigate the site and find contact information, so that I can access all club information efficiently.

#### Acceptance Criteria

1. WHEN a user visits any page THEN the system SHALL display a header with logo/name on the left and navigation on the right
2. WHEN a user views the header navigation THEN the system SHALL show links to Spielplan, Sponsoren, Mitgliedschaft, Impressum, and Fanshop
3. WHEN a user scrolls to the bottom of any page THEN the system SHALL display a footer with address, email, and copyright
4. WHEN a user visits the home page THEN the system SHALL display a contact snippet with address and email
5. WHEN displaying the copyright THEN the system SHALL show the current year dynamically

### Requirement 6

**User Story:** As a website administrator, I want the site to meet legal requirements, so that the club complies with German web regulations.

#### Acceptance Criteria

1. WHEN a user visits /impressum THEN the system SHALL display legal information including provider info (§5 DDG)
2. WHEN displaying the impressum THEN the system SHALL include sections for representation, registry, VAT, liability, and copyright
3. WHEN legal information is incomplete THEN the system SHALL clearly mark sections as TODOs
4. WHEN a user accesses the impressum THEN the system SHALL display the club's address and email

### Requirement 7

**User Story:** As a website user with accessibility needs, I want the site to be accessible, so that I can navigate and use all features effectively.

#### Acceptance Criteria

1. WHEN images are displayed THEN the system SHALL include appropriate alt text
2. WHEN interactive elements are focused THEN the system SHALL display visible focus states
3. WHEN content is structured THEN the system SHALL use semantic HTML with proper heading hierarchy
4. WHEN buttons and links are rendered THEN the system SHALL be keyboard accessible
5. WHEN external links open in new tabs THEN the system SHALL include rel="noopener noreferrer"
6. WHEN the HTML document is rendered THEN the system SHALL include lang="de" attribute

### Requirement 8

**User Story:** As a website visitor, I want the site to load quickly and perform well, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. WHEN the home page is tested with Lighthouse THEN the system SHALL achieve a performance score ≥ 90
2. WHEN Core Web Vitals are measured THEN the system SHALL achieve LCP ≤ 2.5s, CLS < 0.1, INP ≤ 200ms
3. WHEN the site is built THEN the system SHALL have no TypeScript errors in strict mode
4. WHEN the site runs in the browser THEN the system SHALL have no console errors
5. WHEN pages load THEN the system SHALL use optimized fonts via next/font (Inter, Oswald)
6. WHEN images are displayed THEN the system SHALL use standard <img> tags or custom loader (no Next.js image optimizer)

### Requirement 9

**User Story:** As a search engine, I want proper metadata and SEO information, so that I can index and display the site appropriately.

#### Acceptance Criteria

1. WHEN a page is accessed THEN the system SHALL include appropriate title and description metadata using App Router Metadata API
2. WHEN social media crawlers access the site THEN the system SHALL provide Open Graph metadata
3. WHEN each page loads THEN the system SHALL have unique, descriptive page titles
4. WHEN the site structure is analyzed THEN the system SHALL use semantic HTML for better SEO
5. WHEN search engines crawl the site THEN the system SHALL provide app/robots.txt
6. WHEN sitemaps are requested THEN the system SHALL generate app/sitemap.ts

### Requirement 10

**User Story:** As a club administrator, I want consistent branding and easy customization, so that I can maintain the site's visual identity.

#### Acceptance Criteria

1. WHEN the site displays THEN the system SHALL use a primary red color (#C1121F) and neutral grays
2. WHEN typography is rendered THEN the system SHALL use Oswald for headings and Inter for body text
3. WHEN spacing is applied THEN the system SHALL maintain consistent vertical rhythm (py-10 to py-16)
4. WHEN UI components are used THEN the system SHALL provide .btn (primary/outline) and .card classes
5. WHEN branding needs updates THEN the system SHALL expose colors as brand and ink tokens in Tailwind theme
### Re
quirement 11

**User Story:** As a website visitor encountering broken links, I want to see a helpful 404 page, so that I can navigate back to working content.

#### Acceptance Criteria

1. WHEN a user navigates to a non-existent page THEN the system SHALL display app/not-found.tsx
2. WHEN the site is deployed THEN the system SHALL configure .htaccess with "ErrorDocument 404 /404.html"
3. WHEN a 404 error occurs THEN the system SHALL provide navigation options back to the main site

### Requirement 12

**User Story:** As a deployment administrator, I want the site to be properly configured for static hosting, so that it can be deployed to IONOS hosting.

#### Acceptance Criteria

1. WHEN the Next.js project is configured THEN the system SHALL use output: 'export' for static export
2. WHEN the build process runs THEN the system SHALL generate static files in the /out directory
3. WHEN deploying to IONOS THEN the system SHALL upload /out contents to htdocs directory
4. WHEN server configuration is needed THEN the system SHALL place .htaccess file in the root directory
5. WHEN the static export is generated THEN the system SHALL be compatible with IONOS hosting environment