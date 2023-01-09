<?php
/**
 * Add TinyMCE Lang attributes.
 *
 * @package WPPIC
 */

/**
 * Exit early if accessed dirctly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$editor_file = ABSPATH . WPINC . '/class-wp-editor.php';
if ( file_exists( $editor_file ) && ! class_exists( '_WP_Editors' ) ) {
	require_once $editor_file;
}
$strings = array(
	'title'         => __( 'Insert WP Plugin Info Card Shortcode', 'wp-plugin-info-card' ),
	'type'          => __( 'Type of data to retrieve', 'wp-plugin-info-card' ),
	'slug'          => __( 'The Slug/ID', 'wp-plugin-info-card' ),
	'layout'        => __( 'Layout structure', 'wp-plugin-info-card' ),
	'scheme'        => __( 'Color scheme (not available for WordPress layout)', 'wp-plugin-info-card' ),
	'image'         => __( 'Custom image URL', 'wp-plugin-info-card' ),
	'align'         => __( 'Cards alignment', 'wp-plugin-info-card' ),
	'containerid'   => __( 'Custom container ID', 'wp-plugin-info-card' ),
	'margin'        => __( 'Custom container margin (15px 0)', 'wp-plugin-info-card' ),
	'clear'         => __( 'Clear container float', 'wp-plugin-info-card' ),
	'expiration'    => __( 'Cache duration in minutes (num. only)', 'wp-plugin-info-card' ),
	'ajax'          => __( 'Load data async. with AJAX', 'wp-plugin-info-card' ),
	'custom'        => __( 'Single value to output', 'wp-plugin-info-card' ),
	'default'       => __( 'Do not specify', 'wp-plugin-info-card' ),
	'defaultscheme' => __( 'Default scheme', 'wp-plugin-info-card' ),
	'yes'           => __( 'yes', 'wp-plugin-info-card' ),
	'no'            => __( 'no', 'wp-plugin-info-card' ),
	'center'        => __( 'center', 'wp-plugin-info-card' ),
	'left'          => __( 'left', 'wp-plugin-info-card' ),
	'right'         => __( 'right', 'wp-plugin-info-card' ),
	'before'        => __( 'before', 'wp-plugin-info-card' ),
	'after'         => __( 'after', 'wp-plugin-info-card' ),
	'emptyslug'     => __( 'You have to provide at least the slug/id parameter to continue.', 'wp-plugin-info-card' ),
);
$locale  = \_WP_Editors::$mce_locale;
$strings = 'tinyMCE.addI18n("' . $locale . '.wppic_tinymce_plugin", ' . json_encode( $strings ) . ");\n";
