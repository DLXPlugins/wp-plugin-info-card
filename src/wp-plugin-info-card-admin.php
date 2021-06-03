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
function wppic_admin_scripts() {
	wp_register_script( 'wppic-lightbox', WPPIC_URL . 'lightbox/jquery.fancybox.min.js', array( 'jquery' ),  WPPIC_VERSION, true);
	wp_enqueue_script( 'wppic-admin-js', WPPIC_URL . 'js/wppic-admin-script.js', array( 'jquery', 'wppic-lightbox' ),  WPPIC_VERSION, true);
	wp_enqueue_script( 'wppic-js', WPPIC_URL . 'js/wppic-script.min.js', array( 'jquery' ),  WPPIC_VERSION, true);
	wp_enqueue_script( 'jquery-ui-sortable', WPPIC_URL . '/wp-includes/js/jquery/ui/jquery.ui.sortable.min.js', array( 'jquery' ),  WPPIC_VERSION, true);
}
function wppic_admin_css() {
	wp_enqueue_style( 'dashicons' );
	wp_enqueue_style( 'wppic-lightbox', WPPIC_URL . 'lightbox/jquery.fancybox.min.css', array(), WPPIC_VERSION, 'all');
	wp_enqueue_style( 'wppic-admin-css', plugins_url( '/dist/wppic-admin.css', WPPIC_FILE ), array(), WPPIC_VERSION, 'all');
}


/***************************************************************
 * Create admin page menu
 ***************************************************************/
function wppic_create_menu() {

	$admin_page = add_options_page( WPPIC_NAME_FULL, WPPIC_NAME, 'manage_options', WPPIC_ID,  'wppic_settings_page' );

	//Enqueue sripts and style
	add_action( 'admin_print_scripts-' . $admin_page, 'wppic_admin_scripts' );
	add_action( 'admin_print_styles-' . $admin_page, 'wppic_admin_css' );

}
add_action( 'admin_menu', 'wppic_create_menu' );


/***************************************************************
 * Register plugin settings
 ***************************************************************/
function wppic_register_settings() {
	register_setting(
		'wppic_settings',
		'wppic_settings',
		'wppic_validate'
	);
	add_settings_section(
		'wppic_options',
		'',
		'',
		WPPIC_ID . 'options'
	);
	add_settings_field(
		'wppic-default-layout',
		__( 'Default Layout', 'wp-plugin-info-card' ),
		'wppic_default_layout',
		WPPIC_ID . 'options',
		'wppic_options'
	);
	add_settings_field(
		'wppic-color-scheme',
		__( 'Color scheme', 'wp-plugin-info-card' ),
		'wppic_color_scheme',
		WPPIC_ID . 'options',
		'wppic_options'
	);
	add_settings_field(
		'wppic-enqueue',
		__( 'Force enqueuing CSS & JS', 'wp-plugin-info-card' ),
		'wppic_checkbox',
		WPPIC_ID . 'options',
		'wppic_options',
		array(
            'id' 	=> 'wppic-enqueue',
            'name' 	=> 'enqueue',
			'label' => __( 'By default the plugin enqueues scripts (JS & CSS) only for pages containing the shortcode. If you wish to force scripts enqueuing, check this box.', 'wp-plugin-info-card' )
        )
	);
	add_settings_field(
		'wppic-credit',
		__( 'Display a discrete credit', 'wp-plugin-info-card' ),
		'wppic_checkbox',
		WPPIC_ID . 'options',
		'wppic_options',
		array(
            'id' 	=> 'wppic-credit',
            'name' 	=> 'credit',
			'label' => __( 'Help spread the word about this plugin.', 'wp-plugin-info-card' )
        )
	);

	add_settings_section(
		'wppic_list',
		'',
		'',
		WPPIC_ID . 'widget'
	);
	add_settings_field(
		'wppic-list-widget',
		__( 'Enable dashboard widget', 'wp-plugin-info-card' ),
		'wppic_checkbox',
		WPPIC_ID . 'widget',
		'wppic_list',
		array(
            'id' 	=> 'wppic-widget',
            'name' 	=> 'widget',
			'label' => __( 'Help: Don\'t forget to open the dashboard option panel (top right) to display it on your dashboard.', 'wp-plugin-info-card' )
        )
	);
	add_settings_field(
		'wppic-list-ajax',
		__( 'Ajaxify dashboard widget', 'wp-plugin-info-card' ),
		'wppic_checkbox',
		WPPIC_ID . 'widget',
		'wppic_list',
		array(
            'id' 	=> 'wppic-ajax',
            'name' 	=> 'ajax',
			'label' => __( 'Will load the data asynchronously with AJAX.', 'wp-plugin-info-card' )
        )
	);
	add_settings_field(
		'wppic-list-form',
		__( 'List of items to display', 'wp-plugin-info-card' ),
		'wppic_list_form',
		WPPIC_ID . 'widget',
		'wppic_list'
	);

}
add_action( 'admin_init', 'wppic_register_settings' );


