<?php
/***************************************************************
 * SECURITY : Exit if accessed directly
***************************************************************/
if ( !defined( 'ABSPATH' ) ) {
	die( 'Direct acces not allowed!' );
}


/***************************************************************
 * Back-End Scripts & Styles enqueueing
 ***************************************************************/
function wppic_admin_css() {
	
}


/***************************************************************
 * Create admin page menu
 ***************************************************************/
function wppic_create_menu() {

	

}
add_action( 'admin_menu', 'wppic_create_menu' );


/***************************************************************
 * Register plugin settings
 ***************************************************************/
function wppic_register_settings() {
	

}
add_action( 'admin_init', 'wppic_register_settings' );


/***************************************************************
 * Admin page structure
 ***************************************************************/
function wppic_settings_page() {
	
}

/***************************************************************
 * Layout Dropdown
 ***************************************************************/
function wppic_default_layout() {
	global 	$wppicSettings;
	$layouts = array(
		'card',
		'wordpress',
		'large',
		'flex',
	);

	$layout = isset( $wppicSettings[ 'default_layout' ] ) ? $wppicSettings[ 'default_layout' ] : 'card';

	$content = '<td>';
		$content .= '<select id="wppic-default-layout" name="wppic_settings[default_layout]">';
		$content .= '<option value="card"  '. selected( $layout, 'card', false ) . ' >' . esc_html__( 'Card', 'wp-plugin-info-card' ) . '</option>';
		$content .= '<option value="wordpress"  '. selected( $layout, 'wordpress', false ) . ' >' . esc_html__( 'WordPress Appearance', 'wp-plugin-info-card' ) . '</option>';
		$content .= '<option value="large"  '. selected( $layout, 'large', false ) . ' >' . esc_html__( 'Large Card Layout', 'wp-plugin-info-card' ) . '</option>';
		$content .= '<option value="flex"  '. selected( $layout, 'flex', false ) . ' >' . esc_html__( 'Wide Screen Flex Layout', 'wp-plugin-info-card' ) . '</option>';
		$content .= '</select>';
		$content .= '<label for="wppic-default-layout">' . __( 'Default layout for your cards.', 'wp-plugin-info-card' ) . '</label>';
	$content .= '</td>';
	echo $content;
}

/***************************************************************
 * Color Scheme dropdown
 ***************************************************************/
function wppic_color_scheme() {
	global 	$wppicSettings;
	$scheme = $wppicSettings[ 'colorscheme' ];

	$content = '<td>';
		$content .= '<select id="wppic-color-scheme" name="wppic_settings[colorscheme]">';
		$content .= '<option value="default"  '. selected( $scheme, 'default', FALSE ) . ' >Default</option>';
		$content .= '<option value="scheme1"  '. selected( $scheme, 'scheme1', FALSE ) . ' >Color scheme 1</option>';
		$content .= '<option value="scheme2"  '. selected( $scheme, 'scheme2', FALSE ) . ' >Color scheme 2</option>';
		$content .= '<option value="scheme3"  '. selected( $scheme, 'scheme3', FALSE ) . ' >Color scheme 3</option>';
		$content .= '<option value="scheme4"  '. selected( $scheme, 'scheme4', FALSE ) . ' >Color scheme 4</option>';
		$content .= '<option value="scheme5"  '. selected( $scheme, 'scheme5', FALSE ) . ' >Color scheme 5</option>';
		$content .= '<option value="scheme6"  '. selected( $scheme, 'scheme6', FALSE ) . ' >Color scheme 6</option>';
		$content .= '<option value="scheme7"  '. selected( $scheme, 'scheme7', FALSE ) . ' >Color scheme 7</option>';
		$content .= '<option value="scheme8"  '. selected( $scheme, 'scheme8', FALSE ) . ' >Color scheme 8</option>';
		$content .= '<option value="scheme9"  '. selected( $scheme, 'scheme9', FALSE ) . ' >Color scheme 9</option>';
		$content .= '<option value="scheme10" '. selected( $scheme, 'scheme10', FALSE ) . '>Color scheme 10</option>';
		$content .= '<option value="scheme11" '. selected( $scheme, 'scheme11', FALSE ) . '>Color scheme 11</option>';
		$content .= '<option value="scheme12" '. selected( $scheme, 'scheme12', FALSE ) . '>Color scheme 12</option>';
		$content .= '<option value="scheme13" '. selected( $scheme, 'scheme13', FALSE ) . '>Color scheme 13</option>';
		$content .= '<option value="scheme14" '. selected( $scheme, 'scheme14', FALSE ) . '>Color scheme 14</option>';
		$content .= '</select>';
		$content .= '<label for="wppic-color-scheme">' . __( 'Default color scheme for your cards.', 'wp-plugin-info-card' ) . '</label>';
	$content .= '</td>';
	echo $content;
}


