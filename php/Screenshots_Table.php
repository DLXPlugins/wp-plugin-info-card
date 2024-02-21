<?php
/**
 * Set up the screenshots table.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for the screenshots table.
 */
class Screenshots_Table {

	/**
	 * Table name.
	 *
	 * @var string
	 */
	private static $table_name = 'wppic_screenshots_queue';
	/**
	 * Create or update the table.
	 */
	public static function create() {
		global $wpdb;

		$table_name = $wpdb->base_prefix . 'wppic_screenshots';

		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
            id int(11) NOT NULL AUTO_INCREMENT,
            plugin_slug varchar(255) NOT NULL,
            screenshot_url text NOT NULL,
			screenshot_url_hash varchar(64) NOT NULL,
            screenshot_order int(11) NOT NULL,
            status varchar(50) NOT NULL DEFAULT 'pending',
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            attempts int(11) NOT NULL DEFAULT 0,
            PRIMARY KEY (id)
        ) $charset_collate;";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );

		// Alter table to accept screenshot_url and screenshot_order.
		$wpdb->query( "ALTER TABLE `{$table_name}` ADD UNIQUE INDEX idx_screenshot_url_hash (screenshot_url_hash)" ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
	}
}
