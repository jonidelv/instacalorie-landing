# Instacalorie landing page

Static marketing site for the Instacalorie app. No build step, no dependencies. Deployed by GitHub Pages at instacalorie.com (`CNAME`): a push to `main` publishes it.

## Run

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html          the page: markup, copy, SEO and share meta
styles.css          all styles, including the legal pages and the 404
script.js           smooth anchor scrolling and the reveal-on-scroll class, enhancement only
privacy/index.html  Privacy Policy, the page App Store Connect and the app link to
terms/index.html    Terms and Conditions, same
404.html            not-found page
assets/             the page's images (app screens, photos, logo)
assets/img/         favicons and the share image
assets/img/store/   the App Store screenshots the owner uploads to App Store Connect, not used by the site
CNAME, robots.txt, sitemap.xml, site.webmanifest
```

## Configurable values

| What | Where | Current |
|---|---|---|
| App Store link | every " Download" pill (the Apple glyph and one word, owner, Oct 2026), in `index.html` and the legal pages' header | inert for now (`href="#"` with `data-soon`, the click is swallowed in `script.js`). When the app is live, set every pill to `https://apps.apple.com/app/id6816730159` with `target="_blank" rel="noopener"` and drop `data-soon` |
| Canonical and share URLs | `<head>` of each page | `https://instacalorie.com/` |
| Share image | `assets/img/og-image.png` | 1200 by 630 |
| Support email | the Contact section of the legal pages | `instacalorieapp@gmail.com` |

## Legal pages

`privacy/index.html` and `terms/index.html` must stay true to what the app and the backend really do: which provider receives what, what is stored, what is deleted. When a feature changes what leaves the phone or the server, update the page, its effective date, and the `lastmod` in `sitemap.xml`, in the same piece of work as the app or backend change (the monorepo is at `../instacalorie`).
