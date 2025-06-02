<?php
/**
 * Uninstall script.
 *
 * @package HAS
 */

if ( ! defined( 'ABSPATH' ) && ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

/**
 * Define Constants.
 */
if ( ! defined( 'WPPIC_VERSION' ) ) {
	define( 'WPPIC_VERSION', '5.4.1' );
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

delete_option( 'wppic_settings' );
wp_clear_scheduled_hook( 'wppic_daily_cron' );
wppic_delete_transients();
