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
│   ├── privacy.html
│   └── support.html
└── flickpick/                # (future)
    └── ...
```

## Live URLs

### PawAlert

- Marketing: <https://syedrazackimran.gitlab.io/rabbitqr-sites/pawalert/>
- Privacy: <https://syedrazackimran.gitlab.io/rabbitqr-sites/pawalert/privacy.html>
- Support: <https://syedrazackimran.gitlab.io/rabbitqr-sites/pawalert/support.html>

## Updating

Edit the HTML in the relevant app's directory, commit, push to `main`.
The `pages` job runs automatically on every push to the default branch
and refreshes the live URLs within ~5 minutes.

## Adding a new app

1. Create a sibling directory: `mkdir <app-name>`
2. Add `index.html`, `privacy.html`, `support.html` (or whatever the
   App Store metadata needs).
3. The CI job already copies every top-level directory into `public/`
   — no `.gitlab-ci.yml` change needed.
