<?php
/**
 * Output Pagination WPAC tab.
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
 * Output the pagination tab and content.
 */
class Pagination {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'ajaxify_comments_admin_tabs', array( $this, 'add_pagination_tab' ), 1, 1 );
		add_filter( 'ajaxify_comments_admin_sub_tabs', array( $this, 'add_pagination_sub_tab' ), 1, 3 );
		add_filter( 'ajaxify_comments_output_pagination', array( $this, 'output_pagination_content' ), 1, 3 );
		add_action( 'wpac_admin_enqueue_scripts_pagination', array( $this, 'admin_scripts' ) );
		add_action( 'wp_ajax_wpac_get_pagination_options', array( $this, 'ajax_get_options' ) );
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
			'wpac-admin-pagination',
			Functions::get_plugin_url( 'dist/wpac-admin-pagination-js.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);
		add_filter( 'ajaxify/comments/theme_color_palette', array( $this, 'theme_color_palette' ), 1, 1 );
		wp_localize_script(
			'wpac-admin-pagination',
			'wpacAdminPagination',
			array(
				'getNonce'   => wp_create_nonce( 'wpac-admin-pagination-retrieve-options' ),
				'saveNonce'  => wp_create_nonce( 'wpac-admin-pagination-save-options' ),
				'resetNonce' => wp_create_nonce( 'wpac-admin-pagination-reset-options' ),
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
		if ( ! wp_verify_nonce( $nonce, 'wpac-admin-pagination-retrieve-options' ) || ! current_user_can( 'manage_options' ) ) {
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
	public function add_pagination_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'pagination',
			'action' => 'ajaxify_comments_output_pagination',
			'url'    => Functions::get_settings_url( 'pagination' ),
			'label'  => _x( 'Pagination', 'Tab label as Pagination', 'wp-ajaxify-comments' ),
			'icon'   => 'comment-dots',
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
	public function add_pagination_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'pagination' !== $current_tab ) {
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
	public function output_pagination_content( $tab, $sub_tab = '' ) {
		if ( 'pagination' === $tab ) {
			if ( empty( $sub_tab ) || 'pagination' === $sub_tab ) {
				?>
					<div id="wpac-tab-pagination"></div>
				<?php
			}
		}
	}
}
