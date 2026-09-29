# LXI Super Ticket (Next.js)

Site billetterie Super Bowl LXI. Déployé sur Vercel depuis GitHub.

- Prod : https://lxi-superbowl.vercel.app  
- Repo : https://github.com/privatexpo/lxi-superbowl

## Stack

- **Next.js 16** (App Router)
- Front actuel : HTML + `public/app.js` (SPA hash-routing)
- Assets dans `public/`
- Markup page dans `content/home-body.html`

## Local

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Structure

```
app/                 # Next.js (layout + page)
content/             # corps HTML de la home
public/              # assets, styles.css, app.js, data.js, emails/
scripts/             # import matchs WooCommerce
```

## Env

```bash
cp .env.local.example .env.local
```

Checkout Pay50 : `PAYMENT_FRONT_URL` + `PAYMENT_FRONT_PATH=lxi`.

## Deploy Vercel (via Git)

1. Vercel → Add New Project → importer `privatexpo/lxi-superbowl`
2. Framework : **Next.js** (auto)
3. Root Directory : `.`
4. Deploy

À chaque `git push` sur `main`, Vercel rebuild.
