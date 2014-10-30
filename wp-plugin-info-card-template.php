<?php
/***************************************************************
 * Back-End Scripts & Styles enqueueing
 ***************************************************************/
	
function wppic_admin_scripts() {
    	wp_enqueue_script( 'wppic-admin-js', WPPIC_URL . 'js/wppic-admin-script.js', array( 'jquery' ),  NULL);
    	wp_enqueue_script( 'wppic-js', WPPIC_URL . 'js/wppic-script.js', array( 'jquery' ),  NULL);
    	wp_enqueue_script( 'jquery-ui-sortable', WPPIC_URL . '/wp-includes/js/jquery/ui/jquery.ui.sortable.min.js', array( 'jquery' ),  NULL);
}
function wppic_admin_css() {
    	wp_enqueue_style( 'dashicons' );
		wp_enqueue_style( 'wppic-admin-css', WPPIC_URL . 'css/wppic-admin-style.css', array(), NULL, NULL);
}
/***************************************************************
 * Create admin page menu
 ***************************************************************/
function wppic_create_menu() {
	$admin_page = add_menu_page(WPPIC_NAME_FULL, WPPIC_NAME, 'manage_options', WPPIC_ID, 'wppic_settings_page',WPPIC_URL . 'img/icon_bweb.png');
	
	//Enqueue sripts and style
	add_action( 'admin_print_scripts-' . $admin_page, 'wppic_admin_scripts' );
	add_action( 'admin_print_styles-' . $admin_page, 'wppic_admin_css' );
	
}
add_action('admin_menu', 'wppic_create_menu');

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
		'wppic_list',
		'', 
		'',
		WPPIC_ID
	);
	add_settings_field(
		'wppic-list-widget',
		__('Enable dashboard widget', 'wppic-translate'), 
		'wppic_list_widget',
		WPPIC_ID,
		'wppic_list'
	);
	add_settings_field(
		'wppic-list-form',
		__('List of plugin to display', 'wppic-translate'), 
		'wppic_list_form',
		WPPIC_ID,
		'wppic_list'
	);
}
add_action( 'admin_init', 'wppic_register_settings' );

/***************************************************************
 * Admin Notice
 ***************************************************************/
function wppic_notices_action() {
    settings_errors( 'wppic-admin-notice' );
}
add_action( 'admin_notices', 'wppic_notices_action' );


/***************************************************************
 * Admin page structure	
 ***************************************************************/
