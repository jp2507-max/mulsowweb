# Tailwind CSS v4 Best Practices & Guidelines

## Current Setup Status
✅ **Working Configuration**: The project is correctly configured for Tailwind CSS v4
- Build succeeds without errors
- Custom CSS classes with `@apply` are working
- Static export generates properly
- Editor warnings are cosmetic only

## Tailwind CSS v4 Architecture

### Import Structure
```css
/* Correct v4 import - single line replaces all v3 @tailwind directives */
@import "tailwindcss";
```

### Theme Configuration
```css
/* v4 uses @theme directive instead of config files */
@theme {
  --color-brand-primary: #C1121F;
  --color-brand-secondary: #8B0000;
  /* Theme variables automatically generate utility classes */
}
```

### Custom Utilities with @apply
```css
@layer utilities {
  .btn {
    @apply inline-flex items-center justify-center font-semibold rounded-xl;
  }
  
  .btn-primary {
    @apply bg-brand-primary text-white hover:bg-brand-secondary;
  }
}
```

## Best Practices

### 1. CSS Class Organization
- **Custom Components**: Use `@apply` for reusable component classes
- **Utility-First**: Prefer Tailwind utilities in JSX when possible
- **Performance**: Custom classes reduce bundle size for repeated patterns

### 2. Theme Variables
- Define all design tokens in `@theme` block
- Use semantic naming: `--color-brand-primary` not `--color-red-500`
- Leverage CSS variables for dynamic theming

### 3. Component Patterns
```tsx
// ✅ Good: Using custom component class
<button className="btn btn-primary">Click me</button>

// ✅ Also good: Direct utilities for one-offs
<div className="flex items-center gap-4 p-6">

// ❌ Avoid: Mixing approaches inconsistently
<button className="btn bg-blue-500">Mixed approach</button>
```

### 4. Performance Optimization
- Custom classes reduce HTML class bloat
- `@apply` compiles to optimized CSS
- Use `@layer utilities` for proper cascade order

## Editor Configuration

### VS Code Settings
```json
{
  "css.lint.unknownAtRules": "ignore",
  "tailwindCSS.experimental.configFile": null,
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### Tailwind IntelliSense
- Install latest Tailwind CSS IntelliSense extension
- v4 support is improving but may show warnings
- Warnings don't affect build or functionality

## Migration Guidelines

### From v3 to v4
1. Replace `@tailwind` directives with `@import "tailwindcss"`
2. Move config to `@theme` block in CSS
3. Update PostCSS config to use `@tailwindcss/postcss`
4. Test build - warnings are expected during transition

### Handling Warnings
- Editor warnings for `@theme` and `@apply` are cosmetic
- Build success indicates proper configuration
- Consider CSS linting rules to suppress warnings

## Component Architecture

### Button Component Pattern
```tsx
// Define variants with custom CSS classes
const classes = cx(
  "btn",
  size === "lg" && "btn-lg",
  variant === "primary" && "btn-primary",
  className
);
```

### CSS Implementation
```css
@layer utilities {
  .btn {
    @apply inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200;
  }
  
  .btn-lg {
    @apply px-6 py-4 text-lg;
  }
  
  .btn-primary {
    @apply bg-brand-primary text-white hover:bg-brand-secondary shadow-lg;
  }
}
```

## Troubleshooting

### Common Issues
1. **Styles not applying**: Check import order in globals.css
2. **Build failures**: Verify PostCSS configuration
3. **Missing utilities**: Ensure theme variables are defined
4. **Editor warnings**: Update extensions or ignore CSS lint rules

### Debug Steps
1. Run `npm run build` - should succeed without errors
2. Check generated CSS in browser dev tools
3. Verify custom classes are compiled correctly
4. Test in production build

## Static Export Considerations

### Next.js Configuration
```js
// next.config.mjs
export default {
  output: 'export',
  trailingSlash: true,
  // Tailwind v4 works seamlessly with static export
};
```

### Asset Handling
- All CSS is bundled and optimized
- Custom fonts via next/font work correctly
- No external CDN dependencies required

## Future-Proofing

### v4 Stability
- v4 is production-ready as of December 2024
- Editor support will improve over time
- Current setup is future-compatible

### Upgrade Path
- Monitor Tailwind CSS releases
- Update editor extensions regularly
- Consider migrating inline styles to utilities gradually

## Performance Metrics

### Current Optimization
- Bundle size: Optimized with custom classes
- LCP: Hero section optimized for fast rendering
- CLS: Reserved space prevents layout shift
- Build time: Fast compilation with v4 architecture

### Monitoring
- Lighthouse scores should remain ≥90
- Core Web Vitals compliance maintained
- Static export size optimized