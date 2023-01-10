<?php
/**
 * Set up the blocks and their attributes.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for registering blocks.
 */
class Blocks {
	/**
	 * Main class runner.
	 *
	 * @return Blocks.
	 */
	public function run() {
		$self = new self();

		add_action( 'enqueue_block_assets', array( $self, 'register_block_assets' ) );
		add_action( 'init', array( $self, 'register_blocks' ) );

		return $self;
	}

	/**
	 * Register any scripts/styles needed for blocks.
	 */
	public function register_block_assets() {
		wp_register_style(
			'wp-plugin-info-card-block-editor-css',
			Functions::get_plugin_url( 'dist/wppic-editor.css' ),
			array( 'wp-editor' ),
			Functions::get_plugin_version(),
			'all'
		);

		// Styles.
		wp_register_style(
			'wp-plugin-info-card-block-styles-css', // Handle.
			Functions::get_plugin_url( 'dist/wppic-styles.css' ), // Block editor CSS.
			array( 'wp-edit-blocks' ),
			Functions::get_plugin_version(),
			'all'
		);

		// Scripts.
		wp_register_script(
			'wp-plugin-info-card-block-js',
			Functions::get_plugin_url( 'build/wppic-blocks.js' ),
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			Functions::get_plugin_version(),
			true
		);
		$options = get_option( 'wppic_settings' );

		$default_scheme = isset( $options['colorscheme'] ) ? $options['colorscheme'] : 'default';
		$default_layout = isset( $options['default_layout'] ) ? $options['default_layout'] : 'card';
		wp_localize_script(
			'wp-plugin-info-card-block-js',
			'wppic',
			array(
				'rest_url'             => get_rest_url(),
				'query_preview'        => Functions::get_plugin_url( 'img/wp-query-preview.jpg' ),
				'wppic_preview'        => Functions::get_plugin_url( 'img/wp-pic-preview.jpg' ),
				'wppic_banner_default' => Functions::get_plugin_url( 'img/default-banner.png' ),
				'default_scheme'       => $default_scheme,
				'default_layout'       => $default_layout,
			)
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'wp-plugin-info-card-block-js', 'wp-plugin-info-card' );
		}
	}

	/**
	 * Register any blocks.
	 */
	public function register_blocks() {
		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/PluginInfoCard/block.json' ),
			array(
				'render_callback' => array( $this, 'info_card_render' ),
			)
		);
		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/PluginInfoCardQuery/block.json' ),
			array(
				'render_callback' => array( $this, 'info_card_query_render' ),
			)
		);
	}

	/**
	 * Render the info card query block.
	 *
	 * @param array $attributes Array of attributes.
	 *
	 * @return string Block rendered.
	 */
	public function info_card_query_render( $attributes ) {
		if ( is_admin() ) {
			return;
		}
		$args = array(
			'cols'        => $attributes['cols'],
			'per_page'    => $attributes['per_page'],
			'type'        => $attributes['type'],
			'align'       => $attributes['align'],
			'image'       => $attributes['image'],
			'containerid' => $attributes['containerid'],
			'margin'      => $attributes['margin'],
			'clear'       => $attributes['clear'],
			'expiration'  => $attributes['expiration'],
			'ajax'        => $attributes['ajax'],
			'scheme'      => $attributes['scheme'],
			'layout'      => $attributes['layout'],
			'sortby'      => $attributes['sortby'],
			'sort'        => $attributes['sort'],
		);
		if ( ! empty( $attributes['browse'] ) ) {
			$args['browse'] = $attributes['browse'];
		}
		if ( ! empty( $attributes['search'] ) ) {
			$args['search'] = $attributes['search'];
		}
		if ( ! empty( $attributes['tag'] ) ) {
			$args['tag'] = $attributes['tag'];
		}
		if ( ! empty( $attributes['user'] ) ) {
			$args['user'] = $attributes['user'];
		}
		if ( ! empty( $attributes['author'] ) ) {
			$args['author'] = $attributes['author'];
		}
		$html = '';
		if ( '' !== $attributes['width'] ) {
			$html = sprintf( '<div class="wp-pic-full-width">%s</div>', wppic_shortcode_query_function( $args ) );
		} else {
			$html = wppic_shortcode_query_function( $args );
		}
		return $html;
	}

	/**
	 * Render the main info card block.
	 *
	 * @param array $attributes Array of block attributes.
	 *
	 * @return string Block rendered.
	 */
	public function info_card_render( $attributes ) {
		if ( is_admin() ) {
			return;
		}
		$args = array(
			'type'        => $attributes['type'],
			'slug'        => $attributes['slug'],
			'align'       => $attributes['align'],
			'image'       => $attributes['image'],
			'containerid' => $attributes['containerid'],
			'margin'      => $attributes['margin'],
			'clear'       => $attributes['clear'],
			'expiration'  => $attributes['expiration'],
			'ajax'        => $attributes['ajax'],
			'scheme'      => $attributes['scheme'],
			'layout'      => $attributes['layout'],
			'multi'       => true,
		);
		$html = '';
		if ( '' !== $attributes['width'] ) {
			$html = sprintf( '<div class="wp-pic-full-width">%s</div>', wppic_shortcode_function( $args ) );
		} else {
			$html = wppic_shortcode_function( $args );
		}
		return $html;
	}
}
