<?php
/**
 * Set up GitHub functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;


/**
 * Helper class for for GitHub functionality.
 */
class GitHub {

	/**
	 * Class runner.
	 */
	public function run() {
		$self = new self();

		add_filter( 'wppic_add_api_parser', array( $self, 'api_parser' ), 9, 5 );

		return $self;
	}

	/**
	 * Parse the API for WordPress Plugins.
	 *
	 * @param object $wppic_data       The data object.
	 * @param string $type             plugin or theme.
	 * @param string $slug             Slug of the plugin.
	 * @param bool   $load_attachments Load attachments.
	 * @param bool   $force            Force refresh.
	 *
	 * @return array $wppic_data The data object.
	 */
	public function api_parser( $wppic_data, $type, $slug, $load_attachments = false, $force = false ) {
		if ( 'github' === $type ) {

			// $slug is in username/repo format.
			$api_url = sprintf(
				'https://api.github.com/repos/%s',
				$slug
			);

			$token = '';

			$headers = array(
				'Authorization' => 'Bearer ' . $token,
				'Content-Type' => 'application/json',
			);

			$response = wp_remote_get( esc_url( $api_url ), array( 'headers' => $headers ) );
			if ( is_wp_error( $response ) ) {
				return $wppic_data;
			}

			// Check error code.
			$response_code = wp_remote_retrieve_response_code( $response );
			if ( 200 !== $response_code ) {
				return $wppic_data;
			}

			$github_data = json_decode( wp_remote_retrieve_body( $response ) );

			$keys_to_extract = array(
				'name'              => 'name',
				'full_name'         => 'full_name',
				'login'             => 'organization/login',
				'description'       => 'description',
				'org_url'           => 'organization/html_url',
				'github_url'        => 'html_url',
				'is_private'        => 'private',
				'license'           => 'license/spdx_id',
				'avatar'            => 'organization/avatar_url',
				'stargazers_count'  => 'stargazers_count',
				'watchers_count'    => 'watchers_count', /* this would be the same as stargazers_count */
				'subscribers_count' => 'subscribers_count',
				'forks_count'       => 'forks_count',
				'updated_at'        => 'updated_at',
				'created_at'        => 'created_at',
				'pushed_at'         => 'pushed_at',
				'homepage'          => 'homepage',
				'language'          => 'language',
				'has_downloads'     => 'has_downloads',
			);

			$alt_keys_to_extract = array(
				'login'   => 'owner/login',
				'avatar'  => 'owner/avatar_url',
				'org_url' => 'owner/html_url',
			);

			$wppic_data = array();
			foreach ( $keys_to_extract as $target_key => $github_path ) {
				$value = $this->get_nested_value( $github_data, $github_path );
				if ( null !== $value ) {
					$wppic_data[ $target_key ] = $value;
				} else {
					$wppic_data[ $target_key ] = '';
				}
			}

			// Extract alt keys.
			foreach ( $alt_keys_to_extract as $target_key => $github_path ) {
				$value = $this->get_nested_value( $github_data, $github_path );
				if ( null !== $value && ! empty( $value ) ) {
					if ( ! isset( $wppic_data[ $target_key ] ) ) {
						$wppic_data[ $target_key ] = $value;
					}
				}
			}

			/**
			 * Get sponsor URL.
			 */
			$wppic_data['sponsors_url'] = '';
			$sponsors_url               = sprintf(
				'https://api.github.com/repos/%s/contents/.github/FUNDING.yml',
				$slug
			);
			$sponsors_response          = wp_remote_get( esc_url( $sponsors_url ), array( 'headers' => $headers ) );
			if ( is_wp_error( $sponsors_response ) || 200 !== wp_remote_retrieve_response_code( $sponsors_response ) ) {
				return $wppic_data;
			}

			$sponsors_data = json_decode( wp_remote_retrieve_body( $sponsors_response ) );
			if ( ! empty( $sponsors_data ) ) {
				$yml_content = base64_decode( $sponsors_data->content );
				$yml_data    = $this->parse_simple_yaml( $yml_content );
				if ( ! empty( $yml_data ) ) {
					$wppic_data['sponsors_url'] = esc_url(
						sprintf(
							'https://github.com/sponsors/%s',
							preg_replace( '/[\[\]]/', '', $yml_data['github'] )
						)
					);
				}
			}

			// Now get the latest release.
			$wppic_data['latest_release_tag_name']     = '';
			$wppic_data['latest_release_download_url'] = '';
			$wppic_data['latest_release_url']          = '';
			if ( $wppic_data['has_downloads'] ) {
				$releases_url      = sprintf(
					'https://api.github.com/repos/%s/releases',
					$slug
				);
				$releases_response = wp_remote_get( esc_url( $releases_url ), array( 'headers' => $headers ) );
				if ( is_wp_error( $releases_response ) || 200 !== wp_remote_retrieve_response_code( $releases_response ) ) {
					return $wppic_data;
				}
				$releases_data = json_decode( wp_remote_retrieve_body( $releases_response ) );
				if ( ! empty( $releases_data ) ) {
					// Get the first item.
					$latest_release                        = current( $releases_data );
					$wppic_data['latest_release_tag_name'] = $latest_release->tag_name;
					if ( ! empty( $latest_release->assets ) ) {
						$current_asset                             = current( $latest_release->assets );
						$wppic_data['latest_release_download_url'] = $current_asset->browser_download_url;
					}
					$wppic_data['latest_release_url'] = $latest_release->html_url;
				}
			}

			// Get default full_name if not set.
			if ( empty( $wppic_data['name'] ) ) {
				$wppic_data['name'] = $wppic_data['login'];
			}

			// Sanitize the data.
			$wppic_data = Functions::sanitize_array_recursive( $wppic_data );

			// Return in object format.
			return json_decode( wp_json_encode( $wppic_data ) );
		}

		return $wppic_data;
	}

