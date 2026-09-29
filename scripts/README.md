# Import matchs → WordPress / WooCommerce

Lit [`public/data.js`](../public/data.js) (20 matchs NFL + Super Bowl LXI) et crée un **produit variable** WooCommerce par match, avec 3 variations : **Upper / Lower / Club** (prix = `ticket × 0.56 / 0.86 / 1.16`, arrondi à 5 $).

## Variables d’environnement

Fichier modèle : [`.env.local.example`](../.env.local.example)

- Clés Woo : `WC_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`
- Pas de passerelle de paiement pour l’instant (pas de Pay50, pas de front checkout)

```bash
cp .env.local.example .env.local
# remplir WC_URL et les clés REST
```

## Option A — REST API (depuis ton Mac)

```bash
node scripts/import-matches-to-wordpress.mjs --dry-run
node scripts/import-matches-to-wordpress.mjs --apply
node scripts/import-matches-to-wordpress.mjs --apply --update
node scripts/import-matches-to-wordpress.mjs --apply --only=lions-bills,super-bowl-lxi
```

Les produits vivent dans WooCommerce. Le script affiche les IDs créés ; rien à recopier dans `.env.local`.

## Option B — WP-CLI (sur le serveur WordPress)

```bash
node scripts/export-matches-json.mjs
wp --path=/chemin/vers/wordpress eval-file scripts/import-matches-wp-cli.php
wp --path=/chemin/vers/wordpress eval-file scripts/import-matches-wp-cli.php -- --apply
```

## Meta produit

Chaque produit reçoit `_lxi_slug`, `_lxi_date`, `_lxi_venue`, `_lxi_away`, `_lxi_home`, etc.
