# Homeverse Landing Page

A single-page marketing experience for the Homeverse real estate brand. The project now focuses on the primary landing journey only and keeps the original HTML/CSS/JS stack.

## What changed
- Consolidated the project to `index.html` and removed references to multi-page navigation.
- Updated navigation and footer links so every call-to-action anchors to a section that exists on the page.
- Added lightweight scroll-reveal animations across hero, feature, property, blog, CTA, and footer elements.

## Scroll reveal animations
- Elements marked with `data-reveal` receive a fade-up animation when entering the viewport and reset when leaving so they can play again.
- Animation timing can be staggered per element with the inline CSS variable `--delay` (milliseconds).
- Users who prefer reduced motion see content immediately with no animation thanks to `prefers-reduced-motion` handling in both CSS and JavaScript.

## Running locally
Serve the static site with any web server. For example:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser and navigate to `/`.

## Deploying to Vercel
1. Import the repository into Vercel.
2. Choose the **Static Site** preset (no build step required).
3. Deploy. Vercel will serve `index.html` as the entry point and expose the `/assets` directory automatically.

## Removed or archived
- Standalone pages (about, blog, contact, etc.) that previously existed in the upstream project are no longer referenced.
- Footer and navigation items that pointed to removed routes now scroll to live sections on the landing page.

