<?php

/**
 * Output screenshots wppic tab.
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
 * Output the screenshots tab and content.
 */
class Screenshots {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'wppic_admin_tabs', array( $this, 'add_screenshots_tab' ), 1, 1 );
		add_filter( 'wppic_admin_sub_tabs', array( $this, 'add_screenshots_sub_tab' ), 1, 3 );
		add_filter( 'wppic_output_screenshots', array( $this, 'output_screenshots_content' ), 1, 3 );
		add_action( 'wp_ajax_wppic_get_screenshot_options', array( $this, 'ajax_get_options' ) );
		add_action( 'wppic_admin_enqueue_scripts_screenshots', array( $this, 'admin_scripts' ) );
	}

	/**
	 * Include admin scripts for the home screen.
	 */
	public function admin_scripts() {
		$options               = Options::get_options();
		$screenshots_installed = (bool) $options['screenshots_installed'];

		// Get screenshot build URL and add cache buster if not installed.
		$screenshots_script_url = Functions::get_plugin_url( 'dist/wppic-admin-screenshots.js' );
		if ( ! $screenshots_installed ) {
			$screenshots_script_url = add_query_arg(
				array(
					'screenshots_installed' => 0,
				),
				$screenshots_script_url
			);
		}
		wp_enqueue_script(
			'wppic-admin-screenshots',
			esc_url_raw( $screenshots_script_url ),
			array(),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'wppic-admin-screenshots',
			'wppicAdminScreenshots',
			array(
				'getNonce'             => wp_create_nonce( 'wppic-admin-screenshots-retrieve-options' ),
				'saveNonce'            => wp_create_nonce( 'wppic-save-options' ),
				'resetNonce'           => wp_create_nonce( 'wppic-reset-options' ),
				'screenshotsInstalled' => $screenshots_installed,
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
	public function add_screenshots_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'screenshots',
			'action' => 'wppic_output_screenshots',
			'url'    => Functions::get_settings_url( 'screenshots' ),
			'label'  => _x( 'Screenshots', 'Tab label as Screenshots', 'wp-plugin-info-card' ),
			'icon'   => 'wppic-flaticon-screenshot',
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
	public function add_screenshots_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'screenshots' !== $current_tab ) {
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
	public function output_screenshots_content( $tab, $sub_tab = '' ) {
		if ( 'screenshots' === $tab ) {
			if ( empty( $sub_tab ) || 'screenshots' === $sub_tab ) {
				?>
				<div id="wppic-tab-screenshots"></div>
				<?php
			}
		}
	}
}