/***************************************************************
 * Checkbox input
 ***************************************************************/
function wppic_checkbox( $args ) {
	global 	$wppicSettings;
	$content = '<td>';
		$content .= '<input type="checkbox" id="' . $args[ 'id' ] . '" name="wppic_settings[' . $args[ 'name' ] . ']"  value="1" ';
		if( isset( $wppicSettings[ $args[ 'name' ] ] ) ) {
			$content .= checked( 1, $wppicSettings[ $args[ 'name' ] ], false );
		}
		$content .= '/>';
		$content .= '<label for="' . $args[ 'id' ] . '">' . $args[ 'label' ] . '</label>';
	$content .= '</td>';
	echo $content;
}


/***************************************************************
 * Dashboard widget plugin list
 ***************************************************************/
function wppic_list_form() {
	global 	$wppicSettings;
	$wppicListForm = array();
	$wppicListForm = apply_filters( 'wppic_add_list_form', $wppicListForm );

	$content = '<td>';

	if( !empty ( $wppicListForm ) ){
		foreach ( $wppicListForm as $wppicItemForm ){
			$content .= '<div class="form-list">';
				$content .= '<button class="button wppic-add-fields" data-type="' . $wppicItemForm[0] . '">' . $wppicItemForm[1] . '</button><input type="text" name="wppic-add" class="wppic-add"  value="">';
				$content .= '<ul id="wppic-' . $wppicItemForm[0] . '" class="wppic-list">';
						if( !empty( $wppicSettings[ $wppicItemForm[0] ] ) ){
							foreach($wppicSettings[ $wppicItemForm[0] ] as $item){
								$content .= '<li class="wppic-dd"><input type="text" name="wppic_settings[' . $wppicItemForm[0] . '][]"  value="' . $item . '"><span class="wppic-remove-field" title="remove"></span></li>';
							}
						}
				$content .= '</ul>';
				$content .= '<p>' . $wppicItemForm[2] . ' - <i>' . $wppicItemForm[3] . '</i> -<p>';
			$content .= '</div>';
		}
	}

	$content .= '</td>';
	echo $content;

}


/***************************************************************
 * Form validator
 ***************************************************************/
function wppic_validate( $input ) {
	if( isset( $input[ 'list' ] ) && !empty( $input[ 'list' ] ) ){

		$validationList = array();
		$validationList = apply_filters( 'wppic_add_list_valdiation', $validationList );

		foreach( $validationList as $element ){
			if( isset( $input[ $element[0] ] ) && !empty( $input[ $element[0] ] ) ){

				//remove duplicate
				$input[ $element[0] ] = array_unique( $input[ $element[0] ] );

				foreach( $input[ $element[0] ] as $key => $item ){
					if( !preg_match( $element[2], $item ) ) {
						if( !empty ( $item ) ){
							add_settings_error(
								'wppic-admin-notice',
								esc_attr( 'wppic-error' ),
								'<i>"' . $item . '"</i> ' . $element[1],
								'error'
							);
						}
						unset( $input[ $element[0] ][ $key ]);
					}
				}

			}
		}
	}

	return $input;
}


/***************************************************************
 * About section
 ***************************************************************/
function wppic_plugins_about() {
	$content ='
		<hr />
		<div id="wppic-about-list">
			<a class="wppic-button wppic-pluginHome" href="https://mediaron.com/wp-plugin-info-card/" target="_blank">' . __( 'Plugin homepage', 'wp-plugin-info-card' ) . '</a>
			<a class="wppic-button wppic-pluginPage" href="https://wordpress.org/plugins/wp-plugin-info-card/" target="_blank">WordPress.org</a>
			<a class="wppic-button wppic-pluginSupport" href="https://wordpress.org/support/plugin/wp-plugin-info-card" target="_blank">' . __( 'Support', 'wp-plugin-info-card' ) . '</a>
			<a class="wppic-button wppic-pluginRate" href="https://wordpress.org/support/view/plugin-reviews/wp-plugin-info-card?rate=5#postform" target="_blank">' . __( 'Rate Us Five Stars', 'wp-plugin-info-card' ) . '</a>
			<a class="wppic-button wppic-pluginCode" href="https://github.com/MediaRon/wp-plugin-info-card" target="_blank">' . __( 'Find Us On GitHub', 'wp-plugin-info-card' ) . '</a>
			<a class="wppic-button wppic-pluginContact" href="https://mediaron.com/contact/" target="_blank">' . __( 'Contact Us', 'wp-plugin-info-card' ) . '</a>
		</div>
		<hr />
	';
	return $content;
}


/***************************************************************
 * Clear plugin transients with ajax
 ***************************************************************/
function wppic_clear_cache() {
	wppic_delete_transients();
}
add_action( 'wp_ajax_async_wppic_clear_cache', 'wppic_clear_cache' );
