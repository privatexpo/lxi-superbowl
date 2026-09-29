# LXI Super Ticket

Site statique Super Bowl LXI (HTML / CSS / JS).  
Prod Vercel : https://lxi-superbowl.vercel.app

## Structure

```
index.html      # page principale
app.js          # panier, checkout démo, routing
data.js         # matchs + Super Bowl
stadiums.js     # plans / sections
styles.css
assets/         # images, posters, vidéos
emails/         # aperçus facture / e-tickets
scripts/        # import WooCommerce des matchs
```

Le dossier `web/` est un ancien scaffold Next.js **non utilisé** (ignoré par git).

## Local

```bash
npm install
npm run dev
```

Ouvre http://localhost:8765

## Env

```bash
cp .env.local.example .env.local
```

Variables utiles : `WC_URL`, `WC_CONSUMER_*`, `WC_PAYMENT_METHOD=pay50`,  
`PAYMENT_FRONT_URL` / `PAYMENT_FRONT_PATH=lxi` (checkout sur payhubticket).

## Import matchs → WordPress

```bash
npm run import:matches:dry
npm run import:matches
```

## Deploy

```bash
npx vercel --prod
```
