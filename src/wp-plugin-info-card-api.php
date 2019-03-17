<?php
/***************************************************************
 * SECURITY : Exit if accessed directly
***************************************************************/
if ( !defined( 'ABSPATH' ) ) {
	die( 'Direct acces not allowed!' );
}


/***************************************************************
 * Fetching plugins and themes data through WordPress Plugin API
 ***************************************************************/
function wppic_api_parser( $type, $slug, $expiration = 720, $extra = '' ){		

	if( !empty( $extra ) ){
		$extra = $extra . '_';
	}
	
	$wppic_data = get_transient( 'wppic_'. $extra . $type . '_' . preg_replace( '/\-/', '_', $slug ) );
	
	//check if $expiration is numeric, only digit char
	if( empty( $expiration ) || !ctype_digit( $expiration ) )
		$expiration = 720;
		
	if ( false === $wppic_data || empty( $wppic_data ) ) {	
				
		$wppic_data = false;
		$wppic_data = apply_filters( 'wppic_add_api_parser', $wppic_data, $type, $slug );
		
		//Transient duration  def:12houres
		set_transient( 'wppic_'. $extra . $type . '_' . preg_replace( '/\-/', '_', $slug ), $wppic_data, $expiration*60 );
	}	
	return $wppic_data;
}