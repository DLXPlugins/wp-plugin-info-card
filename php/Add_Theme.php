<?php
/**
 * Set up add theme functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for for add theme functionality.
 */
class Add_Theme {

	/**
	 * Class runner.
	 */
	public function run() {
		$self = new self();

		add_filter( 'wppic_add_api_parser', array( $self, 'api_parser' ), 9, 3 );
		add_filter( 'wppic_add_template', array( $self, 'theme_template' ), 9, 2 );
		add_filter( 'wppic_add_mce_type', array( $self, 'mce_type' ) );
		add_filter( 'wppic_add_list_form', array( $self, 'list_form' ) );
		add_filter( 'wppic_add_widget_type', array( $self, 'widget_type' ) );
		add_filter( 'wppic_add_list_valdiation', array( $self, 'list_validation' ) );
		add_filter( 'wppic_add_widget_item', array( $self, 'widget_item' ), 9, 3 );

		return $self;
	}

	/**
	 * Parse the API for WordPress Themes.
	 *
	 * @param object $wppic_data The data object.
	 * @param string $type       plugin or theme.
	 * @param string $slug       Slug of the plugin.
	 *
	 * @return object $wppic_data The data object.
	 */
	public function api_parser( $wppic_data, $type, $slug ) {
		if ( 'theme' === $type ) {

			require_once ABSPATH . 'wp-admin/includes/theme.php';
			$theme_info = themes_api(
				'theme_information',
				array(
					'slug' => $slug,
				)
			);
			if ( ! is_wp_error( $theme_info ) ) {
				$wppic_data = (object) array(
					'url'             => 'https://wordpress.org/themes/' . $slug . '/',
					'name'            => $theme_info->name,
					'slug'            => $slug,
					'version'         => $theme_info->version,
					'preview_url'     => $theme_info->preview_url,
					'author_def'      => $theme_info->author,
					'author'          => sprintf( '<a href="%s" target="_blank" title="%s">%s</a>', $theme_info->author['profile'], $theme_info->author['display_name'], $theme_info->author['display_name'] ),
					'screenshot_url'  => $theme_info->screenshot_url,
					'rating'          => $theme_info->rating,
					'num_ratings'     => $theme_info->num_ratings,
					'downloaded'      => number_format( $theme_info->downloaded, 0, ',', ',' ),
					'last_updated_mk' => $theme_info->last_updated,
					'last_updated'    => $theme_info->last_updated,
					'homepage'        => $theme_info->homepage,
					'download_link'   => $theme_info->download_link,
				);
			}
		}

		return $wppic_data;
	}

	/**
	 * Load a theme template.
	 *
	 * @param string $content The content.
	 * @param array  $data    Plugin data.
	 */
	public function theme_template( $content, $data ) {
		$type       = $data[0];
		$wppic_data = $data[1]; // used in the included templates.
		$image      = $data[2]; // used in the included templates.
		$layout     = '-' . $data[3];

		if ( 'theme' === $type ) {

			// load custom user template if exists.
			$wppic_template_file = '/wppic-templates/wppic-template-theme';
			ob_start();
			if ( file_exists( get_stylesheet_directory() . $wppic_template_file . $layout . '.php' ) ) {
				include get_stylesheet_directory() . $wppic_template_file . $layout . '.php';
			} elseif ( file_exists( Functions::get_plugin_dir( 'templates/wppic-template-theme' . $layout . '.php' ) ) ) {
				include Functions::get_plugin_dir( 'templates/wppic-template-theme' . $layout . '.php' );
			} else {
				include Functions::get_plugin_dir( 'templates/wppic-template-theme.php' );
			}
			$content .= ob_get_clean();

		}

		return $content;

	}

	/**
	 * Add MCE types for the themes.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function mce_type( $parameters ) {
		$parameters['types'][] = array(
			'text'  => 'Theme',
			'value' => 'Theme',
		);
		return $parameters;
	}

	/**
	 * Add MCE list form for the plugins.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function list_form( $parameters ) {
		$parameters[] = array(
			'theme-list',
			__( 'Add a Theme', 'wp-plugin-info-card' ),
			__(
				'Please refer to the plugin URL on wordpress.org to determine its slug',
				'wp-plugin-info-card'
			),
			'https://wordpress.org/themes/<strong>THE-SLUG</strong>/',
		);
		return $parameters;
	}

	/**
	 * Add MCE list validation for the themes.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function list_validation( $parameters ) {
		$parameters[] = array( 'theme-list', __( 'is not a valid theme name format. This key has been deleted.', 'wp-plugin-info-card' ), '/^[a-z0-9\-]+$/' );
		return $parameters;
	}

	/**
	 * Add MCE widget type for the themes.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function widget_type( $parameters ) {
		$parameters[] = array( 'theme', 'theme-list', __( 'Themes', 'wp-plugin-info-card' ) );
		return $parameters;
	}

	/**
	 * Output the theme widget.
	 *
	 * @param string $content    The content output.
	 * @param object $wppic_data The theme data.
	 * @param string $type       Plugin or Theme.
	 *
	 * @return string $content.
	 */
	public function widget_item( $content, $wppic_data, $type ) {
		if ( 'theme' === $type ) {

			// Date format Internationalizion.
			$date_format              = Options::get_date_format();
			$wppic_data->last_updated = date_i18n( $date_format, strtotime( $wppic_data->last_updated ) );

			$content .= '<div class="wp-pic-item">';
			$content .= '<a class="wp-pic-widget-name" href="' . esc_url( $wppic_data->url ) . '" target="_blank" title="' . __( 'WordPress.org Theme Page', 'wp-plugin-info-card' ) . '">' . esc_html( $wppic_data->name ) . '</a>';
			$content .= '<span class="wp-pic-widget-rating"><span>' . __( 'Ratings:', 'wp-plugin-info-card' ) . '</span> ' . esc_html( $wppic_data->rating ) . '%';
			if ( ! empty( $wppic_data->num_ratings ) ) {
				$content .= ' ( ' . esc_html( $wppic_data->num_ratings ) . ' votes)';
			}
			$content .= '</span>';
			$content .= '<span class="wp-pic-widget-downloaded"><span>' . __( 'Downloads:', 'wp-plugin-info-card' ) . '</span> ' . esc_html( $wppic_data->downloaded ) . '</span>';
			$content .= '<p class="wp-pic-widget-updated"><span>' . __( 'Last Updated:', 'wp-plugin-info-card' ) . '</span> ' . esc_html( $wppic_data->last_updated );
			if ( ! empty( $wppic_data->version ) ) {
				$content .= ' (v.' . esc_html( $wppic_data->version ) . ' )';
			}
			$content .= '</p>';
			$content .= '</div>';

		}
		return $content;
	}
}
