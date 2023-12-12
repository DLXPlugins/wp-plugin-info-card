<?php
/**
 * Set up admin and admin functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

use MediaRon\WPPIC\Admin\Settings as Settings;

/**
 * Helper class for for admin functionality.
 */
class Admin {

	/**
	 * Main class runner.
	 *
	 * @return Admin.
	 */
	public function run() {
		$self = new self();

		add_action( 'admin_menu', array( $self, 'add_options_page' ) );
		add_action( 'wp_ajax_wppic_widget_render', array( $self, 'ajax_dashboard_widget_render' ) );
		add_action( 'wp_dashboard_setup', array( $self, 'add_dashboard_widgets' ) );
		return $self;
	}

	

	/**
	 * Add the options page to the admin menu.
	 */
	public function add_options_page() {
		\add_options_page(
			Functions::get_plugin_name(),
			Functions::get_plugin_name(),
			'manage_options',
			Functions::get_plugin_slug(),
			array( $this, 'output_options' )
		);
	}

	/**
	 * Output the options page.
	 */
	public function output_options() {
		$options = Options::get_options();
		Settings::settings_page();
		return;
	}

	/**
	 * Adds a dashboard widget to the dashboard.
	 */
	public function add_dashboard_widgets() {
		$options = Options::get_options();

		// Ensure widget option is valid boolean.
		$options_widget = $options['widget'] ?? false;
		$options_widget = filter_var( $options_widget, FILTER_VALIDATE_BOOLEAN );

		// Get SVG.
		$wppic_svg = Functions::get_plugin_url( 'assets/img/wppic.svg' );
		if ( true === $options_widget ) {
			wp_add_dashboard_widget(
				'wppic-dashboard-widget',
				'<img src="' . esc_url( $wppic_svg ) . '" class="wppic-logo" alt="b*web" style="display:none"/>&nbsp;&nbsp;' . Functions::get_plugin_name() . esc_html__( ' board', 'wp-plugin-info-card' ),
				array( $this, 'output_dashboard_widgets' )
			);
		}
	}

	/**
	 * Output dashboard widgets.
	 */
	public function output_dashboard_widgets() {
		$options    = Options::get_options();
		$list_state = false;
		$ajax_class = '';

		if ( isset( $options['ajax'] ) && true === $options['ajax'] ) {
			$ajax_class = 'ajax-call';
		}

		$wppic_types = array();
		$wppic_types = apply_filters( 'wppic_add_widget_type', $wppic_types );

		$content = '<div class="wp-pic-list ' . $ajax_class . '">';

		foreach ( $wppic_types as $wppic_type ) {

			$rows = array();

			if ( isset( $options[ $wppic_type[1] ] ) && ! empty( $options[ $wppic_type[1] ] ) ) {

				$list_state  = true;
				$other_lists = false;

				foreach ( $wppic_types as $wppic_list ) {
					if ( $wppic_type[1] !== $wppic_list[1] ) {
						$rows[] = $wppic_list[1];
					}
				}

				foreach ( $rows as $row ) {
					if ( isset( $options[ $row ] ) && ! empty( $options[ $row ] ) ) {
						$other_lists = true;
					}
				}

				if ( $other_lists ) {
					$content .= '<h4>' . $wppic_type[2] . '</h4>';
				}

				if ( isset( $options['ajax'] ) && true === $options['ajax'] ) {
					$content .= '<div class="wp-pic-loading" style="background-image: url( ' . admin_url() . 'images/spinner-2x.gif);" data-type="' . $wppic_type[0] . '" data-list="' . htmlspecialchars( json_encode( ( $options[ $wppic_type[1] ] ) ), ENT_QUOTES, 'UTF-8' ) . '"></div>';
				} else {
					$content .= $this->render_widget( $wppic_type[0], $options[ $wppic_type[1] ] );
				}
			}
		}

		// Nothing found.
		if ( ! $list_state ) {

			$content .= '<div class="wp-pic-item" style="display:block;">';
			$content .= '<span class="wp-pic-no-item"><a href="admin.php?page=' . WPPIC_ID . '">' . __( 'Nothing found, please add at least one item in the WP Plugin Info Card settings page.', 'wp-plugin-info-card' ) . '</a></span>';
			$content .= '</div>';

		}

		$content .= '</div>';

		echo wp_kses( $content, Functions::get_kses_allowed_html() );

	}

	/**
	 * Renders a widget via Ajax.
	 */
	public function ajax_dashboard_widget_render() {
		$type  = filter_input( INPUT_POST, 'wppic-type', FILTER_DEFAULT );
		$list  = filter_input( INPUT_POST, 'wppic-list', FILTER_DEFAULT );
		$slugs = array( sanitize_text_field( $list ) );

		$content = $this->render_widget( $type, $slugs );

		if ( ! empty( $list ) ) {
			echo wp_kses( $content, Functions::get_kses_allowed_html() );
		} else {
			return $content;
		}
		exit;
	}

	/**
	 * Render a dashboard widget item.
	 *
	 * @param string $type  Type of the item (plugins, themes).
	 * @param array  $slugs Slug of the item.
	 *
	 * @return string $content.
	 */
	private function render_widget( $type, $slugs ) {
		$content = '';

		if ( ! empty( $slugs ) ) {
			foreach ( $slugs as $slug ) {
				$wppic_data = wppic_api_parser( $type, $slug, '5', 'widget' );

				if ( ! $wppic_data ) {

					$content .= '<div class="wp-pic-item ' . $slug . '">';
					$content .= '<span class="wp-pic-no-item">' . esc_html__( 'Item not found:', 'wp-plugin-info-card' ) . ' "' . $slug . '" ' . esc_html__( 'does not exist.', 'wp-plugin-info-card' ) . '</span>';
					$content .= '</div>';

				} else {

					$content = apply_filters( 'wppic_add_widget_item', $content, $wppic_data, $type );

				}
			}
		}

		return $content;
	}
}
