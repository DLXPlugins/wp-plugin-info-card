<?php

/**
 * Output plugin screenshots wppic tab.
 *
 * @package wppic
 */

namespace MediaRon\WPPIC\Admin\Tabs;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use MediaRon\WPPIC\Functions;
use MediaRon\WPPIC\Options;

/**
 * Output the lazy-load tab and content.
 */
class Plugin_Screenshots {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'wppic_admin_tabs', array( $this, 'add_plugin_screenshots_tab' ), 1, 1 );
		add_filter( 'wppic_admin_sub_tabs', array( $this, 'add_plugin_screenshots_sub_tab' ), 1, 3 );
		add_filter( 'wppic_output_plugin-screenshots', array( $this, 'output_plugin_screenshots_content' ), 1, 3 );
		add_action( 'wp_ajax_wppic_get_screenshot_options', array( $this, 'ajax_get_options' ) );
		add_action( 'wppic_admin_enqueue_scripts_plugin-screenshots', array( $this, 'admin_scripts' ) );
	}

	/**
	 * Include admin scripts for the home screen.
	 */
	public function admin_scripts() {
		wp_enqueue_script(
			'wppic-admin-plugin-screenshots',
			Functions::get_plugin_url( 'dist/wppic-admin-screenshots.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'wppic-admin-plugin-screenshots',
			'wppicAdminScreenshots',
			array(
				'getNonce'   => wp_create_nonce( 'wppic-admin-screenshots-retrieve-options' ),
				'saveNonce'  => wp_create_nonce( 'wppic-save-options' ),
				'resetNonce' => wp_create_nonce( 'wppic-reset-options' ),
			)
		);
	}

	/**
	 * Retrieve options via Ajax for the screenshot options.
	 */
	public function ajax_get_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'wppic-admin-screenshots-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'wp-wppic-comments' ),
				)
			);
		}

		$options = Options::get_options();
		$options = Functions::sanitize_array_recursive( $options );
		wp_send_json_success( $options );
	}

	/**
	 * Add the main tab and callback actions.
	 *
	 * @param array $tabs Array of tabs.
	 *
	 * @return array of tabs.
	 */
	public function add_plugin_screenshots_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'plugin-screenshots',
			'action' => 'wppic_output_plugin_screenshots',
			'url'    => Functions::get_settings_url( 'plugin-screenshots' ),
			'label'  => _x( 'Plugin Screenshots', 'Tab label as Plugin Screenshots', 'wp-ajaxify-comments' ),
			'icon'   => 'wppic-image',
		);
		return $tabs;
	}

	/**
	 * Add the main main tab and callback actions.
	 *
	 * @param array  $tabs        Array of tabs.
	 * @param string $current_tab The current tab selected.
	 * @param string $sub_tab     The current sub-tab selected.
	 *
	 * @return array of tabs.
	 */
	public function add_plugin_screenshots_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'plugin-screenshots' !== $current_tab ) {
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
	public function output_plugin_screenshots_content( $tab, $sub_tab = '' ) {
		if ( 'plugin-screenshots' === $tab ) {
			if ( empty( $sub_tab ) || 'plugin-screenshots' === $sub_tab ) {
				?>
				<div id="wppic-tab-plugin-screenshots"></div>
				<?php
			}
		}
	}
}
