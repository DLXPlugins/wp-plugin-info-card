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
 * Include global functions and variables.
 */
require_once 'functions.php';

delete_option( 'wppic_settings' );
wp_clear_scheduled_hook( 'wppic_daily_cron' );
wppic_delete_transients();
