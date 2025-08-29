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
		add_shortcode( 'github-info-card', array( static::class, 'shortcode_github_info_card' ) );
		add_action( 'wp_ajax_async_wppic_shortcode_content', array( static::class, 'shortcode_content' ) );
		add_action( 'wp_ajax_nopriv_async_wppic_shortcode_content', array( static::class, 'shortcode_content' ) );
		add_action( 'init', array( static::class, 'register_screenshots_presets_post_type' ) );
		add_action( 'init', array( static::class, 'register_custom_plugin_post_type' ) );
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
	 * Register plugin screenshots post type.
	 */
	public static function register_custom_plugin_post_type() {
		$labels = array(
			'name'               => __( 'Custom Plugins', 'wp-plugin-info-card' ),
			'singular_name'      => __( 'Custom Plugin', 'wp-plugin-info-card' ),
			'add_new'            => __( 'Add New', 'wp-plugin-info-card' ),
			'add_new_item'       => __( 'Add New Custom Plugin', 'wp-plugin-info-card' ),
			'edit_item'          => __( 'Edit Custom Plugin', 'wp-plugin-info-card' ),
			'new_item'           => __( 'New Custom Plugin', 'wp-plugin-info-card' ),
			'all_items'          => __( 'All Custom Plugins', 'wp-plugin-info-card' ),
			'view_item'          => __( 'View Custom Plugin', 'wp-plugin-info-card' ),
			'search_items'       => __( 'Search Custom Plugins', 'wp-plugin-info-card' ),
			'not_found'          => __( 'No Custom Plugins found', 'wp-plugin-info-card' ),
			'not_found_in_trash' => __( 'No Custom Plugins found in Trash', 'wp-plugin-info-card' ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Custom Plugins', 'wp-plugin-info-card' ),
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

		register_post_type( 'wppic_custom_plugins', $args );

		register_meta(
			'wppic_custom_plugins',
			'enableRestApi',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'boolean',
			)
		);
		register_meta(
			'wppic_custom_plugins',
			'isFromRest',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'boolean',
			)
		);
		register_meta(
			'wppic_custom_plugins',
			'restApiPasscode',
			array(
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
		register_meta(
			'wppic_custom_plugins',
			'restApiDataVersion',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'integer',
			)
		);
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

		register_rest_route(
			'wppic/v2',
			'/get_github_data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_github_data' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get plugin data for return.
	 *
	 * @param object $request Request data.
	 */
	public function get_github_data( $request ) {

		$username = sanitize_key( strtolower( $request->get_param( 'username' ) ) );
		$repo     = sanitize_key( strtolower( $request->get_param( 'repo' ) ) );

		if ( empty( $username ) || empty( $repo ) ) {
			wp_send_json_error( array( 'message' => 'Invalid username or repo.' ) );
		}

		$github_data = wppic_api_parser( 'github', $username . '/' . $repo, HOUR_IN_SECONDS, '', false, false );

		if ( empty( $github_data ) ) {
			wp_send_json_error( array( 'message' => 'No data found.' ) );
		}

		wp_send_json_success( $github_data );
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
				'id'                  => '',  // custom Div ID (could be use for anchor).
				'type'                => '',  // plugin | theme.
				'slug'                => '',  // plugin slug name.
				'image'               => '',  // image url to replace WP logo (175px X 175px).
				'align'               => '',  // center|left|right.
				'containerid'         => '',  // custom Div ID (could be use for anchor).
				'margin'              => '',  // custom container margin - eg: "15px 0".
				'clear'               => '',  // clear float before or after the card: before|after.
				'expiration'          => '',  // transient duration in minutes - 0 for never expires.
				'ajax'                => '',  // load plugin data async whith ajax: yes|no (default: no).
				'scheme'              => '',  // color scheme : default|scheme1->scheme10 (default: empty).
				'layout'              => '',  // card|large|flex|wordpress.
				'custom'              => '',  // value to print : url|name|version|author|requires|rating|num_ratings|downloaded|last_updated|download_link.
				'multi'               => false,
				'cols'                => 2,
				'col_gap'             => 20,
				'row_gap'             => 20,
				'itemSlugs'           => array(),
				'marginSpacing'       => 'none',
				'marginSpacingTarget' => 'both',
			),
		);
		// Use "shortcode_atts_wppic_default" filter to edit shortcode parameters default values or add your owns.

		// Get admin settingsr.
		$options = Options::get_options();

		// Global var to enqueue scripts + ajax param if is set to yes.
		add_filter( 'wppic_allow_scripts', '__return_true' );

		$add_class = array();
		// Remove unnecessary spaces.
		$id          = sanitize_text_field( trim( $attributes['id'] ) );
		$type        = sanitize_text_field( trim( $attributes['type'] ) );
		$slug        = sanitize_text_field( trim( esc_html( $attributes['slug'] ) ) );
		$image       = sanitize_text_field( trim( esc_url( $attributes['image'] ) ) );
		$containerid = esc_attr( trim( $attributes['containerid'] ) );
		$margin      = esc_attr( trim( $attributes['margin'] ) );
		$clear       = sanitize_text_field( trim( $attributes['clear'] ) );
		$expiration  = sanitize_text_field( trim( $attributes['expiration'] ) );
		$ajax        = sanitize_text_field( trim( $attributes['ajax'] ) );
		$scheme      = sanitize_text_field( trim( $attributes['scheme'] ) );
		$layout      = sanitize_text_field( trim( $attributes['layout'] ) );
		$custom      = sanitize_text_field( trim( $attributes['custom'] ) );
		$multi       = filter_var( $attributes['multi'], FILTER_VALIDATE_BOOLEAN );
		$align       = sanitize_text_field( trim( $attributes['align'] ) );
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

		if ( 'none' !== $attributes['marginSpacing'] ) {
			$add_class[] = 'wppic-margin-spacing-' . esc_attr( $attributes['marginSpacing'] );
		}
		if ( 'both' !== $attributes['marginSpacingTarget'] ) {
			$add_class[] = 'wppic-margin-spacing-target-' . esc_attr( $attributes['marginSpacingTarget'] );
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
						$style = 'style="' . esc_attr( $margin ) . ' ' . esc_attr( $align_style ) . '"';
					}

					// Extra container ID.
					if ( ! empty( $containerid ) ) {
						$containerid = ' id="' . esc_attr( $containerid ) . '"';
					} else {
						$containerid = ' id="wp-pic-' . esc_attr( $asset_slug ) . '"';
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
					$content .= '<div class="wp-pic ' . esc_attr( implode( ' ', $add_class ) ) . '" ' . $containerid . $ajax_data . ' >';
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
					$containerid = ' id="' . esc_attr( $containerid ) . '"';
				} else {
					$containerid = ' id="wp-pic-' . esc_attr( $slug ) . '"';
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
				'skip_animated_gifs'                       => false,
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
				<symbol id="fa-icon-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/>
				</symbol>
				<symbol id="fa-icon-github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"/>
				</symbol>
				<symbol id="fa-icon-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/>
				</symbol>
				<symbol id="fa-icon-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/>
				</symbol>
				<symbol id="fa-icon-fork" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M176 168C189.3 168 200 157.3 200 144C200 130.7 189.3 120 176 120C162.7 120 152 130.7 152 144C152 157.3 162.7 168 176 168zM256 144C256 176.8 236.3 205 208 217.3L208 240C208 266.5 229.5 288 256 288L384 288C410.5 288 432 266.5 432 240L432 217.3C403.7 205 384 176.8 384 144C384 99.8 419.8 64 464 64C508.2 64 544 99.8 544 144C544 176.8 524.3 205 496 217.3L496 240C496 301.9 445.9 352 384 352L352 352L352 422.7C380.3 435 400 463.2 400 496C400 540.2 364.2 576 320 576C275.8 576 240 540.2 240 496C240 463.2 259.7 435 288 422.7L288 352L256 352C194.1 352 144 301.9 144 240L144 217.3C115.7 205 96 176.8 96 144C96 99.8 131.8 64 176 64C220.2 64 256 99.8 256 144zM464 168C477.3 168 488 157.3 488 144C488 130.7 477.3 120 464 120C450.7 120 440 130.7 440 144C440 157.3 450.7 168 464 168zM344 496C344 482.7 333.3 472 320 472C306.7 472 296 482.7 296 496C296 509.3 306.7 520 320 520C333.3 520 344 509.3 344 496z"/>
				</symbol>
				<symbol id="fa-icon-eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z"/>
				</symbol>
				<symbol id="fa-icon-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path fill="currentColor" d="M246.6 182.6C259.1 170.1 259.1 149.8 246.6 137.3C234.1 124.8 213.8 124.8 201.3 137.3L41.3 297.3C28.8 309.8 28.8 330.1 41.3 342.6L201.3 502.6C213.8 515.1 234.1 515.1 246.6 502.6C259.1 490.1 259.1 469.8 246.6 457.3L109.3 320L246.6 182.6zM393.3 182.6L530.7 320L393.4 457.4C380.9 469.9 380.9 490.2 393.4 502.7C405.9 515.2 426.2 515.2 438.7 502.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L438.7 137.4C426.2 124.9 405.9 124.9 393.4 137.4C380.9 149.9 380.9 170.2 393.4 182.7z"/>
				</symbol>
			</symbol>
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

	/**
	 * GitHub Info Card shortcode.
	 *
	 * @param array  $attributes Shortcode attributes.
	 * @param string $content The content of the shortcode.
	 */
	public static function shortcode_github_info_card( $attributes, $content = '' ) {
		if ( is_admin() || defined( 'REST_REQUEST' ) ) {
			return '';
		}

		// Make attributes lowercase to avoid case-sensitive issues.
		$attributes = array_change_key_case( $attributes, CASE_LOWER );

		$defaults_attributes = array(
			'class'                   => '',
			'style'                   => 'light',
			'uniqueid'                => 'wp-pic-' . wp_generate_password( 10, false ),
			'numchildren'             => 0,
			'cols'                    => 1,
			'colgap'                  => 10,
			'rowgap'                  => 10,
			'marginspacing'           => 'none',
			'marginspacingtarget'     => 'both',
			'backgroundcolor'         => '#fff',
			'textcolor'               => '#24292f',
			'iconcolor'               => '#666',
			'iconcolorhover'          => '#111827',
			'bordercolor'             => '#d0d7de',
			'languagebgcolor'         => '#24292f',
			'languagetextcolor'       => '#fff',
			'sponsorscolor'           => '#bf3989',
			'buttonbgcolor'           => '#1a7f37',
			'buttonbgcolorhover'      => '#2c974b',
			'buttontextcolor'         => '#fff',
			'buttontextcolorhover'    => '#fff',
			'layout'                  => 'large',
			'align'                   => 'center',
			'showtopbar'              => true,
			'showauthorbar'           => true,
			'showstatsbar'            => true,
			'showlastupdated'         => true,
			'parentbuttontype'        => '',
			'username'                => '',
			'repo'                    => '',
			'nameoverride'            => '',
			'loginoverride'           => '',
			'sponsorsurloverride'     => '',
			'versionoverride'         => '',
			'organizationurloverride' => '',
			'homepageurloverride'     => '',
			'overridebutton'          => false,
			'overridebuttontext'      => __( 'View on GitHub', 'wp-plugin-info-card' ),
			'overridebuttonurl'       => '',
			'buttontype'              => 'github',
			'avatarimageurl'          => '',
		);

		$attributes = shortcode_atts( $defaults_attributes, $attributes, 'github-info-card' );

		// Let's sanitize these one-by-one.
		$attributes['class']                   = Functions::sanitize_attribute( $attributes, 'class', 'string' );
		$attributes['style']                   = Functions::sanitize_attribute( $attributes, 'style', 'string' );
		$attributes['numchildren']             = Functions::sanitize_attribute( $attributes, 'numchildren', 'integer' );
		$attributes['cols']                    = Functions::sanitize_attribute( $attributes, 'cols', 'integer' );
		$attributes['colgap']                  = Functions::sanitize_attribute( $attributes, 'colgap', 'integer' );
		$attributes['rowgap']                  = Functions::sanitize_attribute( $attributes, 'rowgap', 'integer' );
		$attributes['marginspacingtarget']     = Functions::sanitize_attribute( $attributes, 'marginspacingtarget', 'string' );
		$attributes['marginspacing']           = Functions::sanitize_attribute( $attributes, 'marginspacing', 'string' );
		$attributes['backgroundcolor']         = Functions::sanitize_attribute( $attributes, 'backgroundcolor', 'string' );
		$attributes['textcolor']               = Functions::sanitize_attribute( $attributes, 'textcolor', 'string' );
		$attributes['iconcolor']               = Functions::sanitize_attribute( $attributes, 'iconcolor', 'string' );
		$attributes['iconcolorhover']          = Functions::sanitize_attribute( $attributes, 'iconcolorhover', 'string' );
		$attributes['bordercolor']             = Functions::sanitize_attribute( $attributes, 'bordercolor', 'string' );
		$attributes['languagebgcolor']         = Functions::sanitize_attribute( $attributes, 'languagebgcolor', 'string' );
		$attributes['languagetextcolor']       = Functions::sanitize_attribute( $attributes, 'languagetextcolor', 'string' );
		$attributes['sponsorscolor']           = Functions::sanitize_attribute( $attributes, 'sponsorscolor', 'string' );
		$attributes['buttonbgcolor']           = Functions::sanitize_attribute( $attributes, 'buttonbgcolor', 'string' );
		$attributes['buttonbgcolorhover']      = Functions::sanitize_attribute( $attributes, 'buttonbgcolorhover', 'string' );
		$attributes['buttontextcolor']         = Functions::sanitize_attribute( $attributes, 'buttontextcolor', 'string' );
		$attributes['buttontextcolorhover']    = Functions::sanitize_attribute( $attributes, 'buttontextcolorhover', 'string' );
		$attributes['layout']                  = Functions::sanitize_attribute( $attributes, 'layout', 'string' );
		$attributes['align']                   = Functions::sanitize_attribute( $attributes, 'align', 'string' );
		$attributes['uniqueid']                = Functions::sanitize_attribute( $attributes, 'uniqueid', 'string' );
		$attributes['showtopbar']              = Functions::sanitize_attribute( $attributes, 'showtopbar', 'boolean' );
		$attributes['showauthorbar']           = Functions::sanitize_attribute( $attributes, 'showauthorbar', 'boolean' );
		$attributes['showstatsbar']            = Functions::sanitize_attribute( $attributes, 'showstatsbar', 'boolean' );
		$attributes['showlastupdated']         = Functions::sanitize_attribute( $attributes, 'showlastupdated', 'boolean' );
		$attributes['parentbuttontype']        = Functions::sanitize_attribute( $attributes, 'parentbuttontype', 'string' );
		$attributes['username']                = Functions::sanitize_attribute( $attributes, 'username', 'string' );
		$attributes['repo']                    = Functions::sanitize_attribute( $attributes, 'repo', 'string' );
		$attributes['nameoverride']            = Functions::sanitize_attribute( $attributes, 'nameoverride', 'string' );
		$attributes['loginoverride']           = Functions::sanitize_attribute( $attributes, 'loginoverride', 'string' );
		$attributes['sponsorsurloverride']     = Functions::sanitize_attribute( $attributes, 'sponsorsurloverride', 'string' );
		$attributes['organizationurloverride'] = Functions::sanitize_attribute( $attributes, 'organizationurloverride', 'string' );
		$attributes['versionoverride']         = Functions::sanitize_attribute( $attributes, 'versionoverride', 'string' );
		$attributes['overridebutton']          = Functions::sanitize_attribute( $attributes, 'overridebutton', 'boolean' );
		$attributes['overridebuttontext']      = Functions::sanitize_attribute( $attributes, 'overridebuttontext', 'string' );
		$attributes['overridebuttonurl']       = Functions::sanitize_attribute( $attributes, 'overridebuttonurl', 'url' );
		$attributes['buttontype']              = Functions::sanitize_attribute( $attributes, 'buttontype', 'string' );
		$attributes['avatarimageurl']          = Functions::sanitize_attribute( $attributes, 'avatarimageurl', 'url' );

		// Now let's build the shortcode.
		if ( 0 === $attributes['numchildren'] ) {
			// todo - build wrapper around the shortcode.
		}

		// Get GitHub Asset data.
		$asset_data = wppic_api_parser( 'github', sanitize_key( $attributes['username'] ) . '/' . sanitize_key( $attributes['repo'] ) );
		if ( ! $asset_data ) {
			if ( current_user_can( 'manage_options' ) ) {
				echo esc_html__( 'GitHub Card Not Found', 'wp-plugin-info-card' );
			}
			return ob_get_clean();
		}

		// Turn asset data into an array.
		$asset_data = json_decode( wp_json_encode( $asset_data ), true );

		ob_start();

		// Get Home URL.
		$has_homepage_url      = false;
		$homepage_url          = Functions::sanitize_attribute( $asset_data, 'homepage', 'url' );
		$homepage_url_override = Functions::sanitize_attribute( $attributes, 'homepageurloverride', 'url' );
		if ( ! is_wp_error( $homepage_url ) && ! empty( $homepage_url ) ) {
			$has_homepage_url = true;
		}
		if ( ! is_wp_error( $homepage_url_override ) && ! empty( $homepage_url_override ) ) {
			$homepage_url     = $homepage_url_override;
			$has_homepage_url = true;
		}

		// Get GitHub URL. No override.
		$has_github_url = false;
		$github_url     = Functions::sanitize_attribute( $asset_data, 'github_url', 'url' );
		if ( ! is_wp_error( $github_url ) && ! empty( $github_url ) ) {
			$has_github_url = true;
		}

		// Get stargazer's count for GitHub URL.
		$has_stargazers_count = false;
		$stargazers_count_url = '';
		if ( $has_github_url ) {
			$has_stargazers_count = true;
			$stargazers_count_url = sprintf( '%s/stargazers', $github_url );
		}

		// Get watchers GitHub URL.
		$has_watchers_count = false;
		$watchers_count_url = '';
		if ( $has_github_url ) {
			$has_watchers_count = true;
			$watchers_count_url = sprintf( '%s/watchers', $github_url );
		}

		// Get forks GitHub URL.
		$has_forks_count = false;
		$forks_count_url = '';
		if ( $has_github_url ) {
			$has_forks_count = true;
			$forks_count_url = sprintf( '%s/forks', $github_url );
		}

		// Get sponsors URL.
		$has_sponsors_url = false;
		$sponsors_url     = Functions::sanitize_attribute( $asset_data, 'sponsors_url', 'url' );
		if ( ! is_wp_error( $sponsors_url ) && ! empty( $sponsors_url ) ) {
			$has_sponsors_url = true;
		}
		$sponsors_url_override = Functions::sanitize_attribute( $attributes, 'sponsorsurloverride', 'url' );
		if ( ! is_wp_error( $sponsors_url_override ) && ! empty( $sponsors_url_override ) ) {
			$sponsors_url     = $sponsors_url_override;
			$has_sponsors_url = true;
		}

		// Get organization URL.
		$has_org_name_url      = false;
		$org_name_url          = '';
		$org_name_url_override = Functions::sanitize_attribute( $asset_data, 'org_url', 'url' );
		if ( ! is_wp_error( $org_name_url_override ) && ! empty( $org_name_url_override ) ) {
			$org_name_url     = $org_name_url_override;
			$has_org_name_url = true;
		}

		// Get avatar image.
		$has_avatar_image      = false;
		$avatar_image          = Functions::sanitize_attribute( $asset_data, 'avatar', 'url' );
		$avatar_image_override = Functions::sanitize_attribute( $attributes, 'avatarimageurl', 'url' );
		if ( ! is_wp_error( $avatar_image_override ) && ! empty( $avatar_image_override ) ) {
			$avatar_image     = $avatar_image_override;
			$has_avatar_image = true;
		} elseif ( ! is_wp_error( $avatar_image ) && ! empty( $avatar_image ) ) {
			$has_avatar_image = true;
		}
		if ( ! $has_avatar_image ) {
			$has_avatar_image = true;
			$avatar_image     = Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' ); // todo - replace with GitHub avatar.
		}

		// Get org name.
		$org_name          = Functions::sanitize_attribute( $asset_data, 'login', 'string' );
		$org_name_override = Functions::sanitize_attribute( $attributes, 'loginoverride', 'string' );
		if ( ! is_wp_error( $org_name_override ) && ! empty( $org_name_override ) ) {
			$org_name = $org_name_override;
		}

		// Get repo full name.
		$repo_full_name = Functions::sanitize_attribute( $asset_data, 'full_name', 'string' );
		if ( is_wp_error( $repo_full_name ) ) {
			$repo_full_name = '';
		}

		// Get repo name.
			$repo_name = Functions::sanitize_attribute( $asset_data, 'name', 'string' );
		if ( is_wp_error( $repo_name ) ) {
			$repo_name = '';
		}
		$repo_name_override = Functions::sanitize_attribute( $attributes, 'nameoverride', 'string' );
		if ( ! is_wp_error( $repo_name_override ) && ! empty( $repo_name_override ) ) {
			$repo_name = $repo_name_override;
		}

		// Get repo description.
		$repo_description = Functions::sanitize_attribute( $asset_data, 'description', 'string' );
		if ( is_wp_error( $repo_description ) ) {
			$repo_description = '';
		}

		// Get counts.
		$stargazers_count = Functions::sanitize_attribute( $asset_data, 'stargazers_count', 'integer' );
		if ( is_wp_error( $stargazers_count ) ) {
			$stargazers_count = 0;
		}
		$watchers_count = Functions::sanitize_attribute( $asset_data, 'watchers_count', 'integer' );
		if ( is_wp_error( $watchers_count ) ) {
			$watchers_count = 0;
		}
		$forks_count = Functions::sanitize_attribute( $asset_data, 'forks_count', 'integer' );
		if ( is_wp_error( $forks_count ) ) {
			$forks_count = 0;
		}
		$subscribers_count = Functions::sanitize_attribute( $asset_data, 'subscribers_count', 'integer' );
		if ( is_wp_error( $subscribers_count ) ) {
			$subscribers_count = 0;
		}

		// Get latest release tag name and URL.
		$latest_release_tag_name = Functions::sanitize_attribute( $asset_data, 'latest_release_tag_name', 'string' );
		$latest_release_url      = Functions::sanitize_attribute( $asset_data, 'latest_release_url', 'url' );
		if ( is_wp_error( $latest_release_tag_name ) || is_wp_error( $latest_release_url ) ) {
			$latest_release_tag_name = '';
			$latest_release_url      = '';
		}
		$latest_release_download_url = Functions::sanitize_attribute( $asset_data, 'latest_release_download_url', 'url' );
		if ( ! is_wp_error( $latest_release_download_url ) && ! empty( $latest_release_download_url ) ) {
			$latest_release_url = $latest_release_download_url;
		}
		// Get version override.
		$version_override = Functions::sanitize_attribute( $attributes, 'versionOverride', 'string' );
		if ( ! is_wp_error( $version_override ) && ! empty( $version_override ) && ! empty( $latest_release_tag_name ) ) {
			$latest_release_tag_name = $version_override;
		}

		// Get last updated date.
		$show_last_updated = (bool) $attributes['showlastupdated'];
		$last_updated_date = Functions::sanitize_attribute( $asset_data, 'updated_at', 'string' );
		if ( is_wp_error( $last_updated_date ) ) {
			$last_updated_date = '';
		}

		// Get button type and URL.
		$button_type        = $attributes['buttontype'];
		$parent_button_type = Functions::sanitize_attribute( $attributes, 'parentbuttontype', 'string' ); // This is passed from the parent block. If not passed, this errors, and it's as if a shortcode passed it.
		$button_override    = (bool) $attributes['overridebutton'];
		if ( ! is_wp_error( $parent_button_type ) && ! empty( $parent_button_type ) && ! $button_override ) {
			$button_type = $parent_button_type;
		}

		switch ( $button_type ) {
			case 'github':
				$button_url  = $github_url;
				$button_text = __( 'View on GitHub', 'wp-plugin-info-card' );
				break;
			case 'website':
				$button_url  = $homepage_url;
				$button_text = __( 'View Website', 'wp-plugin-info-card' );
				break;
			case 'sponsor':
				$button_url  = $sponsors_url;
				$button_text = __( 'Sponsor', 'wp-plugin-info-card' );
				break;
			case 'download':
				$button_url  = $latest_release_url;
				$button_text = __( 'Download', 'wp-plugin-info-card' );
				break;
			case 'star':
				$button_url  = $stargazers_count_url;
				$button_text = __( 'Star', 'wp-plugin-info-card' );
				break;
			case 'custom':
				$button_url  = $attributes['overrideButtonUrl'];
				$button_text = $attributes['overrideButtonText'];
				break;
			default:
				$button_url  = $github_url;
				$button_text = __( 'View on GitHub', 'wp-plugin-info-card' );
				break;
		}
		// Failsafe.
		if ( $button_override && ! empty( $attributes['overridebuttontext'] ) ) {
			$button_text = $attributes['overridebuttontext'];
		}

		$has_language = false;
		$language     = Functions::sanitize_attribute( $asset_data, 'language', 'string' );
		if ( ! is_wp_error( $language ) && ! empty( $language ) ) {
			$has_language = true;
		}
		$has_license = false;
		$license     = Functions::sanitize_attribute( $asset_data, 'license', 'string' );
		if ( ! is_wp_error( $license ) && ! empty( $license ) ) {
			$has_license = true;
		}

		// Get wrapper classes.
		$wrapper_classes = array(
			'wppic-github-info-card',
			'layout-' . $attributes['layout'],
			'cols-' . ( $attributes['numchildren'] > 1 ? $attributes['cols'] : 1 ),
		);
		if ( 0 === $attributes['numchildren'] ) {
			$wrapper_classes[] = 'wppic-margin-spacing-' . $attributes['marginspacing'];
			$wrapper_classes[] = 'wppic-margin-spacing-target-' . $attributes['marginspacingtarget'];
			$wrapper_classes[] = $attributes['class'];
			$wrapper_classes[] = 'is-style-wppic-github-' . $attributes['style'];
		}

		if ( ( 'is-style-wppic-github-custom' === $attributes['class'] || 'custom' === $attributes['style'] ) && 0 === $attributes['numchildren'] ) {
			?>
			<style>
				#<?php echo esc_attr( $attributes['uniqueid'] ); ?> {
					--wppic-github-background-color: <?php echo esc_attr( $attributes['backgroundcolor'] ); ?>;
					--wppic-github-text-color: <?php echo esc_attr( $attributes['textcolor'] ); ?>;
					--wppic-github-icon-color: <?php echo esc_attr( $attributes['iconcolor'] ); ?>;
					--wppic-github-icon-color-hover: <?php echo esc_attr( $attributes['iconcolorhover'] ); ?>;
					--wppic-github-border: <?php echo esc_attr( $attributes['bordercolor'] ); ?>;
					--wppic-github-language-bg: <?php echo esc_attr( $attributes['languagebgcolor'] ); ?>;
					--wppic-github-language-color: <?php echo esc_attr( $attributes['languagetextcolor'] ); ?>;
					--wppic-github-sponsors-color: <?php echo esc_attr( $attributes['sponsorscolor'] ); ?>;
					--wppic-github-button-bg: <?php echo esc_attr( $attributes['buttonbgcolor'] ); ?>;
					--wppic-github-button-bg-hover: <?php echo esc_attr( $attributes['buttonbgcolorhover'] ); ?>;
					--wppic-github-button-text-color: <?php echo esc_attr( $attributes['buttontextcolor'] ); ?>;
					--wppic-github-button-text-color-hover: <?php echo esc_attr( $attributes['buttontextcolorhover'] ); ?>;
					}
				</style>
			<?php
		}
		?>
		<div class="<?php echo esc_attr( implode( ' ', $wrapper_classes ) ); ?>" id="<?php echo esc_attr( $attributes['uniqueid'] ); ?>">
			<div class="wppic-github-info-card-wrapper">
			<?php
			if ( (bool) $attributes['showtopbar'] ) :
				?>
				<div class="wppic-github-info-card-header">
					<div class="wppic-github-info-card-header-left">
						<?php if ( $has_language ) : ?>
							<div class="wppic-github-info-card-header-language">
								<?php echo esc_html( $language ); ?>
							</div>
						<?php endif; ?>
						<?php if ( $has_license ) : ?>
							<div class="wppic-github-info-card-header-license">
								<?php echo esc_html( $license ); ?>
							</div>
						<?php endif; ?>
					</div>
					<div class="wppic-github-info-card-header-right">
						<?php
						if ( $has_homepage_url ) :
							?>
						<div class="wppic-github-info-card-header-icon wppic-github-info-card-icon-home">
							<a href="<?php echo esc_url( $homepage_url ); ?>">
								<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
									<use xlink:href="#fa-icon-home" />
								</svg>
							</a>
						</div>
							<?php
						endif;
						?>
						<?php
						if ( $has_github_url ) :
							?>
						<div class="wppic-github-info-card-header-icon wppic-github-info-card-icon-github">
							<a href="<?php echo esc_url( $github_url ); ?>">
								<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
									<use xlink:href="#fa-icon-github" />
								</svg>
							</a>
						</div>
							<?php
							endif;
						?>
						<?php
						if ( $has_sponsors_url ) :
							?>
						<div class="wppic-github-info-card-header-icon wppic-github-info-card-icon-heart">
							<a href="<?php echo esc_url( $sponsors_url ); ?>">
								<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
									<use xlink:href="#fa-icon-heart" />
								</svg>
							</a>
						</div>
							<?php
						endif;
						?>
						<?php
						if ( $has_stargazers_count ) :
							?>
						<div class="wppic-github-info-card-header-icon wppic-github-info-card-icon-star">
							<a href="<?php echo esc_url( $stargazers_count_url ); ?>">
								<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
									<use xlink:href="#fa-icon-star" />
								</svg>
							</a>
						</div>
							<?php
						endif;
						?>
					</div>
				</div><!-- .wppic-github-info-card-header -->
				<?php
			endif;
			?>
			<div class="wppic-github-info-card-author-section">
				<div class="wppic-github-info-card-author-section-avatar">
					<a href="<?php echo esc_url( $github_url ); ?>" title="<?php echo esc_attr( $repo_full_name ); ?>">
						<img src="<?php echo esc_url( $avatar_image ); ?>" alt="<?php echo esc_attr( $repo_full_name ); ?>" />
					</a>
				</div>
				<div class="wppic-github-info-card-author-section-info">
					<div class="wppic-github-info-card-author-section-name">
						<a href="<?php echo esc_url( $github_url ); ?>">
							<?php echo esc_html( $repo_name ); ?>
						</a>
					</div>
					<?php if ( (bool) $attributes['showauthorbar'] ) : ?>
						<div class="wppic-github-info-card-author-section-login">
							<?php echo esc_html__( 'By', 'wp-plugin-info-card' ); ?>&nbsp;
							<?php
							if ( $has_org_name_url ) :
								?>
								<a href="<?php echo esc_url( $org_name_url ); ?>">
									<?php echo esc_html( $org_name ); ?>
								</a>
								<?php
							else :
								?>
								<?php echo esc_html( $org_name ); ?>
								<?php
							endif;
							?>
						</div>
					<?php endif; ?>
				</div>
			</div><!-- .wppic-github-info-card-author-section -->
			<?php if ( (bool) $attributes['showstatsbar'] ) : ?>
				<div class="wppic-github-info-card-meta">
					<div class="wppic-github-info-card-meta-item">
						<?php if ( $has_stargazers_count ) : ?>
							<a href="<?php echo esc_url( $stargazers_count_url ); ?>">
								<div class="wppic-github-info-card-meta-item-icon">
									<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
										<use xlink:href="#fa-icon-star" />
									</svg>
								</div>
								<div class="wppic-github-info-card-meta-item-text">
									<?php echo esc_html( Functions::abbreviate_number( $stargazers_count ) ); ?>
								</div>
							</a>
						<?php endif; ?>
					</div>
					<div class="wppic-github-info-card-meta-item">
						<?php if ( $has_forks_count ) : ?>
							<a href="<?php echo esc_url( $forks_count_url ); ?>">
								<div class="wppic-github-info-card-meta-item-icon">
									<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
										<use xlink:href="#fa-icon-fork" />
									</svg>
								</div>
								<div class="wppic-github-info-card-meta-item-text">
									<?php echo esc_html( Functions::abbreviate_number( $forks_count ) ); ?>
								</div>
							</a>
						<?php endif; ?>
					</div>
					<div class="wppic-github-info-card-meta-item">
						<?php if ( $has_watchers_count ) : ?>
							<a href="<?php echo esc_url( $watchers_count_url ); ?>">
								<div class="wppic-github-info-card-meta-item-icon">
									<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
										<use xlink:href="#fa-icon-eye" />
									</svg>
								</div>
								<div class="wppic-github-info-card-meta-item-text">
									<?php echo esc_html( Functions::abbreviate_number( $subscribers_count ) ); ?>
								</div>
							</a>
						<?php endif; ?>
					</div>
					<div class="wppic-github-info-card-meta-item">
						<?php if ( ! empty( $latest_release_tag_name ) ) : ?>
							<a href="<?php echo esc_url( $latest_release_url ); ?>">
								<div class="wppic-github-info-card-meta-item-icon">
									<svg class="wppic-github-info-card-icon-svg" width="20" height="20" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
										<use xlink:href="#fa-icon-code" />
									</svg>
								</div>
								<div class="wppic-github-info-card-meta-item-text">
									<?php echo esc_html( mb_strimwidth( $latest_release_tag_name, 0, 10, '...' ) ); ?>
								</div>
							</a>
						<?php endif; ?>
					</div>
				</div>
			<?php endif; ?>
			<div class="wppic-github-info-card-description">
				<?php echo esc_html( $repo_description ); ?>
			</div>
			<div class="wppic-github-info-card-buttons">
				<div class="wppic-github-info-card-buttons-left">
					<?php
					if ( $show_last_updated ) :
						?>
						<div class="wppic-github-info-card-last-updated">
							<span class="wppic-github-info-card-last-updated-label"><?php echo esc_html__( 'Last updated:', 'wp-plugin-info-card' ); ?></span> <?php echo date_i18n( get_option( 'date_format' ), strtotime( $last_updated_date ) ); ?>
						</div>
					<?php endif; ?>
				</div>
				<div class="wppic-github-info-card-buttons-right">
					<div class="wppic-github-info-card-buttons-right-button">
						<a
							href="<?php echo esc_url( $button_url ); ?>"
							class="wppic-github-button button-reset wppic-github-button-<?php echo esc_attr( $button_type ); ?>"
						>
							<?php echo esc_html( $button_text ); ?>
						</a>
					</div>
				</div>
			</div>
			</div><!-- .wppic-github-info-card-wrapper -->
		</div><!-- .wppic-github-info-card -->

		<?php
		/**
		 * Add icons to footer for plugin card.
		 */
		add_action( 'wp_footer', array( __CLASS__, 'add_icons_to_footer' ) );
		return ob_get_clean();
	}
}
