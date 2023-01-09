<?php
/**
 * Set up TinyMCE Functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC\TinyMCE;

use MediaRon\WPPIC\Functions;

/**
 * Helper class for for TinyMCE Options.
 */
class Init {

	/**
	 * Main class runner.
	 *
	 * @return Init.
	 */
	public function run() {
		$self = new self();

		add_filter( 'mce_external_languages', array( $self, 'add_tinymce_lang' ), 10, 1 );
		add_action( 'admin_head', array( $self, 'add_mce_button' ) );

		return $self;
	}

	/**
	 * Add TinyMCE Language translations.
	 *
	 * @param array $translations Translations.
	 *
	 * @return array Array of translated strings.
	 */
	public function add_tinymce_lang( $translations ) {
		$locales['wppic_tinymce_plugin'] = Functions::get_plugin_dir( 'php/TinyMCE/langs.php' );
		return $locales;
	}

	/**
	 * Add TinyMCE Button.
	 */
	public function add_mce_button() {
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			return;
		}

		if ( 'true' === get_user_option( 'rich_editing' ) ) {

			add_filter( 'mce_external_plugins', array( $this, 'add_tinymce_button' ) );
			add_filter( 'mce_buttons', array( $this, 'register_mce_button' ) );

			// Load stylesheet for tinyMCE button only.
			wp_enqueue_style(
				'wppic-admin-css',
				Functions::get_plugin_url( 'dist/wppic-admin.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
			wp_enqueue_script(
				'wppic-ui-scripts',
				Functions::get_plugin_url( 'assets/js/wppic-ui-scripts.js' ),
				array( 'jquery' ),
				Functions::get_plugin_version(),
				true
			);

			// Define additionnal hookable MCE parameters.
			$mce_add_params = array(
				'types'   => array(),
				'layouts' => array(
					array(
						'text'  => __( 'Card (default)', 'wp-plugin-info-card' ),
						'value' => '',
					),
					array(
						'text'  => __( 'Large', 'wp-plugin-info-card' ),
						'value' => 'large',
					),
					array(
						'text'  => __( 'WordPress', 'wp-plugin-info-card' ),
						'value' => 'wordpress',
					),
				),

			);
			$mce_add_params = apply_filters( 'wppic_add_mce_type', $mce_add_params );
			$mce_add_params = json_encode( $mce_add_params );

			echo '<script>// <![CDATA[
			var wppicMceList = ' . $mce_add_params . ';
			// ]]></script>';

		}
	}

	/**
	 * Add WPPIC TinyMCE Button.
	 *
	 * @param array $plugin_array Array of TinyMCE Plugins.
	 */
	public function add_tinymce_button( $plugin_array ) {
		$plugin_array['wppic_mce_button'] = Functions::get_plugin_url( 'assets/js/wppic-ui-mce.js' );
		return $plugin_array;
	}


	/**
	 * Register WPPIC TinyMCE Button.
	 *
	 * @param array $buttons Array of TinyMCE Buttons.
	 */
	public function register_mce_button( $buttons ) {
		array_push( $buttons, 'wppic_mce_button' );
		return $buttons;
	}
}
