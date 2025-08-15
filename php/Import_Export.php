<?php
/**
 * For the import/export of custom plugin data.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for for plugin's options.
 */
class Import_Export {

	/**
	 * Fields for the custom plugin.
	 *
	 * @var array $fields Valid field types used for import/export.
	 */
	protected static $fields = array(
		'pluginIconUrl',
		'pluginBannerUrl',
		'name',
		'slug',
		'shortDescription',
		'url',
		'homepage',
		'downloadLink',
		'version',
		'author',
		'authorProfile',
		'contributors',
		'requires',
		'requiresPHP',
		'tested',
		'rating',
		'numRatings',
		'downloaded',
		'activeInstalls',
		'lastUpdated',
	);

	/**
	 * Setup the REST routes for the import/export.
	 */
	public static function setup_rest_routes() {
		add_action(
			'rest_api_init',
			function () {
				// Setup rest route for handling the import of custom plugin json.
				register_rest_route(
					'wppic/v1',
					'custom-plugins/import',
					array(
						'methods'             => 'POST',
						'callback'            => array( __CLASS__, 'rest_handle_import' ),
						'permission_callback' => array( __CLASS__, 'rest_check_permissions' ),
					)
				);

				// Setup rest route for handling the import of custom plugin from REST API URL.
				register_rest_route(
					'wppic/v1',
					'custom-plugins/import-from-rest',
					array(
						'methods'             => 'POST',
						'callback'            => array( __CLASS__, 'rest_handle_import_from_rest' ),
						'permission_callback' => array( __CLASS__, 'rest_check_permissions' ),
					)
				);

				// Setup rest route for handling of exposing plugin's JSON.
				register_rest_route(
					'wppic/v1',
					'plugins/(?P<slug>[-_a-zA-Z0-9]+)/(?P<passcode>[-_a-zA-Z0-9]+)',
					array(
						'methods'             => 'GET',
						'callback'            => array( __CLASS__, 'rest_handle_get_plugin_json' ),
						'permission_callback' => array( __CLASS__, 'rest_check_get_plugin_json_permissions' ),
						'args'                => array(
							'slug'     => array(
								'required'          => true,
								'validate_callback' => function ( $param, $request, $key ) {
									return ! empty( $param ) && preg_match( '/^[a-zA-Z0-9\-_]+$/', $param );
								},
								'sanitize_callback' => 'sanitize_text_field',
							),
							'passcode' => array(
								'required'          => true,
								'validate_callback' => function ( $param, $request, $key ) {
									return ! empty( $param ) && preg_match( '/^[a-zA-Z0-9\-_]+$/', $param );
								},
								'sanitize_callback' => 'sanitize_text_field',
							),
						),
					)
				);
			}
		);
	}

	/**
	 * Setup actions and filters.
	 */
	public static function setup_actions_and_filters() {
		// For adding custom plugin data (if enabled).
		add_filter( 'wppic_plugin_info', array( __CLASS__, 'maybe_add_custom_plugin_data' ), 10, 4 );
	}

