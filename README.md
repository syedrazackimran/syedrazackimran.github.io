# syedrazackimran.github.io

Portfolio of Syed Razack Imran Thajudeen, plus the privacy, terms and support pages for my apps.
Built with Astro, deployed to <https://syedrazackimran.github.io/> by GitHub Actions.

## Edit the content

Every fact on the page lives in `src/data/profile.ts`. Components only read from it.

Switches at the top of that file:

| Flag | Default | What it does |
|---|---|---|
| `showResume` | `false` | Shows "Download résumé". Put a public copy (no phone number, no "Additional details" line) at `public/resume.pdf` first. |
| `openToWork` | `false` | Shows the availability line in Contact. |
| `showInDevelopment` | `false` | Shows the "In development" list under My own apps. |
| `showPhone` | `false` | Reserved; the phone number is never published. |

App Store names, ratings, icons and CineFlicx screenshots are fetched at build time by
`scripts/fetch-appstore.mjs` into `src/data/apps.json` and `src/assets/appstore/`. If the
App Store is unreachable, the committed copies are used.

To replace the photo: `node scripts/prepare-portrait.mjs path/to/photo.jpg` (strips all metadata).

## Run locally

Node 22.23 or newer.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # App Store fetch, share image, astro check, build, service worker
npm run preview    # serve dist/
npm run contrast   # WCAG AA check of the colour tokens
npm run verify     # axe, offline, reduced motion, keyboard, ATS text, page weight (needs preview running)
```

`npm run verify` uses Playwright: run `npx playwright install chromium` once.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds with `withastro/action` and publishes with
`actions/deploy-pages`. It also runs weekly so the App Store ratings stay current.

## App pages

`public/cineflicx/`, `public/pawalert/`, `public/gridora/` and `public/app-ads.txt` are copied to the
site unchanged, so their URLs are the same as before (App Store Connect and AdMob point at them).
The service worker doesn't precache them.

GitLab Pages (`.gitlab-ci.yml`) still serves only those app pages, for released Gridora builds that link there.

## Custom domain later

1. Add a `CNAME` record at your DNS provider pointing to `syedrazackimran.github.io`.
2. In the repo, Settings → Pages → Custom domain, enter the domain and turn on "Enforce HTTPS".
3. Change `site` in `astro.config.mjs` and the sitemap line in `public/robots.txt` to the new domain.
