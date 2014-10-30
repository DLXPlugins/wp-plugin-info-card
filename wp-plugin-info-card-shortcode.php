<?php
/***************************************************************
 * Enqueue custom CSS
 ***************************************************************/
if (!function_exists('wppic_enqueue_custom_style')) {
	function wppic_enqueue_custom_style() {
		global $post;
		if(function_exists('has_shortcode')) {
			if(isset($post->post_content) AND has_shortcode( $post->post_content, 'wp-pic')) { 
				wp_enqueue_style( 'wppic-css', plugins_url('css/wp-plugin-info-card.css', __FILE__ ), NULL, NULL);
				wp_enqueue_script( 'wppic-js', WPPIC_URL . 'js/wppic-script.js', array( 'jquery' ),  NULL);
			}
		}
	}
	add_action( 'wp_enqueue_scripts', 'wppic_enqueue_custom_style');
}


/***************************************************************
 * Main shortcode function
 ***************************************************************/
if (!function_exists('wppic_shortcode_function')) {
	function wppic_shortcode_function( $atts, $content="" ) {
		
		//Retrieve & extract shorcode parameters
		extract(shortcode_atts(array(  
			"slug" => '',  			//plugin slug name
			"image" => '',  		//image url to replace WP logo (175px X 175px)
			"logo" => 'svg',		//jpg|png|svg|no
			"banner" => '',  		//jpg|png|no
			"align" => '',  		//center|left|right
			"containerid" => '',  	//Custom Div ID (could be use for anchor)
			"margin" => '',  		//Custom container margin - eg: "15px 0"
			"custom" => '',  		//value to print : url|name|version|author|requires|rating|num_ratings|downloaded|last_updated|download_link
		), $atts));
		
		$slug = trim($slug);
		$wppic_plugin_data = wp_Plugin_API_Parser($slug);
		
		if(empty($wppic_plugin_data->name))
		return;

		if(!empty($custom)){
			
			if(!empty($wppic_plugin_data->$custom))
			$content .= $wppic_plugin_data->$custom;
			
		} else {
			
			//Align card
			if( $align == 'right' || $align == 'left') {
				$align = 'float: ' . $align . '; ';
			}
			$alignCenter = false;
			if( $align == 'center') {
				$alignCenter = true;
				$align = '';
			}

			//Provided logo URL
			$bgImage = '';
			if(!empty($image)){
				$bgImage = 'style="background-image: url(' . $image . ');"';
			} else {
				if($logo == '128x128.jpg' || $logo == '128x128.png' || $logo == '256x256.jpg' || $logo == '256x256.png'){
					$bgImage = 'style="background-image:  none, url(http://ps.w.org/' . $slug . '/assets/icon-' . $logo . '), url(' . plugins_url('/img/wp-pic-sprite.png', __FILE__ ) . ');"';
				} else if($logo == 'svg'){
					$bgImage = 'style="background-image:  none, url(http://ps.w.org/' . $slug . '/assets/icon.svg), url(' . plugins_url('/img/wp-pic-sprite.png', __FILE__ ) . ');"';
				}
			}

			//Specify banner extension
			if(!empty($banner)){
				if($banner == "no"){
					$banner = '';
				} else {
					$banner = 'style="background-image: url(http://ps.w.org/' . $slug . '/assets/banner-772x250.' . $banner . ');"';
				}
			} else {
				$banner = 'style="background-image:  none, url(http://ps.w.org/' . $slug . '/assets/banner-772x250.png), url(http://ps.w.org/' . $slug . '/assets/banner-772x250.jpg)"';
			}
			
			//Extra container ID
			if(!empty($containerid)){
				$containerid = ' id="' . $containerid . '"';
			} else {
				$containerid = ' id="wp-pic-'. $slug . '"';
			}

			//Custom container margin
			if(!empty($margin)){
				$margin = 'margin:' . $margin . ';';
			}


			//Custom style
			$style = '';
			if(!empty($margin) || !empty($align)){
				$style = 'style="' . $align . $margin . '"';
			}

			
			//Output
			if($alignCenter)
			$content .= '<div class="wp-pic-center">';
			$content .= '<div class="wp-pic" ' . $containerid . $style . ' >';
				$content .= '<div class="wp-pic-flip">';
					$content .= '<div class="wp-pic-face wp-pic-front">';
						$content .= '<a class="wp-pic-logo" href="' . $wppic_plugin_data->url . '" ' . $bgImage . ' target="_blank" title="' . __('WordPress.org Plugin Page', 'wppic-translate') . '"></a>';
						$content .= '<p class="wp-pic-name">' . $wppic_plugin_data->name .'</p>';
						$content .= '<p class="wp-pic-author">' . __('Author:', 'wppic-translate') . ' ' . $wppic_plugin_data->author .'</p>';
						$content .= '<div class="wp-pic-bottom">';
							$content .= '<div class="wp-pic-bar">';
								$content .= '<span class="wp-pic-rating">' . $wppic_plugin_data->rating .'%<em>' . __('Ratings', 'wppic-translate') . '</em></span>';
								$content .= '<span class="wp-pic-downloaded">' . number_format($wppic_plugin_data->downloaded, 0, ',', ',') .'<em>' . __('Downloads', 'wppic-translate') . '</em></span>';
								$content .= '<span class="wp-pic-requires">WP ' . $wppic_plugin_data->requires .'+<em>' . __('Requieres', 'wppic-translate') . '</em></span>';
							$content .= '</div>';
							$content .= '<div class="wp-pic-download">';
								$content .= '<span>' . __('Download', 'wppic-translate') . '</span>';
							$content .= '</div>';
						$content .= '</div>';
					$content .= '</div>';
					$content .= '<div class="wp-pic-face wp-pic-back">';
						$content .= '<a class="wp-pic-dl-ico" href="' . $wppic_plugin_data->download_link . '" title="' . __('Direct download', 'wppic-translate') . '"></a>';
						$content .= '<p><a class="wp-pic-dl-link" href="' . $wppic_plugin_data->download_link . '" title="' . __('Direct download', 'wppic-translate') . '">' . basename($wppic_plugin_data->download_link) . '</a></p>';
						$content .= '<p class="wp-pic-version"><span>' . __('Current Version', 'wppic-translate') . ':</span> ' . $wppic_plugin_data->version .'</p>';
						$content .= '<p class="wp-pic-updated"><span>' . __('Last Updated', 'wppic-translate') . ':</span> ' . date(get_option( 'date_format' ), strtotime($wppic_plugin_data->last_updated)) .'</p>';
						$content .= '<div class="wp-pic-bottom">';
							$content .= '<div class="wp-pic-bar">';
								$content .= '<span class="wp-pic-rating">' . $wppic_plugin_data->rating .'%<em>' . __('Ratings', 'wppic-translate') . '</em></span>';
								$content .= '<span class="wp-pic-downloaded">' . number_format($wppic_plugin_data->downloaded, 0, ',', ',') .'<em>' . __('Downloads', 'wppic-translate') . '</em></span>';
								$content .= '<span class="wp-pic-requires">WP ' . $wppic_plugin_data->requires .'+<em>' . __('Requieres', 'wppic-translate') . '</em></span>';
							$content .= '</div>';
							$content .= '<a class="wp-pic-wporg" href="' . $wppic_plugin_data->url . '" target="_blank" title="' . __('WordPress.org Plugin Page', 'wppic-translate') . '">' . __('WordPress.org Plugin Page', 'wppic-translate') . '</a>';
						$content .= '</div>';
						$content .= '<div class="wp-pic-asset-bg" ' . $banner . '>';
							$content .= '<div class="wp-pic-asset-bg-title"><span>' . $wppic_plugin_data->name .'</span></div>';
						$content .= '</div>';
						$content .= '<div class="wp-pic-goback" title="' . __('Back', 'wppic-translate') . '"></div>';
					$content .= '</div>';
				$content .= '</div>';
			$content .= '</div>';
			//Align center
			if($alignCenter)
			$content .= '</div>';
		}
		return $content;
			
	} //end of wppic_Shortcode
	
	add_shortcode( 'wp-pic', 'wppic_shortcode_function' );
}