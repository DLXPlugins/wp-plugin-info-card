<?php

/**
 * Output home wppic tab.
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
 * Output the home tab and content.
 */
class Main {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'wppic_admin_tabs', array( $this, 'add_home_tab' ), 1, 1 );
		add_filter( 'wppic_admin_sub_tabs', array( $this, 'add_home_home_sub_tab' ), 1, 3 );
		add_action( 'wppic_output_home', array( $this, 'output_home_content' ), 1, 3 );
		add_action( 'wppic_admin_enqueue_scripts_home', array( $this, 'admin_scripts' ) );
		add_action( 'wp_ajax_wppic_get_home_options', array( $this, 'ajax_get_options' ) );
	}

	/**
	 * Include admin scripts for the home screen.
	 */
	public function admin_scripts() {
		wp_enqueue_script(
			'wppic-admin-home',
			Functions::get_plugin_url( 'dist/wppic-admin-home.js' ),
			array( 'wp-blocks' ),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'wppic-admin-home',
			'wppicAdminHome',
			array(
				'getNonce'         => wp_create_nonce( 'wppic-admin-home-retrieve-options' ),
				'saveNonce'        => wp_create_nonce( 'wppic-save-options' ),
				'resetNonce'       => wp_create_nonce( 'wppic-reset-options' ),
				'clearCacheNonce'  => wp_create_nonce( 'wppic-clear-cache' ),
				'checkPluginNonce' => wp_create_nonce( 'wppic-check-plugin' ),
				'checkThemeNonce'  => wp_create_nonce( 'wppic-check-theme' ),
			)
		);
	}

	/**
	 * Retrieve options via Ajax for the home options.
	 */
	public function ajax_get_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'wppic-admin-home-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
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
	 * Add the home tab and callback actions.
	 *
	 * @param array $tabs Array of tabs.
	 *
	 * @return array of tabs.
	 */
	public function add_home_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'home',
			'action' => 'wppic_output_home',
			'url'    => Functions::get_settings_url( 'home' ),
			'label'  => _x( 'Home', 'Tab label as Home', 'wp-wppic-comments' ),
			'icon'   => 'home-heart',
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
	public function add_home_home_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'home' !== $current_tab ) {
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
	public function output_home_content( $tab, $sub_tab = '' ) {
		if ( 'home' === $tab ) {
			if ( empty( $sub_tab ) || 'home' === $sub_tab ) {
				?>
				<div id="wppic-tab-home"></div>
				<?php
			}
		}
	}
}