/***************************************************************
 * Admin page structure
 ***************************************************************/
function wppic_settings_page() {
	global 	$wppicSettings;

	//Get default card color shceme
	$scheme = $wppicSettings[ 'colorscheme' ];
	if(	$scheme == 'default' ){
		$scheme = '';
	}
	$layout = isset( $wppicSettings[ 'default_layout' ] ) ? $wppicSettings[ 'default_layout' ] : 'card';

	//Check if memcache is loaded (no transients purging)
	$memcache = '';
	if( !extension_loaded( 'Memcache' ) ){
		$memcache = '
			<p class="wppic-cache-clear">
				<button class="wppic-cache-clear-button first button button-primary" data-success="' . __( 'Cache was successfully cleared', 'wp-plugin-info-card' ) . '" data-error="' . __( 'Something went wrong', 'wp-plugin-info-card' ) . '">' . __( 'Clear cache', 'wp-plugin-info-card' ) . '</button>
				<span class="wppic-cache-clear-loader" style="display: none; background-image: url( ' . admin_url() . 'images/spinner-2x.gif);"></span>
			</p>
		';
	}

	echo '
	<div class="wrap">
		<div id="post-body-content">
			<div id="wppic-admin-page" class="postbox meta-box-sortables">
			<h1 style="display: flex; align-items: center; font-size: 36px"><img src="' . WPPIC_URL . 'img/wppic.svg" class="wppic-logo" alt="b*web" style="width: 36px; height: 36px;" />&nbsp;' . WPPIC_NAME_FULL . '</h1>
			<h2 class="description">' . esc_html__( 'Beautiful plugin and theme cards by:', 'wp-plugin-info-card' ) . ' ' . '<a class="wppic-admin-link" href="https://www.b-website.com/">Brice CAPOBIANCO</a>' . ' ' . esc_html__( 'and', 'wp-plugin-info-card' ) . ' ' . '<a class="wppic-admin-link" href="https://mediaron.com">Ronald Huereca</a></h2>
			' . wppic_plugins_about() . '
				<div id="wppic-shortcode">
				<h2><span>' . esc_html__( 'Documentation', 'wp-plugin-info-card' ) . '</span></h2>
				<div class="inside">
				<p><a class="documentation wppic-admin-link" href="https://mediaron.com/wp-plugin-info-card/" target="_blank" title="'. __( 'View Documentation and examples', 'wp-plugin-info-card' ) .'">'. esc_html__( 'View Documentation and Examples', 'wp-plugin-info-card' ) .' <span class="dashicons dashicons-external"></span></a></p></div>
					<h2>' . esc_html__( 'The Block Editor', 'wp-plugin-info-card' ) . '</h2>
					<div class="inside">
						<p class="description"> ' . esc_html__( 'Use our blocks to show your cards in the block editor. All options are supported.', 'wp-plugin-info-card' ) . 	'</p>
						<a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-caption="' . esc_attr__( 'WP Plugin Info Card in the Block Editor', 'wp-plugin-info-card' ) . '" href="' . esc_url( WPPIC_URL . 'img/wppic.gif' ) . '">' . esc_html__( 'View Block Demo', 'wp-plugin-info-card' ) . '</a>
					</div>
					<h2><span>' . __( 'Shortcodes', 'wp-plugin-info-card' ) . '</span></h2>
					<div class="inside">
					<p class="description"> ' . esc_html__( 'Use shortcodes to show a plugin or theme card just about anywhere.', 'wp-plugin-info-card' ) . '</p>
					<a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-src="#plugin-info-admim-demo-card" data-caption="' . esc_attr__( 'WP Plugin Info Card Layout', 'wp-plugin-info-card' ) . '" href="javascript:;">' . esc_html__( 'View Card Demo', 'wp-plugin-info-card' ) . '</a> <a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-src="#plugin-info-admim-demo-wordpress" data-caption="' . esc_attr__( 'WP Plugin Info Card WordPress Layout', 'wp-plugin-info-card' ) . '" href="javascript:;">' . esc_html__( 'View WordPress Demo', 'wp-plugin-info-card' ) . '</a> <a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-src="#plugin-info-admim-demo-large" data-caption="' . esc_attr__( 'WP Plugin Info Card Large Layout', 'wp-plugin-info-card' ) . '" href="javascript:;">' . esc_html__( 'View Large Demo', 'wp-plugin-info-card' ) . '</a>
					<div id="plugin-info-admim-demo-card" style="display: none; width: 100%; max-width: 400px">
						' . do_shortcode( '[wp-pic type="plugin" scheme="scheme1" layout="card" slug="wp-plugin-info-card"]' ) . '
					</div>
					<div id="plugin-info-admim-demo-wordpress" style="display: none; width: 100%; max-width: 800px">
						' . do_shortcode( '[wp-pic type="plugin" scheme="scheme1" layout="wordpress" slug="wp-plugin-info-card"]' ) . '
					</div>
					<div id="plugin-info-admim-demo-large" style="display: none; width: 100%; max-width: 800px">
						' . do_shortcode( '[wp-pic type="theme" scheme="scheme1" layout="large" slug="twentytwenty"]' ) . '
					</div>
						<h3 class="wp-pic-title">' . __( 'Shortcode parameters', 'wp-plugin-info-card' ) . '</h3>
						<ul>
							<li><strong>type:</strong> plugin, theme - ' . __( '(default: plugin)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>slug:</strong> ' . __( 'plugin slug name - Please refer to the plugin URL on wordpress.org to determine its slug: https://wordpress.org/plugins/THE-SLUG/', 'wp-plugin-info-card' ) . '</li>
							<li><strong>layout:</strong> ' . __( 'template layout to use - Default is "card" so you may leave this parameter empty. Available layouts are: card, large, wordpress, and flex', 'wp-plugin-info-card' ) . '</li>
							<li><strong>scheme:</strong> ' . __( 'card color scheme: scheme1 through scheme14 (default: default color scheme defined in admin)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>image:</strong> ' . __( 'Image URL to override default WP logo (default: empty)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>align:</strong> center, left, right ' . __( '(default: empty)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>containerid:</strong> ' . __( 'custom div id, may be used for anchor (default: wp-pic-PLUGIN-NAME)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>margin:</strong> ' . __( 'custom container margin - eg: "15px 0" (default: empty)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>clear:</strong> ' . __( 'clear float before or after the card: before, after (default: empty', 'wp-plugin-info-card' ) . '</li>
							<li><strong>expiration:</strong> ' . __( 'cache duration in minutes - numeric format only (default: 720)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>ajax: (BETA)</strong> ' . __( 'load the plugin data asynchronously with AJAX: yes, no (default: no)', 'wp-plugin-info-card' ) . '</li>
							<li><strong>custom:</strong> ' . __( 'value to display: (default: empty)', 'wp-plugin-info-card' ) . '
								<ul>
									<li>&nbsp;&nbsp;&nbsp;&nbsp;- ' . __( 'For plugins:', 'wp-plugin-info-card' ) . ' <i>url, name, icons, banners, version, author, requires, rating, num_ratings, downloaded, last_updated, download_link</i></li>
									<li>&nbsp;&nbsp;&nbsp;&nbsp;- ' . __( 'For themes:', 'wp-plugin-info-card' ) . ' <i>url, name, version, author, screenshot_url, rating, num_ratings, downloaded, last_updated, homepage, download_link</i></li>
								</ul>
							</li>
						</ul>
						<p>&nbsp;</p>
						<p>
							<code class="wppic-admin-shortcode">[wp-pic type="plugin" slug="adblock-notify-by-bweb" layout="large" scheme="scheme13"]</code>
						</p>
						<p class="description">' . esc_html__( 'Select a default layout and scheme and you can just write it like:', 'wp-plugin-info-card' ) . '</p>
						<p>
							<code class="wppic-admin-shortcode">[wp-pic type="plugin" slug="adblock-notify-by-bweb"]</code>
						</p>
						' . $memcache . '
					 </div>
				</div>
			</div>
	';
		?>
			<form method="post" id="wppic_settings" action="options.php">
				<?php settings_fields( 'wppic_settings' ) ?>
				<div class="meta-box-sortabless">
					<div id="wppic-form" class="postbox">
						<h3 class="hndle"><span><?php  _e( 'General options', 'wp-plugin-info-card' ) ?></span></h3>
						<div class="inside">
                            <table class="form-table">
                                <tr valign="top">
                                    <?php do_settings_sections( WPPIC_ID . 'options' ) ?>
                                </tr>
                            </table>
                            <?php submit_button() ?>
						</div>
					</div>
				</div>
				<div class="meta-box-sortabless">
					<div id="wppic-form" class="postbox">
						<h3 class="hndle"><span><?php  _e( 'Dashboard Widget Settings', 'wp-plugin-info-card' ) ?></span></h3>
						<div class="inside">
                            <table class="form-table">
                                <tr valign="top">
                                    <?php do_settings_sections( WPPIC_ID . 'widget' ) ?>
                                </tr>
                            </table>
                            <?php submit_button() ?>
						</div>
					</div>

				</div>
			</form>
		</div>
    </div>
<?php
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
