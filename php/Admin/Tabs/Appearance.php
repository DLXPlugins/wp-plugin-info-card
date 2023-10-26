<?php
/**
 * Output Appearance WPAC tab.
 *
 * @package WPAC
 */

namespace DLXPlugins\WPAC\Admin\Tabs;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use DLXPlugins\WPAC\Functions;
use DLXPlugins\WPAC\Options;

/**
 * Output the appearance tab and content.
 */
class Appearance {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'ajaxify_comments_admin_tabs', array( $this, 'add_appearance_tab' ), 1, 1 );
		add_filter( 'ajaxify_comments_admin_sub_tabs', array( $this, 'add_appearance_sub_tab' ), 1, 3 );
		add_filter( 'ajaxify_comments_output_appearance', array( $this, 'output_appearance_content' ), 1, 3 );
		add_action( 'wpac_admin_enqueue_scripts_appearance', array( $this, 'admin_scripts' ) );
		add_action( 'wp_ajax_wpac_get_appearance_options', array( $this, 'ajax_get_options' ) );
	}

	/**
	 * Callback for the theme color palette.
	 *
	 * @param array $palette {.
	 *  @type string $name  Name of the color.
	 *  @type string $slug  Slug of the color.
	 *  @type string $color Color hex code.
	 * }
	 *
	 * @return array new color palette.
	 */
	public function theme_color_palette( $palette ) {
		$palette = array(
			array(
				'name'  => __( 'Black', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-black',
				'color' => '#000000',
			),
			array(
				'name'  => __( 'White', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-white',
				'color' => '#ffffff',
			),
			array(
				'name'  => __( 'Success', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-success',
				'color' => '#008000',
			),
			array(
				'name'  => __( 'Error', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-error',
				'color' => '#ff0000',
			),
		);
		return $palette;
	}

	/**
	 * Include admin scripts for the home screen.
	 */
	public function admin_scripts() {
		wp_enqueue_script(
			'wpac-admin-appearance',
			Functions::get_plugin_url( 'dist/wpac-admin-appearance-js.js' ),
			array( 'wpac-jquery-block-ui' ),
			Functions::get_plugin_version(),
			true
		);
		wp_enqueue_script(
			'wpac-jquery-block-ui',
			Functions::get_plugin_url( 'dist/wpac-frontend-jquery-blockUI.js' ),
			array( 'jquery' ),
			Functions::get_plugin_version(),
			true
		);
		add_filter( 'ajaxify/comments/theme_color_palette', array( $this, 'theme_color_palette' ), 1, 1 );
		wp_localize_script(
			'wpac-admin-appearance',
			'wpacAdminAppearance',
			array(
				'getNonce'   => wp_create_nonce( 'wpac-admin-appearance-retrieve-options' ),
				'saveNonce'  => wp_create_nonce( 'wpac-admin-appearance-save-options' ),
				'resetNonce' => wp_create_nonce( 'wpac-admin-appearance-reset-options' ),
				'palette'    => Functions::get_theme_color_palette(),
			)
		);
		remove_filter( 'ajaxify/comments/theme_color_palette', array( $this, 'theme_color_palette' ), 1, 1 );
	}

	/**
	 * Retrieve options via Ajax for the home options.
	 */
	public function ajax_get_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'wpac-admin-appearance-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not verify nonce.', 'wp-ajaxify-comments' ),
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
	public function add_appearance_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'appearance',
			'action' => 'ajaxify_comments_output_appearance',
			'url'    => Functions::get_settings_url( 'appearance' ),
			'label'  => _x( 'Appearance', 'Tab label as Appearance', 'wp-ajaxify-comments' ),
			'icon'   => 'brush',
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
	public function add_appearance_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'appearance' !== $current_tab ) {
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
	public function output_appearance_content( $tab, $sub_tab = '' ) {
		if ( 'appearance' === $tab ) {
			if ( empty( $sub_tab ) || 'appearance' === $sub_tab ) {
				?>
					<div id="wpac-tab-appearance"></div>
				<?php
			}
		}
	}
}
