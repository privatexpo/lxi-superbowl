#!/usr/bin/env node
/**
 * Exporte data.js → scripts/matches.json (pour le script WP-CLI PHP).
 *   node scripts/export-matches-json.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const src = readFileSync(resolve(ROOT, "data.js"), "utf8");
const window = {};
new Function("window", src)(window);
const SB = window.SB;
if (!SB?.featured) {
  console.error("data.js invalide");
  process.exit(1);
}

const games = [...SB.featured];
if (SB.bowl) games.push(SB.bowl);

const slim = games.map((g) => ({
  rank: g.rank,
  slug: g.slug,
  kind: g.kind || "nfl",
  match: g.match,
  away: g.away,
  home: g.home,
  awayName: g.awayName,
  homeName: g.homeName,
  date: g.date,
  time: g.time,
  venue: g.venue,
  stadium: g.stadium,
  location: g.location,
  city: g.city,
  type: g.type,
  demand: g.demand,
  ticket: g.ticket,
}));

const out = resolve(__dirname, "matches.json");
writeFileSync(out, JSON.stringify(slim, null, 2) + "\n", "utf8");
console.log(`OK ${slim.length} matchs → ${out}`);
