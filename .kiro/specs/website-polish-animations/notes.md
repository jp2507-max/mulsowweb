

- Added nav underline animation (.nav-link-underline) and subtle logo micro-interaction (.header-logo-interactive) in `app/globals.css`. These use transform/opacity only and respect `prefers-reduced-motion` and touch media queries.
- Hooked `header-logo-interactive` onto the main logo Link in `components/ui/Header.tsx` and wrapped nav labels in a span using `.nav-link-underline` so hover/active/keyboard-visible states reveal the underline.
- Verified with `npm run build` — build succeeded.
