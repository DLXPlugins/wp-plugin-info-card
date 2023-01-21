<?php
/**
 * WP Plugin Info Card
 *
 * @package WPPIC
 */

/**
 * Plugin Name: WP Plugin Info Card
 * Plugin URI: https://mediaron.com/wp-plugin-info-card/
 * Description: WP Plugin Info Card displays plugins & themes identity cards in a beautiful box with a smooth rotation effect using WordPress.org Plugin API & WordPress.org Theme API. Dashboard widget included.
 * Author: Brice CAPOBIANCO, Ronald Huereca
 * Author URI: https://mediaron.com
 * Version: 4.0.0
 * Domain Path: /langs
 * Text Domain: wp-plugin-info-card
 */

namespace MediaRon\WPPIC;

/**
 * Exit and prevent direct access.
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct acces not allowed!' );
}

/**
 * Include Autoloader.
 */
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * Define Constants.
 */
if ( ! defined( 'WPPIC_VERSION' ) ) {
	define( 'WPPIC_VERSION', '4.0.0' );
}
if ( ! defined( 'WPPIC_PATH' ) ) {
	define( 'WPPIC_PATH', plugin_dir_path( __FILE__ ) . '/src/' );
}
if ( ! defined( 'WPPIC_URL' ) ) {
	define( 'WPPIC_URL', plugin_dir_url( __FILE__ ) . '/src/' );
}
if ( ! defined( 'WPPIC_BASE' ) ) {
	define( 'WPPIC_BASE', plugin_basename( __FILE__ ) );
}
if ( ! defined( 'WPPIC_NAME' ) ) {
	define( 'WPPIC_NAME', 'WP Plugin Info Card' );
}
if ( ! defined( 'WPPIC_NAME_FULL' ) ) {
	define( 'WPPIC_NAME_FULL', 'WP Plugin Info Card' );
}
if ( ! defined( 'WPPIC_ID' ) ) {
	define( 'WPPIC_ID', 'wp-plugin-info-card' );
}
if ( ! defined( 'WPPIC_FILE' ) ) {
	define( 'WPPIC_FILE', __FILE__ );
}

/**
 * Include global functions and variables.
 */
require_once 'functions.php';

/**
 * WP Plugin Info Card Main Class
 */
class WP_Plugin_Info_Card {
	/**
	 * WP Plugin Info Card instance.
	 *
	 * @var WP_Plugin_Info_Card $instance Instance of Highlight and Share class.
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the WP_Plugin_Info_Card Class.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return WP_Plugin_Info_Card class instance.
	 */
	public static function get_instance() {
		if ( null == self::$instance ) { // phpcs:ignore
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class constructor.
	 *
	 * Initialize plugin and load text domain for internationalization
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function __construct() {
		// i18n initialization.
		load_plugin_textdomain( 'wp-plugin-info-card', false, dirname( plugin_basename( __FILE__ ) ) . '/langs/' );
	}

	/**
	 * Run when plugins have finished loading. Begin main initialization.
	 */
	public function plugins_loaded() {

		// Register block related hooks.
		$blocks = new Blocks();
		$blocks->run();

		// Set up admin.
		$admin = new Admin();
		$admin->run();

		// Set up tinyMCE.
		$tinymce = new TinyMCE\Init();
		$tinymce->run();

		// Set up Add Plugin.
		$add_plugin = new Add_Plugin();
		$add_plugin->run();

		// Set up Add Theme.
		$add_theme = new Add_Theme();
		$add_theme->run();

		// Set up shortcodes and callbacks.
		$shortcodes = new Shortcodes();
		$shortcodes->run();

	}
}

add_action( 'plugins_loaded', 'MediaRon\WPPIC\wp_plugin_info_card_instantiate' );

/**
 * Instantiate the WPPIC class.
 */
function wp_plugin_info_card_instantiate() {
	$wppic = WP_Plugin_Info_Card::get_instance();
	$wppic->plugins_loaded();
}
