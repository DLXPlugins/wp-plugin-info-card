<?php
/**
 * Helper functions for the plugin.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Class Functions
 */
class Functions {

	/**
	 * Checks if the plugin is on a multisite install.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $network_admin Check if in network admin.
	 *
	 * @return true if multisite, false if not.
	 */
	public static function is_multisite( $network_admin = false ) {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		$is_network_admin = false;
		if ( $network_admin ) {
			if ( is_network_admin() ) {
				if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
					return true;
				}
			} else {
				return false;
			}
		}
		if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks to see if a plugin is installed or not.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path to the asset.
	 *
	 * @return bool true if installed, false if not.
	 */
	public static function is_installed( $path ) {

		// Get all plugins for current site.
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$all_plugins = get_plugins();

		if ( array_key_exists( $path, $all_plugins ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Checks to see if a plugin is activated or not.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path to the asset.
	 *
	 * @return bool true if activated, false if not.
	 */
	public static function is_activated( $path ) {

		// Gets all active plugins on the current site.
		$active_plugins = self::is_multisite() ? get_site_option( 'active_sitewide_plugins' ) : get_option( 'active_plugins', array() );
		if ( in_array( $path, $active_plugins, true ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks to see if EDD is installed.
	 *
	 * @since 1.0.0
	 *
	 * @return bool true if installed, false if not.
	 */
	public static function is_edd_installed() {
		return Functions::is_activated( 'easy-digital-downloads/easy-digital-downloads.php' ) || Functions::is_activated( 'easy-digital-downloads-pro/easy-digital-downloads.php' );
	}

	/**
	 * Gets an array of plugins active on either the current site, or site-wide
	 *
	 * @since 1.0.0
	 *
	 * @return array A list of plugin paths (relative to the plugin directory)
	 */
	public static function get_active_plugins() {

		// Gets all active plugins on the current site.
		$active_plugins = get_option( 'active_plugins' );

		if ( self::is_multisite() ) {
			$network_active_plugins = get_site_option( 'active_sitewide_plugins' );
			if ( ! empty( $network_active_plugins ) ) {
				$network_active_plugins = array_keys( $network_active_plugins );
				$active_plugins         = array_merge( $active_plugins, $network_active_plugins );
			}
		}

		return $active_plugins;
	}

	/**
	 * Retrieve active plugins with .org data.
	 *
	 * This method filters out third-party plugins.
	 */
	public static function get_active_plugins_with_data() {
		// Get cache data.
		$plugins_on_org = wp_cache_get( 'wppic_plugins_on_org', 'wppic' );

		if ( ! $plugins_on_org || empty( $plugins_on_org ) ) {
			// Retrieve plugins.
			$active_plugin_slugs = self::get_active_plugins();
			$all_plugins         = apply_filters( 'all_plugins', get_plugins() );
			$active_plugins      = array();
			$plugin_info         = get_site_transient( 'update_plugins' );

			// Get active plugins.
			foreach ( $all_plugins as $file => $plugin ) {
				if ( in_array( $file, $active_plugin_slugs, true ) ) {
					$active_plugins[ $file ] = $plugin;
				}
			}

			// Get plugin information from .org.
			$all_plugins_with_info = array();
			foreach ( (array) $active_plugins as $plugin_file => $plugin_data ) {
				// Extra info if known. array_merge() ensures $plugin_data has precedence if keys collide.
				if ( isset( $plugin_info->response[ $plugin_file ] ) ) {
					$all_plugins_with_info[ $plugin_file ] = array_merge( (array) $plugin_info->response[ $plugin_file ], $plugin_data );
				} elseif ( isset( $plugin_info->no_update[ $plugin_file ] ) ) {
					$all_plugins_with_info[ $plugin_file ] = array_merge( (array) $plugin_info->no_update[ $plugin_file ], $plugin_data );
				}
			}

			// Check for plugins hosted on .org.
			$plugins_on_org = array();
			foreach ( $all_plugins_with_info as $plugin_file => $plugin_data ) {
				if ( isset( $plugin_data['id'] ) && strstr( $plugin_data['id'], 'w.org' ) ) {
					$plugins_on_org[ $plugin_file ] = $plugin_data;
				}
			}

			// Cache results.
			wp_cache_set( 'plugins_on_org', $plugins_on_org, 'wppic' );
		}

		return $plugins_on_org;
	}

	/**
	 * Sanitize an attribute based on type.
	 *
	 * @param array  $attributes Array of attributes.
	 * @param string $attribute  The attribute to sanitize.
	 * @param string $type       The type of sanitization you need (values can be integer, text, float, boolean, url).
	 *
	 * @return mixed Sanitized attribute. wp_error on failure.
	 */
	public static function sanitize_attribute( $attributes, $attribute, $type = 'text' ) {
		if ( isset( $attributes[ $attribute ] ) ) {
			switch ( $type ) {
				case 'raw':
					return $attributes[ $attribute ];
				case 'post_text':
				case 'post':
					return wp_kses_post( $attributes[ $attribute ] );
				case 'string':
				case 'text':
					return sanitize_text_field( $attributes[ $attribute ] );
				case 'bool':
				case 'boolean':
					return filter_var( $attributes[ $attribute ], FILTER_VALIDATE_BOOLEAN );
				case 'int':
				case 'integer':
					return absint( $attributes[ $attribute ] );
				case 'float':
					if ( is_float( $attributes[ $attribute ] ) ) {
						return $attributes[ $attribute ];
					}
					return 0;
				case 'url':
					return esc_url( $attributes[ $attribute ] );
				case 'default':
					return new \WP_Error( 'wppic_unknown_type', __( 'Unknown type.', 'wp-plugin-info-card' ) );
			}
		}
		return new \WP_Error( 'wppic_attribute_not_found', __( 'Attribute not found.', 'wp-plugin-info-card' ) );
	}

	/**
	 * Get the current admin tab.
	 *
	 * @return null|string Current admin tab.
	 */
	public static function get_admin_tab() {
		$tab = filter_input( INPUT_GET, 'tab', FILTER_DEFAULT );
		if ( $tab && is_string( $tab ) ) {
			return sanitize_text_field( sanitize_title( $tab ) );
		}
		return null;
	}

	/**
	 * Get the current admin sub-tab.
	 *
	 * @return null|string Current admin sub-tab.
	 */
	public static function get_admin_sub_tab() {
		$tab = filter_input( INPUT_GET, 'tab', FILTER_DEFAULT );
		if ( $tab && is_string( $tab ) ) {
			$subtab = filter_input( INPUT_GET, 'subtab', FILTER_DEFAULT );
			if ( $subtab && is_string( $subtab ) ) {
				return sanitize_text_field( sanitize_title( $subtab ) );
			}
		}
		return null;
	}

	/**
	 * Return the URL to the admin screen
	 *
	 * @param string $tab     Tab path to load.
	 * @param string $sub_tab Subtab path to load.
	 *
	 * @return string URL to admin screen. Output is not escaped.
	 */
	public static function get_settings_url( $tab = '', $sub_tab = '' ) {
		$options_url = admin_url( 'options-general.php?page=wp-plugin-info-card' );
		if ( ! empty( $tab ) ) {
			$options_url = add_query_arg( array( 'tab' => sanitize_title( $tab ) ), $options_url );
			if ( ! empty( $sub_tab ) ) {
				$options_url = add_query_arg( array( 'subtab' => sanitize_title( $sub_tab ) ), $options_url );
			}
		}
		return $options_url;
	}

	/**
	 * Array data that must be sanitized.
	 *
	 * @param array $data Data to be sanitized.
	 *
	 * @return array Sanitized data.
	 */
	public static function sanitize_array_recursive( array $data ) {
		$sanitized_data = array();
		foreach ( $data as $key => $value ) {
			if ( '0' === $value ) {
				$value = 0;
			}
			if ( 'true' === $value ) {
				$value = true;
			} elseif ( 'false' === $value ) {
				$value = false;
			}
			if ( is_array( $value ) ) {
				$value                  = self::sanitize_array_recursive( $value );
				$sanitized_data[ $key ] = $value;
				continue;
			}
			if ( is_bool( $value ) ) {
				$sanitized_data[ $key ] = (bool) $value;
				continue;
			}
			if ( is_int( $value ) ) {
				$sanitized_data[ $key ] = (int) $value;
				continue;
			}
			if ( is_string( $value ) ) {
				$sanitized_data[ $key ] = sanitize_text_field( $value );
				continue;
			}
		}
		return $sanitized_data;
	}

	/**
	 * Take a _ separated field and convert to camelcase.
	 *
	 * @param string $field Field to convert to camelcase.
	 *
	 * @return string camelCased field.
	 */
	public static function to_camelcase( string $field ) {
		return str_replace( '_', '', lcfirst( ucwords( $field, '_' ) ) );
	}

	/**
	 * Take a camelcase field and converts it to underline case.
	 *
	 * @param string $field Field to convert to camelcase.
	 *
	 * @return string $field Field name in camelCase..
	 */
	public static function to_underlines( string $field ) {
		$field = strtolower( preg_replace( '/([a-z])([A-Z])/', '$1_$2', $field ) );
		return $field;
	}

	/**
	 * Return the plugin slug.
	 *
	 * @return string plugin slug.
	 */
	public static function get_plugin_slug() {
		return dirname( plugin_basename( WPPIC_FILE ) );
	}

	/**
	 * Return the basefile for the plugin.
	 *
	 * @return string base file for the plugin.
	 */
	public static function get_plugin_file() {
		return plugin_basename( WPPIC_FILE );
	}

	/**
	 * Return the version for the plugin.
	 *
	 * @return float version for the plugin.
	 */
	public static function get_plugin_version() {
		return WPPIC_VERSION;
	}

	/**
	 * Get the plugin author name.
	 */
	public static function get_plugin_author() {
		/**
		 * Filer the output of the plugin Author.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Author name.
		 */
		$plugin_author = apply_filters( 'wppic_plugin_author', 'Brice CAPOBIANCO and Ronald Huereca' );
		return $plugin_author;
	}

	/**
	 * Return the Plugin author URI.
	 */
	public static function get_plugin_author_uri() {
		/**
		 * Filer the output of the plugin Author URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Author URI.
		 */
		$plugin_author = apply_filters( 'wppic_plugin_author_uri', 'https://mediaron.com' );
		return $plugin_author;
	}

	/**
	 * Return the plugin name for the plugin.
	 *
	 * @return string Plugin name.
	 */
	public static function get_plugin_name() {
		/**
		 * Filer the output of the plugin name.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin name.
		 */
		return apply_filters( 'wppic_plugin_name', WPPIC_NAME );
	}

	/**
	 * Return the plugin description for the plugin.
	 *
	 * @return string plugin description.
	 */
	public static function get_plugin_description() {
		/**
		 * Filer the output of the plugin name.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin description.
		 */
		return apply_filters( 'wppic_plugin_description', __( 'WP Plugin Info Card displays plugins & themes data in a beautiful box with a smooth rotation effect using WP Plugin & Theme APIs. Dashboard widget included.', 'wp-plugin-info-card' ) );
	}

	/**
	 * Retrieve the plugin URI.
	 */
	public static function get_plugin_uri() {
		/**
		 * Filer the output of the plugin URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin URI.
		 */
		return apply_filters( 'wppic_plugin_uri', 'https://mediaron.com/wp-plugin-info-card/' );
	}

	/**
	 * Retrieve the plugin support URI.
	 */
	public static function get_plugin_support_uri() {
		/**
		 * Filer the output of the plugin support URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Support URI.
		 */
		return apply_filters( 'wppic_plugin_support_uri', 'https://mediaron.com/contact/' );
	}

	/**
	 * Retrieve the plugin documentation URI.
	 */
	public static function get_plugin_docs_uri() {
		/**
		 * Filer the output of the plugin docs URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Docs URI.
		 */
		return apply_filters( 'wppic_plugin_docs_uri', 'https://mediaron.com/wp-plugin-info-card/' );
	}

	/**
	 * Retrieve the plugin documentation URI.
	 */
	public static function get_plugin_ratings_uri() {
		/**
		 * Filer the output of the plugin ratings URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin ratings URI.
		 */
		return apply_filters( 'wppic_plugin_docs_uri', 'https://wordpress.org/support/plugin/wp-plugin-info-card/reviews/' );
	}

	/**
	 * Retrieve the plugin title.
	 */
	public static function get_plugin_title() {
		/**
		 * Filer the output of the plugin title.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Menu Name.
		 */
		return apply_filters( 'wppic_plugin_menu_title', WPPIC_NAME );
	}

	/**
	 * Retrieve a theme's color palette.
	 *
	 * @return array {
	 *   @type string $name  The color name.
	 *   @type string $slug  The color slug.
	 *   @type string $color The color hex value.
	 * }
	 */
	public static function get_theme_color_palette() {
		$color_palette = array();
		$settings      = \WP_Theme_JSON_Resolver::get_theme_data()->get_settings();
		if ( isset( $settings['color']['palette']['theme'] ) ) {
			$color_palette = $settings['color']['palette']['theme'];
		}

		// If empty color palette, try to get from theme supports.
		if ( empty( $color_palette ) ) {
			$color_palette = get_theme_support( 'editor-color-palette' );
			if ( ! empty( $color_palette ) ) {
				$color_palette = $color_palette[0];
			}
		}

		/**
		 * Filter the color palette used by the plugin.
		 *
		 * @param array $color_palette {
		 *   @type string $name  The color name.
		 *   @type string $slug  The color slug.
		 *   @type string $color The color hex value.
		 * }
		 */
		$color_palette = apply_filters( 'wppic_theme_color_palette', $color_palette );
		return $color_palette;
	}

	/**
	 * Returns appropriate html for KSES.
	 *
	 * @param bool $svg         Whether to add SVG data to KSES.
	 * @param bool $with_tables Whether to add tables to KSES.
	 */
	public static function get_kses_allowed_html( $svg = true, $with_tables = false ) {
		$allowed_tags = wp_kses_allowed_html( 'post' );

		$allowed_tags['nav']        = array(
			'class' => array(),
		);
		$allowed_tags['a']['class'] = array();

		$allowed_tags['style'] = array(
			'type' => array(),
		);
		$allowed_tags['span']  = array(
			'class' => array(),
			'style' => array(),
		);

		$allowed_tags['script'] = array(
			'type' => array(),
			'src'  => array(),
		);

		// Add form input fields.
		$allowed_tags['input'] = array(
			'type'        => array(),
			'class'       => array(),
			'id'          => array(),
			'name'        => array(),
			'value'       => array(),
			'placeholder' => array(),
			'required'    => array(),
			'checked'     => array(),
		);

		// Add button fields.
		$allowed_tags['button'] = array(
			'type'      => array(),
			'class'     => array(),
			'id'        => array(),
			'name'      => array(),
			'data-type' => array(),
		);

		// Add select field.
		$allowed_tags['select'] = array(
			'class' => array(),
			'id'    => array(),
			'name'  => array(),
		);

		// Add options field.
		$allowed_tags['option'] = array(
			'value'    => array(),
			'selected' => array(),
		);

		if ( ! $svg && ! $with_tables ) {
			return $allowed_tags;
		}
		if ( $svg ) {
			$allowed_tags['svg'] = array(
				'xmlns'       => array(),
				'fill'        => array(),
				'viewbox'     => array(),
				'role'        => array(),
				'aria-hidden' => array(),
				'focusable'   => array(),
				'class'       => array(),
				'width'       => array(),
				'height'      => array(),
			);

			$allowed_tags['path'] = array(
				'd'       => array(),
				'fill'    => array(),
				'opacity' => array(),
			);

			$allowed_tags['g'] = array();

			$allowed_tags['circle'] = array(
				'cx'     => array(),
				'cy'     => array(),
				'r'      => array(),
				'fill'   => array(),
				'stroke' => array(),
			);

			$allowed_tags['use'] = array(
				'xlink:href' => array(),
			);

			$allowed_tags['symbol'] = array(
				'aria-hidden' => array(),
				'viewBox'     => array(),
				'id'          => array(),
				'xmls'        => array(),
			);
		}

		// Add support for styles.
		$allowed_tags['style'] = array();

		// Add HTML table markup.
		if ( $with_tables ) {
			$allowed_tags['html']  = array(
				'lang' => array(),
			);
			$allowed_tags['head']  = array();
			$allowed_tags['title'] = array();
			$allowed_tags['meta']  = array(
				'http-equiv' => array(),
				'content'    => array(),
				'name'       => array(),
			);
			$allowed_tags['body']  = array(
				'style' => array(),
			);
			$allowed_tags['table'] = array(
				'class'        => array(),
				'width'        => array(),
				'border'       => array(),
				'cellpadding'  => array(),
				'cellspacing'  => array(),
				'role'         => array(),
				'presentation' => array(),
				'align'        => array(),
				'bgcolor'      => array(),
			);
			$allowed_tags['tbody'] = array();
			$allowed_tags['thead'] = array();
			$allowed_tags['tr']    = array(
				'bgcolor' => array(),
				'align'   => array(),
				'style'   => array(),
			);
			$allowed_tags['th']    = array();
			$allowed_tags['td']    = array(
				'class' => array(),
				'width' => array(),
				'style' => array(),
			);
			if ( ! isset( $allowed_tags['div'] ) ) {
				$allowed_tags['div'] = array(
					'style' => array(),
					'align' => array(),
					'class' => array(),
					'id'    => array(),
				);
			} else {
				$allowed_tags['div']['style'] = array();
				$allowed_tags['div']['align'] = array();
				$allowed_tags['div']['class'] = array();
			}
			if ( ! isset( $allowed_tags['p'] ) ) {
				$allowed_tags['p'] = array(
					'style' => array(),
				);
			} else {
				$allowed_tags['p']['style'] = array();
			}
			$allowed_tags['h1'] = array(
				'style' => array(),
			);
			$allowed_tags['h2'] = array(
				'style' => array(),
			);
		}

		return $allowed_tags;
	}

	/**
	 * Retrieve a plugin page, which should contain the page object.
	 *
	 * @param string $slug The plugin slug.
	 *
	 * @return null|WP_Post The plugin page.
	 */
	public static function get_plugin_page( $slug ) {
		$slug = sanitize_title( $slug );

		$maybe_plugin_page = get_page_by_path( $slug, OBJECT, 'wppic_plugins' );
		if ( null === $maybe_plugin_page ) {
			$plugin = wppic_api_parser( 'plugin', $slug );
			if ( ! empty( $plugin ) ) {
				$plugin_page_id = wp_insert_post(
					array(
						'post_title'     => sanitize_text_field( $plugin->name ),
						'post_name'      => $slug,
						'post_type'      => 'wppic_plugins',
						'post_status'    => 'publish',
						'comment_status' => 'closed',
						'ping_status'    => 'closed',
					)
				);
				$plugin_page    = get_post( $plugin_page_id );
				return $plugin_page;
			}
		}
		return $maybe_plugin_page;
	}

	/**
	 * Retrieve plugin screenshots, while checking if they exist locally.
	 *
	 * @param string $slug  Plugin slug to retrieve screenshots for.
	 * @param bool   $force Whether to force retrieve (no caching) the plugin data.
	 * @param bool   $replace_with_org Whether to replace missing images with .org images.
	 */
	public static function get_plugin_screenshots( $slug, $force = false, $replace_with_org = false ) {
		// Define a unique transient key for caching.
		$transient_key = 'wppic_screenshots_' . $slug;

		// Check if cached data is available and $force is false.
		if ( ! $force ) {
			$cached_data = get_transient( $transient_key );
			if ( false !== $cached_data ) {
				return $cached_data;
			}
		}

		// Get the plugin.
		$plugin_data        = wppic_api_parser( 'plugin', $slug, 720, '', false, $force );
		$plugin_screenshots = $plugin_data->screenshots ?? array();

		if ( empty( $plugin_screenshots ) ) {
			return array();
		}

		// Get the plugin attachments.
		$plugin_page = self::get_plugin_page( $slug );
		if ( ! empty( $plugin_page ) ) {
			$args   = array(
				'post_parent'    => $plugin_page->ID,
				'post_type'      => 'attachment',
				'post_mime_type' => 'image',
				'orderby'        => 'menu_order',
				'order'          => 'ASC',
				'posts_per_page' => 50, /* max get 50 images */
			);
			$images = get_children( $args );

			// Get thumbnail, and then the full size image.
			$images_array = array();
			foreach ( $images as $image ) {
				$images_array[ $image->menu_order ] = array(
					'thumbnail' => wp_get_attachment_image_src( $image->ID, 'thumbnail' )[0],
					'medium'    => wp_get_attachment_image_src( $image->ID, 'medium' )[0],
					'large'     => wp_get_attachment_image_src( $image->ID, 'large' )[0],
					'full'      => wp_get_attachment_image_src( $image->ID, 'full' )[0],
					'caption'   => $image->post_excerpt,
					'alt'       => $image->post_excerpt,
				);
			}

			if ( ! $replace_with_org ) {
				// Cache the data and return.
				set_transient( $transient_key, $images_array, HOUR_IN_SECONDS * 12 ); // Adjust the time as needed.
				return $images_array;
			}

			// Loop through plugin screenshots, see if order and excerpt match (image URL), and mark any that don't exist.
			foreach ( $plugin_screenshots as $screenshot_order => $screenshot ) {
				$found = false;
				foreach ( $images as $image ) {
					if ( $screenshot_order === $image->menu_order ) {
						if ( $image->post_content === $screenshot['src'] ) {
							$found = true;
						}
					}
				}
				if ( ! $found ) {
					// Add in any missing images with .org version.
					$images_array[ $screenshot_order ] = array(
						'thumbnail' => $screenshot['src'],
						'medium'    => $screenshot['src'],
						'large'     => $screenshot['src'],
						'full'      => $screenshot['src'],
						'caption'   => $screenshot['caption'],
						'alt'       => $screenshot['caption'],
					);
					/**
					 * Fires when a plugin screenshot is not found in the local storage.
					 *
					 * This action allows other developers to hook into the screenshot retrieval process.
					 * It can be used to sideload the image from WordPress.org or perform other custom actions
					 * when a screenshot is missing for a given plugin.
					 *
					 * @since 5.0.0
					 *
					 * @param string  $slug             The slug of the plugin for which the screenshot is missing.
					 * @param WP_Post $plugin_page      The WP_Post object representing the plugin page.
					 * @param array   $screenshot       The screenshot data from WordPress.org API.
					 *                                  Includes 'src' (URL of the image), 'caption', and other relevant data.
					 * @param int     $screenshot_order The order of the screenshot as provided by WordPress.org.
					 */
					do_action( 'wppic_no_plugin_screenshot_found', $slug, $plugin_page, $screenshot, $screenshot_order );
				}
			}

			// Cache the data and return.
			set_transient( $transient_key, $images_array, HOUR_IN_SECONDS * 12 ); // Adjust the time as needed.
			return $images_array;
		}
		return array();
	}

	/**
	 * Get the plugin's supported file extensions.
	 *
	 * @since 1.0.0
	 *
	 * @return array The supported file extensions.
	 */
	public static function get_supported_file_extensions() {
		$file_extensions = array(
			'jpeg',
			'jpg',
			'gif',
			'png',
		);
		/**
		 * Filter the valid file extensions for the photo block.
		 *
		 * @param array $file_extensions The valid mime types.
		 */
		$file_extensions = apply_filters( 'wppic_block_file_extensions', $file_extensions );

		return $file_extensions;
	}

	/**
	 * Get the plugin directory for a path.
	 *
	 * @param string $path The path to the file.
	 *
	 * @return string The new path.
	 */
	public static function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path( WPPIC_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Return a plugin URL path.
	 *
	 * @param string $path Path to the file.
	 *
	 * @return string URL to to the file.
	 */
	public static function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url( WPPIC_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Gets the highest priority for a filter.
	 *
	 * @param int $subtract The amount to subtract from the high priority.
	 *
	 * @return int priority.
	 */
	public static function get_highest_priority( $subtract = 0 ) {
		$highest_priority = PHP_INT_MAX;
		$subtract         = absint( $subtract );
		if ( 0 === $subtract ) {
			--$highest_priority;
		} else {
			$highest_priority = absint( $highest_priority - $subtract );
		}
		return $highest_priority;
	}
}
