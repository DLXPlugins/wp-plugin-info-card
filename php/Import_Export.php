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
				register_rest_route(
					'wppic/v1',
					'custom-plugins/import',
					array(
						'methods'             => 'POST',
						'callback'            => array( __CLASS__, 'rest_handle_import' ),
						'permission_callback' => array( __CLASS__, 'rest_check_permissions' ),
					)
				);
			}
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

		return new WP_REST_Response( $payload );
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
