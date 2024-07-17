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
 * Output the EDD tab and content.
 */
class EDD {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Check if EDD or EDD pro is active.
		if ( Functions::is_activated( 'easy-digital-downloads/easy-digital-downloads.php' ) || Functions::is_activated( 'easy-digital-downloads-pro/easy-digital-downloads.php' ) ) {
			add_filter( 'wppic_admin_tabs', array( $this, 'add_edd_tab' ), 1, 1 );
			add_filter( 'wppic_admin_sub_tabs', array( $this, 'add_edd_sub_tab' ), 1, 3 );
			add_action( 'wppic_output_edd', array( $this, 'output_edd_tab' ), 1, 3 );
			add_action( 'wppic_admin_enqueue_scripts_edd', array( $this, 'admin_scripts' ) );
			add_action( 'wp_ajax_wppic_get_edd_options', array( $this, 'ajax_get_options' ) );
		}
	}

	/**
	 * Include admin scripts for the edd screen.
	 */
	public function admin_scripts() {
		$deps = require Functions::get_plugin_dir( 'dist/wppic-admin-edd.asset.php' );
		wp_enqueue_media();
		wp_enqueue_script(
			'wppic-admin-edd',
			Functions::get_plugin_url( 'dist/wppic-admin-edd.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
		wp_localize_script(
			'wppic-admin-edd',
			'wppicAdminEDD',
			array(
				'getNonce'                      => wp_create_nonce( 'wppic-admin-edd-retrieve-options' ),
				'saveNonce'                     => wp_create_nonce( 'wppic-save-options' ),
				'resetNonce'                    => wp_create_nonce( 'wppic-reset-options' ),
				'softwareLicensingInstalled'    => Functions::is_activated( 'edd-software-licensing/edd-software-licenses.php' ),
				'eddReviewsInstalled'           => Functions::is_activated( 'edd-reviews/edd-reviews.php' ),
				'reviewsProductImage'           => Functions::get_plugin_url( 'assets/img/reviews-product-download-image.png' ),
				'softwareLicensingProductImage' => Functions::get_plugin_url( 'assets/img/software-licensing-product-image.png' ),
			)
		);
	}

	/**
	 * Retrieve options via Ajax for the home options.
	 */
	public function ajax_get_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'wppic-admin-edd-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'wp-wppic-comments' ),
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
	public function add_edd_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'edd',
			'action' => 'wppic_output_edd',
			'url'    => Functions::get_settings_url( 'edd' ),
			'label'  => _x( 'EDD', 'Tab label as Easy digital downloads', 'wp-wppic-comments' ),
			'icon'   => 'wppic-edd',
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
	public function add_edd_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'edd' !== $current_tab ) {
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
	public function output_edd_tab( $tab, $sub_tab = '' ) {
		if ( 'edd' === $tab ) {
			if ( empty( $sub_tab ) || 'edd' === $sub_tab ) {
				?>
				<div id="wppic-tab-edd"></div>
				<?php
			}
		}
	}
}
