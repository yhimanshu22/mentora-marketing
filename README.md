# Mentora Marketing Site

Marketing landing page for [Mentora AI Meeting Assistant](https://github.com/yhimanshu22/mentora).

[![Mentora AI - AI meeting assistant for interviews and meetings | Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1175821&theme=light&t=1782303221233)](https://www.producthunt.com/products/mentora-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-mentora-ai)


Separate from the desktop app repo — deploy this as a static site (Vercel, Netlify, GitHub Pages, etc.).

## Stack

- React 19 + Vite 6 + TypeScript
- Static HTML/CSS (no backend)
- Dark glass UI matching the Mentora desktop app

## Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

Output: `dist/`

## Deploy

**Vercel / Netlify:** Connect this repo, build command `npm run build`, output `dist`.

**GitHub Pages:** See [Vite static deploy docs](https://vite.dev/guide/static-deploy.html#github-pages).

## Create the GitHub repo

From this folder:

```bash
git init
git add .
git commit -m "Initial marketing landing page for Mentora."
gh repo create mentora-marketing --public --source=. --push
```

Or create an empty repo on GitHub, then:

```bash
git remote add origin git@github.com:YOUR_USER/mentora-marketing.git
git push -u origin main
```

## Customize

Edit links and copy in `src/content.ts`:

- `GITHUB_URL` — open-source app repo
- `LIFETIME_URL` — paid edition download page

## Sections

1. **Hero** — value prop + app mockup
2. **Features** — six capability cards
3. **How it works** — four-step flow
4. **Pricing** — Open Source vs Lifetime
5. **CTA** — GitHub star / download
6. **Footer**
