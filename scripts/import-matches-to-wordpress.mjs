#!/usr/bin/env node
/**
 * Importe les matchs LXI (data.js) dans WordPress / WooCommerce.
 *
 * Chaque match → produit variable WooCommerce
 * Variations : Upper / Lower / Club (même logique de prix que le site static)
 *
 * Usage :
 *   cp .env.local.example .env.local   # remplir WC_URL / WC_CONSUMER_* (comme FFF)
 *   node scripts/import-matches-to-wordpress.mjs --dry-run
 *   node scripts/import-matches-to-wordpress.mjs --apply
 *   node scripts/import-matches-to-wordpress.mjs --apply --only=lions-bills,super-bowl-lxi
 *   node scripts/import-matches-to-wordpress.mjs --apply --update
 *
 * Les produits sont gérés dans WordPress (pas de WC_MATCH_IDS).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const ATTR_NAME = "Categoria";
const ATTR_SLUG = "pa_categoria";
const META_SLUG = "_lxi_slug";

const TIERS = [
  { option: "Upper", mult: 0.56, stockEnv: "WOO_STOCK_UPPER", stockDefault: 120 },
  { option: "Lower", mult: 0.86, stockEnv: "WOO_STOCK_LOWER", stockDefault: 80 },
  { option: "Club", mult: 1.16, stockEnv: "WOO_STOCK_CLUB", stockDefault: 40 },
];

function loadEnv(file) {
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

// Même cascade que FFF / Next : .env.local prioritaire, puis .env
loadEnv(resolve(ROOT, ".env.local"));
loadEnv(resolve(ROOT, ".env"));
loadEnv(resolve(__dirname, ".env"));

const args = new Set(process.argv.slice(2));
const dryRun = !args.has("--apply");
const doUpdate = args.has("--update");
const onlyArg = [...args].find((a) => a.startsWith("--only="));
const onlySlugs = onlyArg
  ? onlyArg
      .slice("--only=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : null;

/** FFF = WC_* ; RFEF = WOOCOMMERCE_* — on accepte les deux. */
function env(...keys) {
  for (const k of keys) {
    const v = (process.env[k] || "").trim();
    if (v) return v;
  }
  return "";
}

function loadMatchesFromDataJs() {
  const src = readFileSync(resolve(ROOT, "public/data.js"), "utf8");
  const window = {};
  // data.js = window.SB = { ... };
  // eslint-disable-next-line no-new-func
  new Function("window", src)(window);
  const SB = window.SB;
  if (!SB?.featured) throw new Error("data.js : window.SB.featured introuvable");

  const games = [...SB.featured];
  if (SB.bowl) games.push(SB.bowl);
  return games;
}

function roundMoney(n) {
  const r = Math.round(Number(n) / 5) * 5;
  return Math.max(5, r);
}

function tierPrice(base, mult) {
  return String(roundMoney(Number(base || 0) * mult));
}

function productName(game) {
  if (game.kind === "superbowl" || game.slug === "super-bowl-lxi") {
    return "Super Bowl LXI — SoFi Stadium";
  }
  return `${game.awayName} @ ${game.homeName}`;
}

function productDescription(game) {
  const lines = [
    `<p><strong>${game.match}</strong></p>`,
    `<p>${game.awayName} vs ${game.homeName}</p>`,
    `<p>${game.date}${game.time ? ` · ${game.time}` : ""}</p>`,
    `<p>${game.venue}${game.city ? ` — ${game.city}` : ""}</p>`,
  ];
  if (game.type) lines.push(`<p>Tag: ${game.type}</p>`);
  lines.push(
    `<p>Independent ticket marketplace. Not the official NFL or Super Bowl website.</p>`
  );
  return lines.join("\n");
}

function metaFor(game) {
  return [
    { key: META_SLUG, value: game.slug },
    { key: "_lxi_match", value: game.match || "" },
    { key: "_lxi_away", value: game.away || "" },
    { key: "_lxi_home", value: game.home || "" },
    { key: "_lxi_away_name", value: game.awayName || "" },
    { key: "_lxi_home_name", value: game.homeName || "" },
    { key: "_lxi_date", value: game.date || "" },
    { key: "_lxi_time", value: game.time || "" },
    { key: "_lxi_venue", value: game.venue || "" },
    { key: "_lxi_city", value: game.city || "" },
    { key: "_lxi_location", value: game.location || "" },
    { key: "_lxi_stadium", value: game.stadium || "" },
    { key: "_lxi_type", value: game.type || "" },
    { key: "_lxi_kind", value: game.kind || "nfl" },
    { key: "_lxi_base_price", value: String(game.ticket || 0) },
  ];
}

