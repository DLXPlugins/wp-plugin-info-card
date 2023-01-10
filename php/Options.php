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
	 * Static var to hold options.
	 *
	 * @var array $options Options array.
	 */
	private static $options = array();

	/**
	 * Static var to hold date format.
	 *
	 * @var string $date_format Date format.
	 */
	private static $date_format = '';

	/**
	 * Retrieve plugin options (plugins are saved using settings API).
	 *
	 * @return array Options array.
	 */
	public static function get_options() {
		if ( empty( self::$options ) ) {
			self::$options = get_option( 'wppic_settings', array() );
		}

		return self::$options;
	}

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
}
