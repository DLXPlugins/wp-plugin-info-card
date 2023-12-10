<?php
/**
 * Set up option saving/retrieval.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for for plugin's options.
 */
class Options {

	/**
	 * Array holding the options.
	 *
	 * @var [type]
	 */
	protected static $options = false;

	/**
	 * Static var to hold date format.
	 *
	 * @var string $date_format Date format.
	 */
	private static $date_format = '';

	/**
	 * Retrieve date format.
	 *
	 * @return string Date format.
	 */
	public static function get_date_format() {
		if ( empty( self::$date_format ) ) {
			self::$date_format = get_option( 'date_format' );
		}

		return self::$date_format;
	}

	/**
	 * Update options via sanitization
	 *
	 * @since 1.0.0
	 * @access public
	 * @param array $options array of options to save.
	 * @param bool  $merge_options Whether to merge options with old options or not.
	 * @return array $options.
	 */
	public static function update_options( $options, $merge_options = true ) {
		$force           = true;
		$current_options = $merge_options ? self::get_options( $force, true ) : array();
		foreach ( $options as $key => &$option ) {
			switch ( $key ) {
				case 'enable':
				case 'debug':
				case 'menuHelper':
				case 'disableUrlUpdate':
				case 'disableScrollToAnchor':
				case 'useUncompressedScripts':
				case 'placeScriptsInFooter':
				case 'optimizeAjaxResponse':
				case 'disableCache':
				case 'enableByQuery':
				case 'lazyLoadEnabled':
				case 'lazyLoadPaginationEnabled':
				case 'lazyLoadUseThemePagination':
				case 'lazyLoadingPaginationScrollToTop':
					$option = filter_var( $options[ $key ], FILTER_VALIDATE_BOOLEAN );
					break;
				default:
					if ( is_array( $option ) ) {
						$option = Functions::sanitize_array_recursive( $option );
					} else {
						$option = sanitize_text_field( $options[ $key ] );
					}
					break;
			}
		}
		$options = wp_parse_args( $options, $current_options );
		if ( Functions::is_multisite() ) {
			update_site_option( WPAC_OPTION_KEY, $options );
		} else {
			update_option( WPAC_OPTION_KEY, $options );
		}
		self::$options = $options;
		return $options;
	}

	/**
	 * Return a list of options.
	 *
	 * @param bool $force Whether to get options from cache or not.
	 *
	 * @return array Array of options.
	 */
	public static function get_options( $force = false ) {
		if ( is_array( self::$options ) && ! $force ) {
			return self::$options;
		}
		if ( Functions::is_multisite() ) {
			$options = get_site_option( 'wppic_settings', array() );
		} else {
			$options = get_option( 'wppic_settings', array() );
		}

		$defaults      = self::get_defaults();
		$options       = wp_parse_args( $options, $defaults );
		self::$options = $options;

		/**
		 * Filter the options before they are returned.
		 *
		 * @param array  $options The options to be output.
		 */
		$options       = apply_filters(
			'wppic_options_home',
			$options,
		);
		self::$options = $options;
		return $options;
	}

	/**
	 * Get defaults for SCE options
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array default options
	 */
	public static function get_defaults() {
		$defaults = array(
			'default_layout' => 'card',
			'colorscheme'    => 'default',
			'widget'         => false,
			'ajax'           => false,
			'enqueue'        => false,
			'credit'         => false,
		);
		return $defaults;
	}
}
