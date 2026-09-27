<?php
/**
 * WP-CLI : importe les matchs LXI dans WooCommerce (même logique que le .mjs).
 *
 * Placer ce fichier sur le serveur WordPress, puis :
 *   wp eval-file import-matches-wp-cli.php
 *   wp eval-file import-matches-wp-cli.php -- --apply
 *   wp eval-file import-matches-wp-cli.php -- --apply --update
 *
 * Ou depuis ce repo (chemin absolu vers wp) :
 *   wp --path=/chemin/vers/wordpress eval-file scripts/import-matches-wp-cli.php -- --apply
 *
 * Les matchs sont embarqués (extrait de data.js). Pour régénérer le tableau $MATCHES,
 * relancer : node scripts/export-matches-json.mjs
 */

if (!defined('ABSPATH')) {
	fwrite(STDERR, "À lancer via WP-CLI : wp eval-file import-matches-wp-cli.php\n");
	exit(1);
}

if (!class_exists('WooCommerce')) {
	WP_CLI::error('WooCommerce n’est pas actif.');
}

$args = [];
if (isset($GLOBALS['argv']) && is_array($GLOBALS['argv'])) {
	$args = $GLOBALS['argv'];
}
$apply  = in_array('--apply', $args, true);
$update = in_array('--update', $args, true);

/** @var array<int, array<string, mixed>> */
$MATCHES = json_decode(
	file_get_contents(__DIR__ . '/matches.json'),
	true
);

if (!is_array($MATCHES) || !$MATCHES) {
	WP_CLI::error('matches.json manquant ou vide. Lance d’abord : node scripts/export-matches-json.mjs');
}

$TIERS = [
	['option' => 'Upper', 'mult' => 0.56, 'stock' => 120],
	['option' => 'Lower', 'mult' => 0.86, 'stock' => 80],
	['option' => 'Club',  'mult' => 1.16, 'stock' => 40],
];

function lxi_round_money($n) {
	$r = (int) (round($n / 5) * 5);
	return max(5, $r);
}

function lxi_ensure_attribute() {
	$slug = 'pa_categoria';
	$id   = wc_attribute_taxonomy_id_by_name('categoria');
	if (!$id) {
		$id = wc_create_attribute([
			'name'         => 'Categoria',
			'slug'         => 'categoria',
			'type'         => 'select',
			'order_by'     => 'menu_order',
			'has_archives' => false,
		]);
		delete_transient('wc_attribute_taxonomies');
		WC_Cache_Helper::invalidate_cache_group('woocommerce-attributes');
	}
	$taxonomy = 'pa_categoria';
	if (!taxonomy_exists($taxonomy)) {
		register_taxonomy($taxonomy, ['product']);
	}
	foreach (['Upper', 'Lower', 'Club'] as $term) {
		if (!term_exists($term, $taxonomy)) {
			wp_insert_term($term, $taxonomy);
		}
	}
	return (int) $id;
}

function lxi_ensure_category() {
	$term = term_exists('NFL', 'product_cat');
	if ($term) {
		return (int) (is_array($term) ? $term['term_id'] : $term);
	}
	$created = wp_insert_term('NFL', 'product_cat', ['slug' => 'nfl']);
	if (is_wp_error($created)) {
		WP_CLI::error($created->get_error_message());
	}
	return (int) $created['term_id'];
}

function lxi_find_by_slug($slug) {
	$q = new WP_Query([
		'post_type'      => 'product',
		'post_status'    => 'any',
		'name'           => $slug,
		'posts_per_page' => 1,
		'fields'         => 'ids',
	]);
	if ($q->posts) {
		return (int) $q->posts[0];
	}
	$q = new WP_Query([
		'post_type'      => 'product',
		'post_status'    => 'any',
		'posts_per_page' => 1,
		'fields'         => 'ids',
		'meta_key'       => '_lxi_slug',
		'meta_value'     => $slug,
	]);
	return $q->posts ? (int) $q->posts[0] : 0;
}

function lxi_product_name($game) {
	if (!empty($game['kind']) && $game['kind'] === 'superbowl') {
		return 'Super Bowl LXI — SoFi Stadium';
	}
	return $game['awayName'] . ' @ ' . $game['homeName'];
}

$attr_id  = $apply ? lxi_ensure_attribute() : 0;
$cat_id   = $apply ? lxi_ensure_category() : 0;
$ids_out  = [];

WP_CLI::log(sprintf(
	'LXI WP-CLI · %d match(s) · %s%s',
	count($MATCHES),
	$apply ? 'APPLY' : 'DRY-RUN',
	$update ? ' +UPDATE' : ''
));

