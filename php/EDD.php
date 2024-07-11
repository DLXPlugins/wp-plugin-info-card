<?php

/**
 * Output home wppic tab.
 *
 * @package wppic
 */

namespace MediaRon\WPPIC;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Output the EDD tab and content.
 */
class EDD {

	/**
	 * Main class runner.
	 *
	 * @return Blocks.
	 */
	public function run() {
		$self = new self();

		$edd_enabled = true; // todo option.

		if ( $edd_enabled ) {
			add_filter( 'wppic_plugin_info', array( $this, 'add_edd_data' ), 10, 4 );
			add_action( 'init', array( $this, 'init' ) );

			// Modify downloads post type to support custom fields.
			add_action( 'init', array( $this, 'add_custom_fields_to_downloads' ), 100 );

			// Enqueue the sidebar for EDD post type.
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );

			// For clearing plugin cache when a download is updated.
			add_action( 'save_post', array( $this, 'clear_plugin_cache' ), 10 );
		}

		return $self;
	}

	/**
	 * Clear the plugin cache when a download is updated.
	 *
	 * @param int $post_id Post ID.
	 */
	public function clear_plugin_cache( $post_id ) {
		if ( 'download' !== get_post_type( $post_id ) ) {
			return;
		}
		$slug       = get_post_field( 'post_name', $post_id );
		$option_key = sanitize_key( 'wppic_plugin_' . preg_replace( '/\-/', '_', $slug ) );

		// Clear the cache.
		delete_transient( $option_key );
		delete_option( $option_key );
	}

	/**
	 * Add custom fields to the downloads post type.
	 */
	public function add_custom_fields_to_downloads() {
		// Add custom fields support to the downloads post type.
		add_post_type_support( 'download', 'custom-fields' );
	}

	/**
	 * Enqueue block editor assets.
	 */
	public function enqueue_block_editor_assets() {
		if ( 'download' !== get_post_type() ) {
			return;
		}
		$deps = require Functions::get_plugin_dir( 'build/edd-sidebar.asset.php' );
		wp_enqueue_script(
			'wppic-edd',
			Functions::get_plugin_url( 'build/edd-sidebar.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
	}

	/**
	 * Initialize the meta boxes.
	 */
	public function init() {
		register_post_meta(
			'download',
			'_wppic_plugin_author', /* true or false */
			array(
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'type'              => 'string',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'single'            => true,
				'default'           => '',
			)
		);
		register_post_meta(
			'download',
			'_wppic_override_ratings', /* true or false */
			array(
				'sanitize_callback' => 'rest_sanitize_boolean',
				'show_in_rest'      => true,
				'type'              => 'boolean',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'single'            => true,
				'default'           => false,
			)
		);
		register_post_meta(
			'download',
			'_wppic_num_ratings', /* number of ratings */
			array(
				'sanitize_callback' => 'absint',
				'show_in_rest'      => true,
				'type'              => 'integer',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'single'            => true,
				'default'           => 0,
			)
		);
		register_post_meta(
			'download',
			'_wppic_rating_percentage', /* e.g., 96 for 96 */
			array(
				'sanitize_callback' => 'absint',
				'show_in_rest'      => true,
				'type'              => 'integer',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'single'            => true,
				'default'           => 0,
			)
		);
	}

	/**
	 * Add EDD data to the plugin info card.
	 *
	 * @param array  $existing_data Existing plugin data.
	 * @param string $slug          Plugin slug.
	 * @param string $type          Plugin type.
	 * @param bool   $force         Force refresh.
	 *
	 * @return array
	 */
	public function add_edd_data( $existing_data, $slug, $type, $force ) {
		if ( ! function_exists( 'edd_get_download' ) ) {
			return $existing_data;
		}
		$maybe_download = edd_get_download( $slug );
		if ( ! $maybe_download ) {
			return $existing_data;
		}

		$options = Options::get_options();

		$existing_data = array();

		// Get plugin name.
		$existing_data['name'] = \get_the_title( $maybe_download->ID );

		// Get slug.
		$existing_data['slug'] = $slug;

		// Get plugin version.
		$existing_data['version'] = sanitize_text_field( get_post_meta( $maybe_download->ID, '_edd_sl_version', true ) );

		// Get the required versions.
		$required_versions = get_post_meta( $maybe_download->ID, '_edd_sl_required_versions', true ); // format is: php, wp.
		if ( $required_versions ) {
			if ( isset( $required_versions['wp'] ) ) {
				$existing_data['requires'] = $required_versions['wp'];
			}
			if ( isset( $required_versions['php'] ) ) {
				$existing_data['requires_php'] = $required_versions['php'];
			}
		}

		// Get the short description from excerpt. Overwrite with readme later if needed.
		$existing_data['short_description'] = get_the_excerpt( $maybe_download->ID );

		// Parse the plugin's readme.
		$readme_url  = get_post_meta( $maybe_download->ID, '_edd_readme_location', true );
		$readme_data = false;

		// Get the author and link to the download page for the plugin.
		$existing_data['author'] = get_the_author_meta( 'display_name', $maybe_download->post_author );

		// Try to get author from meta and override if set.
		$maybe_author = get_post_meta( $maybe_download->ID, '_wppic_plugin_author', true );
		if ( $maybe_author ) {
			$existing_data['author'] = $maybe_author;
		}

		// Author/Download URL.
		$readme_homepage = get_post_meta( $maybe_download->ID, '_edd_readme_plugin_homepage', true );
		if ( $readme_homepage ) {
			$existing_data['homepage'] = $readme_homepage;
		} else {
			$existing_data['homepage'] = get_permalink( $maybe_download->ID );
		}

		// Set the download link to the download page.
		$existing_data['download_link'] = get_permalink( $maybe_download->ID );

		// Get the URL for the download.
		$existing_data['url'] = get_permalink( $maybe_download->ID );

		// Set last updated and mk.
		$existing_data['last_updated']    = get_the_modified_date( 'Y-m-d', $maybe_download->ID );
		$existing_data['last_updated_mk'] = strtotime( get_the_modified_date( 'Y-m-d', $maybe_download->ID ) );

		// Set the plugin added date.
		$existing_data['added'] = get_the_date( 'Y-m-d', $maybe_download->ID );

		// Get total number of downloads for the plugin.
		$existing_data['downloaded'] = get_post_meta( $maybe_download->ID, 'edd_sl_download_lifetime', true );

		// Get the total number of active installs (active licenses) for the download.
		if ( function_exists( 'edd_software_licensing' ) ) {
			$args     = array(
				'number'      => -1,
				'download_id' => $maybe_download->ID,
			);
			$licenses = edd_software_licensing()->licenses_db->get_licenses( $args );

			// Count the number of active licenses.
			$active_installs = 0;
			foreach ( $licenses as $license ) {
				if ( 'active' === $license->status ) {
					++$active_installs;
				}
			}
			$existing_data['active_installs'] = $active_installs;
		}

		// Parse the readme and override if necessary.
		if ( function_exists( '_edd_sl_get_readme_data' ) ) {
			$readme_data = _edd_sl_get_readme_data( $readme_url );

			// overwrite requires header with readme.
			if ( isset( $readme_data['requires'] ) ) {
				$existing_data['requires'] = $readme_data['requires'];
			}

			// Overwrite tested header with readme.
			if ( isset( $readme_data['tested'] ) ) {
				$existing_data['tested'] = $readme_data['tested'];
			}

			// Overwrite contributors header with readme.
			if ( isset( $readme_data['contributors'] ) ) {
				$existing_data['contributors'] = $readme_data['contributors'];
			}

			// If short description set in readme, use it.
			if ( isset( $readme_data['short_description'] ) ) {
				$existing_data['short_description'] = $readme_data['short_description'];
			}
		}

		// Get the featured image URL which will be used for the icons. Format in array is 1x, 2x.
		$post_thumbnail_id = get_post_thumbnail_id( $maybe_download->ID );
		if ( ! $post_thumbnail_id ) {
			// Try to get from options.
			$icon_id = (int) $options['edd_default_icon_id'];
			if ( 0 !== $icon_id ) {
				$post_thumbnail_id = $icon_id;
			}
		}
		$featured_image = wp_get_attachment_image_src( $post_thumbnail_id );
		if ( $featured_image ) {
			$existing_data['icons'] = array(
				'1x' => $featured_image[0],
				'2x' => $featured_image[0],
			);
		} else {
			$existing_data['icons'] = array();
		}

		// Get the plugin banners.
		$banner_high = get_post_meta( $maybe_download->ID, '_edd_readme_plugin_banner_high', true );
		$banner_low  = get_post_meta( $maybe_download->ID, '_edd_readme_plugin_banner_low', true );
		if ( $banner_high && $banner_low ) {
			$existing_data['banners'] = array(
				'high' => $banner_high,
				'low'  => $banner_low,
			);
		} else {
			// Try to get from options.
			$banner_id = (int) $options['edd_default_banner_id'];
			if ( 0 !== $banner_id ) {
				$banner = wp_get_attachment_image_src( $banner_id );
				if ( $banner ) {
					$existing_data['banners'] = array(
						'high' => $banner[0],
						'low'  => $banner[0],
					);
				}
			}
			if ( ! isset( $existing_data['banners'] ) ) {
				$existing_data['banners'] = array();
			}
			
		}

		// Set screenshots.
		$existing_data['screenshots'] = array();

		// Check post meta to see if we're overriding a rating.
		$override_rating = (bool) get_post_meta( $maybe_download->ID, '_wppic_override_ratings', true );
		if ( $override_rating ) {
			$existing_data['rating'] = get_post_meta( $maybe_download->ID, '_wppic_rating_percentage', true );
			$existing_data['num_ratings'] = get_post_meta( $maybe_download->ID, '_wppic_num_ratings', true );
			$existing_data['ratings'] = array();
		} else {
			// Get rating from meta.
			$maybe_rating = get_post_meta( $maybe_download->ID, 'edd_reviews_average_rating', true );
			if ( $maybe_rating ) {
				$existing_data['rating'] = round( $maybe_rating * 20, 2 );

				// Reviews are comments, so get the number of comments.
				$existing_data['num_ratings'] = get_comments_number( $maybe_download->ID );
				$existing_data['ratings']     = array();
			}
		}

		return $existing_data;
	}
}