function wppic_settings_page() {
	echo '
	<div class="wrap">
		<h2>' . WPPIC_NAME_FULL . '</h2>

		<div id="post-body-content">
			
			' . wppic_plugins_about() . '

			<div id="wppic-admin-page" class="meta-box-sortabless">
				<div id="wppic-shortcode" class="postbox">
					<h3 class="hndle"><span>' . __('How to use WP Plugin Info Card shortodes?', 'wppic-translate') . '</span></h3>
					<div class="inside">
						' . wppic_shortcode_function( array ( "slug"=>"wordpress-seo", "image"=>"", "logo"=>"svg", "banner"=>"png", "align"=>"right", "margin"=>"0 0 0 20px"  ) ) . '
						
						
						<h3>' . __('How it work?', 'wppic-translate') . '</h3>
						
						<p>' . __('WP Plugin Info Card allow you to display plugins identity cards in a beautiful box with a smooth 3D rotation effect.', 'wppic-translate') . '</p>
						<p>' . __('It uses Wordpress.org plugin API to fetch data. You just have to provide a valid plugin ID (slug name) and insert the shortcode in any page to make it works in a second!', 'wppic-translate') . '</p>
						<p>' . __('Plugin is very lighweight and includes scripts and CSS only when needed. It also uses Wordpress transient to store data returned by the API for 10 minutes so your pages will no be impact by to many requests.', 'wppic-translate') . '</p>
						
						<p>&nbsp;</p>
						<h3 class="wp-pic-title">' . __('Shortcode parameters', 'wppic-translate') . '</h3>
						
						<ul>
							<li><strong>' . __('slug', 'wppic-translate') . ':</strong> ' . __('plugin slug name', 'wppic-translate') . '</li>
							<li><strong>' . __('image', 'wppic-translate') . ':</strong> ' . __('image url to replace WP logo (default: empty)', 'wppic-translate') . '</li>
							<li><strong>' . __('logo', 'wppic-translate') . ':</strong> ' . __('128x128.jpg, 256x256.jpg, 128x128.png, 256x256.png, svg, no (default: svg)', 'wppic-translate') . '</li>
							<li><strong>' . __('banner', 'wppic-translate') . ':</strong> ' . __('jpg, png, no (default:empty)', 'wppic-translate') . '</li>
							<li><strong>' . __('align', 'wppic-translate') . ':</strong> ' . __('center, left, right (default: empty)', 'wppic-translate') . '</li>
							<li><strong>' . __('containerid', 'wppic-translate') . ':</strong> ' . __('Custom div id, may be used for anchor (default: wp-pic-PLUGIN-NAME)', 'wppic-translate') . '</li>
							<li><strong>' . __('margin', 'wppic-translate') . ':</strong> ' . __('Custom container margin - eg: "15px 0" (default: empty)', 'wppic-translate') . '</li>
							<li><strong>' . __('custom', 'wppic-translate') . ':</strong> ' . __('value to print : url, name, version, author, requires, rating, num_ratings, downloaded, last_updated, download_link (default: empty)', 'wppic-translate') . '</li>
						</ul>
						
						<p>&nbsp;</p>
						<h3>' . __('Basic example', 'wppic-translate') . '</h3>
						
						<p>' . __('The slug is the only required parameter.', 'wppic-translate') . '
							<pre> [wp-pic slug="wordpress-seo"] </pre><br/>
						</p>
						
						
						<h3>' . __('Advanced examples', 'wppic-translate') . '</h3>
						
						<p>' . __('If the plugin has a wordpress logo (new feature on wp), you can specify its extension (jpg, png or svg) and whether it is a JPG or PNG file, its dimensions (128x128 or 256x256). If not, set "logo" to "no" to avoid a 404 error in the console log (cf above explanation).', 'wppic-translate') . '
							<pre> [wp-pic slug="theme-check" logo="128x128.png" align="right" banner="jpg"] </pre><br/>
						</p>

						<p>' . __('You can provide a custom image URL for the front rounded image (175px X 175px), it will overload the "logo" parameter if specified. If you know the banner extension (image displaying on the top of the plugin page), you may provide it to avoid a 404 error in the console log (cf above explanation).', 'wppic-translate') . '
							<pre> [wp-pic slug="wordpress-seo" image="http//www.mywebsite/custom-image.jpg" align="right" margin="0 0 0 20px" banner="png" containerid="download-sexion"] </pre><br/>	
						</p>							
						
						<p>' . __('The custom parameter overloads the others (except the "slug") and only returns the value you required.', 'wppic-translate') . '
							<pre> [wp-pic slug="wordpress-seo" custom="downloaded"] </pre><br/>
						</p>

						<h3>' . __('Known issues', 'wppic-translate') . '</h3>
						<p>' . __('WordPress.org does not currently include a banner nor plugin logo in the API. As explained in the Developper Center, banners are located in the assets folder of the plugin repository (allowed format are JPG or PNG) and they are named banner-772x250.', 'wppic-translate') . '</p>
						<p>' . __('It would be nice to test if banner-772x250.jpg or banner-772x250.png exists, but WordPress does not accept HTTP request to their servers, so requests are blocked due to Cross-Origin restriction. It is the same issue for the plugin SVG, JPG or PNG logo.', 'wppic-translate') . '</p>
						<p>' . __('The workaround is to use CSS backgound fallback, but it gives a 404 server response. To avoid those errors, please specify the "logo" and "banner" parameters. In any case, 404 is not really an "error", but a simple server response.', 'wppic-translate') . '</p>
						</p>
					 </div>
				</div>
			</div>
			
			<div class="meta-box-sortabless">
				<div id="wppic-form" class="postbox">
					<h3 class="hndle"><span>' . __('Dashboard Widget Settings', 'wppic-translate') . '</span></h3>
					<div class="inside">';
	?>
	
						<form method="post" id="wppic_settings" action="options.php" style="display: inline-block;">
							<table class="form-table">
								<tr valign="top">
									<?php settings_fields('wppic_settings') ?>
									<?php do_settings_sections(WPPIC_ID) ?>
								</tr>
							</table>
							<?php submit_button() ?>
						</form> 
	
	<?php
	echo '			</div>
				</div>
			</div>
			
		</div>
		
	</div>';
}


