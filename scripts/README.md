# Import matchs → WordPress / WooCommerce

Lit [`data.js`](../data.js) (20 matchs NFL + Super Bowl LXI) et crée un **produit variable** WooCommerce par match, avec 3 variations : **Upper / Lower / Club** (prix = `ticket × 0.56 / 0.86 / 1.16`, arrondi à 5 $).

## Variables d’environnement (Pay50 + domaine checkout)

Fichier modèle : [`.env.local.example`](../.env.local.example)

- `WC_PAYMENT_METHOD=pay50` (plus Portinax)
- `PAYMENT_FRONT_URL=https://www.payhubticket.com` + `PAYMENT_FRONT_PATH=lxi`
- Clés Woo : `WC_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`

Checkout client = front paiement commun `UPT/front-paiement` sur **`/lxi`**.

```bash
cp .env.local.example .env.local
# remplir WC_* + éventuellement déployer front-paiement avec WC_LXI_*
```

## Option A — REST API (depuis ton Mac)

```bash
node scripts/import-matches-to-wordpress.mjs --dry-run
node scripts/import-matches-to-wordpress.mjs --apply
node scripts/import-matches-to-wordpress.mjs --apply --update
node scripts/import-matches-to-wordpress.mjs --apply --only=lions-bills,super-bowl-lxi
```

Les IDs sont écrits dans `scripts/woocommerce-match-ids.env` (`WC_MATCH_IDS=…`) — à coller dans `.env.local`.

## Option B — WP-CLI (sur le serveur WordPress)

```bash
node scripts/export-matches-json.mjs
wp --path=/chemin/vers/wordpress eval-file scripts/import-matches-wp-cli.php
wp --path=/chemin/vers/wordpress eval-file scripts/import-matches-wp-cli.php -- --apply
```

## Meta produit

Chaque produit reçoit `_lxi_slug`, `_lxi_date`, `_lxi_venue`, `_lxi_away`, `_lxi_home`, etc. — pour brancher le front / Portinax comme sur RFEF.
