<?php
/**
 * Output Lazy Load WPAC tab.
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
 * Output the lazy-load tab and content.
 */
class Lazy_Load {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'ajaxify_comments_admin_tabs', array( $this, 'add_lazy_load_tab' ), 1, 1 );
		add_filter( 'ajaxify_comments_admin_sub_tabs', array( $this, 'add_lazy_load_sub_tab' ), 1, 3 );
		add_filter( 'ajaxify_comments_output_lazy_load', array( $this, 'output_lazy_load_content' ), 1, 3 );
		add_action( 'wpac_admin_enqueue_scripts_lazy-load', array( $this, 'admin_scripts' ) );
		add_action( 'wp_ajax_wpac_get_lazy_load_options', array( $this, 'ajax_get_options' ) );
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
		// Generate color palette for spinner background, icon, label, border.
		$palette = array(
			array(
				'name'  => __( 'Black', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-black',
				'color' => '#000000',
			),
			array(
				'name'  => __( 'White', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-white',
				'color' => '#FFFFFF',
			),
			array(
				'name'  => __( 'Dark Blue', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-dark-blue',
				'color' => '#1A237E',
			),
			array(
				'name'  => __( 'Light Blue', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-light-blue',
				'color' => '#64B5F6',
			),
			array(
				'name'  => __( 'Dark Green', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-dark-green',
				'color' => '#388E3C',
			),
			array(
				'name'  => __( 'Light Green', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-light-green',
				'color' => '#81C784',
			),
			array(
				'name'  => __( 'Dark Red', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-dark-red',
				'color' => '#D32F2F',
			),
			array(
				'name'  => __( 'Light Red', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-light-red',
				'color' => '#E57373',
			),
			array(
				'name'  => __( 'Dark Gray', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-dark-gray',
				'color' => '#616161',
			),
			array(
				'name'  => __( 'Light Gray', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-light-gray',
				'color' => '#BDBDBD',
			),
			array(
				'name'  => __( 'Gold', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-gold',
				'color' => '#FFD700',
			),
			array(
				'name'  => __( 'Purple', 'wp-ajaxify-comments' ),
				'slug'  => 'ajaxify-purple',
				'color' => '#9C27B0',
			),
		);
		return $palette;
	}

	/**
	 * Include admin scripts for the lazy load screen.
	 */
	public function admin_scripts() {
		$options = Options::get_options();
		wp_enqueue_script(
			'wpac-admin-lazy-load',
			Functions::get_plugin_url( 'dist/wpac-admin-lazy-load-js.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);
		add_filter( 'ajaxify/comments/theme_color_palette', array( $this, 'theme_color_palette' ), 2, 1 );

		wp_localize_script(
			'wpac-admin-lazy-load',
			'wpacAdminLazyLoad',
			array(
				'getNonce'   => wp_create_nonce( 'wpac-admin-lazy-load-retrieve-options' ),
				'saveNonce'  => wp_create_nonce( 'wpac-admin-lazy-load-save-options' ),
				'resetNonce' => wp_create_nonce( 'wpac-admin-lazy-load-reset-options' ),
				'palette'    => Functions::get_theme_color_palette(),
			)
		);
		remove_filter( 'ajaxify/comments/theme_color_palette', array( $this, 'theme_color_palette' ), 2, 1 );
	}

	/**
	 * Retrieve options via Ajax for the home options.
	 */
	public function ajax_get_options() {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );
		// Security.
		if ( ! wp_verify_nonce( $nonce, 'wpac-admin-lazy-load-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
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
	public function add_lazy_load_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'lazy-load',
			'action' => 'ajaxify_comments_output_lazy_load',
			'url'    => Functions::get_settings_url( 'lazy-load' ),
			'label'  => _x( 'Lazy Load', 'Tab label as Lazy Load', 'wp-ajaxify-comments' ),
			'icon'   => 'hourglass-clock',
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
	public function add_lazy_load_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'lazy-load' !== $current_tab ) {
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
	public function output_lazy_load_content( $tab, $sub_tab = '' ) {
		if ( 'lazy-load' === $tab ) {
			if ( empty( $sub_tab ) || 'lazy-load' === $sub_tab ) {
				?>
					<div id="wpac-tab-lazy-load"></div>
				<?php
			}
		}
	}
}