/***************************************************************
 * Dashboard widget activation
 ***************************************************************/
function wppic_list_widget() {
	$content = '';
	$wppicSettings = get_option('wppic_settings');
	$content .= '<td>';
		$content .= '<input type="checkbox" id="wppic-widget" name="wppic_settings[widget]"  value="1" ' . checked( 1, $wppicSettings['widget'], false ) . '/>';
		$content .= '<label for="wppic-widget">' . __('Help: Don\'t forget to open dashboard option panel (top right) to insert it on your dashboard.', 'wppic-translate') . '</label>';
	$content .= '</td>';
	echo $content;
}

/***************************************************************
 * Dashoboard widget plugin list
 ***************************************************************/
function wppic_list_form() {
	$content = '';
	$wppicSettings = get_option('wppic_settings');
        $content .= '<td>';
            $content .= '<button class="wppic-add-fields">' . __('Add a plugin', 'wppic-translate') . '</button><input type="text" name="wppic-add" class="wppic-add"  value="">';
            $content .= '<ul id="wppic-liste">';
					if(!empty($wppicSettings)){
						foreach($wppicSettings['list'] as $item){
							$content .= '<li class="wppic-dd"><input type="text" name="wppic_settings[list][]"  value="' . $item . '"><span class="wppic-remove-field" title="remove"></span></li>';
						}
					}
            $content .= '</ul>';
            $content .= '<p>' . __('Please refere to the wordpress.org url of the plugin to determine its slug', 'wppic-translate') . ': <i> https://wordpress.org/plugins/THE-SLUG/</i><p>';               
        $content .= '</td>';
	echo $content;
}


/***************************************************************
 * Form validator
 ***************************************************************/
function wppic_validate($input) {
	foreach($input['list'] as $key=>$item){

		if(!preg_match('/^[a-z][-a-z0-9]*$/', $item)) {
			
			add_settings_error(
				'wppic-admin-notice',
				'',
				'<i>"' . $item . '"</i> ' . __('is not a valid plugin name format. This key has been deleted.', 'wppic-translate'),
				'error'
			);
			unset($input['list'][$key]);
		}
	}
	add_settings_error(
		'wppic-admin-notice',
		'',
		__('Options saved', 'wppic-translate'),
		'updated'
	);
	return $input;
}


/***************************************************************
 * About section
 ***************************************************************/
function wppic_plugins_about() {
	$content ='
    <div id="wppic-about-list">
        <a class="wppic-button wppic-pluginHome" href="#" target="_blank">' . __('Plugin home page', 'wppic-translate') . '</a>
        <a class="wppic-button wppic-pluginOther" href="#" target="_blank">' . __('My other plugins', 'wppic-translate') . '</a>
        <a class="wppic-button wppic-pluginPage" href="#" target="_blank">' . __('WordPress.org', 'wppic-translate') . '</a>
        <a class="wppic-button wppic-pluginSupport" href="#" target="_blank">' . __('Support', 'wppic-translate') . '</a>
        <a class="wppic-button wppic-pluginContact" href="#" target="_blank">' . __('Suggestion?', 'wppic-translate') . '</a>
    </div>
    
	<div id="wppic-donate">
        ' . __('Did you like it? Well, then please consider making a donation.', 'wppic-translate') . '
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
		<input type="hidden" name="cmd" value="_s-xclick">
		<input type="hidden" name="hosted_button_id" value="SVR5SERD3468E">
		<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="' . __('PayPal - The safer, easier way to pay online!', 'wppic-translate') . '">
		<img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
		</form>
	</div>
	';
	return $content;
}