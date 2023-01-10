<?php
/**
 * Uninstall script.
 *
 * @package HAS
 */

if ( ! defined( 'ABSPATH' ) && ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}
delete_option( 'wppic_settings' );
wp_clear_scheduled_hook( 'wppic_daily_cron' );
wppic_delete_transients();
