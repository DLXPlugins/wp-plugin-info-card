<?php
/***************************************************************
 * Register Dashboard Widget
 ***************************************************************/ 
if (!function_exists('wppic_dashboard_widgets')) {
	$wppicSettings = get_option('wppic_settings');
	if($wppicSettings['widget'] == true){
		function wppic_add_dashboard_widgets() {
			wp_add_dashboard_widget('wppic-dashboard-widget', WPPIC_NAME .' board', 'wppic_widgets');
		}
	}
}
add_action('wp_dashboard_setup', 'wppic_add_dashboard_widgets');

/***************************************************************
 * Dashboard Widget function
 ***************************************************************/ 
if (!function_exists('wppic_widgets')) {
	function wppic_widgets() {
		
		$wppicSettings = get_option('wppic_settings');
		$content .= '
			<style>
				#dashboard-widgets #wppic-dashboard-widget.postbox .inside {
					margin: 0;
					padding: 0;
				}
				#wppic-dashboard-widget div.wp-pic-list {
					margin: -1px 0 0;
					border-top: 1px solid #eee;
					padding: 11px;
				}
				#wppic-dashboard-widget .wp-pic-widget-name {
					display: block;
				}
				#wppic-dashboard-widget .wp-pic-widget-rating,
				#wppic-dashboard-widget .wp-pic-widget-downloaded,
				#wppic-dashboard-widget .wp-pic-widget-updated {
					display: inline-block;
					padding-right: 15px;
					color: #777;
					font-weight: bold;
				}
				#wppic-dashboard-widget .wp-pic-widget-rating span,
				#wppic-dashboard-widget .wp-pic-widget-downloaded span,
				#wppic-dashboard-widget .wp-pic-widget-updated{
					font-weight: normal;
				}
				#wppic-dashboard-widget .wp-pic-widget-updated {
					margin: 0;
					font-style: italic;
				}
			</style>
		'; //end css
		
		foreach($wppicSettings['list'] as $slug){
		
			$wppic_plugin_data = wp_Plugin_API_Parser($slug);
			
			if(!empty($wppic_plugin_data->name)){

				$content .= '<div class="wp-pic-list">';
					$content .= '<a class="wp-pic-widget-name" href="' . $wppic_plugin_data->url . '" target="_blank" title="WordPress.org Plugin Page">' . $wppic_plugin_data->name .'</a>';
					$content .= '<span class="wp-pic-widget-rating" title="Ratings"><span>Ratings:</span> ' . $wppic_plugin_data->rating .'%</span>';
					$content .= '<span class="wp-pic-widget-downloaded" title="Downloads"><span>Downloads:</span> ' . number_format($wppic_plugin_data->downloaded, 0, ',', ',') .'</span>';
					$content .= '<p class="wp-pic-widget-updated"><span>Last updated:</span> ' . date(get_option( 'date_format' ), strtotime($wppic_plugin_data->last_updated)) .' (v.' . $wppic_plugin_data->version .')</p>';
				$content .= '</div>';
				
			}
		}
		
		echo $content;
			
	} //end of wppic_widgets
}

