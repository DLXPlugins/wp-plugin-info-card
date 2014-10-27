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
		'Enable dashboard widget', 
		'wppic_list_widget',
		WPPIC_ID,
		'wppic_list'
	);
	add_settings_field(
		'wppic-list-form',
		'List of plugin to display', 
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
	?>
    <div class="wrap">
   		<h2><?php echo WPPIC_NAME_FULL ?></h2>
		<div id="wppic-admin-page" class="metabox-holder has-right-sidebar">
            <div class="inner-sidebar">
                <div id="side-sortables"  class="meta-box-sortabless ui-sortable">
                <?php
                    wppic_plugins_about();
					wppic_plugins_donate();
                ?>
                </div>
            </div>    
            <div class="has-sidebar">
                <div id="post-body-content" class="has-sidebar-content">
                    <div class="meta-box-sortabless">
                        <div id="wppic-shortcode" class="postbox">
                            <h3 class="hndle"><span>How to use WP Plugin Info Card shortodes?</span></h3>
                            <div class="inside">
                            	<?php echo wppic_shortcode_function( array ( 'slug' => 'wordpress-seo', 'image'=>'', 'logo'=>'svg', 'banner'=>'png', 'align' => 'center',  ) ); ?>
                                <h3>Shortcode parameters</h3>
                                    <ul>
                                        <li><strong>slug :</strong> plugin slug name</li>
                                        <li><strong>image :</strong> image url to replace WP logo (default:empty)</li>
                                        <li><strong>logo :</strong> 128x128.jpg, 256x256.jpg, 128x128.png, 256x256.png, svg, no (default:svg)</li>
                                        <li><strong>banner :</strong> jpg, png, no (default:empty)</li>
                                        <li><strong>align :</strong> center, left, right (default:empty)</li>
                                        <li><strong>containerID :</strong> Custom div id, could be use for anchor (default:wp-pic-PLUGIN-NAME)</li>
                                        <li><strong>custom :</strong> value to print : url|name|version|author|requires|rating|downloaded|last_updated|download_link (default:empty)</li>
                                    </ul>
                                
                                <h3>Simple example</h3>
									<p>The slug is the only required parameter.
                                    	<pre>[wp-pic slug="wordpress-seo"]</pre><br/>
                                    </p>
                                
                                <h3>Advance exemples</h3>
									<p>If the plugin has a wordpress logo (new feature on wp), you can specify it extension (jpg, png or svg) and if it is a JPG or PNG file, it dimensions (128x128 or 256x256). If not, set "logo" to "no" to avoid 404error in the consol log (cf above explanation).
                                    	<pre>[wp-pic slug="theme-check" logo="128x128.png" align="right" banner="jpg"]</pre><br/>
                                    </p>

									<p>You can provide a custom image URL for the front rounded image (175px X 175px), it will overload the "logo" parameter if specified. If you know the banner extention (image displaying on the top of the plugin page), you can provided to avoid 404error in the consol log (cf above explanation).
                                    	<pre>[wp-pic slug="wordpress-seo" image="http//www.mywebsite/custom-image.jpg" align="right" banner="png" extraID="download-sexion"]</pre><br/>	
                                    </p>							
									
                                    <p>The custom parameter overload the others (except the "slug") and only return the value you asked.
                                    	<pre>[wp-pic slug="wordpress-seo" custom="downloaded"]</pre><br/>
                                    </p>

                                <h3>Known issue</h3>
                                	<p>
                                    At the time, WordPress.org does not include banner and plugin logo in the API. As explain in the Developper Center, banners are located in the assets folder of the plugin repo (allowed format are JPG or PNG) and they are named banner-772x250.<br/>
                                	It has been nice to test if banner-772x250.jpg or banner-772x250.png exist, but WordPress does not accept HTTP request to their servers, so request are blocked due to Cross-Origin restriction. It is the same issue for the plugin SVG logo.<br/>
                                	The workaround is to use CSS backgound fallback, but it gives a 404 serveur respons. To avoid those errors, please specify the "logo" and "banner" parameters. In any case, 404 is not really an "error", but a simple server response.
                                    </p>
                             </div>
                        </div>
                    </div>
                    <div class="meta-box-sortabless">
                        <div id="wppic-form" class="postbox">
                            <h3 class="hndle"><span>Dashboard Widget Settings</span></h3>
                            <div class="inside">
                                <form method="post" id="wppic_settings" action="options.php" style="display: inline-block;">
                                    <table class="form-table">
                                        <tr valign="top">
                                            <?php settings_fields('wppic_settings'); ?>
                                            <?php do_settings_sections(WPPIC_ID); ?>
                                        </tr>
                                    </table>
                                    <?php submit_button(); ?>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
		</div>  
	</div>  
	<?php
}


