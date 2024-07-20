<?php
/**
 * Set up the shortcodes and its output.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for for shortcode functionality.
 */
class Shortcodes {

	/**
	 * Main class runner.
	 *
	 * @return Admin.
	 */
	public function run() {
		$self = new self();

		add_action( 'wp_enqueue_scripts', array( $self, 'print_scripts' ) );
		add_action( 'wppic_enqueue_scripts', array( $self, 'enqueue_scripts' ) );
		add_action( 'rest_api_init', array( $self, 'register_rest_routes' ) );
		add_shortcode( 'wp-pic', array( static::class, 'shortcode_function' ) );
		add_shortcode( 'wp-pic-query', array( static::class, 'shortcode_query_function' ) );
		add_shortcode( 'wp-pic-site-plugins', array( static::class, 'shortcode_active_site_plugins_function' ) );
		add_shortcode( 'wp-pic-plugin-screenshots', array( static::class, 'shortcode_plugin_screenshots_info_card' ) );
		add_action( 'wp_ajax_async_wppic_shortcode_content', array( static::class, 'shortcode_content' ) );
		add_action( 'wp_ajax_nopriv_async_wppic_shortcode_content', array( static::class, 'shortcode_content' ) );
		add_action( 'init', array( static::class, 'register_screenshots_presets_post_type' ) );
		return $self;
	}

