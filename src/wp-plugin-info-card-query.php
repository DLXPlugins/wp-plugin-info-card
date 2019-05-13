<?php
/***************************************************************
 * SECURITY : Exit if accessed directly
***************************************************************/
if ( !defined( 'ABSPATH' ) ) {
	die( 'Direct acces not allowed!' );
}

/***************************************************************
 * Query the WordPress Plugin and Theme APIs
 ***************************************************************/
function wppic_shortcode_query_function( $atts, $content="" ) {

	//Retrieve & extract shorcode parameters
	extract( shortcode_atts( array(
		"search"		=> '',	//A search term. Default empty.
		"tag"			=> '',	//Tag to filter themes. Comma separated list. Default empty.
		"author"		=> '',	//Username of an author to filter themes. Default empty.
		"user"			=> '',	//Username to query for their favorites. Default empty.
		"browse"		=> '',	//Browse view: 'featured', 'popular', 'updated', 'favorites'.
		"per_page"		=> '',	//Number of themes per query (page). Default 24.
		"cols"			=> '',	//Columns layout to use: '2', '3'. Default empty (none).
		//Default wppic shortcode attributs
		"type"			=> '',	//plugin | theme
		"slug" 			=> '',	//plugin slug name
		"image" 		=> '',	//image url to replace WP logo (175px X 175px)
		"align" 		=> '',	//center|left|right
		"containerid" 	=> '',	//custom Div ID (could be use for anchor)
		"margin" 		=> '',	//custom container margin - eg: "15px 0"
		"clear" 		=> '',	//clear float before or after the card: before|after
		"expiration" 	=> '',	//transient duration in minutes - 0 for never expires
		"ajax" 			=> '',	//load plugin data async whith ajax: yes|no (default: no)
		"scheme" 		=> '',	//color scheme : default|scheme1->scheme10 (default: empty)
		"layout" 		=> '',	//card|flat|wordpress
		"custom" 		=> '',	//value to print : url|name|version|author|requires|rating|num_ratings|downloaded|last_updated|download_link
	), $atts, 'wppic_default' ) );

	//Prepare the row columns
	$column = false;
	$cols = absint( $cols );
	if ( is_numeric( $cols ) && $cols > 0 && $cols < 4 ) {
		$column = true;
	}

	//Build the query
	$queryArgs = array(
		'search' 	=> $search,
		'tag' 		=> $tag,
		'author' 	=> $author,
		'user' 		=> $user,
		'browse' 	=> $browse,
		'per_page' 	=> $per_page,
		'fields' => array(
			'name'				=> false,
			'requires'			=> false,
			'tested'			=> false,
			'compatibility'		=> false,
			'screenshot_url'	=> false,
			'ratings'			=> false,
			'rating' 			=> false,
			'num_ratings' 		=> false,
			'homepage' 			=> false,
			'sections' 			=> false,
			'description' 		=> false,
			'short_description'	=> false
		)
	);
	$queryArgs = apply_filters( 'wppic_api_query', $queryArgs, $type, $atts );

	$api = '';

	//Plugins query
	if ( $type == 'plugin' ) {
		$type = 'plugins';
		require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );
		$api = plugins_api( 'query_plugins', $queryArgs	);
	}

	//Themes query
	if ( $type == 'theme' ) {
		$type = 'themes';
		require_once( ABSPATH . 'wp-admin/includes/theme.php' );
		$api = themes_api( 'query_themes',$queryArgs );
	}

	//Get the query result to build the content
	if( !is_wp_error( $api ) && !empty( $api ) ){
		if( is_array( $api->$type ) ){

			$content = $row = $open = $close = '';
			$count = 1;
			if( $column ){
				$open = '<div class="wp-pic-1-' . $cols .'">';
				$close = '</div>';
				$content .= '<div class="wp-pic-grid">';
			}

			//Creat the loop wp-pic-1-
			foreach ( $api->$type as $item ){
				$item = json_decode( json_encode( $item ) );
				if ( $column && ( $count ) % $cols == 1 && $cols > 1 ){
					$row = true;
					$content .= '<div class="wp-pic-row">';
				}
				$content .= $open;
				$atts[ 'slug' ] = $item->slug;
				//Use the WPPIC shorcode to generate cards
				$content .= wppic_shortcode_function( $atts );
				$content .= $close;
				if ( $column && ( $count ) % $cols == 0 && $cols > 1 ){
					$content .= '</div>';
					$row = false;
				}
				$count++;
			}

			if( $row ){
				$content .= '</div>'; //end of row
			}
			if( $column ){
				$content .= '</div>'; //end of grid
			}

			return apply_filters( 'wppic_query_content', $content, $type, $atts );

		}
	}

} //end of wp-pic-query Shortcode

add_shortcode( 'wp-pic-query', 'wppic_shortcode_query_function' );
