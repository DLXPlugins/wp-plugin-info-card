<?php
/**
 * Set up add plugin functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC\Admin;

use MediaRon\WPPIC\Functions;

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
		//add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		// Init tabs.
		new Tabs\Main();
		// new Tabs\Advanced();
		// new Tabs\Appearance();
		// new Tabs\Callbacks();
		// new Tabs\Integrations();
		// new Tabs\Labels();
		// new Tabs\Lazy_Load();
		// //new Tabs\Pagination();
		// new Tabs\Selectors();
		// new Tabs\Support();
	}

	/**
	 * Output admin scripts/styles.
	 */
	public function admin_scripts() {
		return;
		$screen = get_current_screen();
		if ( isset( $screen->base ) && 'settings_page_ajaxify-comments' === $screen->base ) {
			wp_enqueue_style(
				'wpac-styles-admin',
				Functions::get_plugin_url( 'dist/wpac-admin-css.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);

			// Get current tab and trigger action.
			$current_tab = Functions::get_admin_tab();
			if ( empty( $current_tab ) ) {
				$current_tab = 'home';
			}
			do_action( 'wpac_admin_enqueue_scripts_' . $current_tab );
		}
	}
}
