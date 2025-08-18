<?php

/**
 * Output Custom Plugin wppic tab.
 *
 * @package wppic
 */

namespace MediaRon\WPPIC\Admin\Tabs;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use MediaRon\WPPIC\Functions;
use MediaRon\WPPIC\Options;


/**
 * Output the custom plugin tab and content.
 */
class Custom_Plugin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'wppic_admin_tabs', array( $this, 'add_custom_plugin_tab' ), 1, 1 );
		add_filter( 'wppic_admin_sub_tabs', array( $this, 'add_custom_plugin_sub_tab' ), 1, 3 );
		add_action( 'wppic_output_custom-plugin-cards', array( $this, 'output_custom_plugin_content' ), 1, 3 );
		add_action( 'wppic_admin_enqueue_scripts_custom-plugin-cards', array( $this, 'admin_scripts' ) );
		add_action( 'wp_ajax_wppic_get_custom-plugin-cards_options', array( $this, 'ajax_get_options' ) );
	}

	/**
	 * Include admin scripts for the home screen.
	 */
	public function admin_scripts() {
		$deps = require Functions::get_plugin_dir( 'dist/wppic-admin-custom-plugin.asset.php' );
		// Rename wp-escapeHtml to wp-escape-html.
		foreach ( $deps['dependencies'] as $key => $value ) {
			if ( 'wp-escapeHtml' === $value ) {
				$deps['dependencies'][ $key ] = 'wp-escape-html';
			}
		}
		wp_enqueue_script(
			'wppic-admin-custom-plugin',
			Functions::get_plugin_url( 'dist/wppic-admin-custom-plugin.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
		wp_localize_script(
			'wppic-admin-custom-plugin',
			'wppicAdminCustomPlugin',
			array(
				'getNonce'                   => wp_create_nonce( 'wppic-admin-custom-plugin-retrieve-options' ),
				'getCustomPlugins'           => wp_create_nonce( 'wppic-get-custom-plugins' ),
				'saveNonce'                  => wp_create_nonce( 'wppic-save-custom-plugin' ),
				'saveAdvancedNonce'          => wp_create_nonce( 'wppic-admin-custom-plugin-save-advanced-options' ),
				'checkPluginSlugNonce'       => wp_create_nonce( 'wppic-check-plugin-slug' ),
				'deleteCustomPlugin'         => wp_create_nonce( 'wppic-delete-custom-plugin' ),
				'defaultPluginIcon'          => Functions::get_plugin_url( 'assets/img/default-plugin-icon.png' ),
				'exportNonce'                => wp_create_nonce( 'wppic-export-custom-plugins' ),
				'restNonce'                  => wp_create_nonce( 'wp_rest' ),
				'restUrl'                    => get_rest_url( null, 'wppic/v1/custom-plugins/import' ),
				'customPluginsRestBase'      => get_rest_url( null, 'wppic/v1/plugins/' ),
				'importPluginRestUrl'        => get_rest_url( null, 'wppic/v1/custom-plugins/import-from-rest' ),
				'importPluginRestRefreshUrl' => get_rest_url( null, 'wppic/v1/custom-plugins/import-from-rest/refresh' ),
				'tempPasscode'               => wp_generate_password( 16, false ),
				'clearCacheNonce'            => wp_create_nonce( 'wppic-clear-cache' ),
			)
		);

		// Enqueue media library.
		wp_enqueue_media();
	}

	/**
	 * Retrieve options via Ajax for the home options.
	 */
	public function ajax_get_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'wppic-admin-custom-plugin-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'wp-plugin-info-card' ),
				)
			);
		}

		$options            = Options::get_options();
		$options['version'] = Functions::get_plugin_version(); // Add version for local storage.
		$options            = Functions::sanitize_array_recursive( $options );
		wp_send_json_success( $options );
	}

	/**
	 * Add the home tab and callback actions.
	 *
	 * @param array $tabs Array of tabs.
	 *
	 * @return array of tabs.
	 */
	public function add_custom_plugin_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'custom-plugin-cards',
			'action' => 'wppic_output_custom_plugin_cards',
			'url'    => Functions::get_settings_url( 'custom-plugin-cards' ),
			'label'  => _x( 'Custom Plugin Cards', 'Tab label as Custom Plugin Cards', 'wp-plugin-info-card' ),
			'icon'   => 'wppic-flaticon-custom-plugin',
		);
		return $tabs;
	}

	/**
	 * Add the home home tab and callback actions.
	 *
	 * @param array  $tabs        Array of tabs.
	 * @param string $current_tab The current tab selected.
	 * @param string $sub_tab     The current sub-tab selected.
	 *
	 * @return array of tabs.
	 */
	public function add_custom_plugin_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'custom-plugin-cards' !== $current_tab ) {
			return $tabs;
		}
		return $tabs;
	}

	/**
	 * Begin Main routing for the various outputs.
	 *
	 * @param string $tab     Main tab.
	 * @param string $sub_tab Sub tab.
	 */
	public function output_custom_plugin_content( $tab, $sub_tab = '' ) {
		if ( 'custom-plugin-cards' === $tab ) {
			?>
			<div id="wppic-tab-custom-plugin"></div>
			<?php
		}
	}
}