/***************************************************************
 * Dashoboard widget activation
 ***************************************************************/
function wppic_list_widget() {
	$wppicSettings = get_option('wppic_settings');
        $html .= '<td>';
            $html .= '<input type="checkbox" id="wppic-widget" name="wppic_settings[widget]"  value="1" ' . checked( 1, $wppicSettings['widget'], false ) . '/>';
            $html .= '<label for="wppic-widget"> Help: Don\'t forget to open dashboard option panel(top right) to insert it on your dashboard.</label>';
        $html .= '</td>';
		echo $html;
}

/***************************************************************
 * Dashoboard widget plugin list
 ***************************************************************/
function wppic_list_form() {
	$wppicSettings = get_option('wppic_settings');
        $html .= '<td>';
            $html .= '<button class="wppic-add-fields">Add a plugin</button><input type="text" name="wppic-add" class="wppic-add"  value="">';
            $html .= '<ul id="wppic-liste">';
                    foreach($wppicSettings['list'] as $item){
                        $html .= '<li class="wppic-dd"><input type="text" name="wppic_settings[list][]"  value="' . $item . '"><span class="wppic-remove-field" title="remove"></span></li>';
                    }
            $html .= '</ul>';
            $html .= '<p>Please refere to the wordpress.ord url of the plugin to find it slug :<i> https://wordpress.org/plugins/THE-SLUG/</i><p> ';               
        $html .= '</td>';
	echo $html;
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
				'<i>"' . $item . '"</i> is not a valide plugin name format. This key has been deleted.',
				'error'
			);
			unset($input['list'][$key]);
		}
	}
	add_settings_error(
		'wppic-admin-notice',
		'',
		'Options saved',
		'updated'
	);
	return $input;
}


/***************************************************************
 * About section
 ***************************************************************/
function wppic_plugins_about() {
?>                           
	<div id="wppic-infos" class="postbox">
        <h3 class="hndle"><span>About</span></h3>
            <div class="inside">
                <a class="wppic-button wppic-pluginHome" href="#" target="_blank">Plugin home page</a>
                <a class="wppic-button wppic-pluginOther" href="#" target="_blank">My other plugins</a>
                <a class="wppic-button wppic-pluginPage" href="#" target="_blank">WordPress.org</a>
                <a class="wppic-button wppic-pluginSupport" href="#" target="_blank">Support</a>
                <a class="wppic-button wppic-pluginContact" href="#" target="_blank">Suggestion?</a>
            </div>
	</div>
<?php }


/***************************************************************
 * Donate section
 ***************************************************************/
function wppic_plugins_donate() {
?>                           
	<div id="wppic-infos" class="postbox">
        <h3 class="hndle"><span>Like it?</span></h3>
            <div class="inside">
            	<p>Did you like it? Well, then please consider making a donation.</p>
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input name="cmd" type="hidden" value="_s-xclick" /><input name="hosted_button_id" type="hidden" value="7Z6YVM63739Y8" /><input alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !" name="submit" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donate_SM.gif" type="image" /><img src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" alt="" width="1" height="1" border="0" /></form>
            </div>
	</div>
<?php }