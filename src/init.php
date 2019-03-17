<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function wp_plugin_info_card_cgb_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'wp_plugin_info_card-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'wp_plugin_info_card_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function wp_plugin_info_card_cgb_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'wp_plugin_info_card-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		WPPIC_VERSION,
		true // Enqueue the script in the footer.
	);
	wp_localize_script( 'wp_plugin_info_card-cgb-block-js', 'wppic', array(
		'rest_url' => get_rest_url()
	) );

	// Styles.
	wp_enqueue_style(
		'wp_plugin_info_card-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ),
		WPPIC_VERSION,
		'all'
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'wp_plugin_info_card_cgb_editor_assets' );

function wppic_register_block() {
	register_block_type( 'wp-plugin-info-card/wp-plugin-info-card', array(
		'attributes' => array(
			'type' => array(
				'type' => 'string',
				'default' => 'theme',
			),
			'slug' => array(
				'type' => 'string',
				'default' => ''
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => true
			),
			'html' => array(
				'type' => 'string',
				'default' => '',
			),
			'align' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'image' => array(
				'type' => 'string',
				'default' => ''
			),
			'containerid' => array(
				'type' => 'string',
				'default' => ''
			),
			'margin' => array(
				'type' => 'string',
				'default' => ''
			),
			'clear' => array(
				'type' => 'string',
				'default' => 'none',
			),
			'expiration' => array(
				'type' => 'int',
				'default' => 0
			),
			'ajax' => array(
				'type' => 'string',
				'default' => 'false'
			),
			'scheme' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'card',
			),
			'custom' => array(
				'type' => 'string',
				'default' => ''
			),
			'width' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'render_callback' => 'wppic_block_editor',
	) );
}
function wppic_block_editor( $attributes ) {
	if ( is_admin() ) return;
	$args = array(
		'type' => $attributes['type'],
		'slug' => $attributes['slug'],
		'align' => $attributes['align'],
		'image' => $attributes['image'],
		'containerid' => $attributes['containerid'],
		'margin' => $attributes['margin'],
		'clear' => $attributes['clear'],
		'expiration' => $attributes['expiration'],
		'ajax' => $attributes['ajax'],
		'scheme' => $attributes['scheme'],
		'layout' => $attributes['layout'],
		'custom' => $attributes['custom']
	);
	$html = '';
	if( '' !== $attributes['width'] ) {
		$html = sprintf( '<div class="wp-pic-full-width">%s</div>', wppic_shortcode_function( $args ) );
	} else {
		$html = wppic_shortcode_function( $args );
	}
	return $html;
}

add_action( 'init', 'wppic_register_block' );
