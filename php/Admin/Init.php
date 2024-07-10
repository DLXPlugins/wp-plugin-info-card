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
		add_action( 'wp_ajax_wppic_check_theme', array( $this, 'ajax_check_theme' ) );
		add_action( 'wp_ajax_wppic_get_sample_plugin', array( $this, 'ajax_get_sample_plugin' ) );

		// Init tabs.
		new Tabs\Main();
		new Tabs\EDD();
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