	/**
	 * Maybe add custom plugin data.
	 *
	 * @param array  $wppic_data The existing plugin data.
	 * @param string $slug The plugin slug.
	 * @param string $type The plugin type.
	 * @param bool   $force Whether to force the plugin data.
	 * @return array The plugin data.
	 */
	public static function maybe_add_custom_plugin_data( $wppic_data, $slug, $type, $force ) {
		$options = Options::get_options();
		if ( ! isset( $options['enable_custom_plugins'] ) || ! (bool) $options['enable_custom_plugins'] ) {
			return $wppic_data;
		}

		$custom_plugin = get_posts(
			array(
				'post_type'     => 'wppic_custom_plugins',
				'post_name__in' => array( sanitize_title( $slug ) ),
				'post_status'   => 'publish',
			)
		);
		if ( ! $custom_plugin ) {
			return $wppic_data;
		}
		$custom_plugin = $custom_plugin[0];

		$custom_plugin_data = Functions::sanitize_array_recursive( json_decode( $custom_plugin->post_content, true ) );

		// Get plugin name.
		$existing_data['name'] = sanitize_text_field( $custom_plugin_data['name'] );

		// Get slug.
		$existing_data['slug'] = sanitize_title( $slug );

		// Get plugin version.
		$existing_data['version'] = sanitize_text_field( $custom_plugin_data['version'] );

		// Get the required versions.
		$existing_data['requires']     = sanitize_text_field( $custom_plugin_data['requires'] );
		$existing_data['requires_php'] = sanitize_text_field( $custom_plugin_data['requiresPHP'] );

		// Get the short description from excerpt. Overwrite with readme later if needed.
		$existing_data['short_description'] = wp_kses_post( $custom_plugin_data['shortDescription'] );

		// Get the author and link to the download page for the plugin.
		$existing_data['author'] = sanitize_text_field( $custom_plugin_data['author'] );

		// Author/Download URL.
		$existing_data['homepage'] = esc_url_raw( $custom_plugin_data['homepage'] );

		// Set the download link to the download page.
		$existing_data['download_link'] = esc_url_raw( $custom_plugin_data['downloadLink'] );

		// Get the URL for the download.
		$existing_data['url'] = esc_url_raw( $custom_plugin_data['url'] );

		// Set last updated and mk.
		$existing_data['last_updated']    = gmdate( 'Y-m-d', strtotime( $custom_plugin_data['lastUpdated'] ) );
		$existing_data['last_updated_mk'] = gmdate( 'Y-m-d', strtotime( $custom_plugin_data['lastUpdated'] ) );

		// Set the plugin added date.
		$existing_data['added'] = gmdate( 'Y-m-d', strtotime( $custom_plugin_data['lastUpdated'] ) );

		// Get total number of downloads for the plugin.
		$existing_data['downloaded'] = absint( $custom_plugin_data['downloaded'] );

		// Get the total number of active installs (active licenses) for the download.
		$existing_data['active_installs'] = absint( $custom_plugin_data['activeInstalls'] );

		// Get tested WordPress version.
		$existing_data['tested'] = sanitize_text_field( $custom_plugin_data['tested'] );

		// Get contributors.
		$existing_data['contributors'] = sanitize_text_field( $custom_plugin_data['contributors'] );

		// Get rating.
		$existing_data['rating'] = sanitize_text_field( $custom_plugin_data['rating'] );

		// Get number of ratings.
		$existing_data['num_ratings'] = absint( $custom_plugin_data['numRatings'] );

		// Get the featured image URL which will be used for the icons. Format in array is 1x, 2x.
		$existing_data['icons'] = array();
		$post_thumbnail_id      = get_post_thumbnail_id( $custom_plugin->ID );
		if ( ! $post_thumbnail_id ) {
			$existing_data['icons'] = array(
				'1x' => Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' ),
				'2x' => Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' ),
			);
			return $existing_data;
		}
		$featured_image = wp_get_attachment_image_src( $post_thumbnail_id );
		if ( $featured_image ) {
			$existing_data['icons'] = array(
				'1x' => esc_url_raw( $featured_image[0] ),
				'2x' => esc_url_raw( $featured_image[0] ),
			);
		}

		// Get the plugin banners.
		$banner_high = $custom_plugin_data['pluginBannerUrl'] ?? Functions::get_plugin_url( 'assets/img/default-banner.png' );
		$banner_low  = $custom_plugin_data['pluginBannerUrl'] ?? Functions::get_plugin_url( 'assets/img/default-banner.png' );
		if ( $banner_high && $banner_low ) {
			$existing_data['banners'] = array(
				'high' => esc_url_raw( $banner_high ),
				'low'  => esc_url_raw( $banner_low ),
			);
		}

		// Set screenshots.
		$existing_data['screenshots'] = array();
		$existing_data['ratings']     = sanitize_text_field( $custom_plugin_data['rating'] );

		// Set reviews url.
		$existing_data['reviews_url'] = ''; // todo - do we need this?

		// Set custom plugin flag.
		$existing_data['is_custom_plugin'] = true;

		return $existing_data;
	}

