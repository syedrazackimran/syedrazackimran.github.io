# rabbitqr-sites

Public marketing / privacy / support pages for RabbitQr apps, served
via [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/).

## Layout

Each app lives under its own subdirectory. The `pages` CI job copies
each subdirectory into the `public/` artifact, which GitLab serves at
`https://syedrazackimran.gitlab.io/rabbitqr-sites/<app>/`.

```
rabbitqr-sites/
├── .gitlab-ci.yml
├── README.md
├── pawalert/
│   ├── index.html
│   ├── privacy/index.html
│   └── support/index.html
└── flickpick/                # (future)
    └── ...
```

Each subpage lives in its own directory so the URL is clean
(`/privacy/` instead of `/privacy.html`).

## Live URLs

### PawAlert

- Marketing: <https://syedrazackimran.gitlab.io/rabbitqr-sites/pawalert/>
- Privacy: <https://syedrazackimran.gitlab.io/rabbitqr-sites/pawalert/privacy/>
- Support: <https://syedrazackimran.gitlab.io/rabbitqr-sites/pawalert/support/>

## Updating

Edit the HTML in the relevant app's directory, commit, push to `main`.
The `pages` job runs automatically on every push to the default branch
and refreshes the live URLs within ~5 minutes.

## Adding a new app

1. Create a sibling directory: `mkdir <app-name>`
2. Add `index.html` at the app root and any sub-pages as
   `<page>/index.html` (e.g. `privacy/index.html`) so the URLs come out
   clean.
3. The CI job already copies every top-level directory into `public/`
   — no `.gitlab-ci.yml` change needed.
