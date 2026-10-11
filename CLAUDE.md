# Instacalorie landing page

Static marketing site. Plain HTML and CSS, no framework, no build step. Deployed on GitHub Pages at instacalorie.com (see `CNAME`). This is its own repo, apart from the app and backend monorepo (`../instacalorie`, since Oct 2026): a push to main here is what publishes the site, and the legal pages here are the ones App Store Connect and the app link to. `README.md` in this folder is the detailed reference (structure, configurable values, run instructions). This file is the short version plus conventions.

## Layout

- `index.html` - the page: markup, copy, SEO and share meta. New design since Oct 2026 (the owner's "instacalorie-website 2" folder), the previous dark site is gone
- `styles.css` - all styles, the legal pages and the 404 included (`.legal`, `.nf`, `.foot-links` at the end)
- `script.js` - smooth anchor scrolling, the inert Download pills, and the reveal-on-scroll observer. Enhancement only: the page is complete without it, because every reveal rule is scoped to `.js` on the root element, which the inline script in the head sets, so without JS nothing is ever hidden
- `privacy/index.html` - privacy policy page
- `terms/index.html` - terms and conditions page. Both legal pages must stay true to what the app and backend really do (which provider gets what, what is stored, what is deleted). When a feature changes what leaves the phone, update them and the effective date, and the `lastmod` dates in `sitemap.xml`. They share the site's shell: the `.nav` header with the brand and the App Store pill, and the same footer with the Terms and Privacy links
- `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest` - hosting plumbing
- `assets/` - the page's images. The app screens and the hero are WebP (converted from the owner's PNGs with Pillow at quality 85 to 88, a 6 MB page became under 1 MB), every `<img>` carries its width and height and everything below the hero loads lazily. The head has Open Graph and Twitter tags, the Smart App Banner meta (`apple-itunes-app`, the app's id) and a JSON-LD graph (Organization, WebSite, MobileApplication) with no made-up ratings. `assets/img/` keeps the favicons, `assets/img/store/` the App Store screenshots the owner uploads to App Store Connect, not used by the site
- The " Download" pills (the Apple glyph and one word, owner, Oct 2026) are inert for now: `href="#"` with `data-soon`, swallowed in `script.js`. When the app is live, point every one at `https://apps.apple.com/app/id6816730159` with `target="_blank" rel="noopener"` and drop `data-soon`

Run locally with `python3 -m http.server 8000` from this folder so absolute paths behave like production.

## Copy (source of truth for marketing wording)

Hero: "Know what you eat. Instantly." (present tense since Oct 2026, the app's login says the same). Subline: "Snap a photo of any meal. Instacalorie reads the calories, protein, fat, and carbs in seconds. No weighing, no searching, no guessing."

How it works, "Three taps from plate to data":

1. Snap - Open the camera and take one photo of your meal. That is the entire input.
2. Read - AI identifies the food and returns calories plus protein, fat, carbs and fiber in seconds.
3. Track - Every meal flows into your daily, weekly, and monthly totals automatically.

Why Instacalorie, "Built to make tracking effortless":

- No food databases - Skip the endless search lists. Point, shoot, done.
- Macros that matter - Protein, fat, and carbs on every meal, not just a calorie number.
- A clear daily picture - See where you stand by day, week, or month at a glance.

## Conventions

- Semantic HTML, responsive without a framework, real image alt text.
- The CTA pills are inert until the app is live, see Layout for how to wire the App Store link.
- Nothing may depend on JS to be visible or usable: the reveal class only animates elements that are laid out anyway.
- Motion (Oct 2026, from the web-animation-design and fixing-motion-performance skills): entrances only, `transform` and `opacity` only, one ease-out curve (`--ease-out`, quint). The hero rises on load in a top-to-bottom sequence (`.rise`, 50 to 420 ms delays). Everything below reveals once on scroll through one IntersectionObserver (`.reveal`, 700 ms), siblings inside a `data-stagger` group 80 ms apart (the ticker words, the three steps, the strip's phones, the closing block). Pills press to 97% and only change color on hover for real pointers. Every piece of motion is off under `prefers-reduced-motion`. No scroll listeners, no layout reads during motion, no blur beyond the static aurora.
- Keep wording consistent with the app. If copy changes here, check the app's empty states and onboarding use the same language. The landing may say "AI", the app never does.
- Visual direction since Oct 2026: light, white page, near-black ink, the lime accent (`--lime`, `--lime2`) and soft blue-to-lime gradients. The legal pages use the same shell and palette through `styles.css`, nothing of their own.
