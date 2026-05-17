# Instacalorie landing page

Static pre-launch marketing page. No build step, no dependencies.

## Run

Open `index.html` directly, or serve it (recommended, so relative paths and
fonts behave exactly like production):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html              all markup + copy + SEO/meta
assets/css/styles.css   design system, device frames, sections, motion
assets/js/main.js       reveals, load choreography, parallax (enhancement only)
assets/img/             logo + 6 app screenshots + favicons + OG image
```

## Configurable values

| What | Where | Current (placeholder) |
|---|---|---|
| Early-access email | every CTA + footer (`mailto:`) | `instacalorieapp@gmail.com` |
| Canonical / OG domain | `<head>` canonical + `og:`/`twitter:` URLs | `https://instacalorie.com/` |
| OG share image | `assets/img/og-image.png` | auto-generated (logo on brand green). Replace with a designed 1200x630 card before launch |
| App Store link | none yet | CTA stays `mailto:` until the app is live; swap in the App Store badge/URL post-launch |

To change the email everywhere, search-replace `instacalorieapp@gmail.com`
across `index.html`.

## Notes

- The CTA is a `mailto:` by design (pre-launch, no backend). On machines with
  no mail client configured it will do nothing. The microcopy says so.
- Motion fully respects `prefers-reduced-motion`. With JS disabled the page is
  still complete and readable (all content visible, nav usable).
- App screenshots are framed in pure CSS (no device-frame images).
