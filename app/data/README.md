# Data Directory

This directory contains static data files for the Mulsower SV 61 website.

## Sponsors Data (`sponsors.ts`)

The `sponsors.ts` file is the **single source of truth** for all sponsor information on the website. 

### Key Principles:
- **No JSON alternatives** - Only use the TypeScript file
- **Single source** - All sponsor data comes from this file
- **Type safety** - Full TypeScript interfaces and validation

### Data Structure:
```typescript
interface Sponsor {
  id: string;        // Unique identifier (kebab-case)
  name: string;      // Display name
  url: string;       // External website URL
  logo?: string;     // Optional logo path (PNG/SVG)
  description?: string; // Optional description
}
```

### Logo Integration:
- Store logos in `/public/images/sponsors/`
- Use PNG or SVG format (not PDF)
- Name files using the sponsor ID: `{sponsor-id}.png`
- Reference in data as: `/images/sponsors/{sponsor-id}.png`

### Helper Functions:
- `getSponsorById(id)` - Get specific sponsor
- `getHomepageSponsors()` - Get first 6 sponsors for home page
- `getAllSponsors()` - Get all sponsors for sponsors page

### Usage:
```typescript
import { getAllSponsors, getHomepageSponsors } from './sponsors';

// For home page teaser
const homeSponsors = getHomepageSponsors();

// For full sponsors page
const allSponsors = getAllSponsors();
```