	/**
	 * Register plugin screenshots post type.
	 */
	public static function register_screenshots_presets_post_type() {
		$labels = array(
			'name'               => __( 'Presets', 'wp-plugin-info-card' ),
			'singular_name'      => __( 'Presets', 'wp-plugin-info-card' ),
			'add_new'            => __( 'Add New', 'wp-plugin-info-card' ),
			'add_new_item'       => __( 'Add New Preset', 'wp-plugin-info-card' ),
			'edit_item'          => __( 'Edit Preset', 'wp-plugin-info-card' ),
			'new_item'           => __( 'New Preset', 'wp-plugin-info-card' ),
			'all_items'          => __( 'All Presets', 'wp-plugin-info-card' ),
			'view_item'          => __( 'View Preset', 'wp-plugin-info-card' ),
			'search_items'       => __( 'Search Presets', 'wp-plugin-info-card' ),
			'not_found'          => __( 'No Presets found', 'wp-plugin-info-card' ),
			'not_found_in_trash' => __( 'No Presets found in Trash', 'wp-plugin-info-card' ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Presets', 'wp-plugin-info-card' ),
		);

		$args = array(
			'labels'                  => $labels,
			'public'                  => false,
			'publicly_queryable'      => false,
			'show_ui'                 => false,
			'show_in_menu'            => false,
			'query_var'               => false,
			'rewrite'                 => false,
			'dlx_photo_block_archive' => false,
			'hierarchical'            => false,
		);

		register_post_type( 'wppic_screen_presets', $args );
	}

	/**
	 * Enqueue scripts on the frontend.
	 */
	public function enqueue_scripts() {
		$min_or_not = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_style( 'dashicons' ); // for the star ratings.
		wp_enqueue_style(
			'wppic-style',
			Functions::get_plugin_url( 'dist/wppic-styles.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_print_styles( array( 'dashicons', 'wppic-style' ) );
		wp_enqueue_script(
			'wppic-script',
			Functions::get_plugin_url( 'assets/js/wppic-script' . $min_or_not . '.js' ),
			array( 'jquery' ),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'wppic-script',
			'wppicAjax',
			array(
				'ajaxurl' => admin_url( 'admin-ajax.php' ),
			)
		);
		wp_print_scripts( 'wppic-script' );

		/**
		 * Add icons to footer for plugin card.
		 */
		add_action( 'wp_footer', array( __CLASS__, 'add_icons_to_footer' ) );
	}

	/**
	 * Add scripts/styles to the footer.
	 */
	public function print_scripts() {
		$options = Options::get_options();

		if ( isset( $options['enqueue'] ) && true === $options['enqueue'] ) {
			if ( 0 === did_action( 'wppic_enqueue_scripts' ) ) {
				do_action( 'wppic_enqueue_scripts' );
			}
		}
	}

	/**
	 * Register route for getting plugin shortcode
	 *
	 * @since 3.0.0
	 */
	public function register_rest_routes() {
		register_rest_route(
			'wppic/v1',
			'/get_html',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_base_shortcode' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'wppic/v2',
			'/get_data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_asset_data' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'wppic/v1',
			'/get_query',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_query_shortcode' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'wppic/v2',
			'/get_query',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_query_shortcode_v2' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'wppic/v2',
			'/get_site_plugins',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_site_plugin_data' ),
				'permission_callback' => array( $this, 'rest_check_permissions' ),
			)
		);
	}

	/**
	 * Get plugin data for return.
	 *
	 * @param array $request Request data.
	 */
	public function get_site_plugin_data( $request ) {
		// Get plugin data for active plugins.
		$plugins_on_org = Functions::get_active_plugins_with_data();

		// Get pagination.
		$per_page = 5;
		$page     = isset( $request['page'] ) ? absint( $request['page'] ) : 1;

		// Get plugins for page.
		$more_results   = true;
		$return_plugins = array_slice( $plugins_on_org, ( $page - 1 ) * $per_page, $per_page );
		if ( empty( $return_plugins ) ) {
			$more_results = false;
		}

		// Query plugins and return.
		foreach ( $return_plugins as $file => $plugin_data ) {
			$return_plugins[ $file ] = wppic_api_parser( 'plugin', $plugin_data['slug'], HOUR_IN_SECONDS );
		}

		// Get next page.
		$next_page = $page + 1;

		// Get percentage processed with page and per_page calculation.
		$percentage = ( ( $page * $per_page ) / count( $plugins_on_org ) ) * 100;
		if ( $percentage > 100 ) {
			$percentage = 100;
		}

		$return_plugins = json_decode( json_encode( $return_plugins ) );

		// Get .org plugins.
		wp_send_json_success(
			array(
				'page'                => absint( $next_page ),
				'more_results'        => $more_results,
				'plugins'             => $return_plugins,
				'num_plugins'         => count( $plugins_on_org ),
				'percentage_complete' => $percentage,
			)
		);
	}

	/**
	 * Get EDD plugin data for return.
	 *
	 * @param array $request Request data.
	 */
	protected function get_edd_plugin_downloads( $request ) {
		// Get plugin data for active plugins.
		if ( ! Functions::is_edd_installed() || ! function_exists( 'edd_get_download' ) ) {
			wp_send_json_error( array( 'message' => 'No plugins found.' ) );
		}

		// Get options and check if EDD is enabled.
		$options = Options::get_options();

		// Check if EDD is enabled.
		if ( ! (bool) $options['enable_edd'] ) {
			wp_send_json_error( array( 'message' => 'No plugins found.' ) );
		}

		// Get pagination.
		$per_page = 5;
		$page     = isset( $request['page'] ) ? absint( $request['page'] ) : 1;
		$order_by = isset( $request['orderby'] ) ? sanitize_text_field( $request['orderby'] ) : 'title';
		$order    = isset( $request['order'] ) ? sanitize_text_field( $request['order'] ) : 'ASC';

		$edd_query_args = array(
			'post_type'      => 'download',
			'posts_per_page' => $per_page,
			'paged'          => $page,
			'meta_query'     => array(
				array(
					'key'     => '_edd_sl_enabled',
					'value'   => '1',
					'compare' => '=',
				),
			),
			'orderby'        => $order_by,
			'order'          => $order,
		);

		$edd_query = new \WP_Query( $edd_query_args );

		// Return early if no posts found.
		if ( ! $edd_query->have_posts() ) {
			\wp_send_json_success(
				array(
					'page'                => 1,
					'more_results'        => false,
					'plugins'             => array(),
					'num_plugins'         => 0,
					'percentage_complete' => 100,
				)
			);
		}

		// Get download IDs.
		$download_ids = wp_list_pluck( $edd_query->posts, 'ID' );

		// Gather downloads.
		$downloads = array();
		foreach ( $download_ids as $download_id ) {
			$download                          = \edd_get_download( $download_id );
			$downloads[ $download->post_name ] = wppic_api_parser( 'plugin', $download->post_name, HOUR_IN_SECONDS );
		}

		// Get next page.
		$next_page = $page + 1;

		// Get percentage processed with page and per_page calculation.
		$percentage = ( ( $page * $per_page ) / $edd_query->max_num_pages ) * 100;
		if ( $percentage > 100 ) {
			$percentage = 100;
		}

		$return_plugins = json_decode( json_encode( $downloads ) );

		// Get .org plugins.
		wp_send_json_success(
			array(
				'page'                => absint( $next_page ),
				'more_results'        => true,
				'plugins'             => $return_plugins,
				'num_plugins'         => $edd_query->max_num_pages,
				'percentage_complete' => $percentage,
			)
		);
	}

	/**
	 * Check if user has access to REST API.
	 */
	public function rest_check_permissions() {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Check if user has access to REST API for retrieving and sideloading images.
	 */
	public function rest_image_sideload_permissions() {
		return current_user_can( 'publish_posts' );
	}

	/**
	 * Get the main (plugin info card) shortcode.
	 */
	public function get_base_shortcode() {
		$attrs = array(
			'type'        => $_GET['type'],
			'slug'        => $_GET['slug'],
			'image'       => isset( $_GET['image'] ) ? $_GET['image'] : '',
			'align'       => isset( $_GET['align'] ) ? $_GET['align'] : '',
			'containerid' => isset( $_GET['containerid'] ) ? $_GET['containerid'] : '',
			'margin'      => isset( $_GET['margin'] ) ? $_GET['margin'] : '',
			'clear'       => isset( $_GET['clear'] ) ? $_GET['clear'] : '',
			'expiration'  => isset( $_GET['expiration'] ) ? $_GET['expiration'] : '',
			'ajax'        => isset( $_GET['ajax'] ) ? $_GET['ajax'] : '',
			'scheme'      => isset( $_GET['scheme'] ) ? $_GET['scheme'] : '',
			'layout'      => isset( $_GET['layout'] ) ? $_GET['layout'] : '',
			'multi'       => isset( $_GET['multi'] ) ? filter_var( $_GET['multi'], FILTER_VALIDATE_BOOLEAN ) : false,
		);
		die( self::shortcode_function( $attrs ) );
	}

	/**
	 * Retrieve the query shortcode.
	 */
	public function get_query_shortcode() {
		$attrs = array(
			'cols'        => $_GET['cols'],
			'per_page'    => $_GET['per_page'],
			'type'        => $_GET['type'],
			'image'       => isset( $_GET['image'] ) ? $_GET['image'] : '',
			'align'       => isset( $_GET['align'] ) ? $_GET['align'] : '',
			'containerid' => isset( $_GET['containerid'] ) ? $_GET['containerid'] : '',
			'margin'      => isset( $_GET['margin'] ) ? $_GET['margin'] : '',
			'clear'       => isset( $_GET['clear'] ) ? $_GET['clear'] : '',
			'expiration'  => isset( $_GET['expiration'] ) ? $_GET['expiration'] : '',
			'ajax'        => isset( $_GET['ajax'] ) ? $_GET['ajax'] : '',
			'scheme'      => isset( $_GET['scheme'] ) ? $_GET['scheme'] : '',
			'layout'      => isset( $_GET['layout'] ) ? $_GET['layout'] : '',
			'sortby'      => isset( $_GET['sortby'] ) ? $_GET['sortby'] : '',
			'sort'        => isset( $_GET['sort'] ) ? $_GET['sort'] : '',
		);
		if ( ! empty( $_GET['browse'] ) ) {
			$attrs['browse'] = $_GET['browse'];
		}
		if ( ! empty( $_GET['search'] ) ) {
			$attrs['search'] = $_GET['search'];
		}
		if ( ! empty( $_GET['tag'] ) ) {
			$attrs['tag'] = $_GET['tag'];
		}
		if ( ! empty( $_GET['user'] ) ) {
			$attrs['user'] = $_GET['user'];
		}
		if ( ! empty( $_GET['author'] ) ) {
			$attrs['author'] = $_GET['author'];
		}

		$sortby = isset( $_GET['sortby'] ) ? $_GET['sortby'] : '';
		$sort   = isset( $_GET['sort'] ) ? $_GET['sort'] : '';

		// Build the query.
		$query_args = array(
			'search'   => $attrs['search'],
			'tag'      => $attrs['tag'],
			'author'   => $attrs['author'],
			'user'     => $attrs['user'],
			'browse'   => $attrs['browse'],
			'per_page' => $attrs['per_page'],
			'fields'   => array(
				'name'              => true,
				'requires'          => true,
				'tested'            => true,
				'compatibility'     => true,
				'screenshot_url'    => true,
				'ratings'           => true,
				'rating'            => true,
				'num_ratings'       => true,
				'homepage'          => true,
				'sections'          => true,
				'description'       => true,
				'short_description' => true,
				'banners'           => true,
				'downloaded'        => true,
				'last_updated'      => true,
				'downloadlink'      => true,
			),
		);
		$type       = $attrs['type'];
		$query_args = apply_filters( 'wppic_api_query', $query_args, $type, $attrs );

		$api = '';

		// Plugins query.
		if ( 'plugin' === $type ) {
			$type = 'plugins';
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			$api = plugins_api( 'query_plugins', $query_args );
		}

		// Themes query.
		if ( 'theme' === $type ) {
			$type = 'themes';
			require_once ABSPATH . 'wp-admin/includes/theme.php';
			$api = themes_api( 'query_themes', $query_args );
		}

		// Begin sort.
		$sort_results = array();
		if ( 'plugins' === $type ) {
			$sort_results = $api->plugins ?? null;
		} elseif ( 'themes' === $type ) {
			$sort_results = $api->themes ?? null;
		}
		if ( 'plugins' === $type && ! is_wp_error( $api ) && ! empty( $api ) && 'none' !== $sortby ) {
			$plugins = $api->plugins;
			array_multisort(
				array_column( $plugins, $sortby ),
				'DESC' === $sort ? SORT_DESC : SORT_ASC,
				$plugins
			);
			$sort_results = $plugins;
		}
		if ( 'themes' === $type && ! is_wp_error( $api ) && ! empty( $api ) && 'none' !== $sortby ) {
			$themes = $api->themes;
			array_multisort(
				array_column( $themes, $sortby ),
				'DESC' === $sort ? SORT_DESC : SORT_ASC,
				$themes
			);
			$sort_results = $themes;
		}

		/**
		 * Filter: wppic_query_results
		 *
		 * Sorted results ready for display.
		 *
		 * @param array $sort_results The sorted results.
		 * @param string $type The type of query (plugins, themes).
		 * @param string $sortby The field to sort by.
		 * @param string $sort The sort order (ASC, DESC).
		 */
		$sort_results = apply_filters( 'wppic_query_results', $sort_results, $type, $sortby, $sort );

		if ( ! is_wp_error( $sort_results ) && ! empty( $sort_results ) ) {

			wp_send_json_success(
				array(
					'api_response' => json_decode( json_encode( $sort_results ) ),
					'html'         => self::shortcode_query_function( $attrs ),
				)
			);
		}
		wp_send_json_error( array( 'message' => 'No data found' ) );
		die( '' );
	}

	/**
	 * Retrieve the query shortcode.
	 */
	public function get_query_shortcode_v2() {
		$attrs = array(
			'cols'        => $_GET['cols'],
			'per_page'    => $_GET['per_page'],
			'type'        => $_GET['type'],
			'image'       => isset( $_GET['image'] ) ? $_GET['image'] : '',
			'align'       => isset( $_GET['align'] ) ? $_GET['align'] : '',
			'containerid' => isset( $_GET['containerid'] ) ? $_GET['containerid'] : '',
			'margin'      => isset( $_GET['margin'] ) ? $_GET['margin'] : '',
			'clear'       => isset( $_GET['clear'] ) ? $_GET['clear'] : '',
			'expiration'  => isset( $_GET['expiration'] ) ? $_GET['expiration'] : '',
			'ajax'        => isset( $_GET['ajax'] ) ? $_GET['ajax'] : '',
			'scheme'      => isset( $_GET['scheme'] ) ? $_GET['scheme'] : '',
			'layout'      => isset( $_GET['layout'] ) ? $_GET['layout'] : '',
			'sortby'      => isset( $_GET['sortby'] ) ? $_GET['sortby'] : '',
			'sort'        => isset( $_GET['sort'] ) ? $_GET['sort'] : '',
			'searchBy'    => isset( $_GET['searchBy'] ) ? $_GET['searchBy'] : '',
		);
		if ( ! empty( $_GET['browse'] && 'category' === $attrs['searchBy'] ) ) {
			$attrs['browse'] = $_GET['browse'];
		}
		if ( ! empty( $_GET['search'] ) && 'general' === $attrs['searchBy'] ) {
			$attrs['search'] = $_GET['search'];
		}
		if ( ! empty( $_GET['tag'] ) && 'tag' === $attrs['searchBy'] ) {
			$attrs['tag'] = $_GET['tag'];
		}
		if ( ! empty( $_GET['user'] ) && 'favorites' === $attrs['searchBy'] ) {
			$attrs['user'] = $_GET['user'];
		}
		if ( ! empty( $_GET['author'] ) && 'author' === $attrs['searchBy'] ) {
			$attrs['author'] = $_GET['author'];
		}

		$sortby = isset( $_GET['sortby'] ) ? $_GET['sortby'] : '';
		$sort   = isset( $_GET['sort'] ) ? $_GET['sort'] : '';

		// Build the query.
		$query_args = array(
			'search'   => $attrs['search'] ?? '',
			'tag'      => $attrs['tag'] ?? '',
			'author'   => $attrs['author'] ?? '',
			'user'     => $attrs['user'] ?? '',
			'browse'   => $attrs['browse'] ?? '',
			'per_page' => $attrs['per_page'],
			'fields'   => array(
				'name'              => true,
				'requires'          => true,
				'tested'            => true,
				'compatibility'     => true,
				'screenshot_url'    => true,
				'ratings'           => true,
				'rating'            => true,
				'num_ratings'       => true,
				'homepage'          => true,
				'sections'          => true,
				'description'       => true,
				'short_description' => true,
				'banners'           => true,
				'downloaded'        => true,
				'last_updated'      => true,
				'downloadlink'      => true,
			),
		);
		$type       = $attrs['type'];
		$query_args = apply_filters( 'wppic_api_query', $query_args, $type, $attrs );

		$api = '';

		// Plugins query.
		if ( 'plugin' === $type ) {
			$type = 'plugins';
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			$api = plugins_api( 'query_plugins', $query_args );
		}

		// Themes query.
		if ( 'theme' === $type ) {
			$type = 'themes';
			require_once ABSPATH . 'wp-admin/includes/theme.php';
			$api = themes_api( 'query_themes', $query_args );
		}

		// Begin sort.
		$sort_results = array();
		if ( 'plugins' === $type ) {
			$sort_results = $api->plugins ?? null;
		} elseif ( 'themes' === $type ) {
			$sort_results = $api->themes ?? null;
		}
		if ( 'plugins' === $type && ! is_wp_error( $api ) && ! empty( $api ) && 'none' !== $sortby ) {
			$plugins = $api->plugins;
			array_multisort(
				array_column( $plugins, $sortby ),
				'DESC' === $sort ? SORT_DESC : SORT_ASC,
				$plugins
			);
			$sort_results = $plugins;
		}
		if ( 'themes' === $type && ! is_wp_error( $api ) && ! empty( $api ) && 'none' !== $sortby ) {
			$themes = $api->themes;
			array_multisort(
				array_column( $themes, $sortby ),
				'DESC' === $sort ? SORT_DESC : SORT_ASC,
				$themes
			);
			$sort_results = $themes;
		}

		/**
		 * Filter: wppic_query_results
		 *
		 * Sorted results ready for display.
		 *
		 * @param array $sort_results The sorted results.
		 * @param string $type The type of query (plugins, themes).
		 * @param string $sortby The field to sort by.
		 * @param string $sort The sort order (ASC, DESC).
		 */
		$sort_results = apply_filters( 'wppic_query_results', $sort_results, $type, $sortby, $sort );

		if ( ! is_wp_error( $sort_results ) && ! empty( $sort_results ) ) {

			wp_send_json_success(
				array(
					'api_response' => json_decode( json_encode( $sort_results ) ),
					'html'         => self::shortcode_query_function( $attrs ),
				)
			);
		}
		wp_send_json_error( array( 'message' => 'No data found' ) );
		die( '' );
	}

	/**
	 * Main Shortcode function.
	 *
	 * @param array  $atts    Shortcode attributes.
	 * @param string $content The content of the shortcode.
	 */
	public static function shortcode_function( $atts, $content = '' ) {

		$attributes = wp_parse_args(
			$atts,
			array(
				'id'          => '',  // custom Div ID (could be use for anchor).
				'type'        => '',  // plugin | theme.
				'slug'        => '',  // plugin slug name.
				'image'       => '',  // image url to replace WP logo (175px X 175px).
				'align'       => '',  // center|left|right.
				'containerid' => '',  // custom Div ID (could be use for anchor).
				'margin'      => '',  // custom container margin - eg: "15px 0".
				'clear'       => '',  // clear float before or after the card: before|after.
				'expiration'  => '',  // transient duration in minutes - 0 for never expires.
				'ajax'        => '',  // load plugin data async whith ajax: yes|no (default: no).
				'scheme'      => '',  // color scheme : default|scheme1->scheme10 (default: empty).
				'layout'      => '',  // card|large|flex|wordpress.
				'custom'      => '',  // value to print : url|name|version|author|requires|rating|num_ratings|downloaded|last_updated|download_link.
				'multi'       => false,
				'cols'        => 2,
				'col_gap'     => 20,
				'row_gap'     => 20,
				'itemSlugs'   => array(),

			),
		);
		// Use "shortcode_atts_wppic_default" filter to edit shortcode parameters default values or add your owns.

		// Get admin settingsr.
		$options = Options::get_options();

		// Global var to enqueue scripts + ajax param if is set to yes.
		add_filter( 'wppic_allow_scripts', '__return_true' );

		$add_class = array();
		// Remove unnecessary spaces.
		$id          = trim( $attributes['id'] );
		$type        = trim( $attributes['type'] );
		$slug        = trim( esc_html( $attributes['slug'] ) );
		$image       = trim( esc_url( $attributes['image'] ) );
		$containerid = trim( $attributes['containerid'] );
		$margin      = trim( $attributes['margin'] );
		$clear       = trim( $attributes['clear'] );
		$expiration  = trim( $attributes['expiration'] );
		$ajax        = trim( $attributes['ajax'] );
		$scheme      = trim( $attributes['scheme'] );
		$layout      = trim( $attributes['layout'] );
		$custom      = trim( $attributes['custom'] );
		$multi       = filter_var( $attributes['multi'], FILTER_VALIDATE_BOOLEAN );
		$align       = trim( $attributes['align'] );
		$cols        = absint( $attributes['cols'] );
		$col_gap     = absint( $attributes['col_gap'] );
		$row_gap     = absint( $attributes['row_gap'] );

		if ( empty( $layout ) ) {
			$layout      = 'wp-pic-card';
			$add_class[] = $layout;
		} elseif ( 'flex' === $layout ) {
			$add_class[] = 'flex';
			$add_class[] = 'wp-pic-card';
		} elseif ( 'card' === $layout ) {
			$layout      = 'wp-pic-card';
			$add_class[] = 'wp-pic-card';
		} elseif ( 'ratings' === $layout ) {
			$add_class[] = 'wp-pic-card';
		} else {
			$add_class[] = $layout;
		}

		// Check to see if slug exists and if it is false, else we should skip this.
		if ( isset( $attributes[ $slug ] ) ) {
			// If false, that means don't show the plugin.
			// Slug can be string false, boolean false, and and a string for a custom title.
			if ( false === $attributes[ $slug ] || 'false' === $attributes[ $slug ] ) {
				return '';
			} else {
				$attributes['itemSlugs'][ $slug ] = $attributes[ $slug ];
			}
		}

		// Check to see if itemSlugs value is false too.
		if ( isset( $attributes['itemSlugs'][ $slug ] ) ) {
			// If false, that means don't show the plugin.
			if ( false === $attributes['itemSlugs'][ $slug ] || 'false' === $attributes['itemSlugs'][ $slug ] ) {
				return '';
			}
		}

		// Random slug: comma-separated list.
		if ( strpos( $slug, ',' ) !== false && ! $multi ) {
			$slug = explode( ',', $slug );
			$slug = $slug[ array_rand( $slug ) ];
		} elseif ( strpos( $slug, ',' ) !== false && $multi ) {
			$slug = explode( ',', $slug );
			foreach ( $slug as &$item_slug ) {
				$item_slug = trim( $item_slug );
			}
		}

		$block_alignment = 'align-center';
		switch ( $align ) {
			case 'left':
				$block_alignment = 'alignleft';
				break;
			case 'right':
				$block_alignment = 'alignright';
				break;
			case 'center':
				$block_alignment = 'aligncenter';
				break;
			case 'wide':
				$block_alignment = 'alignwide';
				break;
			case 'full':
				$block_alignment = 'alignfull';
				break;
		}

		if ( is_array( $slug ) && $multi ) {
			ob_start();
			?>
			<style>
			.wppic-plugin-site-grid,
			#<?php echo esc_attr( $attributes['id'] ); ?> {
				grid-column-gap: <?php echo esc_attr( $col_gap ); ?>px;
				grid-row-gap: <?php echo esc_attr( $row_gap ); ?>px;
			}
			</style>
			<?php
			$content .= ob_get_clean();
			$content .= sprintf(
				'<div id="%s" class="wp-block-plugin-info-card %s cols-%d has-grid">',
				esc_attr( $id ),
				esc_attr( $block_alignment ),
				esc_attr( $cols ),
			);
			foreach ( $slug as $asset_slug ) {
				// For old plugin versions.
				if ( empty( $type ) ) {
					$type = 'plugin';
				}
				$add_class[] = $type;
				$add_class[] = 'multi';

				// Add custom shortcode slugs to itemslugs if it exists.
				if ( isset( $attributes[ $asset_slug ] ) ) {
					// Add to itemSlugs.
					$attributes['itemSlugs'][ $asset_slug ] = $attributes[ $asset_slug ];
				}

				if ( ! empty( $custom ) ) {

					$wppic_data = wppic_api_parser( $type, $asset_slug, $expiration );

					if ( ! $wppic_data ) {
						return '<strong>' . esc_html__( 'Item not found:', 'wp-plugin-info-card' ) . ' "' . $asset_slug . '" ' . esc_html__( 'does not exist.', 'wp-plugin-info-card' ) . '</strong>';
					}

					if ( ! empty( $wppic_data->$custom ) ) {
						$content .= $wppic_data->$custom;
					}
				} else {

					// Ajax required data.
					$ajax_data = '';
					if ( 'yes' === $ajax ) {
						$add_class[] = 'wp-pic-ajax';
						$ajax_data   = 'data-type="' . $type . '" data-slug="' . $asset_slug . '" data-image="' . $image . '" data-expiration="' . $expiration . '"  data-layout="' . $layout . '" data-slugs="' . esc_attr( wp_json_encode( $attributes['itemSlugs'] ) ) . '"';
					}

					// Align card.
					$align_center = false;
					$align_style  = '';

					// Custom style.
					$style = '';
					if ( ! empty( $margin ) || ! empty( $align_style ) ) {
						$style = 'style="' . $margin . $align_style . '"';
					}

					// Extra container ID.
					if ( ! empty( $containerid ) ) {
						$containerid = ' id="' . $containerid . '"';
					} else {
						$containerid = ' id="wp-pic-' . esc_html( $asset_slug ) . '"';
					}

					// Color scheme.
					if ( empty( $scheme ) ) {
						$scheme = $options['colorscheme'];
						if ( 'default' === $scheme ) {
							$scheme = '';
						}
					}
					$add_class[] = $scheme;

					// Output.
					if ( 'before' === $clear ) {
						$content .= '<div style="clear:both"></div>';
					}

					$content .= sprintf( '<div class="wp-pic-wrapper %s %s %s" %s>', esc_attr( $block_alignment ), esc_attr( $layout ), $multi ? 'multi' : '', $style );
					if ( $align_center ) {
						$content .= '<div class="wp-pic-center">';
					}

					// Data attribute for ajax call.
					$content .= '<div class="wp-pic ' . esc_html( implode( ' ', $add_class ) ) . '" ' . esc_html( $containerid ) . $ajax_data . ' >';
					if ( 'yes' !== $ajax ) {
						$content .= self::shortcode_content( $type, $asset_slug, $image, $expiration, $layout, $attributes['itemSlugs'] );
					} else {
						$content .= '<div class="wp-pic-body-loading"><div class="signal"></div></div>';
					}

					$content .= '</div>';
					// Align center.
					if ( $align_center ) {
						$content .= '</div>';
					}

					$content .= '</div><!-- .wp-pic-wrapper-->';
					if ( 'after' === $clear ) {
						$content .= '<div style="clear:both"></div>';
					}
				}
			}
			$content .= '</div>';
			ob_start();
			if ( 0 === did_action( 'wppic_enqueue_scripts' ) ) {
				do_action( 'wppic_enqueue_scripts' );
			}
			$content .= ob_get_clean();
			return $content;
		} else {
			// For old plugin versions.
			if ( empty( $type ) ) {
				$type = 'plugin';
			}
			$add_class[] = $type;

			// Check to see if slug exists in attributes.
			if ( isset( $attributes[ $slug ] ) ) {
				// Add to itemSlugs.
				$attributes['itemSlugs'][ $slug ] = $attributes[ $slug ];
			}

			if ( ! empty( $custom ) ) {
				$wppic_data = wppic_api_parser( $type, $slug, $expiration );

				if ( ! $wppic_data ) {
					return '<strong>' . __( 'Item not found:', 'wp-plugin-info-card' ) . ' "' . $slug . '" ' . __( 'does not exist.', 'wp-plugin-info-card' ) . '</strong>';
				}

				if ( ! empty( $wppic_data->$custom ) ) {
					$content .= $wppic_data->$custom;
				}
			} else {

				// Ajax required data.
				$ajax_data = '';
				if ( 'yes' === $ajax ) {
					$add_class[] = 'wp-pic-ajax';
					$ajax_data   = 'data-type="' . $type . '" data-slug="' . $slug . '" data-image="' . $image . '" data-expiration="' . $expiration . '"  data-layout="' . $layout . '" data-slugs="' . esc_attr( wp_json_encode( $attributes['itemSlugs'] ) ) . '"';
				}

				// Align card.
				$align_center = false;
				$align_style  = '';

				// Extra container ID.
				if ( ! empty( $containerid ) ) {
					$containerid = ' id="' . $containerid . '"';
				} else {
					$containerid = ' id="wp-pic-' . esc_html( $slug ) . '"';
				}

				// Custom container margin.
				if ( ! empty( $margin ) ) {
					$margin = 'margin:' . $margin . ';';
				}

				// Custom style.
				$style = '';
				if ( ! empty( $margin ) || ! empty( $align_style ) ) {
					$style = 'style="' . $margin . $align_style . '"';
				}

				// Color scheme.
				if ( empty( $scheme ) ) {
					$scheme = $options['colorscheme'] ?? '';
					if ( 'default' === $scheme ) {
						$scheme = '';
					}
				}
				$add_class[] = $scheme;
				// Output.
				if ( 'before' === $clear ) {
					$content .= '<div style="clear:both"></div>';
				}

				$content .= sprintf( '<div class="wp-pic-wrapper %s %s" %s>', esc_attr( $block_alignment ), esc_attr( $layout ), $style );
				if ( $align_center ) {
					$content .= '<div class="wp-pic-center">';
				}

				// Data attribute for ajax call.
				$content .= '<div class="wp-pic ' . esc_html( implode( ' ', $add_class ) ) . '" ' . $containerid . $ajax_data . ' >';
				if ( 'yes' !== $ajax ) {
					$content .= self::shortcode_content( $type, $slug, $image, $expiration, $layout, $attributes['itemSlugs'] );
				} else {
					$content .= '<div class="wp-pic-body-loading"><div class="signal"></div></div>';
				}

				$content .= '</div>';

				// Align center.
				if ( $align_center ) {
					$content .= '</div>';
				}

				$content .= '</div><!-- .wp-pic-wrapper-->';
				if ( 'after' === $clear ) {
					$content .= '<div style="clear:both"></div>';
				}
			}
		}

		ob_start();
		if ( 0 === did_action( 'wppic_enqueue_scripts' ) ) {
			do_action( 'wppic_enqueue_scripts' );
		}
		$content .= ob_get_clean();
		return $content;
	}

	/**
	 * Process the query shortcode.
	 *
	 * @param array  $atts    Array of shortcode attributes.
	 * @param string $content Shortcode content.
	 */
	public static function shortcode_query_function( $atts, $content = '' ) {
		add_filter( 'wppic_allow_scripts', '__return_true' );
		// Retrieve & extract shorcode parameters.
		extract( // phpcs:ignore
			wp_parse_args(
				$atts,
				array(
					'cols'        => 2,
					'per_page'    => 24,
					'type'        => '',
					'image'       => '',
					'align'       => '',
					'containerid' => '',
					'margin'      => '',
					'clear'       => '',
					'expiration'  => '',
					'ajax'        => '',
					'scheme'      => '',
					'layout'      => '',
					'custom'      => '',
					'sortby'      => 'none',
					'sort'        => 'ASC',
					'search'      => '',
					'tag'         => '',
					'user'        => '',
					'browse'      => '',
					'row_gap'     => 20,
					'col_gap'     => 20,
					'searchBy'    => 'general',
					'itemSlugs'   => array(),
				)
			)
		);

		// Prepare the row columns.
		$column = false;
		$cols   = absint( $cols );
		if ( is_numeric( $cols ) && $cols > 0 && $cols < 4 ) {
			$column = true;
		}

		// Build the query.
		$query_args = array(
			'search'   => $search,
			'tag'      => $tag,
			'author'   => $author,
			'user'     => $user,
			'browse'   => $browse,
			'per_page' => $per_page,
			'fields'   => array(
				'name'              => false,
				'requires'          => false,
				'tested'            => false,
				'compatibility'     => false,
				'screenshot_url'    => false,
				'ratings'           => true,
				'rating'            => true,
				'num_ratings'       => true,
				'homepage'          => false,
				'sections'          => false,
				'description'       => false,
				'short_description' => false,
			),
		);
		$query_args = apply_filters( 'wppic_api_query', $query_args, $type, $atts );

		$api = '';

		// Plugins query.
		if ( 'plugin' === $type ) {
			$type = 'plugins';
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			$api = plugins_api( 'query_plugins', $query_args );
		}

		// Themes query.
		if ( 'theme' === $type ) {
			$type = 'themes';
			require_once ABSPATH . 'wp-admin/includes/theme.php';
			$api = themes_api( 'query_themes', $query_args );
		}

		// Begin sort.
		$sort_results = array();
		if ( 'plugins' === $type ) {
			$sort_results = $api->plugins ?? null;
		} elseif ( 'themes' === $type ) {
			$sort_results = $api->themes ?? null;
		}
		if ( 'plugins' === $type && ! is_wp_error( $api ) && ! empty( $api ) && 'none' !== $sortby ) {
			$plugins = $api->plugins;
			array_multisort(
				array_column( $plugins, $sortby ),
				'DESC' === $sort ? SORT_DESC : SORT_ASC,
				$plugins
			);
			$sort_results = $plugins;
		}
		if ( 'themes' === $type && ! is_wp_error( $api ) && ! empty( $api ) && 'none' !== $sortby ) {
			$themes = $api->themes;
			array_multisort(
				array_column( $themes, $sortby ),
				'DESC' === $sort ? SORT_DESC : SORT_ASC,
				$themes
			);
			$sort_results = $themes;
		}

		/**
		 * Filter: wppic_query_results
		 *
		 * Sorted results ready for display.
		 *
		 * @param array $sort_results The sorted results.
		 * @param string $type The type of query (plugins, themes).
		 * @param string $sortby The field to sort by.
		 * @param string $sort The sort order (ASC, DESC).
		 */
		$sort_results = apply_filters( 'wppic_query_results', $sort_results, $type, $sortby, $sort );

		// If container ID is blank, generate a random one.
		if ( empty( $containerid ) ) {
			$containerid = 'wppic-' . wp_rand( 0, 1000 ) . wp_generate_password( 6, false, false );
		}

		// Get the query result to build the content.
		$content = '';
		if ( ! is_wp_error( $sort_results ) && ! empty( $sort_results ) ) {
			ob_start();
			if ( 0 === did_action( 'wppic_enqueue_scripts' ) ) {
				do_action( 'wppic_enqueue_scripts' );
			}
			$content .= ob_get_clean();
			if ( is_array( $sort_results ) ) {
				ob_start();
				?>
				<style>
					#<?php echo esc_attr( $containerid ); ?> {
						grid-column-gap: <?php echo esc_attr( $col_gap ); ?>px;
						grid-row-gap: <?php echo esc_attr( $row_gap ); ?>px;
					}

				</style>
				<div id="<?php echo esc_attr( $containerid ); ?>" class="wp-query-plugin-info-card cols-<?php echo esc_attr( $cols ); ?>">
					<?php
					$sort_results = \json_decode( wp_json_encode( $sort_results ), true );
					// Creat the loop wp-pic-1-.
					foreach ( $sort_results as $item ) {
						// Add custom shortcode slugs to itemslugs if it exists.
						if ( isset( $atts[ $item['slug'] ] ) ) {
							// Add to itemSlugs.
							$atts['itemSlugs'][ $item['slug'] ] = $atts[ $item['slug'] ];
						}
						$atts['slug'] = $item['slug'];
						// Use the WPPIC shorcode to generate cards.
						echo self::shortcode_function( $atts );
					}
					?>
				</div>
				<?php
				$content .= ob_get_clean();

				return apply_filters( 'wppic_query_content', $content, $type, $atts );
			}
		}
	} //end of wp-pic-query Shortcode

	/**
	 * Shortcode for retrieving plugin screenshots card.
	 *
	 * @param array  $attributes Shortcode attributes.
	 * @param string $content    The content of the shortcode.
	 */
	public static function shortcode_plugin_screenshots_info_card( $attributes, $content = '' ) {

		$attributes = shortcode_atts(
			array(
				'unique_id'                                => 'wppic-' . wp_rand( 0, 1000 ) . wp_generate_password( 6, false, false ),
				'slug'                                     => '',
				'icon_style'                               => 'none',
				'asset_data'                               => array(),
				'enable_rounded_icon'                      => false,
				'color_theme'                              => 'default',
				'custom_colors'                            => false,
				'plugin_title'                             => '',
				'enable_context_menu'                      => true,
				'enable_screenshots'                       => true,
				'align'                                    => 'center',
				'color_background'                         => '#FFFFFF',
				'color_text'                               => '#000000',
				'color_border'                             => '#000000',
				'color_menu_border'                        => '#000000',
				'color_menu'                               => '#000000',
				'color_menu_hover'                         => '#DDDDDD',
				'color_menu_text'                          => '#FFFFFF',
				'color_menu_text_hover'                    => '#000000',
				'color_screenshots_background'             => '#DDDDDD',
				'color_screenshots_border'                 => '#000000',
				'color_screenshots_arrow_background'       => '#333333',
				'color_screenshots_arrow_background_hover' => '#000000',
				'color_screenshots_arrow'                  => '#EEEEEE',
				'color_screenshots_arrow_hover'            => '#FFFFFF',
				'color_star'                               => '#FF9529',
				'color_meta_background'                    => '#000000',
				'color_meta_text'                          => '#FFFFFF',
				'skip_animated_gifs'					   => false,
			),
			$attributes,
			'wp-pic-plugin-screenshots'
		);

		// Build wrapper classes.
		$wrapper_classes = array(
			'wp-pic-plugin-screenshots-wrapper',
			'wp-pic-card',
		);

		// Build CSS classes.
		$classes = array(
			'wp-pic-plugin-screenshots',
			'wp-pic-screenshots',
			'large',
			'plugin',
			'wp-pic-has-screenshots',
		);

		// Check for the color theme.
		if ( ! $attributes['custom_colors'] && strpos( $attributes['color_theme'], 'custom' ) === false ) {
			$classes[] = sprintf(
				'wppic-plugin-screenshot-theme-%s',
				esc_attr( $attributes['color_theme'] )
			);
		}

		// Get asset data.
		$asset_data = wppic_api_parser( 'plugin', $attributes['slug'] );
		if ( $asset_data ) {
			$asset_data = json_decode( json_encode( $asset_data ), true );
		} else {
			return ''; // Exit silently.
		}

		// Get requires.
		$requires       = $asset_data['requires'] ?? false;
		$requires_label = $asset_data['tested'] ?? 'Unknown';
		if ( $requires && is_numeric( $requires ) ) {
			/* Translators: %s is the WP version the plugin supports */
			$requires_label = sprintf( __( 'WP %s+', 'wp-plugin-info-card' ), $requires );
		}

		// Get icon.
		$icon = $asset_data['icons']['svg'] ?? $asset_data['icons']['2x'] ?? $asset_data['icons']['1x'] ?? Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' );

		// Get plugin screenshots.
		$screenshots = Functions::get_plugin_screenshots( $asset_data['slug'], false, true );

		// If animated gif is not allowed, remove them from the screenshots.
		$attributes['skip_animated_gifs'] = filter_var( $attributes['skip_animated_gifs'], FILTER_VALIDATE_BOOLEAN );
		if ( (bool) $attributes['skip_animated_gifs'] ) {
			$new_screenshots = array();
			foreach ( $screenshots as $screenshot ) {
				$full_screenshot = $screenshot['full'] ?? '';
				// If it does not have a gif extension, add it.
				if ( ! preg_match( '/\.gif/', $full_screenshot ) ) {
					$new_screenshots[] = $screenshot;
				}
			}
			$screenshots = $new_screenshots;
		}

		// Active installs.
		if ( $asset_data['active_installs'] >= 1000000 ) {
			// Get number of million.
			$count_in_million = round( $asset_data['active_installs'] / 1000000, 1 );

			$active_installs_text = sprintf(
				/* Translators: %s is the number of million active installs */
				_n( '%s+ Million', '%s+ Million', $count_in_million, 'wp-plugin-info-card' ),
				number_format_i18n( $count_in_million )
			);
		} else {
			$active_installs_text = number_format_i18n( $asset_data['active_installs'] ) . '+';
		}

		// Build custom color styles.
		$block_styles = '';
		if ( $attributes['custom_colors'] || ( ! $attributes['custom_colors'] && strpos( $attributes['color_theme'], 'custom' ) !== false ) ) {
			$block_styles = sprintf(
				'#%s {
					--wppic-plugin-screenshots-card-background: %s;
					--wppic-plugin-screenshots-card-text-color: %s;
					--wppic-plugin-screenshots-card-border-color: %s;
					--wppic-plugin-screenshots-card-menu-border-color: %s;
					--wppic-plugin-screenshots-card-menu-color: %s;
					--wppic-plugin-screenshots-card-menu-color-hover: %s;
					--wppic-plugin-screenshots-card-menu-text-color: %s;
					--wppic-plugin-screenshots-card-menu-text-color-hover: %s;
					--wppic-plugin-screenshots-card-screenshots-background: %s;
					--wppic-plugin-screenshots-card-screenshots-border-color: %s;
					--wppic-plugin-screenshots-card-screenshots-star-color: %s;
					--wppic-plugin-screenshots-card-meta-background-color: %s;
					--wppic-plugin-screenshots-card-meta-text-color: %s;
					--wppic-plugin-screenshots-card-screenshots-arrow-background-color: %s;
					--wppic-plugin-screenshots-card-screenshots-arrow-background-color-hover: %s;
					--wppic-plugin-screenshots-card-screenshots-arrow-color: %s;
					--wppic-plugin-screenshots-card-screenshots-arrow-color-hover: %s;
				}',
				esc_attr( $attributes['unique_id'] ),
				esc_attr( $attributes['color_background'] ),
				esc_attr( $attributes['color_text'] ),
				esc_attr( $attributes['color_border'] ),
				esc_attr( $attributes['color_menu_border'] ),
				esc_attr( $attributes['color_menu'] ),
				esc_attr( $attributes['color_menu_hover'] ),
				esc_attr( $attributes['color_menu_text'] ),
				esc_attr( $attributes['color_menu_text_hover'] ),
				esc_attr( $attributes['color_screenshots_background'] ),
				esc_attr( $attributes['color_screenshots_border'] ),
				esc_attr( $attributes['color_star'] ),
				esc_attr( $attributes['color_meta_background'] ),
				esc_attr( $attributes['color_meta_text'] ),
				esc_attr( $attributes['color_screenshots_arrow_background'] ),
				esc_attr( $attributes['color_screenshots_arrow_background_hover'] ),
				esc_attr( $attributes['color_screenshots_arrow'] ),
				esc_attr( $attributes['color_screenshots_arrow_hover'] )
			);
		}

		$block_styles .= sprintf(
			'
			#%1$s .wp-pic-plugin-screenshots-rating-count {
				position: relative;
				display: block;
				vertical-align: baseline;
				margin-left: 0 !important;
			}
			#%1$s .wp-pic-plugin-screenshots-rating-count::before {
				--percent: %2$s;
				content: \'★★★★★\';
				display: inline-block;
				position: relative;
				top: 0;
				left: 0;
				color: rgba(0,0,0,0.2);
				background:
					linear-gradient(90deg, var( --wppic-plugin-screenshots-card-screenshots-star-color ) var(--percent), rgba(0,0,0,0.2) var(--percent));
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}',
			esc_attr( $attributes['unique_id'] ),
			round( $asset_data['rating'] ) . '%'
		);

		// Begin outputting styles.
		if ( ! empty( $block_styles ) ) {
			$block_styles = sprintf( '<style>%s</style>', $block_styles );
		}

		// Global var to enqueue scripts + ajax param if is set to yes.
		add_filter( 'wppic_allow_scripts', '__return_true' );

		// Begin the output.
		ob_start();
		?>
			<div class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>">
				<?php echo wp_kses( $block_styles, Functions::get_kses_allowed_html() ); ?>
				<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>" id="<?php echo esc_attr( $attributes['unique_id'] ); ?>">
					<div class="wp-pic-plugin-screenshots-card">
						<div class="wp-pic-plugin-screenshots-avatar-wrapper">
							<a href="<?php echo esc_url( $asset_data['url'] ); ?>" target="_blank" rel="noopener noreferrer" class="wp-pic-plugin-screenshots-avatar style-<?php echo esc_attr( $attributes['icon_style'] ); ?> <?php echo esc_attr( $attributes['enable_rounded_icon'] ? 'is-rounded' : '' ); ?>">
								<img src="<?php echo esc_url( $icon ); ?>" width="125" height="125" alt="<?php echo esc_attr( $asset_data['name'] ); ?>" />
							</a>
							<?php
							if ( $attributes['enable_context_menu'] ) :
								?>
									<div class="wppic-meatball-menu wppic-meatball-menu-theme-light" style="display: none;">
									<div class="wppic-meatball-content">
										<input
											type="checkbox"
											aria-label="<?php esc_attr_e( 'Toggle menu', 'wp-plugin-info-card' ); ?>"
										/>
										<ul>
											<li class="wppic-meatball-menu-item wppic-meatball-menu-item-edit-comment" data-comment-action="edit">
												<a href="<?php echo esc_url( $asset_data['url'] ); ?>" class="button-reset">
													<span class="wppic-meatball-menu-icon">
														<svg width="24" height="24"><use xlink:href="#wppic-icon-wordpress"></use></svg>
													</span>
													<span class="wppic-meatball-menu-label">
														<?php esc_html_e( 'View Plugin Page', 'wp-plugin-info-card' ); ?>
													</span>
												</a>
											</li>
											<li class="wppic-meatball-menu-item" data-comment-action="approve">
												<a href="<?php echo esc_url( sprintf( 'https://wordpress.org/support/plugin/%s/reviews/', $asset_data['slug'] ) ); ?>" class="button-reset">
													<span class="wppic-meatball-menu-icon">
														<svg width="24" height="24"><use xlink:href="#wppic-icon-star"></use></svg>
													</span>
													<span class="wppic-meatball-menu-label">
														<?php esc_html_e( 'View Ratings', 'wp-plugin-info-card' ); ?>
													</span>
												</a>
											</li>
											<li class="wppic-meatball-menu-item">
												<a href="<?php echo esc_url( sprintf( 'https://wordpress.org/plugins/%s/advanced/', $asset_data['slug'] ) ); ?>" class="button-reset">
													<span class="wppic-meatball-menu-icon">
														<svg width="24" height="24"><use xlink:href="#wppic-icon-line-chart"></use></svg>
													</span>
													<span class="wppic-meatball-menu-label">
														<?php esc_html_e( 'View Plugin Stats', 'wp-plugin-info-card' ); ?>
													</span>
												</a>
											</li>
											<li class="wppic-meatball-menu-item">
											<a href="<?php echo esc_url( $asset_data['download_link'] ); ?>" class="button-reset">
													<span class="wppic-meatball-menu-icon">
														<svg width="24" height="24"><use xlink:href="#wppic-icon-download"></use></svg>
													</span>
													<span class="wppic-meatball-menu-label">
														<?php esc_html_e( 'Download Plugin', 'wp-plugin-info-card' ); ?>
													</span>
												</a>
											</li>
										</ul>
										<div class="wppic-meatball-icon-wrapper" aria-hidden="true">
											<div class="wppic-meatball-icon">
												<span></span>
											</div>
										</div>
									</div>
								</div>
								<?php
							endif;
							?>
						</div><!-- .wp-pic-plugin-screenshots-avatar-wrapper -->
						<div class="wp-pic-plugin-screenshots-title">
							<h2><?php echo esc_html( '' === $attributes['plugin_title'] ? $asset_data['name'] : $attributes['plugin_title'] ); ?></h2>
						</div>
						<div class="wp-pic-plugin-screenshots-author">
							<?php
							echo esc_html(
								sprintf(
								/* Translators: %s is the plugin author */
									__( 'By: %s', 'wp-plugin-info-card' ),
									$asset_data['author']
								)
							);
							?>
						</div>
						<div class="wp-pic-plugin-screenshots-rating">
							<span class="wp-pic-plugin-screenshots-rating-count">
								<?php
								echo esc_html(
									sprintf(
									/* Translators: %s is the number of ratings */
										_n( '%s Rating', '%s Ratings', $asset_data['num_ratings'], 'wp-plugin-info-card' ),
										number_format_i18n( $asset_data['num_ratings'] )
									)
								);
								?>
							</span>
						</div>
						<div class="wp-pic-plugin-screenshots-last-updated">
							<?php
							echo esc_html(
								sprintf(
								/* Translators: %s is the plugin author */
									__( 'Last Updated: %s ago', 'wp-plugin-info-card' ),
									\human_time_diff( strtotime( $asset_data['last_updated'] ) )
								)
							);
							?>
						</div>
						<div class="wp-pic-plugin-screenshots-description">
							<?php echo wp_kses_post( $asset_data['short_description'] ); ?>
						</div>
					</div><!-- .wp-pic-plugin-screenshots-card -->
					<footer class="wp-pic-plugin-screenshots-footer">
						<?php
						$local_screenshots   = $asset_data['screenshots'] ?? array();
						$screenshots_enabled = $attributes['enable_screenshots'] && ! empty( $screenshots ) && ! empty( $local_screenshots );
						if ( $screenshots_enabled ) {
							// Enqueue the modal script.
							if ( ! wp_script_is( 'fancybox', 'enqueued' ) ) {
								wp_enqueue_script(
									'wppic-fancybox-js',
									Functions::get_plugin_url( '/dist/wppic-fancybox.js' ),
									array(),
									Functions::get_plugin_version(),
									true
								);

								wp_register_style(
									'wppic-fancybox-css',
									Functions::get_plugin_url( '/dist/wppic-fancybox-css.css' ),
									array(),
									Functions::get_plugin_version(),
									'all'
								);
								wp_print_scripts( 'wppic-fancybox-js' );
								wp_print_styles( 'wppic-fancybox-css' );
							}
							add_action( 'wp_footer', array( __CLASS__, 'add_carousel_to_footer' ) );
							?>
								<div class="wp-pic-plugin-screenshots-images">
									<div class="wppic-screenshots-lazy" style="display: none;">
										<?php
										foreach ( $screenshots as $screenshot ) {
											?>
											<div class="wppic-screenshot-lazy" data-src="<?php echo esc_url( $screenshot['full'] ); ?>" data-alt="<?php echo esc_attr( $screenshot['caption'] ); ?>"></div>
											<?php
										}
										?>
									</div>
									<ul class="wppic-screenshot-fancyapps f-carousel" style="display: none;">
									</ul>
								</div>
							<?php
						}
						?>
						<div class="wp-pic-plugin-screenshots-meta">
							<div class="wp-pic-plugin-screenshots-meta-item">
								<div class="wp-pic-plugin-screenshots-meta-item-svg">
									<svg width="24" height="24"><use xlink:href="#wppic-icon-code"></use></svg>
								</div>
								<div class="wp-pic-plugin-screenshots-meta-item-label">
									<a href="<?php echo esc_url( $asset_data['download_link'] ); ?>">
									<?php
									echo esc_html(
										sprintf(
										/* Translators: %s is the version */
											__( 'v%s', 'wp-plugin-info-card' ),
											$asset_data['version']
										)
									);
									?>
									</a>
								</div>
							</div>
							<div class="wp-pic-plugin-screenshots-meta-item">
								<div class="wp-pic-plugin-screenshots-meta-item-svg">
									<svg width="24" height="24"><use xlink:href="#wppic-icon-wordpress"></use></svg>
								</div>
								<div class="wp-pic-plugin-screenshots-meta-item-label">
								<a href="<?php echo esc_url( $asset_data['url'] ); ?>"><?php echo esc_html( $requires_label ); ?></a>
								</div>
							</div>
							<div class="wp-pic-plugin-screenshots-meta-item">
								<div class="wp-pic-plugin-screenshots-meta-item-svg">
									<svg width="24" height="24"><use xlink:href="#wppic-icon-download-cloud"></use></svg>
								</div>
								<div class="wp-pic-plugin-screenshots-meta-item-label">
								<a href="<?php echo esc_url( sprintf( 'https://wordpress.org/plugins/%s/advanced/', $asset_data['slug'] ) ); ?>"><?php echo esc_html( $active_installs_text ); ?></a>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		<?php
		if ( 0 === did_action( 'wppic_enqueue_scripts' ) ) {
			do_action( 'wppic_enqueue_scripts' );
		}
		$return = ob_get_clean();
		return $return;
	}

	/**
	 * Main Shortcode function.
	 *
	 * @param array  $atts    Shortcode attributes.
	 * @param string $content The content of the shortcode.
	 */
	public static function shortcode_active_site_plugins_function( $atts, $content = '' ) {

		$options    = Options::get_options();
		$attributes = wp_parse_args(
			$atts,
			array(
				'id'        => 'wppic-plugin-site-grid',
				'cols'      => 2,
				'col_gap'   => 20,
				'row_gap'   => 20,
				'scheme'    => '',
				'layout'    => '',
				'itemSlugs' => array(),
			)
		);

		// Color scheme.
		if ( empty( $attributes['scheme'] ) ) {
			$attributes['scheme'] = $options['colorscheme'] ?? 'default';
		}

		// Layout.
		if ( empty( $attributes['layout'] ) ) {
			$attributes['layout'] = $options['layout'] ?? 'card';
		}

		$plugins_on_org = Functions::get_active_plugins_with_data();

		ob_start();

		?>
		<style>
			.wppic-plugin-site-grid,
			#<?php echo esc_attr( $attributes['id'] ); ?> {
				grid-column-gap: <?php echo esc_attr( $attributes['col_gap'] ); ?>px;
				grid-row-gap: <?php echo esc_attr( $attributes['row_gap'] ); ?>px;
			}

		</style>
		<?php
		if ( 0 === did_action( 'wppic_enqueue_scripts' ) ) {
			do_action( 'wppic_enqueue_scripts' );
		}
		?>
			
		<div id="<?php echo esc_attr( $attributes['id'] ); ?>" class="wp-site-plugin-info-card cols-<?php echo esc_attr( $attributes['cols'] ); ?>">
			<?php
			$content = ob_get_clean();
			foreach ( $plugins_on_org as $plugin ) {
				$atts = array(
					'slug'      => $plugin['slug'],
					'layout'    => $attributes['layout'],
					'scheme'    => $attributes['scheme'],
					'type'      => 'plugin',
					'itemSlugs' => $attributes['itemSlugs'],
				);
				if ( isset( $attributes[ $plugin['slug'] ] ) ) {
					// Add to itemSlugs.
					$atts['itemSlugs'][ $plugin['slug'] ] = $attributes[ $plugin['slug'] ];
				}
				// Strip safe CSS.
				add_filter( 'safe_style_css', array( static::class, 'safe_css' ) );
				add_filter( 'safecss_filter_attr_allow_css', '__return_true' );
				// Use the WPPIC shorcode to generate cards.
				$content .= self::shortcode_function( $atts );
				remove_filter( 'safecss_filter_attr_allow_css', '__return_true' );
				remove_filter( 'safe_style_css', array( static::class, 'safe_css' ) );
			}
			ob_start();
			?>
		</div>
		<?php
		$content .= ob_get_clean();
		return $content;
	}

	/**
	 * Allows some CSS properties.
	 *
	 * @param array $css Array of allowed CSS properties.
	 *
	 * @return array Array of allowed CSS properties.
	 */
	public static function safe_css( $css ) {
		$css[] = 'display';
		$css[] = 'background';
		$css[] = 'linear-gradient';
		$css[] = '-webkit-background-clip';
		$css[] = '-webkit-text-fill-color';
		$css[] = 'background-image';
		return $css;
	}

	/**
	 * Retrieve the shortcode content.
	 *
	 * @param string $type plugin or theme.
	 * @param string $slug Asset slug.
	 * @param string $image Image override.
	 * @param string $expiration Expiration in seconds.
	 * @param string $layout What layout is being used.
	 * @param object $item_slugs Key separated slugs with overriding titles.
	 */
	public static function shortcode_content( $type = null, $slug = null, $image = null, $expiration = null, $layout = null, $item_slugs = null ) {

		if ( ! empty( $_POST['type'] ) ) {
			$type = $_POST['type'];
		}
		if ( ! empty( $_POST['slug'] ) ) {
			$slug = $_POST['slug'];
		}
		if ( ! empty( $_POST['image'] ) ) {
			$image = $_POST['image'];
		}
		if ( ! empty( $_POST['expiration'] ) ) {
			$expiration = $_POST['expiration'];
		}
		if ( ! empty( $_POST['layout'] ) ) {
			$layout = $_POST['layout'];
		}

		$type       = esc_html( $type );
		$slug       = esc_html( $slug );
		$image      = esc_html( $image );
		$expiration = esc_html( $expiration );
		$layout     = esc_html( $layout );

		// Get item slugs.
		if ( isset( $_POST['itemSlugs'] ) && is_array( $_POST['itemSlugs'] ) ) {
			$item_slugs = Functions::sanitize_array_recursive( wp_unslash( $_POST['itemSlugs'] ) );
		}

		$wppic_data = wppic_api_parser( $type, $slug, $expiration );

		// if plugin does not exists.
		if ( ! $wppic_data ) {

			$error      = '<div class="wp-pic-flip" style="display: none;">';
				$error .= '<div class="wp-pic-face wp-pic-front error">';

					$error .= '<span class="wp-pic-no-plugin">' . __( 'Item not found:', 'wp-plugin-info-card' ) . '</br><i>"' . esc_html( $slug ) . '"</i></br>' . __( 'does not exist.', 'wp-plugin-info-card' ) . '</span>';
					$error .= '<div class="monster-wrapper">
									<div class="eye-left"></div>
									<div class="eye-right"></div>
									<div class="mouth">
										<div class="tooth-left"></div>
										<div class="tooth-right"></div>
									</div>
									<div class="arm-left"></div>
									<div class="arm-right"></div>
									<div class="dots"></div>
								</div>';
				$error     .= '</div>';
			$error         .= '</div>';

			if ( ! empty( $_POST['slug'] ) ) {
				echo wp_kses( $error, Functions::get_kses_allowed_html() );
				die();
			} else {
				return $error;
			}
		}

		// Date format Internationalizion.
		$date_format              = Options::get_date_format();
		$wppic_data->last_updated = date_i18n( $date_format, strtotime( $wppic_data->last_updated ) );

		// Prepare the credit.
		$credit = '';
		if ( isset( $options['credit'] ) && true === $options['credit'] ) {
			$credit .= '<a class="wp-pic-credit" href="https://mediaron.com/wp-plugin-info-card/" target="_blank" data-tooltip="';
			$credit .= esc_html__( 'This card has been generated with WP Plugin Info Card', 'wp-plugin-info-card' );
			$credit .= '"></a>';
		}
		$wppic_data->credit = $credit;

		/**
		 * Filter the plugin data before it is displayed.
		 *
		 * @param object $wppic_data The plugin data.
		 * @param string $type The type of asset (plugin, theme).
		 * @param string $slug The asset slug.
		 * @param string $layout The layout being used.
		 *
		 * @since 5.2.0
		 */
		$wppic_data = apply_filters( 'wppic_data_pre_display', $wppic_data, $type, $slug, $layout );

		// Override the title if applicable.
		if ( is_array( $item_slugs ) && isset( $item_slugs[ $slug ] ) && '' !== $item_slugs[ $slug ] ) {
			$wppic_data->name = $item_slugs[ $slug ];
		}

		// Load theme or plugin template.
		$content = '';
		$content = apply_filters( 'wppic_add_template', $content, array( $type, $wppic_data, $image, $layout ) );

		if ( ! empty( $_POST['slug'] ) ) {
			echo wp_kses( $content, Functions::get_kses_allowed_html() );
			die();
		} else {
			return $content;
		}
	}

	/**
	 * Return plugin data based on passed strings.
	 */
	public function get_asset_data() {
		$type = isset( $_GET['type'] ) ? sanitize_title( $_GET['type'] ) : 'plugin';
		$slug = isset( $_GET['slug'] ) ? $_GET['slug'] : 'wp-plugin-info-card-not-found';

		// Random slug: comma-separated list.
		$slugs = explode( ',', $slug );
		foreach ( $slugs as &$item_slug ) {
			$item_slug = sanitize_title( trim( $item_slug ) );
		}

		$data = array();
		foreach ( $slugs as $asset_slug ) {
			$slug_data = wppic_api_parser( $type, $asset_slug );
			if ( false === $slug_data ) {
				continue;
			}
			if ( isset( $slug_data->author ) ) {
				$slug_data->author = wp_strip_all_tags( $slug_data->author );
			}
			if ( isset( $slug_data->author ) ) {
				$slug_data->author = wp_strip_all_tags( $slug_data->author );
			}
			if ( isset( $slug_data->active_installs ) ) {
				$slug_data->active_installs_raw = $slug_data->active_installs;
				$slug_data->active_installs     = number_format_i18n( $slug_data->active_installs );
			}
			if ( isset( $slug_data->last_updated ) ) {
				$slug_data->last_updated = human_time_diff( strtotime( $slug_data->last_updated ), time() ) . ' ' . _x( 'ago', 'Last time updated', 'wp-plugin-info-card' );
			}
			$data[] = $slug_data;
		}

		// Return error if no data.
		if ( empty( $data ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'No plugin could be found with that slug.', 'wp-plugin-info-card' ),
				)
			);
		}

		wp_send_json_success( $data );
	}

	/**
	 * Add SVGs to footer.
	 */
	public static function add_icons_to_footer() {
		?>
		<div style="display: none; height: 0; width: 0;" aria-hidden="true">
			<svg width="0" height="0" class="hidden" style="display: none;">
				<symbol id="wppic-icon-star" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star">
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
				</symbol>
				<symbol id="wppic-icon-star-filled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 576 512">
					<path fill="currentColor" d="M288.1 0l86.5 164 182.7 31.6L428 328.5 454.4 512 288.1 430.2 121.7 512l26.4-183.5L18.9 195.6 201.5 164 288.1 0z" />
				</symbol>
				<symbol id="wppic-icon-wordpress" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
					<path fill="currentColor" d="M256 8C119.3 8 8 119.2 8 256c0 136.7 111.3 248 248 248s248-111.3 248-248C504 119.2 392.7 8 256 8zM33 256c0-32.3 6.9-63 19.3-90.7l106.4 291.4C84.3 420.5 33 344.2 33 256zm223 223c-21.9 0-43-3.2-63-9.1l66.9-194.4 68.5 187.8c.5 1.1 1 2.1 1.6 3.1-23.1 8.1-48 12.6-74 12.6zm30.7-327.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-21.9 0-58.7-2.8-58.7-2.8-12-.7-13.4 17.7-1.4 18.4 0 0 11.4 1.4 23.4 2.1l34.7 95.2L200.6 393l-81.2-241.5c13.4-.7 25.5-2.1 25.5-2.1 12-1.4 10.6-19.1-1.4-18.4 0 0-36.1 2.8-59.4 2.8-4.2 0-9.1-.1-14.4-.3C109.6 73 178.1 33 256 33c58 0 110.9 22.2 150.6 58.5-1-.1-1.9-.2-2.9-.2-21.9 0-37.4 19.1-37.4 39.6 0 18.4 10.6 33.9 21.9 52.3 8.5 14.8 18.4 33.9 18.4 61.5 0 19.1-7.3 41.2-17 72.1l-22.2 74.3-80.7-239.6zm81.4 297.2l68.1-196.9c12.7-31.8 17-57.2 17-79.9 0-8.2-.5-15.8-1.5-22.9 17.4 31.8 27.3 68.2 27.3 107 0 82.3-44.6 154.1-110.9 192.7z"/>
				</symbol>
				<symbol id="wppic-icon-line-chart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-line-chart">
					<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
				</symbol>
				<symbol id="wppic-icon-download" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download">
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
				</symbol>
				<symbol id="wppic-icon-code" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code">
					<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
				</symbol>
				<symbol id="wppic-icon-download-cloud" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-cloud">
					<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/>
				</symbol>
			</svg>
		</div>
		<?php
	}

	/**
	 * Add Splide to footer.
	 */
	public static function add_carousel_to_footer() {
		// Enqueue / print fancybox styles.
		if ( wp_script_is( 'wppic-fancybox-js', 'registered' ) && ! wp_script_is( 'wppic-fancybox-js', 'done' ) ) {
			\wp_add_inline_style(
				'wppic-fancybox-css',
				'.fancybox__container{z-index:99999 !important}'
			);
			wp_print_styles( array( 'wppic-fancybox-css' ) );
		}
	}
}
