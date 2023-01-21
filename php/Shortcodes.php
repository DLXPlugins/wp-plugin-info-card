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

		add_action( 'wp_footer', array( $self, 'print_scripts' ) );
		add_action( 'wppic_enqueue_scripts', array( $self, 'enqueue_scripts' ) );
		add_action( 'rest_api_init', array( $self, 'register_rest_routes' ) );
		add_shortcode( 'wp-pic', array( static::class, 'shortcode_function' ) );
		add_shortcode( 'wp-pic-query', array( static::class, 'shortcode_query_function' ) );
		add_shortcode( 'wp-pic-site-plugins', array( static::class, 'shortcode_active_site_plugins_function' ) );
		add_action( 'wp_ajax_async_wppic_shortcode_content', array( static::class, 'shortcode_content' ) );
		add_action( 'wp_ajax_nopriv_async_wppic_shortcode_content', array( static::class, 'shortcode_content' ) );
		return $self;
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
	}

	/**
	 * Add scripts/styles to the footer.
	 */
	public function print_scripts() {
		$options = Options::get_options();

		if ( isset( $options['enqueue'] ) && true === $options['enqueue'] ) {
			do_action( 'wppic_enqueue_scripts' );
		} else {
			// Enqueue Scripts when shortcode is in page.

			$allow_scripts = apply_filters( 'wppic_allow_scripts', false );
			if ( ! $allow_scripts ) {
				return;
			}
			do_action( 'wppic_enqueue_scripts' );
		}
	}

	/**
	 * Register route for getting plugin shortcode
	 *
	 * @since 3.0.0
	 */
	function register_rest_routes() {
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
	 * Check if user has access to REST API.
	 */
	public function rest_check_permissions() {
		return current_user_can( 'edit_posts' );
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
	 * Main Shortcode function.
	 *
	 * @param array  $atts    Shortcode attributes.
	 * @param string $content The content of the shortcode.
	 */
	public static function shortcode_function( $atts, $content = '' ) {

		$attributes = shortcode_atts(
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

			),
			$atts,
			'wppic_default'
		);
		// Use "shortcode_atts_wppic_default" filter to edit shortcode parameters default values or add your owns.

		// Get admin settings.
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
		} else {
			$add_class[] = $layout;
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
				$block_alignment = 'align_center';
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
						$ajax_data   = 'data-type="' . $type . '" data-slug="' . $asset_slug . '" data-image="' . $image . '" data-expiration="' . $expiration . '"  data-layout="' . $layout . '" ';
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
						$content .= self::shortcode_content( $type, $asset_slug, $image, $expiration, $layout );
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
		} else {
			// For old plugin versions.
			if ( empty( $type ) ) {
				$type = 'plugin';
			}
			$add_class[] = $type;

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
					$ajax_data   = 'data-type="' . $type . '" data-slug="' . $slug . '" data-image="' . $image . '" data-expiration="' . $expiration . '"  data-layout="' . $layout . '" ';
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

				$content .= sprintf( '<div class="wp-pic-wrapper %s %s" %s>', esc_attr( $block_alignment ), esc_attr( $layout ), $style );
				if ( $align_center ) {
					$content .= '<div class="wp-pic-center">';
				}

				// Data attribute for ajax call.
				$content .= '<div class="wp-pic ' . esc_html( implode( ' ', $add_class ) ) . '" ' . $containerid . $ajax_data . ' >';
				if ( 'yes' !== $ajax ) {
					$content .= self::shortcode_content( $type, $slug, $image, $expiration, $layout );
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
			shortcode_atts(
				array(
					'search'      => '',  // A search term. Default empty.
					'tag'         => '',  // Tag to filter themes. Comma separated list. Default empty.
					'author'      => '',  // Username of an author to filter themes. Default empty.
					'user'        => '',  // Username to query for their favorites. Default empty.
					'browse'      => '',  // Browse view: 'featured', 'popular', 'updated', 'favorites'.
					'per_page'    => '',  // Number of themes per query (page). Default 24.
					'cols'        => '',  // Columns layout to use: '2', '3'. Default empty (none).
				// Default wppic shortcode attributs.
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
					'layout'      => '',  // card|flat|wordpress.
					'custom'      => '',  // value to print : url|name|version|author|requires|rating|num_ratings|downloaded|last_updated|download_link.
					'sortby'      => 'none', // none|active_installs (plugins only)|downloaded|last_updated.
					'sort'        => 'ASC', // ASC|DESC.
				),
				$atts,
				'wppic_default'
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
				'ratings'           => false,
				'rating'            => false,
				'num_ratings'       => false,
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

		// Get the query result to build the content.
		if ( ! is_wp_error( $sort_results ) && ! empty( $sort_results ) ) {
			if ( is_array( $sort_results ) ) {

				$content = $row = $open = $close = ''; // phpcs:ignore
				$count   = 1;
				if ( $column ) {
					$open     = '<div class="wp-pic-1-' . $cols . '">';
					$close    = '</div>';
					$content .= '<div class="wp-pic-grid">';
				}

				// Creat the loop wp-pic-1-.
				foreach ( $sort_results as $item ) {
					$item = json_decode( json_encode( $item ) );
					if ( $column && ( $count ) % $cols === 1 && $cols > 1 ) { // phpcs:ignore
						$row      = true;
						$content .= '<div class="wp-pic-row">';
					}
					$content     .= $open;
					$atts['slug'] = $item->slug;
					// Use the WPPIC shorcode to generate cards.
					$content .= self::shortcode_function( $atts );
					$content .= $close;
					if ( $column && ( $count ) % $cols == 0 && $cols > 1 ) { // phpcs:ignore
						$content .= '</div>';
						$row      = false;
					}
					$count++;
				}

				if ( $row ) {
					$content .= '</div>'; // end of row.
				}
				if ( $column ) {
					$content .= '</div>'; // end of grid.
				}

				return apply_filters( 'wppic_query_content', $content, $type, $atts );

			}
		}

	} //end of wp-pic-query Shortcode

	/**
	 * Main Shortcode function.
	 *
	 * @param array  $atts    Shortcode attributes.
	 * @param string $content The content of the shortcode.
	 */
	public static function shortcode_active_site_plugins_function( $atts, $content = '' ) {

		$options    = Options::get_options();
		$attributes = shortcode_atts(
			array(
				'id'      => 'wppic-plugin-site-grid',
				'cols'    => 2,
				'col_gap' => 20,
				'row_gap' => 20,
				'scheme'  => '',
				'layout'  => '',
			),
			$atts,
			'wppic_default'
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
		<div id="<?php echo esc_attr( $attributes['id'] ); ?>" class="wp-site-plugin-info-card cols-<?php echo esc_attr( $attributes['cols'] ); ?>">
			<?php
			foreach ( $plugins_on_org as $plugin ) {
				$atts = array(
					'slug'   => $plugin['slug'],
					'layout' => $attributes['layout'],
					'scheme' => $attributes['scheme'],
					'type'   => 'plugin',
				);
				// Use the WPPIC shorcode to generate cards.
				echo wp_kses( self::shortcode_function( $atts ), Functions::get_kses_allowed_html() );
			}
			?>
		</div>
		<?php
		$content = ob_get_clean();
		return $content;
	}

	/**
	 * Retrieve the shortcode content.
	 *
	 * @param string $type plugin or theme.
	 * @param string $slug Asset slug.
	 * @param string $image Image override.
	 * @param string $expiration Expiration in seconds.
	 * @param string $layout What layout is being used.
	 */
	public static function shortcode_content( $type = null, $slug = null, $image = null, $expiration = null, $layout = null ) {

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
			$credit .= '<a className="wp-pic-credit" href="https://mediaron.com/wp-plugin-info-card/" target="_blank" data-tooltip="';
			$credit .= esc_html__( 'This card has been generated with WP Plugin Info Card', 'wp-plugin-info-card' );
			$credit .= '"></a>';
		}
		$wppic_data->credit = $credit;

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
				$slug_data->active_installs = number_format_i18n( $slug_data->active_installs );
			}
			if ( isset( $slug_data->last_updated ) ) {
				$slug_data->last_updated = human_time_diff( strtotime( $slug_data->last_updated ), time() ) . ' ' . _x( 'ago', 'Last time updated', 'wp-plugin-info-card' );
			}
			$data[] = $slug_data;
		}

		// Return error if no data.
		if ( empty( $data ) ) {
			wp_send_json_error();
		}

		wp_send_json_success( $data );
	}

}