	/**
	 * Get a nested value from an object/array using dot notation.
	 *
	 * @param object|array $data The data object or array.
	 * @param string       $path The path to the value (e.g., 'organization/login').
	 *
	 * @return mixed|null The value if found, null otherwise.
	 */
	private function get_nested_value( $data, $path ) {
		$keys    = explode( '/', $path );
		$current = $data;

		foreach ( $keys as $key ) {
			if ( is_object( $current ) && isset( $current->$key ) ) {
				$current = $current->$key;
			} elseif ( is_array( $current ) && isset( $current[ $key ] ) ) {
				$current = $current[ $key ];
			} else {
				return null;
			}
		}

		return $current;
	}

	/**
	 * Parse a simple YAML string.
	 *
	 * @param string $yaml The YAML string to parse.
	 *
	 * @return array The parsed YAML data.
	 */
	private function parse_simple_yaml( $yaml ) {
		$result = array();
		$lines  = preg_split( '/\r\n|\r|\n/', $yaml );

		$current_key = null;
		foreach ( $lines as $line ) {
			$line = trim( $line );
			if ( '' === $line || strpos( $line, '#' ) === 0 ) {
				continue; // skip blank lines & comments.
			}

			// Key: value format.
			if ( preg_match( '/^([A-Za-z0-9_]+):\s*(.+)?$/', $line, $matches ) ) {
				$key = $matches[1];
				$val = $matches[2] ?? '';
				if ( '' === $val ) {
					$result[ $key ] = array();
					$current_key    = $key;
				} else {
					$result[ $key ] = $val;
					$current_key    = null;
				}
			} elseif ( $current_key && preg_match( '/^- (.+)$/', $line, $matches ) ) {
				$result[ $current_key ][] = trim( $matches[1] );
			}
		}
		return $result;
	}

	/**
	 * Load a plugin template.
	 *
	 * @param string $content The content.
	 * @param array  $data    Plugin data.
	 */
	public function plugin_template( $content, $data ) {
		$type       = $data[0];
		$wppic_data = $data[1]; // $wppic_data is used in the included templates.
		$image      = $data[2]; // $image is used in the included templates.
		$layout     = '-' . $data[3];

		if ( 'plugin' === $type ) {

			// load custom user template if exists.
			$wppic_template_file = '/wppic-templates/wppic-template-plugin';

			ob_start();
			if ( file_exists( get_stylesheet_directory() . $wppic_template_file . $layout . '.php' ) ) {
				include get_stylesheet_directory() . $wppic_template_file . $layout . '.php';
			} elseif ( file_exists( Functions::get_plugin_dir( 'templates/wppic-template-plugin' . $layout . '.php' ) ) ) {
				include Functions::get_plugin_dir( 'templates/wppic-template-plugin' . $layout . '.php' );
			} else {
				include Functions::get_plugin_dir( 'templates/wppic-template-plugin.php' );
			}
			$content .= ob_get_clean();

		}

		return $content;
	}

	/**
	 * Add MCE types for the plugins.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function mce_type( $parameters ) {
		$parameters['types'][] = array(
			'text'  => __( 'Plugin', 'wp-plugin-info-card' ),
			'value' => 'plugin',
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
			'list',
			__( 'Add a plugin', 'wp-plugin-info-card' ),
			__(
				'Please refer to the plugin URL on wordpress.org to determine its slug',
				'wp-plugin-info-card'
			),
			'https://wordpress.org/plugins/<strong>THE-SLUG</strong>/',
		);
		return $parameters;
	}

	/**
	 * Add MCE list validation for the plugins.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function list_validation( $parameters ) {
		$parameters[] = array(
			'list',
			__( 'is not a valid plugin name format. This key has been deleted.', 'wp-plugin-info-card' ),
			'/^[a-z0-9\-]+$/',
		);
		return $parameters;
	}

	/**
	 * Add MCE widget type for the plugins.
	 *
	 * @param array $parameters Array of MCE types.
	 *
	 * @return array $parameters Array of MCE types.
	 */
	public function widget_type( $parameters ) {
		$parameters[] = array( 'plugin', 'list', __( 'Plugins', 'wp-plugin-info-card' ) );
		return $parameters;
	}

	/**
	 * Output the plugin widget.
	 *
	 * @param string $content    The content output.
	 * @param object $wppic_data The plugin data.
	 * @param string $type       Plugin or Theme.
	 *
	 * @return string $content.
	 */
	public function widget_item( $content, $wppic_data, $type ) {
		if ( 'plugin' === $type ) {

			$date_format = Options::get_date_format();

			$wppic_data->last_updated = date_i18n( $date_format, strtotime( $wppic_data->last_updated ) );

			$content .= '<div class="wp-pic-item">';
			$content .= '<a class="wp-pic-widget-name" href="' . esc_url( $wppic_data->url ) . '" target="_blank" title="' . __( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ) . '">' . esc_html( $wppic_data->name ) . '</a>';
			$content .= '<span class="wp-pic-widget-rating"><span>' . __( 'Ratings:', 'wp-plugin-info-card' ) . '</span> ' . esc_html( $wppic_data->rating ) . '%';
			if ( ! empty( $wppic_data->num_ratings ) ) {
				$content .= ' (' . esc_html( $wppic_data->num_ratings ) . esc_html__( ' votes', 'wp-plugin-info-card' ) . ')';
			}
			$content .= '</span>';
			$content .= '<span class="wp-pic-widget-downloaded"><span>' . __( 'Active Installs:', 'wp-plugin-info-card' ) . '</span> ' . esc_html( number_format_i18n( $wppic_data->active_installs ) ) . '+</span>';
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
