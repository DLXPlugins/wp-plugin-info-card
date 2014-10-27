<?php
/**
 * Plugin Name: WP Plugin Info Card by b*web
 * Plugin URI: http://b-website.com/
 * Description: ##############################################
 * Author: Brice CAPOBIANCO - b*web
 * Author URI:
 * Version: 1.0
 * Text Domain: wp_plugin_info_card
 */


/***************************************************************
 * SECURITY : Exit if accessed directly
***************************************************************/
if ( !function_exists('add_action') ) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit();
}

if ( !defined('ABSPATH') ) {
	exit;
}


/***************************************************************
 * Define constants
 ***************************************************************/
if ( !defined('WPPIC_PATH') ) {
	define( 'WPPIC_PATH', plugin_dir_path( __FILE__ ) ); 
}
if ( !defined('WPPIC_URL') ) {
	define( 'WPPIC_URL', plugin_dir_url( __FILE__ ) ); 
}
if ( !defined('WPPIC_BASE') ) {
	define( 'WPPIC_BASE', plugin_basename(__FILE__) ); 
}
if ( !defined('WPPIC_NAME') ) {
	define( 'WPPIC_NAME', 'WP Plugin Info' ); 
}
if ( !defined('WPPIC_NAME_FULL') ) {
	define( 'WPPIC_NAME_FULL', 'WP Plugin Info Card by b*web' ); 
}
if ( !defined('WPPIC_ID') ) {
	define( 'WPPIC_ID', 'wp-plugin-info-card' ); 
}


/***************************************************************
 * Load plugin files
 ***************************************************************/
require_once( WPPIC_PATH . 'wp-plugin-info-card-api.php' );
require_once( WPPIC_PATH . 'wp-plugin-info-card-shortcode.php' );
require_once( WPPIC_PATH . 'wp-plugin-info-card-template.php' );
require_once( WPPIC_PATH . 'wp-plugin-info-card-widget.php' );


/***************************************************************
 * Load plugin textdomain
 ***************************************************************/
if (!function_exists('wppic_load_textdomain')) {
	function wppic_load_textdomain() {
		$path = dirname(plugin_basename( __FILE__ )) . '/langs/';
		$loaded = load_plugin_textdomain( 'wp_plugin_info_card', false, $path);
	}
	add_action('init', 'wppic_load_textdomain');
}

/***************************************************************
 * Add settings link on extentions page
 ***************************************************************/
function wppic_settings_link($links) { 
  $settings_link = '<a href="admin.php?page='.WPPIC_ID.'">Settings</a>'; 
  array_push($links, $settings_link); 
  return $links; 
}
add_filter("plugin_action_links_".WPPIC_BASE, 'wppic_settings_link' );


/***************************************************************
 * Admin Panel Favico
 ***************************************************************/
function wppic_add_favicon() {
	$screen = get_current_screen();
	if ( $screen->id != 'toplevel_page_'. WPPIC_ID )
		return;
	
	$favicon_url = WPPIC_URL . 'img/icon_bweb.png';
	echo '<link rel="shortcut icon" href="' . $favicon_url . '" />';
}
add_action('admin_head', 'wppic_add_favicon');


/***************************************************************
 * Remove Plugin settings from DB on uninstallation (= plugin deletion) 
 ***************************************************************/
//Hooks for install
if (function_exists('register_uninstall_hook')) {
	register_uninstall_hook(__FILE__, 'wppic_uninstall');
}

function wppic_uninstall() {
	// Remove option from DB
	delete_option( 'wppic_settings' );
}