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
			array(),
			Functions::get_plugin_version(),
			'all'
		);

		wp_register_style(
			'wppic-github-info-card',
			Functions::get_plugin_url( 'dist/github-info-card.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_register_style(
			'wppic-badges',
			Functions::get_plugin_url( 'dist/badges.css' ),
			array( 'dashicons' ),
			Functions::get_plugin_version(),
			'all'
		);

		$block_deps = require Functions::get_plugin_dir( 'build/wppic-blocks.asset.php' );
		// Scripts.
		wp_register_script(
			'wp-plugin-info-card-block-js',
			Functions::get_plugin_url( 'build/wppic-blocks.js' ),
			$block_deps['dependencies'],
			$block_deps['version'],
			true
		);
		$options = get_option( 'wppic_settings' );

		$default_scheme = isset( $options['colorscheme'] ) ? $options['colorscheme'] : 'default';
		$default_layout = isset( $options['default_layout'] ) ? $options['default_layout'] : 'card';
		wp_localize_script(
			'wp-plugin-info-card-block-js',
			'wppic',
			array(
				'rest_url'                       => Functions::get_rest_url(),
				'query_preview'                  => Functions::get_plugin_url( 'assets/img/wp-query-preview.jpg' ),
				'wppic_preview'                  => Functions::get_plugin_url( 'assets/img/wp-pic-preview.jpg' ),
				'site_plugins_preview'           => Functions::get_plugin_url( 'assets/img/wppic-site-plugins.jpg' ),
				'screenshots_card_preview'       => Functions::get_plugin_url( 'assets/img/wp-pic-screenshots-preview.jpg' ),
				'wppic_plugin_icon_default'      => Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' ),
				'wppic_banner_default'           => Functions::get_plugin_url( 'assets/img/default-banner.png' ),
				'github_items_preview'           => Functions::get_plugin_url( 'assets/img/wp-github-item-preview.jpg' ),
				'github_items_grid_preview'      => Functions::get_plugin_url( 'assets/img/wp-github-item-grid-preview.jpg' ),

				'default_scheme'                 => $default_scheme,
				'default_layout'                 => $default_layout,
				'rest_nonce'                     => wp_create_nonce( 'wp_rest' ),
				'palette'                        => Functions::get_theme_color_palette(),
				'screenshot_preset_get_nonce'    => wp_create_nonce( 'wppic_screenshot_preset_get' ),
				'screenshot_preset_save_nonce'   => wp_create_nonce( 'wppic_screenshot_preset_save' ),
				'screenshot_preset_delete_nonce' => wp_create_nonce( 'wppic_screenshot_preset_delete' ),
				'can_edit_others_posts'          => current_user_can( 'edit_others_posts' ),
				'can_manage_options'             => current_user_can( 'manage_options' ),
				'is_github_info_cards_enabled'   => Options::is_github_info_cards_enabled(),
				'default_github_avatar'          => Functions::get_plugin_url( 'assets/img/default-github-avatar.png' ),
			)
		);

		wp_localize_script(
			'wp-plugin-info-card-block-js',
			'wppicAdminCustomPlugin',
			array(
				'importPluginRestUrl' => Functions::get_rest_url( null, 'wppic/v1/custom-plugins/import-from-rest' ),
				'restNonce'           => wp_create_nonce( 'wp_rest' ),
			)
		);

		$fancybox_deps = require Functions::get_plugin_dir( 'dist/wppic-fancybox.asset.php' );
		if ( is_admin() ) {
			/**
			 * This will load outside the iframe, and within it. It also loads on the frontend in a separate file (Shortcodes.php)
			 * This is used for the plugin screenshots block.
			 */
			wp_enqueue_script(
				'wppic-fancybox-js',
				Functions::get_plugin_url( '/dist/wppic-fancybox.js' ),
				$fancybox_deps['dependencies'],
				$fancybox_deps['version'],
				true
			);
		}

		/**
		 * This will load outside the iframe, and within it. It also loads on the frontend in a separate file (Shortcodes.php).
		 * This is used for the plugin screenshots block.
		 */
		wp_register_style(
			'wppic-fancybox-css',
			Functions::get_plugin_url( '/dist/wppic-fancybox-css.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'wp-plugin-info-card-block-js', 'wp-plugin-info-card' );
		}
	}

	/**
	 * Register any blocks.
	 */
	public function register_blocks() {

		$render_callbacks = array(
			'wp-plugin-info-card/wp-plugin-info-card'    => array( $this, 'info_card_render' ),
			'wp-plugin-info-card/wp-plugin-info-card-query' => array( $this, 'info_card_query_render' ),
			'wp-plugin-info-card/site-plugins-card-grid' => array( $this, 'site_plugin_card_grid_render' ),
			'wp-plugin-info-card/plugin-screenshots-info-card' => array( $this, 'site_plugin_screenshots' ),
			'wp-plugin-info-card/github-info-card-grid'  => array( $this, 'github_info_card_grid_render' ),
			'wp-plugin-info-card/github-info-card'       => array( $this, 'github_info_card_render' ),
			'wp-plugin-info-card/profile-highlights-badges' => array( $this, 'profile_badges_render' ),
		);

		add_filter(
			'block_type_metadata_settings',
			function ( $settings, $metadata ) use ( $render_callbacks ) {
				if ( isset( $render_callbacks[ $metadata['name'] ] ) ) {
					$settings['render_callback'] = $render_callbacks[ $metadata['name'] ];
				}
				return $settings;
			},
			10,
			2
		);

		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( Functions::get_plugin_dir( 'build/blocks' ), Functions::get_plugin_dir( 'build/blocks-manifest.php' ) );
		} else {
			if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
				wp_register_block_metadata_collection( Functions::get_plugin_dir( 'build' ), Functions::get_plugin_dir( 'build/blocks-manifest.php' ) );
			}
			$manifest_data = require Functions::get_plugin_dir( 'build/blocks-manifest.php' );
			foreach ( array_keys( $manifest_data ) as $block_type ) {
				register_block_type( __DIR__ . "/build/blocks/{$block_type}" );
			}
		}

		// If github info cards are disabled, unregister the github info card block.
		if ( ! Options::is_github_info_cards_enabled() ) {
			unregister_block_type( 'wp-plugin-info-card/github-info-card' );
			unregister_block_type( 'wp-plugin-info-card/github-info-card-grid' );
		}
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
			'type'                => $attributes['type'],
			'slug'                => $attributes['slug'],
			'align'               => $attributes['align'],
			'image'               => $attributes['image'],
			'containerid'         => $attributes['containerid'],
			'margin'              => $attributes['margin'],
			'clear'               => $attributes['clear'],
			'expiration'          => $attributes['expiration'],
			'ajax'                => $attributes['ajax'],
			'scheme'              => $attributes['scheme'],
			'layout'              => $attributes['layout'],
			'multi'               => true,
			'id'                  => $attributes['uniqueId'],
			'cols'                => $attributes['cols'],
			'col_gap'             => $attributes['colGap'],
			'row_gap'             => $attributes['rowGap'],
			'itemSlugs'           => $attributes['itemSlugs'],
			'marginSpacing'       => $attributes['marginSpacing'],
			'marginSpacingTarget' => $attributes['marginSpacingTarget'],
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
			<symbol id="lucide-download-cloud" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></symbol>
			<symbol id="lucide-star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>
			<symbol id="lucide-line-chart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-line-chart"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></symbol>
			<sybmol id="lucide-download" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></symbol>
		<?php
	}

	/**
	 * Render the GitHub info card grid block.
	 *
	 * @param array $attributes Array of block attributes.
	 *
	 * @return string Block rendered.
	 */
	public function github_info_card_grid_render( $attributes, $content ) {
		if ( is_admin() || defined( 'REST_REQUEST' ) ) {
			return;
		}

		$align                   = Functions::sanitize_attribute( $attributes, 'align', 'string' );
		$horizontal_align        = Functions::sanitize_attribute( $attributes, 'horizontalAlign', 'string' );
		$num_children            = Functions::sanitize_attribute( $attributes, 'numChildren', 'integer' );
		$class_name              = Functions::sanitize_attribute( $attributes, 'className', 'string' );
		$unique_id               = Functions::sanitize_attribute( $attributes, 'uniqueId', 'string' );
		$col_gap                 = Functions::sanitize_attribute( $attributes, 'colGap', 'integer' );
		$row_gap                 = Functions::sanitize_attribute( $attributes, 'rowGap', 'integer' );
		$background_color        = Functions::sanitize_attribute( $attributes, 'backgroundColor', 'string' );
		$text_color              = Functions::sanitize_attribute( $attributes, 'textColor', 'string' );
		$icon_color              = Functions::sanitize_attribute( $attributes, 'iconColor', 'string' );
		$icon_color_hover        = Functions::sanitize_attribute( $attributes, 'iconColorHover', 'string' );
		$border_color            = Functions::sanitize_attribute( $attributes, 'borderColor', 'string' );
		$language_bg_color       = Functions::sanitize_attribute( $attributes, 'languageBgColor', 'string' );
		$language_text_color     = Functions::sanitize_attribute( $attributes, 'languageTextColor', 'string' );
		$sponsors_color          = Functions::sanitize_attribute( $attributes, 'sponsorsColor', 'string' );
		$button_bg_color         = Functions::sanitize_attribute( $attributes, 'buttonBgColor', 'string' );
		$button_bg_color_hover   = Functions::sanitize_attribute( $attributes, 'buttonBgColorHover', 'string' );
		$button_text_color       = Functions::sanitize_attribute( $attributes, 'buttonTextColor', 'string' );
		$button_text_color_hover = Functions::sanitize_attribute( $attributes, 'buttonTextColorHover', 'string' );
		$layout                  = Functions::sanitize_attribute( $attributes, 'layout', 'string' );
		$cols                    = Functions::sanitize_attribute( $attributes, 'cols', 'integer' );
		$margin_spacing          = Functions::sanitize_attribute( $attributes, 'marginSpacing', 'string' );
		$margin_spacing_target   = Functions::sanitize_attribute( $attributes, 'marginSpacingTarget', 'string' );

		ob_start();

		$wrapper_classes = array(
			'wppic-github-info-card-grid',
			'align' . $align,
			'horizontal-align-' . $horizontal_align,
			'layout-' . $layout,
			'cols-' . ( $num_children > 1 ? $cols : 1 ),
			'wppic-margin-spacing-' . $margin_spacing,
			'wppic-margin-spacing-target-' . $margin_spacing_target,
			$class_name,
		);

		?>
		<div class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>" id="<?php echo esc_attr( $unique_id ); ?>">
			<style>
				<?php
				if ( $num_children > 1 ) {
					?>
					#<?php echo esc_attr( $unique_id ); ?> .wppic-github-info-card-grid {
						column-gap: <?php echo esc_attr( $col_gap ); ?>px;
						row-gap: <?php echo esc_attr( $row_gap ); ?>px;
					}
					<?php
				}
				?>
				#<?php echo esc_attr( $unique_id ); ?> {
					--wppic-grid-col-gap: <?php echo esc_attr( $col_gap ); ?>px;
					--wppic-grid-row-gap: <?php echo esc_attr( $row_gap ); ?>px;
				}
				<?php
				if ( 'is-style-wppic-github-custom' === $class_name ) {
					?>
				#<?php echo esc_attr( $unique_id ); ?> {
					--wppic-github-background-color: <?php echo esc_attr( $background_color ); ?>;
					--wppic-github-text-color: <?php echo esc_attr( $text_color ); ?>;
					--wppic-github-icon-color: <?php echo esc_attr( $icon_color ); ?>;
					--wppic-github-icon-color-hover: <?php echo esc_attr( $icon_color_hover ); ?>;
					--wppic-github-border: <?php echo esc_attr( $border_color ); ?>;
					--wppic-github-language-bg: <?php echo esc_attr( $language_bg_color ); ?>;
					--wppic-github-language-color: <?php echo esc_attr( $language_text_color ); ?>;
					--wppic-github-sponsors-color: <?php echo esc_attr( $sponsors_color ); ?>;
					--wppic-github-button-bg: <?php echo esc_attr( $button_bg_color ); ?>;
					--wppic-github-button-bg-hover: <?php echo esc_attr( $button_bg_color_hover ); ?>;
					--wppic-github-button-text-color: <?php echo esc_attr( $button_text_color ); ?>;
					--wppic-github-button-text-color-hover: <?php echo esc_attr( $button_text_color_hover ); ?>;
					}
					<?php
				}
				?>
			</style>
			<?php
			echo wp_kses( $content, Functions::get_kses_allowed_html() );
			?>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Render the GitHub info card block.
	 *
	 * @param array    $attributes Array of block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block object.
	 *
	 * @return string Block rendered.
	 */
	public function github_info_card_render( $attributes, $content, $block ) {
		if ( is_admin() || defined( 'REST_REQUEST' ) ) {
			return;
		}

		// Gather attributes from context.
		$block_attributes                         = array();
		$block_attributes['numChildren']          = $block->context['wppic/github-grid-numChildren'];
		$block_attributes['cols']                 = $block->context['wppic/github-grid-cols'];
		$block_attributes['colGap']               = $block->context['wppic/github-grid-colGap'];
		$block_attributes['rowGap']               = $block->context['wppic/github-grid-rowGap'];
		$block_attributes['marginSpacing']        = $block->context['wppic/github-grid-marginSpacing'];
		$block_attributes['marginSpacingTarget']  = $block->context['wppic/github-grid-marginSpacingTarget'];
		$block_attributes['backgroundColor']      = $block->context['wppic/github-grid-backgroundColor'];
		$block_attributes['textColor']            = $block->context['wppic/github-grid-textColor'];
		$block_attributes['iconColor']            = $block->context['wppic/github-grid-iconColor'];
		$block_attributes['iconColorHover']       = $block->context['wppic/github-grid-iconColorHover'];
		$block_attributes['borderColor']          = $block->context['wppic/github-grid-borderColor'];
		$block_attributes['languageBgColor']      = $block->context['wppic/github-grid-languageBgColor'];
		$block_attributes['languageTextColor']    = $block->context['wppic/github-grid-languageTextColor'];
		$block_attributes['sponsorsColor']        = $block->context['wppic/github-grid-sponsorsColor'];
		$block_attributes['buttonBgColor']        = $block->context['wppic/github-grid-buttonBgColor'];
		$block_attributes['buttonBgColorHover']   = $block->context['wppic/github-grid-buttonBgColorHover'];
		$block_attributes['buttonTextColor']      = $block->context['wppic/github-grid-buttonTextColor'];
		$block_attributes['buttonTextColorHover'] = $block->context['wppic/github-grid-buttonTextColorHover'];
		$block_attributes['layout']               = $block->context['wppic/github-grid-layout'];
		$block_attributes['align']                = $block->context['wppic/github-grid-align'];
		$block_attributes['uniqueId']             = $block->context['wppic/github-grid-uniqueId'];
		$block_attributes['showTopBar']           = $block->context['wppic/github-grid-showTopBar'];
		$block_attributes['showAuthorBar']        = $block->context['wppic/github-grid-showAuthorBar'];
		$block_attributes['showStatsBar']         = $block->context['wppic/github-grid-showStatsBar'];
		$block_attributes['showLastUpdated']      = $block->context['wppic/github-grid-showLastUpdated'];
		$block_attributes['parentButtonType']     = $block->context['wppic/github-grid-buttonType'];

		// Now merge the attributes.
		$attributes = array_merge( $attributes, $block_attributes );

		// Remove assetData from attributes.
		unset( $attributes['assetData'] );

		// Now render the block.
		$html = Shortcodes::shortcode_github_info_card( $attributes );

		return $html;
	}

	/**
	 * Render the Profile Badges block.
	 *
	 * @param array    $attributes Array of block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block object.
	 *
	 * @return string Block rendered.
	 */
	public function profile_badges_render( $attributes, $content, $block ) {
		if ( is_admin() || defined( 'REST_REQUEST' ) ) {
			return;
		}

		// Gather attributes from context.
		$block_attributes                 = array();
		$block_attributes['uniqueId']     = Functions::sanitize_attribute( $attributes, 'uniqueId', 'string' );
		$block_attributes['anchor']       = Functions::sanitize_attribute( $attributes, 'anchor', 'string' );
		$block_attributes['align']        = Functions::sanitize_attribute( $attributes, 'align', 'string' );
		$block_attributes['authorSlug']   = Functions::sanitize_attribute( $attributes, 'authorSlug', 'string' );
		$block_attributes['baseSize']     = Functions::sanitize_attribute( $attributes, 'baseSize', 'integer' );
		$block_attributes['badges']       = Functions::sanitize_attribute( $attributes, 'badges', 'array' );
		$block_attributes['lastUpdated']  = Functions::sanitize_attribute( $attributes, 'lastUpdated', 'string' );
		$block_attributes['colGap']       = Functions::sanitize_attribute( $attributes, 'colGap', 'integer' );
		$block_attributes['rowGap']       = Functions::sanitize_attribute( $attributes, 'rowGap', 'integer' );
		$block_attributes['cols']         = Functions::sanitize_attribute( $attributes, 'cols', 'integer' );
		$block_attributes['layout']       = Functions::sanitize_attribute( $attributes, 'layout', 'string' );
		$block_attributes['headingColor'] = Functions::sanitize_attribute( $attributes, 'headingColor', 'string' );

		// Get wrapper attributes / styles / classes.
		$wrapper_classes    = array(
			'wppic-badges-grid',
			'is-grid',
			'layout-' . $block_attributes['layout'],
			'cols-' . $block_attributes['cols'],
		);
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => implode( ' ', $wrapper_classes ),
			)
		);

		// Get unique ID.
		$unique_id = $block_attributes['anchor'] ? $block_attributes['anchor'] : $block_attributes['uniqueId'];

		// Generate grid styles.
		$grid_styles = sprintf(
			'#%1$s.wppic-badges-grid {' . PHP_EOL .
			'	--wppic-grid-row-gap: %2$spx;' . PHP_EOL .
			'	--wppic-grid-col-gap: %3$spx;' . PHP_EOL .
			'	--wppic-base-size: %4$spx;' . PHP_EOL .
			'	--wppic-heading-color: %5$s;' . PHP_EOL .
			'}',
			esc_attr( $unique_id ),
			esc_attr( $block_attributes['rowGap'] ),
			esc_attr( $block_attributes['colGap'] ),
			esc_attr( $block_attributes['baseSize'] ),
			esc_attr( $block_attributes['headingColor'] )
		);
		ob_start();
		?>
		<div <?php echo wp_kses_post( $wrapper_attributes ); ?> id="<?php echo esc_attr( $unique_id ); ?>">
			<style><?php echo esc_html( $grid_styles ); ?></style>
			<div class="wppic-badges-grid">
				test
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