	/**
	 * Handle the export of a plugin's JSON.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public static function rest_handle_get_plugin_json( $request ) {
		$slug     = sanitize_title( $request->get_param( 'slug' ) );
		$passcode = sanitize_text_field( $request->get_param( 'passcode' ) );

		$plugin = get_posts(
			array(
				'post_type' => 'wppic_custom_plugins',
				'name'      => sanitize_title( $slug ),
			)
		);

		if ( ! $plugin ) {
			return new \WP_REST_Response( array( 'message' => 'Plugin not found or not enabled for REST API' ), 404 );
		}
		$plugin = $plugin[0];

		// Check if plugi is enabled for REST API.
		$enabled_for_rest = sanitize_text_field( get_post_meta( $plugin->ID, 'enableRestApi', true ) );
		if ( 'true' !== $enabled_for_rest ) {
			return new \WP_REST_Response( array( 'message' => 'Plugin not found or not enabled for REST API' ), 403 );
		}

		// Check if passcode is correct.
		$rest_api_passcode = sanitize_text_field( get_post_meta( $plugin->ID, 'restApiPasscode', true ) );
		if ( $rest_api_passcode !== $passcode ) {
			return new \WP_REST_Response( array( 'message' => 'Invalid passcode' ), 403 );
		}

		$payload = self::generate_export_payload( array( $plugin->ID ) );

		return new \WP_REST_Response( $payload );
	}

	/**
	 * Check the permissions for the export of a plugin's JSON.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public static function rest_check_get_plugin_json_permissions( $request ) {
		// This can technically be public, but let's check the slug and see if it's enabled for the REST API.
		$slug   = $request->get_param( 'slug' );
		$plugin = get_posts(
			array(
				'post_type' => 'wppic_custom_plugins',
				'name'      => sanitize_title( $slug ),
			)
		);

		if ( ! $plugin ) {
			return new \WP_REST_Response( array( 'message' => 'Plugin not found or not enabled for REST API' ), 404 );
		}

		$plugin           = $plugin[0];
		$enabled_for_rest = sanitize_text_field( get_post_meta( $plugin->ID, 'enableRestApi', true ) );
		if ( ! $enabled_for_rest ) {
			return new \WP_REST_Response( array( 'message' => 'Plugin not found or not enabled for REST API' ), 403 );
		}

		$rest_api_passcode = sanitize_text_field( get_post_meta( $plugin->ID, 'restApiPasscode', true ) );
		$request_passcode  = $request->get_param( 'passcode' );
		return $rest_api_passcode === $request_passcode;
	}

	/**
	 * Handle the import of custom plugins from a REST API URL.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public static function rest_handle_import_from_rest( $request ) {
		$params   = $request->get_params();
		$rest_url = $params['restUrl'];

		$response = wp_safe_remote_get( esc_url_raw( $rest_url ) );
		if ( is_wp_error( $response ) ) {
			return new \WP_REST_Response( array( 'message' => 'Error fetching data from REST API. This request could have been blocked by a firewall or proxy.' ), 400 );
		}

		// Check error status code.
		if ( wp_remote_retrieve_response_code( $response ) !== 200 ) {
			return new \WP_REST_Response( array( 'message' => 'Error fetching data from REST API. Invalid response code: ' . wp_remote_retrieve_response_code( $response ) ), 400 );
		}

		$payload = json_decode( $response['body'], true );

		$checksum         = $payload['checksum'];
		$items            = $payload['items'];
		$payload_checksum = 'sha256:' . hash( 'sha256', json_encode( $items ) );

		if ( $checksum !== $payload_checksum ) {
			return new \WP_REST_Response( array( 'message' => 'Checksum mismatch' ), 400 );
		}

		// Store all errors here that are non-fatal and can be returned to the user.
		$errors       = array();
		$total_items  = count( $items );
		$current_item = 0;

		foreach ( $items as $item ) {
			$slug = $item['slug'];
			if ( self::check_plugin_slug( $slug ) ) {
				$errors[] = sprintf( __( 'Plugin slug %s already in use', 'wp-plugin-info-card' ), $slug );
				continue;
			}

			// Sanitize item fields and get into format.
			$item = Functions::sanitize_array_recursive( $item );

			// Get the image vars.
			$plugin_icon_url   = $item['pluginIconUrl'];
			$plugin_banner_url = $item['pluginBannerUrl'];

			// Validate the URLs.
			$plugin_icon_url   = esc_url_raw( wp_http_validate_url( $plugin_icon_url ) );
			$plugin_banner_url = esc_url_raw( wp_http_validate_url( $plugin_banner_url ) );

			$plugin_icon_url_id = null;
			if ( $plugin_icon_url ) {
				$plugin_icon_url_id = self::sideload_image( $plugin_icon_url );
				if ( ! is_wp_error( $plugin_icon_url_id ) ) {
					$item['pluginIconUrl']   = wp_get_attachment_url( $plugin_icon_url_id );
					$item['pluginIconUrlId'] = $plugin_icon_url_id;
				} else {
					$item['pluginIconUrl'] = '';
					$errors[]              = sprintf( __( 'Error sideloading plugin icon: %s', 'wp-plugin-info-card' ), $plugin_icon_url_id->get_error_message() );
				}
			}

			if ( $plugin_banner_url ) {
				$plugin_banner_url_id = self::sideload_image( $plugin_banner_url );
				if ( ! is_wp_error( $plugin_banner_url_id ) ) {
					$item['pluginBannerUrl']   = wp_get_attachment_url( $plugin_banner_url_id );
					$item['pluginBannerUrlId'] = $plugin_banner_url_id;
				} else {
					$item['pluginBannerUrl'] = '';
					$errors[]                = sprintf( __( 'Error sideloading plugin banner: %s', 'wp-plugin-info-card' ), $plugin_banner_url_id->get_error_message() );
				}
			}

			++$current_item;

			// Reconcile with fields.
			$item = array_intersect_key( $item, array_flip( self::$fields ) );

			/**
			 * Filter: wppic_import_custom_plugin_item.
			 *
			 * Filters the item prior to encoding. Use this to dynamically update ratings, downloads, etc.
			 *
			 * @param array $item The item to be imported.
			 *
			 * @return array The filtered item.
			 *
			 * @see self::$fields
			 */
			$item = apply_filters( 'wppic_import_custom_plugin_item', $item );

