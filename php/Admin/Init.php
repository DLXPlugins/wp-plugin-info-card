<?php
/**
 * Set up add plugin functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC\Admin;

use MediaRon\WPPIC\Functions;
use MediaRon\WPPIC\Options;
use MediaRon\WPPIC\Screenshots_Table;

/**
 * Init admin class for WPPIC.
 */
class Init {

	/**
	 * Holds the URL to the admin panel page
	 *
	 * @since 1.0.0
	 * @static
	 * @var string $url
	 */
	private static $url = '';

	/**
	 * Main constructor.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		add_action( 'wp_ajax_wppic_save_options', array( $this, 'ajax_save_options' ) );
		add_action( 'wp_ajax_wppic_reset_options', array( $this, 'ajax_reset_options' ) );
		add_action( 'wp_ajax_wppic_clear_cache', array( $this, 'ajax_clear_cache' ) );
		add_action( 'wp_ajax_wppic_clear_cache_options', array( $this, 'ajax_clear_cache_options' ) );
		add_action( 'wp_ajax_wppic_check_plugin', array( $this, 'ajax_check_plugin' ) );
		add_action( 'wp_ajax_wppic_check_plugin_slug', array( $this, 'ajax_check_plugin_slug' ) );
		add_action( 'wp_ajax_wppic_check_theme', array( $this, 'ajax_check_theme' ) );
		add_action( 'wp_ajax_wppic_get_sample_plugin', array( $this, 'ajax_get_sample_plugin' ) );

		// Actions for custom plugins.
		add_action( 'wp_ajax_wppic_save_custom_plugin', array( $this, 'ajax_save_custom_plugin' ) );
		add_action( 'wp_ajax_wppic_delete_custom_plugin', array( $this, 'ajax_delete_custom_plugin' ) );
		add_action( 'wp_ajax_wppic_get_custom_plugins', array( $this, 'ajax_get_custom_plugins' ) );
		add_action( 'wp_ajax_wppic_delete_custom_plugin', array( $this, 'ajax_delete_custom_plugin' ) );
		add_action( 'wp_ajax_wppic_get_custom_plugin_data', array( $this, 'ajax_get_custom_plugin_data' ) );
		add_action( 'wp_ajax_wppic_export_custom_plugin', array( $this, 'ajax_export_custom_plugin' ) );

		// Init tabs.
		new Tabs\Main();
		new Tabs\EDD();
		new Tabs\Custom_Plugin();
	}

	/**
	 * Export a custom plugin via Ajax.
	 */
	public function ajax_export_custom_plugin() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce     = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ) );
		$plugin_ids = filter_input( INPUT_GET, 'pluginIds', FILTER_DEFAULT );
		if ( ! wp_verify_nonce( $nonce, 'wppic-export-custom-plugins' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		// Format plugin ids into array.
		if ( ! $plugin_ids ) {
			wp_send_json_error(
				array(
					'message'     => __( 'No plugin IDs provided', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		$plugin_ids = explode( ',', $plugin_ids );
		$plugin_ids = array_map( 'absint', $plugin_ids );

		$fields = array(
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
			$custom_plugin_data = array_intersect_key( $custom_plugin_data, array_flip( $fields ) );

			$items_for_export[] = $custom_plugin_data;
		}

		$payload = array(
			'schema_version' => 1,
			'exported_at'    => gmdate( 'c' ),
			'items'          => $items_for_export,
		);

		$payload['checksum'] = 'sha256:' . hash( 'sha256', json_encode( $payload['items'] ) );

		$filename_slug = sanitize_file_name( 'wppic-custom-plugins-export.json' );

		// Output json filename (prompt save as).
		header( 'Content-Disposition: attachment; filename="' . $filename_slug . '"' );
		header( 'Content-Type: application/json; charset=utf-8' );
		echo json_encode( $payload );
		exit;
	}

	/**
	 * Get custom plugins via Ajax.
	 */
	public function ajax_delete_custom_plugin() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-delete-custom-plugin' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		$plugin_ids = filter_input( INPUT_POST, 'pluginIds', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		foreach ( $plugin_ids as $plugin_id ) {
			$plugin_id = absint( $plugin_id );
			wp_delete_post( $plugin_id, true );
		}

		wp_send_json_success(
			array(
				'message'     => __( 'Plugin deleted', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
			)
		);
	}

	/**
	 * Get custom plugin data via Ajax.
	 */
	public function ajax_get_custom_plugin_data() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		$id    = absint( filter_input( INPUT_POST, 'id', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-edit-custom-plugin-' . $id ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		$custom_plugin = get_post( $id );
		if ( ! $custom_plugin ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Custom plugin not found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		$return = array(
			'id'      => absint( $custom_plugin->ID ),
			'title'   => sanitize_text_field( $custom_plugin->post_title ),
			'slug'    => sanitize_title( $custom_plugin->post_name ),
			'content' => json_decode( $custom_plugin->post_content, true ),
			'icon'    => get_the_post_thumbnail_url( $custom_plugin->ID, 'full' ),
		);

		wp_send_json_success(
			array(
				'data' => $return,
			)
		);
	}

	/**
	 * Get custom plugins via Ajax.
	 */
	public function ajax_get_custom_plugins() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-get-custom-plugins' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		$search         = sanitize_text_field( urldecode( filter_input( INPUT_POST, 'search', FILTER_DEFAULT ) ) );
		$order          = sanitize_text_field( filter_input( INPUT_POST, 'order', FILTER_DEFAULT ) );
		$orderby        = sanitize_text_field( filter_input( INPUT_POST, 'orderby', FILTER_DEFAULT ) );
		$paged          = absint( filter_input( INPUT_POST, 'paged', FILTER_DEFAULT ) );
		$posts_per_page = absint( filter_input( INPUT_POST, 'perPage', FILTER_DEFAULT ) );

		// Gather post type args.
		$post_type_args = array(
			'post_type'      => 'wppic_custom_plugins',
			'posts_per_page' => $posts_per_page,
			'post_status'    => 'publish',
			'order'          => $order,
			'orderby'        => $orderby,
		);
		if ( $search && ! empty( $search ) ) {
			$post_type_args['s'] = $search;
		}
		if ( $paged && ! empty( $paged ) ) {
			$post_type_args['paged'] = $paged;
		}

		$custom_plugins      = get_posts( $post_type_args );
		$custom_plugins_data = array();

		foreach ( $custom_plugins as $custom_plugin ) {
			$custom_plugins_data[] = array(
				'id'          => $custom_plugin->ID,
				'title'       => $custom_plugin->post_title,
				'slug'        => $custom_plugin->post_name,
				'content'     => json_decode( $custom_plugin->post_content, true ),
				'icon'        => get_the_post_thumbnail_url( $custom_plugin->ID, 'full' ),
				'editNonce'   => wp_create_nonce( 'wppic-edit-custom-plugin-' . $custom_plugin->ID ),
				'saveNonce'   => wp_create_nonce( 'wppic-save-custom-plugin-' . $custom_plugin->ID ),
				'exportNonce' => wp_create_nonce( 'wppic-export-custom-plugin-' . $custom_plugin->ID ),
			);
		}

		wp_send_json_success(
			array(
				'customPlugins' => $custom_plugins_data,
			)
		);
	}

	/**
	 * Save a custom plugin via Ajax.
	 */
	public function ajax_save_custom_plugin() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$form_data  = filter_input( INPUT_POST, 'wppicFormData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$is_editing = filter_input( INPUT_POST, 'isEditing', FILTER_VALIDATE_BOOLEAN );

		// Verify nonce from form data.
		$nonce = sanitize_text_field( $form_data['nonce'] );
		if ( false && ! wp_verify_nonce( $nonce, 'wppic-save-custom-plugin' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		$post_id_to_edit = absint( $form_data['post_id'] ?? 0 );
		unset( $form_data['nonce'] );
		unset( $form_data['isEditing'] );
		unset( $form_data['postId'] );

		/**
		 * Filter: wppic_custom_plugin_form_data.
		 *
		 * Filters the form data before saving. This is eventually saved in post content.
		 *
		 * @param array $form_data The form data.
		 */
		$form_data = Functions::sanitize_array_recursive(
			apply_filters(
				'wppic_custom_plugin_form_data',
				$form_data
			)
		);

		$maybe_custom_plugin_post = get_posts(
			array(
				'post_type'     => 'wppic_custom_plugins',
				'post_name__in' => array( sanitize_title( $form_data['slug'] ) ),
				'post_status'   => 'publish',
			)
		);
		$maybe_custom_slug        = '';
		if ( $maybe_custom_plugin_post ) {
			$maybe_custom_slug = $maybe_custom_plugin_post[0]->post_name;
		}

		if ( $maybe_custom_slug && $maybe_custom_slug !== $form_data['slug'] && ! $is_editing ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Duplicate plugin slug found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
					'customSlug'  => sanitize_title( $maybe_custom_slug ),
				)
			);
		}

		// No competing slug found, so we can create the post and save the data within the content.
		if ( $is_editing && $post_id_to_edit ) {
			wp_update_post(
				array(
					'ID'           => $post_id_to_edit,
					'post_title'   => sanitize_text_field( $form_data['name'] ),
					'post_name'    => sanitize_title( $form_data['slug'] ),
					'post_content' => wp_json_encode( $form_data ),
				)
			);
			$post_id = $post_id_to_edit;
		} else {
			$post_id = wp_insert_post(
				array(
					'post_type'    => 'wppic_custom_plugins',
					'post_title'   => sanitize_text_field( $form_data['name'] ),
					'post_name'    => sanitize_title( $form_data['slug'] ),
					'post_content' => wp_json_encode( $form_data ),
					'post_status'  => 'publish',
				)
			);
		}

		// Save icon as featured image.
		if ( isset( $form_data['custom_plugin_icon_id'] ) && $form_data['custom_plugin_icon_id'] ) {
			set_post_thumbnail( $post_id, $form_data['custom_plugin_icon_id'] );
		}

		/**
		 * Action: wppic_after_save_custom_plugin.
		 *
		 * Fires after saving a custom plugin.
		 *
		 * @param int   $post_id The post ID.
		 * @param array $form_data The form data.
		 */
		do_action( 'wppic_after_save_custom_plugin', $post_id, $form_data );

		wp_send_json_success(
			array(
				'message'     => __( 'Plugin saved', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
				'postId'      => $post_id,
			)
		);
	}



	/**
	 * Check the plugin slug via Ajax.
	 */
	public function ajax_check_plugin() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-check-plugin' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		$plugin_slug = sanitize_text_field( filter_input( INPUT_POST, 'slug', FILTER_DEFAULT ) );

		if ( ! $plugin_slug ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Plugin not found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		$plugin_data = wppic_api_parser( 'plugin', $plugin_slug );
		if ( ! $plugin_data ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Plugin not found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		wp_send_json_success(
			array(
				'message'     => __( 'Plugin found', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
				'pluginData'  => $plugin_data,
			)
		);
	}

	/**
	 * Check the plugin slug for .org and local plugins.
	 */
	public function ajax_check_plugin_slug() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-check-plugin-slug' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		// Ensure slug is sanitized.
		$raw_plugin_slug = sanitize_text_field( filter_input( INPUT_POST, 'slug', FILTER_DEFAULT ) );
		$plugin_slug     = sanitize_title( filter_input( INPUT_POST, 'slug', FILTER_DEFAULT ) );
		if ( $raw_plugin_slug !== $plugin_slug ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Invalid plugin slug', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		// Try to get local slug from custom plugins post type.
		$maybe_custom_plugin_post = get_posts(
			array(
				'post_type' => 'wppic_custom_plugins',
				'name'      => $plugin_slug,
			)
		);
		$maybe_custom_slug        = '';
		if ( $maybe_custom_plugin_post ) {
			$maybe_custom_slug = $maybe_custom_plugin_post[0]->post_name;
		}

		if ( $maybe_custom_slug ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Duplicate plugin slug found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
					'customSlug'  => sanitize_title( $maybe_custom_slug ),
				)
			);
		}

		$plugin_data = wppic_api_parser( 'plugin', sanitize_title( $plugin_slug ) );
		if ( $plugin_data ) {
			wp_send_json_success(
				array(
					'message'     => __( 'A plugin with this slug already exists on WordPress.org. If left as-is, this plugin will override .org data for the slug.', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
					'display'     => true,
				)
			);
		}
		wp_send_json_success(
			array(
				'message'     => __( 'The plugin slug is available.', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
				'display'     => false,
			)
		);
	}

	/**
	 * Check a sample plugin via Ajax.
	 */
	public function ajax_get_sample_plugin() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-admin-get-sample-plugin' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		// Some free plugins.
		$plugin_slugs = array(
			'wp-ajaxify-comments',
			'wp-plugin-info-card',
			'simple-comment-editing',
			'highlight-and-share',
		);
		$plugin_slug  = $plugin_slugs[ array_rand( $plugin_slugs ) ];
		/**
		 * Filter the plugin slug to get.
		 *
		 * @param string $plugin_slug The plugin slug to get.
		 */
		$plugin_slug = apply_filters( 'wppic_admin_sample_plugin_slug', $plugin_slug );
		$plugin_data = wppic_api_parser( 'plugin', $plugin_slug );
		if ( ! $plugin_data ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Plugin not found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		wp_send_json_success(
			array(
				'message'     => __( 'Plugin found', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
				'pluginData'  => $plugin_data,
			)
		);
	}

	/**
	 * Check the plugin slug via Ajax.
	 */
	public function ajax_check_theme() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-check-theme' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		$theme_slug = sanitize_text_field( filter_input( INPUT_POST, 'slug', FILTER_DEFAULT ) );

		if ( ! $theme_slug ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Theme not found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		$theme_data = wppic_api_parser( 'theme', $theme_slug );
		if ( ! $theme_data ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Theme not found', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		wp_send_json_success(
			array(
				'message'     => __( 'Plugin found', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
				'pluginData'  => $theme_data,
			)
		);
	}

	/**
	 * Clear Cache.
	 */
	public function ajax_clear_cache() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-clear-cache' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		// Clear cache.
		wppic_delete_transients();

		wp_send_json_success(
			array(
				'message'     => __( 'Cache cleared', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
			)
		);
	}

	/**
	 * Clear Cache Options
	 */
	public function ajax_clear_cache_options() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( $nonce, 'wppic-clear-cache' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		// Clear cache.
		\wppic_delete_options_cache();

		wp_send_json_success(
			array(
				'message'     => __( 'Cache cleared', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
			)
		);
	}


	/**
	 * Save options via Ajax.
	 */
	public function ajax_save_options() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$options = Options::get_options();
		// Get posted options.
		$posted_options = filter_input( INPUT_POST, 'wppicFormData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$nonce          = sanitize_text_field( $posted_options['saveNonce'] );

		if ( ! wp_verify_nonce( $nonce, 'wppic-save-options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}

		// Make sure `list` and `theme-list` vars are set.
		if ( ! isset( $posted_options['list'] ) ) {
			$posted_options['list'] = array();
		}
		if ( ! isset( $posted_options['theme-list'] ) ) {
			$posted_options['theme-list'] = array();
		}

		// Validate options.
		$validated_options = Functions::sanitize_array_recursive( $posted_options );

		// Merge options.
		$validated_options = wp_parse_args( $validated_options, $options );

		// Save options.
		Options::update_options( $validated_options );

		wp_send_json_success(
			array(
				'message'     => __(
					'Options saved',
					'wp-plugin-info-card'
				),
				'type'        => 'success',
				'dismissable' => true,
			)
		);
	}

	/**
	 * Reset options via Ajax.
	 */
	public function ajax_reset_options() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$options        = Options::get_options();
		$posted_options = filter_input( INPUT_POST, 'wppicFormData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$nonce          = sanitize_text_field( $posted_options['resetNonce'] );

		if ( ! wp_verify_nonce( $nonce, 'wppic-reset-options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce verification failed', 'wp-plugin-info-card' ),
					'type'        => 'error',
					'dismissable' => true,
				)
			);
		}
		// Loop through form data, replace with defaults.
		$options_defaults = Options::get_defaults();
		foreach ( $posted_options as $key => $option_value ) {
			if ( ! isset( $options_defaults[ $key ] ) ) {
				$posted_options[ $key ] = $option_value;
			} else {
				$posted_options[ $key ] = $options_defaults[ $key ];
			}
			if ( 'list' === $key || 'theme-list' === $key ) {
				$posted_options[ $key ] = array();
			}
		}

		// Gather existing options.
		$options = Options::get_options();

		// Loop through form data and update options. Keys must exist in $options.
		foreach ( $posted_options as $key => $option_value ) {
			if ( ! isset( $options[ $key ] ) ) {
				continue;
			}
			$options[ $key ] = $option_value;
		}

		wp_send_json_success(
			array(
				'message'     => __( 'Options reset', 'wp-plugin-info-card' ),
				'type'        => 'success',
				'dismissable' => true,
				'formData'    => $posted_options,
			)
		);
	}

	/**
	 * Output admin scripts/styles.
	 */
	public function admin_scripts() {
		$screen = get_current_screen();
		if ( isset( $screen->base ) && 'settings_page_wp-plugin-info-card' === $screen->base ) {
			wp_enqueue_style(
				'wppic-styles-admin',
				Functions::get_plugin_url( 'dist/wppic-admin.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);

			// Get current tab and trigger action.
			$current_tab = Functions::get_admin_tab();
			if ( empty( $current_tab ) ) {
				$current_tab = 'home';
			}
			do_action( 'wppic_admin_enqueue_scripts_' . $current_tab );

			// Register global dummy script.
			wp_register_script(
				'wppic-admin-null',
				''
			);
			wp_enqueue_script( 'wppic-admin-null' );
			wp_localize_script(
				'wppic-admin-null',
				'wppicAdmin',
				array(
					'getPluginNonce'       => wp_create_nonce( 'wppic-admin-get-sample-plugin' ),
					'wppic_banner_default' => Functions::get_plugin_url( 'assets/img/default-banner.png' ),
					'pluginVersion'        => Functions::get_plugin_version(),
				)
			);
			wp_localize_script(
				'wppic-admin-null',
				'wppic',
				array(
					'wppic_banner_default' => Functions::get_plugin_url( 'assets/img/default-banner.png' ),
				)
			);
		}
	}
}