foreach ($MATCHES as $game) {
	$slug = $game['slug'];
	$base = (float) ($game['ticket'] ?? 0);
	WP_CLI::log('');
	WP_CLI::log("→ {$slug} ({$game['match']}) base \${$base}");

	if (!$apply) {
		foreach ($TIERS as $tier) {
			$price = lxi_round_money($base * $tier['mult']);
			WP_CLI::log("  [dry-run] {$tier['option']} → \${$price}");
		}
		continue;
	}

	$existing = lxi_find_by_slug($slug);
	if ($existing && !$update) {
		WP_CLI::log("  existe #{$existing} — passe (--update pour écraser)");
		$ids_out[] = $existing;
		continue;
	}

	$product = $existing ? new WC_Product_Variable($existing) : new WC_Product_Variable();
	$product->set_name(lxi_product_name($game));
	$product->set_status('publish');
	$product->set_catalog_visibility('visible');
	$product->set_description(
		sprintf(
			'<p><strong>%s</strong></p><p>%s vs %s</p><p>%s · %s</p><p>%s — %s</p>',
			esc_html($game['match']),
			esc_html($game['awayName']),
			esc_html($game['homeName']),
			esc_html($game['date']),
			esc_html($game['time'] ?? ''),
			esc_html($game['venue']),
			esc_html($game['city'] ?? '')
		)
	);
	$product->set_short_description(
		sprintf('%s · %s · %s', $game['match'], $game['venue'], $game['date'])
	);
	$product->set_slug($slug);
	if (!$existing) {
		$product->set_sku('lxi-' . $slug);
	}
	$product->set_category_ids([$cat_id]);
	$product->set_attributes([
		'pa_categoria' => [
			'name'         => 'pa_categoria',
			'value'        => '',
			'position'     => 0,
			'is_visible'   => 1,
			'is_variation' => 1,
			'is_taxonomy'  => 1,
			'options'      => array_map(function ($t) {
				$term = get_term_by('name', $t['option'], 'pa_categoria');
				return $term ? (int) $term->term_id : 0;
			}, $TIERS),
		],
	]);

	// Attributs Woo (API objet)
	$attribute = new WC_Product_Attribute();
	$attribute->set_id($attr_id);
	$attribute->set_name('pa_categoria');
	$attribute->set_options(array_column($TIERS, 'option'));
	$attribute->set_visible(true);
	$attribute->set_variation(true);
	$product->set_attributes([$attribute]);

	$id = $product->save();
	update_post_meta($id, '_lxi_slug', $slug);
	update_post_meta($id, '_lxi_match', $game['match'] ?? '');
	update_post_meta($id, '_lxi_away', $game['away'] ?? '');
	update_post_meta($id, '_lxi_home', $game['home'] ?? '');
	update_post_meta($id, '_lxi_away_name', $game['awayName'] ?? '');
	update_post_meta($id, '_lxi_home_name', $game['homeName'] ?? '');
	update_post_meta($id, '_lxi_date', $game['date'] ?? '');
	update_post_meta($id, '_lxi_time', $game['time'] ?? '');
	update_post_meta($id, '_lxi_venue', $game['venue'] ?? '');
	update_post_meta($id, '_lxi_city', $game['city'] ?? '');
	update_post_meta($id, '_lxi_stadium', $game['stadium'] ?? '');
	update_post_meta($id, '_lxi_type', $game['type'] ?? '');
	update_post_meta($id, '_lxi_kind', $game['kind'] ?? 'nfl');
	update_post_meta($id, '_lxi_base_price', (string) $base);

	wp_set_object_terms($id, array_column($TIERS, 'option'), 'pa_categoria');

	$data_store = $product->get_data_store();
	$children   = $product->get_children();
	$by_option  = [];
	foreach ($children as $vid) {
		$v = wc_get_product($vid);
		if (!$v) {
			continue;
		}
		$attrs = $v->get_attributes();
		$opt   = $attrs['pa_categoria'] ?? ($attrs['Categoria'] ?? '');
		if ($opt) {
			$by_option[strtolower($opt)] = $v;
		}
	}

	foreach ($TIERS as $tier) {
		$price = (string) lxi_round_money($base * $tier['mult']);
		$key   = strtolower($tier['option']);
		$var   = $by_option[$key] ?? new WC_Product_Variation();
		$var->set_parent_id($id);
		$var->set_regular_price($price);
		$var->set_manage_stock(true);
		$var->set_stock_quantity($tier['stock']);
		$var->set_stock_status('instock');
		$var->set_sku('lxi-' . $slug . '-' . $key);
		$var->set_attributes(['pa_categoria' => $tier['option']]);
		$vid = $var->save();
		update_post_meta($vid, '_lxi_tier', $key);
		WP_CLI::log("  {$tier['option']} #{$vid} → \${$price}");
	}

	WC_Product_Variable::sync($id);
	$ids_out[] = $id;
	WP_CLI::success("produit #{$id}");
}

if ($ids_out) {
	WP_CLI::log('');
	WP_CLI::log('WOOCOMMERCE_MATCH_IDS=' . implode(',', $ids_out));
}
if (!$apply) {
	WP_CLI::log('Relance avec --apply pour créer les produits.');
}