			$post_item_args = array(
				'post_type'    => 'wppic_custom_plugins',
				'post_title'   => sanitize_text_field( $item['name'] ),
				'post_name'    => sanitize_title( $item['slug'] ),
				'post_status'  => 'publish',
				'post_content' => wp_json_encode( $item ),
			);

			$post_id = wp_insert_post( $post_item_args );
			if ( is_wp_error( $post_id ) ) {
				$errors[] = sprintf( __( 'Error creating custom plugin: %s', 'wp-plugin-info-card' ), $post_id->get_error_message() );
				continue;
			} else {
				// Try to set featured image.
				if ( ! is_wp_error( $plugin_icon_url_id ) && $plugin_icon_url_id ) {
					set_post_thumbnail( $post_id, $plugin_icon_url_id );
				}
			}
		}

		return new \WP_REST_Response(
			array(
				'errors'       => $errors,
				'total_items'  => $total_items,
				'current_item' => $current_item,
			)
		);
	}

	/**
	 * Handle the import of custom plugins.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response The response object.
	 */
	public static function rest_handle_import( $request ) {
		$params    = $request->get_file_params();
		$json_file = $params['jsonFile'];

		$payload = json_decode( file_get_contents( $json_file['tmp_name'] ), true );

		$checksum         = $payload['checksum'];
		$items            = $payload['items'];
		$payload_checksum = 'sha256:' . hash( 'sha256', json_encode( $items ) );

		if ( $checksum !== $payload_checksum ) {
			return new \WP_REST_Response( array( 'message' => 'Checksum mismatch' ), 400 );
		}

		// Store all errors here that are non-fatal and can be returned to the user.
		$errors       = array();
		$total_items  = count( $items );
		$current_item = 0;

		foreach ( $items as $item ) {
			$slug = $item['slug'];
			if ( self::check_plugin_slug( $slug ) ) {
				$errors[] = sprintf( __( 'Plugin slug %s already in use', 'wp-plugin-info-card' ), $slug );
				continue;
			}

			// Sanitize item fields and get into format.
			$item = Functions::sanitize_array_recursive( $item );

			// Get the image vars.
			$plugin_icon_url   = $item['pluginIconUrl'];
			$plugin_banner_url = $item['pluginBannerUrl'];

			// Validate the URLs.
			$plugin_icon_url   = esc_url_raw( wp_http_validate_url( $plugin_icon_url ) );
			$plugin_banner_url = esc_url_raw( wp_http_validate_url( $plugin_banner_url ) );

			$plugin_icon_url_id = null;
			if ( $plugin_icon_url ) {
				$plugin_icon_url_id = self::sideload_image( $plugin_icon_url );
				if ( ! is_wp_error( $plugin_icon_url_id ) ) {
					$item['pluginIconUrl']   = wp_get_attachment_url( $plugin_icon_url_id );
					$item['pluginIconUrlId'] = $plugin_icon_url_id;
				} else {
					$item['pluginIconUrl'] = '';
					$errors[]              = sprintf( __( 'Error sideloading plugin icon: %s', 'wp-plugin-info-card' ), $plugin_icon_url_id->get_error_message() );
				}
			}

			if ( $plugin_banner_url ) {
				$plugin_banner_url_id = self::sideload_image( $plugin_banner_url );
				if ( ! is_wp_error( $plugin_banner_url_id ) ) {
					$item['pluginBannerUrl']   = wp_get_attachment_url( $plugin_banner_url_id );
					$item['pluginBannerUrlId'] = $plugin_banner_url_id;
				} else {
					$item['pluginBannerUrl'] = '';
					$errors[]                = sprintf( __( 'Error sideloading plugin banner: %s', 'wp-plugin-info-card' ), $plugin_banner_url_id->get_error_message() );
				}
			}

			++$current_item;

			// Reconcile with fields.
			$item = array_intersect_key( $item, array_flip( self::$fields ) );

			$post_item_args = array(
				'post_type'    => 'wppic_custom_plugins',
				'post_title'   => sanitize_text_field( $item['name'] ),
				'post_name'    => sanitize_title( $item['slug'] ),
				'post_status'  => 'publish',
				'post_content' => wp_json_encode( $item ),
			);

			$post_id = wp_insert_post( $post_item_args );
			if ( is_wp_error( $post_id ) ) {
				$errors[] = sprintf( __( 'Error creating custom plugin: %s', 'wp-plugin-info-card' ), $post_id->get_error_message() );
				continue;
			} else {
				// Try to set featured image.
				if ( ! is_wp_error( $plugin_icon_url_id ) && $plugin_icon_url_id ) {
					set_post_thumbnail( $post_id, $plugin_icon_url_id );
				}
			}
		}

		return new \WP_REST_Response(
			array(
				'errors'       => $errors,
				'total_items'  => $total_items,
				'current_item' => $current_item,
			)
		);
	}

	/**
	 * Sideload an image from a URL.
	 *
	 * @param string $url The URL of the image to sideload.
	 *
	 * @return int|WP_Error The attachment ID or WP_Error.
	 */
	private static function sideload_image( $url ) {
		// Check file extension.
		$extension = pathinfo( $url, PATHINFO_EXTENSION );

		// Strip all query vars from extension.
		$extension = explode( '?', $extension );
		$extension = $extension[0];

		// Start testing.
		if ( ! $extension ) {
			return new \WP_Error( 'invalid_url', __( 'File extension not found.', 'wp-plugin-info-card' ), array( 'status' => 400 ) );
		}
		$valid_extensions = Functions::get_supported_file_extensions();
		if ( ! in_array( $extension, $valid_extensions, true ) ) {
			return new \WP_Error( 'invalid_url', __( 'Invalid file extension.', 'wp-plugin-info-card' ), array( 'status' => 400 ) );
		}

		// Get the file.
		// Save the image to the media library.
		if ( ! function_exists( 'media_sideload_image' ) ) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/media.php';
		}
		$attachment_id = media_sideload_image( $url, 0, '', 'id' );

		return $attachment_id; // Returns the attachment ID or WP_Error.
	}

	/**
	 * Check if the plugin slug is already in use.
	 *
	 * @param string $slug The plugin slug to check.
	 *
	 * @return bool True if the plugin slug is already in use, false otherwise.
	 */
	private static function check_plugin_slug( $slug ) {
		// Try to get local slug from custom plugins post type.
		$maybe_custom_plugin_post = get_posts(
			array(
				'post_type' => 'wppic_custom_plugins',
				'name'      => sanitize_title( $slug ),
			)
		);
		$maybe_custom_slug        = '';
		if ( $maybe_custom_plugin_post ) {
			$maybe_custom_slug = $maybe_custom_plugin_post[0]->post_name;
		}

		return (bool) $maybe_custom_slug;
	}

	/**
	 * Check the permissions for the import/export.
	 *
	 * @return bool True if the user has the required permissions, false otherwise.
	 */
	public static function rest_check_permissions() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Generate the export payload for custom plugins.
	 *
	 * @param array $plugin_ids Array of plugin IDs to export.
	 *
	 * @return array $payload Array of payload data.
	 */
	public static function generate_export_payload( $plugin_ids ) {

		$items_for_export = array();
		foreach ( $plugin_ids as $plugin_id ) {
			$custom_plugin = get_post( $plugin_id );
			if ( ! $custom_plugin ) {
				wp_send_json_error(
					array(
						'message'     => __( 'Custom plugin not found', 'wp-plugin-info-card' ),
						'type'        => 'error',
						'dismissable' => true,
					)
				);
			}

			$custom_plugin_data = json_decode( $custom_plugin->post_content, true );
			if ( ! $custom_plugin_data ) {
				wp_send_json_error(
					array(
						'message'     => __( 'Custom plugin data not found', 'wp-plugin-info-card' ),
						'type'        => 'error',
						'dismissable' => true,
					)
				);
			}

			$custom_plugin_data = Functions::sanitize_array_recursive( $custom_plugin_data );

			// Force fields as strings.
			$fields_to_ints = array(
				'numRatings',
				'downloaded',
				'activeInstalls',
			);
			foreach ( $fields_to_ints as $field ) {
				$custom_plugin_data[ $field ] = (int) $custom_plugin_data[ $field ];
			}

			// Reconcile with fields.
			$custom_plugin_data = array_intersect_key( $custom_plugin_data, array_flip( self::$fields ) );

			$items_for_export[] = $custom_plugin_data;
		}

		$payload = array(
			'schema_version' => 1,
			'exported_by'    => 'wppic',
			'exported_at'    => gmdate( 'c' ),
			'items'          => $items_for_export,
		);

		$payload['checksum'] = 'sha256:' . hash( 'sha256', json_encode( $payload['items'] ) );

		return $payload;
	}
}