function variationSku(slug, option) {
  return `lxi-${slug}-${option.toLowerCase()}`.replace(/[^a-z0-9-]/gi, "-").slice(0, 64);
}

const wooUrl = env("WC_URL", "WOOCOMMERCE_URL").replace(/\/$/, "");
const key = env("WC_CONSUMER_KEY", "WOOCOMMERCE_CONSUMER_KEY");
const secret = env("WC_CONSUMER_SECRET", "WOOCOMMERCE_CONSUMER_SECRET");
const auth = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

async function woo(path, init = {}) {
  if (!wooUrl || !key || !secret) {
    throw new Error(
      "WC_URL / WC_CONSUMER_KEY / WC_CONSUMER_SECRET manquants. Copie .env.local.example → .env.local"
    );
  }
  const res = await fetch(`${wooUrl}/wp-json/wc/v3${path}`, {
    ...init,
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${path}: ${text.slice(0, 500)}`);
  return text ? JSON.parse(text) : null;
}

async function findProductBySlugMeta(slug) {
  // Woo ne filtre pas bien sur meta arbitraire → on cherche par sku/slug produit
  const bySlug = await woo(`/products?slug=${encodeURIComponent(slug)}&per_page=5`);
  if (Array.isArray(bySlug) && bySlug.length) return bySlug[0];

  const search = await woo(`/products?search=${encodeURIComponent(slug)}&per_page=20`);
  if (!Array.isArray(search)) return null;
  for (const p of search) {
    const meta = (p.meta_data || []).find((m) => m.key === META_SLUG);
    if (meta && String(meta.value) === slug) return p;
  }
  return null;
}

async function ensureAttribute() {
  const attrs = await woo(`/products/attributes?per_page=100`);
  let attr = (attrs || []).find(
    (a) => a.slug === ATTR_SLUG || a.name === ATTR_NAME || a.slug === "categoria"
  );
  if (!attr) {
    if (dryRun) {
      console.log(`[dry-run] créer attribut ${ATTR_NAME}`);
      return { id: 0, slug: ATTR_SLUG, name: ATTR_NAME };
    }
    attr = await woo(`/products/attributes`, {
      method: "POST",
      body: JSON.stringify({
        name: ATTR_NAME,
        slug: ATTR_SLUG,
        type: "select",
        order_by: "menu_order",
        has_archives: false,
      }),
    });
    console.log(`Attribut créé #${attr.id} ${attr.name}`);
  }

  const terms = await woo(`/products/attributes/${attr.id}/terms?per_page=100`).catch(() => []);
  for (const tier of TIERS) {
    const exists = (terms || []).some(
      (t) => t.name === tier.option || t.slug === tier.option.toLowerCase()
    );
    if (exists) continue;
    if (dryRun) {
      console.log(`[dry-run] terme attribut ${tier.option}`);
      continue;
    }
    await woo(`/products/attributes/${attr.id}/terms`, {
      method: "POST",
      body: JSON.stringify({ name: tier.option }),
    });
    console.log(`  terme + ${tier.option}`);
  }
  return attr;
}

async function ensureCategory() {
  const cats = await woo(`/products/categories?search=NFL&per_page=20`);
  let cat = (cats || []).find((c) => c.slug === "nfl" || c.name === "NFL");
  if (cat) return cat;
  if (dryRun) {
    console.log("[dry-run] catégorie NFL");
    return { id: 0, name: "NFL", slug: "nfl" };
  }
  cat = await woo(`/products/categories`, {
    method: "POST",
    body: JSON.stringify({ name: "NFL", slug: "nfl" }),
  });
  console.log(`Catégorie créée #${cat.id}`);
  return cat;
}

function productPayload(game, attr, categoryId) {
  const options = TIERS.map((t) => t.option);
  return {
    name: productName(game),
    type: "variable",
    status: "publish",
    catalog_visibility: "visible",
    description: productDescription(game),
    short_description: `${game.match} · ${game.venue} · ${game.date}`,
    slug: game.slug,
    sku: `lxi-${game.slug}`.slice(0, 64),
    categories: categoryId ? [{ id: categoryId }] : [],
    attributes: [
      {
        id: attr.id || undefined,
        name: ATTR_NAME,
        slug: attr.slug || ATTR_SLUG,
        visible: true,
        variation: true,
        options,
      },
    ],
    meta_data: metaFor(game),
  };
}

function variationPayload(game, tier, attr) {
  const stock = Number(process.env[tier.stockEnv] || tier.stockDefault);
  return {
    regular_price: tierPrice(game.ticket, tier.mult),
    manage_stock: true,
    stock_quantity: stock,
    stock_status: "instock",
    sku: variationSku(game.slug, tier.option),
    attributes: [
      {
        id: attr.id || undefined,
        name: ATTR_NAME,
        option: tier.option,
      },
    ],
    meta_data: [
      { key: "_lxi_tier", value: tier.option.toLowerCase() },
      { key: "_lxi_mult", value: String(tier.mult) },
    ],
  };
}

async function createVariations(productId, game, attr) {
  for (const tier of TIERS) {
    const body = variationPayload(game, tier, attr);
    if (dryRun) {
      console.log(
        `  [dry-run] variation ${tier.option} → $${body.regular_price} · stock ${body.stock_quantity}`
      );
      continue;
    }
    const v = await woo(`/products/${productId}/variations`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(
      `  + ${tier.option} #${v.id} → $${body.regular_price} · stock ${body.stock_quantity}`
    );
  }
}

async function syncVariations(productId, game, attr) {
  const existing = [];
  let page = 1;
  while (true) {
    const batch = await woo(`/products/${productId}/variations?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.length) break;
    existing.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  for (const tier of TIERS) {
    const body = variationPayload(game, tier, attr);
    const found = existing.find((v) => {
      const opt = (v.attributes || []).find(
        (a) => /categor/i.test(a.name || "") || a.slug === ATTR_SLUG
      );
      return opt && String(opt.option).toLowerCase() === tier.option.toLowerCase();
    });

    if (dryRun) {
      console.log(
        `  [dry-run] ${found ? "MAJ" : "crée"} ${tier.option} → $${body.regular_price}`
      );
      continue;
    }

    if (found) {
      await woo(`/products/${productId}/variations/${found.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      console.log(`  ~ ${tier.option} #${found.id} → $${body.regular_price}`);
    } else {
      const v = await woo(`/products/${productId}/variations`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log(`  + ${tier.option} #${v.id} → $${body.regular_price}`);
    }
  }
}

async function importGame(game, attr, categoryId) {
  console.log(`\n→ ${game.slug}  (${game.match})  base $${game.ticket}`);

  if (dryRun) {
    const payload = productPayload(game, attr, categoryId);
    console.log(`  [dry-run] produit « ${payload.name} »`);
    for (const tier of TIERS) {
      const v = variationPayload(game, tier, attr);
      console.log(`  [dry-run] ${tier.option} → $${v.regular_price}`);
    }
    return { slug: game.slug, id: null, dry: true };
  }

  let existing = await findProductBySlugMeta(game.slug);
  if (existing && !doUpdate) {
    console.log(`  existe déjà #${existing.id} — passe (--update pour écraser)`);
    return { slug: game.slug, id: existing.id, skipped: true };
  }

  if (existing && doUpdate) {
    const payload = productPayload(game, attr, categoryId);
    delete payload.sku; // éviter conflit sku
    const updated = await woo(`/products/${existing.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    console.log(`  MAJ produit #${updated.id}`);
    await syncVariations(updated.id, game, attr);
    return { slug: game.slug, id: updated.id, updated: true };
  }

  const created = await woo(`/products`, {
    method: "POST",
    body: JSON.stringify(productPayload(game, attr, categoryId)),
  });
  console.log(`  créé #${created.id}`);
  await createVariations(created.id, game, attr);
  return { slug: game.slug, id: created.id, created: true };
}

async function main() {
  let games = loadMatchesFromDataJs();
  if (onlySlugs?.length) {
    games = games.filter((g) => onlySlugs.includes(g.slug));
    if (!games.length) {
      console.error("Aucun match pour --only=", onlySlugs.join(","));
      process.exit(1);
    }
  }

  console.log(
    `LXI → WooCommerce  ·  ${games.length} match(s)  ·  mode ${dryRun ? "DRY-RUN" : "APPLY"}${
      doUpdate ? " +UPDATE" : ""
    }`
  );
  console.log(`Source: ${resolve(ROOT, "public/data.js")}`);
  if (wooUrl) console.log(`Woo: ${wooUrl}`);

  let attr = { id: 0, slug: ATTR_SLUG, name: ATTR_NAME };
  let category = { id: 0 };
  if (!dryRun) {
    attr = await ensureAttribute();
    category = await ensureCategory();
  } else {
    console.log("(dry-run : pas d’appel API — ajoute --apply pour pousser)");
  }

  const results = [];
  for (const game of games) {
    results.push(await importGame(game, attr, category.id));
  }

  console.log("\nProduits WooCommerce :");
  for (const r of results) console.log(`  ${r.slug}=${r.id ?? "dry-run"}`);
  if (dryRun) {
    console.log("\nRelance avec --apply quand les clés Woo sont prêtes.");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
