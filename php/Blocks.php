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
		add_filter( 'block_categories_all', array( $self, 'add_block_category' ), 10, 2 );

		// Ajax for retrieving screenshot presets.
		add_action( 'wp_ajax_wppic_load_screenshot_presets', array( $self, 'ajax_load_screenshot_presets' ) );

		// Ajax for saving screenshot presets.
		add_action( 'wp_ajax_wppic_save_screenshot_presets', array( $self, 'ajax_save_screenshot_presets' ) );

		// Ajax for overriding a screenshot preset.
		add_action( 'wp_ajax_wppic_override_screenshot_preset', array( $self, 'ajax_override_screenshot_preset' ) );

		// Ajax for editing a preset.
		add_action( 'wp_ajax_wppic_edit_screenshot_preset', array( $self, 'ajax_edit_screenshot_preset' ) );

		// Ajax for deleting a preset.
		add_action( 'wp_ajax_wppic_delete_screenshot_preset', array( $self, 'ajax_delete_preset' ) );

		return $self;
	}

	/**
	 * Edits a preset name.
	 */
	public function ajax_edit_screenshot_preset() {
		// Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'wppic_screenshot_preset_save' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get the preset title.
		$title = sanitize_text_field( filter_input( INPUT_POST, 'title', FILTER_DEFAULT ) );

		// Update the post title.
		wp_update_post(
			array(
				'ID'         => $preset_id,
				'post_title' => $title,
			)
		);

		// Retrieve all presets.
		$return = self::return_saved_presets();

		// Send json response.
		wp_send_json_success( array( 'presets' => $return ) );
	}
	/**
	 * Load screenshot presets via ajax.
	 */
	public function ajax_load_screenshot_presets() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'wppic_screenshot_preset_get' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		$return = self::return_saved_presets();

		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Load screenshot presets via ajax.
	 */
	public function ajax_save_screenshot_presets() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'wppic_screenshot_preset_save' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get form data in array form.
		$form_data = json_decode( filter_input( INPUT_POST, 'formData', FILTER_DEFAULT ), true );
		if ( ! empty( $form_data ) ) {
			$form_data = Functions::sanitize_array_recursive( $form_data );
		}

		// Get the preset title.
		$title           = isset( $form_data['presetTitle'] ) ? sanitize_text_field( $form_data['presetTitle'] ) : '';
		$title_sanitized = sanitize_title( $title );

		// Insert new post with preset data.
		$post_id = wp_insert_post(
			array(
				'post_title'   => $title,
				'post_name'    => $title_sanitized,
				'post_content' => wp_json_encode( array( 'formData' => $form_data ), 1048 ),
				'post_status'  => 'publish',
				'post_type'    => 'wppic_screen_presets',
			)
		);

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Load screenshot presets via ajax.
	 */
	public function ajax_override_screenshot_preset() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'wppic_screenshot_preset_save' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get form data in array form.
		$form_data = json_decode( filter_input( INPUT_POST, 'formData', FILTER_DEFAULT ), true );
		if ( ! empty( $form_data ) ) {
			$form_data = Functions::sanitize_array_recursive( $form_data );
		}

		// Get the preset ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT, FILTER_VALIDATE_INT ) );

		// Insert new post with preset data.
		wp_update_post(
			array(
				'id'           => $preset_id,
				'post_content' => wp_json_encode( array( 'formData' => $form_data ), 1048 ),
				'post_type'    => 'wppic_screen_presets',
			)
		);

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Return saved presets.
	 *
	 * @return array $return The saved presets.
	 */
	private static function return_saved_presets() {
		// Get the presets.
		$args    = array(
			'post_type'      => 'wppic_screen_presets',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'order'          => 'ASC',
			'orderby'        => 'title',
		);
		$presets = get_posts( $args );

		// Build the return array.
		$return = array();
		if ( $presets ) {
			foreach ( $presets as $preset ) {
				// Format content that is JSON into an array.
				$content  = json_decode( $preset->post_content, true ); // Decode JSON here, then $content will be re-encoded in the return array.
				$content  = Functions::sanitize_array_recursive( $content );
				$return[] = array(
					'id'           => $preset->ID,
					'title'        => $preset->post_title,
					'slug'         => $preset->post_name,
					'content'      => $content, // No need to escape here because it will be re-encoded in the return array.
					'delete_nonce' => wp_create_nonce( 'wppic_delete_screenshot_preset_' . $preset->ID ),
					'save_nonce'   => wp_create_nonce( 'wppic_save_screenshot_preset_' . $preset->ID ),
				);
			}
		}
		return $return;
	}

	/**
	 * Delete a preset and return all via Ajax.
	 */
	public static function ajax_delete_preset() {
		// Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'wppic_delete_screenshot_preset_' . $preset_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Remove the post.
		wp_delete_post( $preset_id, true );

		// Retrieve all presets.
		$return = self::return_saved_presets();

		// Send json response.
		wp_send_json_success( array( 'presets' => $return ) );
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

		wp_register_style(
			'wp-plugin-info-card-block-editor-css-inline',
			Functions::get_plugin_url( 'build/wppic-blocks.css' ),
			array(),
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
				'rest_url'                       => get_rest_url(),
				'query_preview'                  => Functions::get_plugin_url( 'assets/img/wp-query-preview.jpg' ),
				'wppic_preview'                  => Functions::get_plugin_url( 'assets/img/wp-pic-preview.jpg' ),
				'site_plugins_preview'           => Functions::get_plugin_url( 'assets/img/wppic-site-plugins.jpg' ),
				'screenshots_card_preview'       => Functions::get_plugin_url( 'assets/img/wp-pic-screenshots-preview.jpg' ),
				'wppic_plugin_icon_default'      => Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' ),
				'wppic_banner_default'           => Functions::get_plugin_url( 'assets/img/default-banner.png' ),
				'default_scheme'                 => $default_scheme,
				'default_layout'                 => $default_layout,
				'rest_nonce'                     => wp_create_nonce( 'wp_rest' ),
				'palette'                        => Functions::get_theme_color_palette(),
				'screenshot_preset_get_nonce'    => wp_create_nonce( 'wppic_screenshot_preset_get' ),
				'screenshot_preset_save_nonce'   => wp_create_nonce( 'wppic_screenshot_preset_save' ),
				'screenshot_preset_delete_nonce' => wp_create_nonce( 'wppic_screenshot_preset_delete' ),
				'can_edit_others_posts'          => current_user_can( 'edit_others_posts' ),
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
		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/SitePluginsCardGrid/block.json' ),
			array(
				'render_callback' => array( $this, 'site_plugin_card_grid_render' ),
			)
		);
		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/PluginScreenshotsInfoCard/block.json' ),
			array(
				'render_callback' => array( $this, 'site_plugin_screenshots' ),
			)
		);
	}

	/**
	 * Render callback for the plugin screenshots block.
	 *
	 * @param array $attributes Array of block attributes.
	 *
	 * @return string Block rendered.
	 */
	public function site_plugin_screenshots( $attributes = array() ) {
		if ( is_admin() ) {
			return;
		}
		$attributes = Functions::sanitize_array_recursive( $attributes );

		// Convert to underline case.
		$new_atts = array();
		foreach ( $attributes as $key => $value ) {
			$new_atts[ Functions::to_underlines( $key ) ] = $value;
		}

		add_action( 'wp_footer', array( static::class, 'footer_svgs' ) );

		return Shortcodes::shortcode_plugin_screenshots_info_card( $new_atts );
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
			'row_gap'     => $attributes['rowGap'],
			'col_gap'     => $attributes['colGap'],
			'itemSlugs'   => $attributes['itemSlugs'],
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
			$html = sprintf( '<div class="wp-pic-full-width">%s</div>', Shortcodes::shortcode_query_function( $args ) );
		} else {
			$html = Shortcodes::shortcode_query_function( $args );
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
			'id'          => $attributes['uniqueId'],
			'cols'        => $attributes['cols'],
			'col_gap'     => $attributes['colGap'],
			'row_gap'     => $attributes['rowGap'],
			'itemSlugs'   => $attributes['itemSlugs'],
		);

		$html = '';
		if ( '' !== $attributes['width'] ) {
			$html = sprintf( '<div class="wp-pic-full-width">%s</div>', Shortcodes::shortcode_function( $args ) );
		} else {
			$html = Shortcodes::shortcode_function( $args );
		}
		return $html;
	}

	/**
	 * Add block category for Plugin Info Card.
	 *
	 * @param array   $categories Array of existing categories.
	 * @param WP_Post $post Post object.
	 *
	 * @return array Array of categories.
	 */
	public function add_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'wp-plugin-info-card',
					'title' => __( 'WP Plugin Info Card', 'wp-plugin-info-card' ),
				),
			)
		);
	}

	/**
	 * Render the main info card block.
	 *
	 * @param array $attributes Array of block attributes.
	 *
	 * @return string Block rendered.
	 */
	public function site_plugin_card_grid_render( $attributes ) {
		if ( is_admin() ) {
			return;
		}

		$shortcode_atts = array(
			'id'        => $attributes['uniqueId'],
			'cols'      => $attributes['cols'],
			'col_gap'   => $attributes['colGap'],
			'row_gap'   => $attributes['rowGap'],
			'scheme'    => $attributes['scheme'],
			'align'     => $attributes['align'],
			'layout'    => $attributes['layout'],
			'itemSlugs' => $attributes['itemSlugs'],
		);
		return Shortcodes::shortcode_active_site_plugins_function( $shortcode_atts );
	}

	public static function footer_svgs() {
		?>
		<svg xmlns="http://www.w3.org/2000/svg" style="display:none; width: 0px; height: 0px; overflow: hidden;">
			<symbol id="lucide-code" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
			<symbol id="lucide-download-cloud xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></symbol>
			<symbol id="lucide-star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>
			<symbol id="lucide-line-chart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-line-chart"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></symbol>
			<sybmol id="lucide-download" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></symbol>
		<?php
	}
}
