<?php
/**
 * Output Integrations WPAC tab.
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
 * Output the integrations tab and content.
 */
class Integrations {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'ajaxify_comments_admin_tabs', array( $this, 'add_integrations_tab' ), 1, 1 );
		add_filter( 'ajaxify_comments_admin_sub_tabs', array( $this, 'add_integrations_sub_tab' ), 1, 3 );
		add_filter( 'ajaxify_comments_output_integrations', array( $this, 'output_integrations_content' ), 1, 3 );
		add_action( 'wpac_admin_enqueue_scripts_integrations', array( $this, 'admin_scripts' ) );
	}

	/**
	 * Include admin scripts for the home screen.
	 */
	public function admin_scripts() {
		wp_enqueue_script(
			'wpac-admin-integrations',
			Functions::get_plugin_url( 'dist/wpac-admin-integrations-js.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'wpac-admin-integrations',
			'wpacAdminIntegrations',
			array(
				'getNonce'           => wp_create_nonce( 'wpac-admin-integrations-retrieve-options' ),
				'saveNonce'          => wp_create_nonce( 'wpac-admin-integrations-save-options' ),
				'resetNonce'         => wp_create_nonce( 'wpac-admin-integrations-reset-options' ),
				'palette'            => Functions::get_theme_color_palette(),
				'confettiInstallNonce' => wp_create_nonce( 'install-plugin_confetti' ),
				'confettiActivateNonce' => wp_create_nonce( 'activate-plugin_confetti' ),
				'cecInstallNonce' => wp_create_nonce( 'install-plugin_simple-comment-editing' ),
				'cecActivateNonce' => wp_create_nonce( 'activate-plugin_simple-comment-editing' ),
			)
		);
	}

	/**
	 * Add the main tab and callback actions.
	 *
	 * @param array $tabs Array of tabs.
	 *
	 * @return array of tabs.
	 */
	public function add_integrations_tab( $tabs ) {
		$tabs[] = array(
			'get'    => 'integrations',
			'action' => 'ajaxify_comments_output_integrations',
			'url'    => Functions::get_settings_url( 'integrations' ),
			'label'  => _x( 'Integrations', 'Tab label as Integrations', 'wp-ajaxify-comments' ),
			'icon'   => 'plug-plus',
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
	public function add_integrations_sub_tab( $tabs, $current_tab, $sub_tab ) {
		if ( ( ! empty( $current_tab ) || ! empty( $sub_tab ) ) && 'integrations' !== $current_tab ) {
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
	public function output_integrations_content( $tab, $sub_tab = '' ) {
		if ( 'integrations' === $tab ) {
			if ( empty( $sub_tab ) || 'integrations' === $sub_tab ) {
				?>
					<div id="wpac-tab-integrations"></div>
				<?php
			}
		}
	}
}
