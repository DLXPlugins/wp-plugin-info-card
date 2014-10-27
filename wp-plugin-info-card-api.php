<?php
/***************************************************************
 * Dashoboard widget plugin list
 ***************************************************************/
if (!function_exists('WP_Plugin_API_Parser')) {
	function WP_Plugin_API_Parser($pluginName){
		$wppic_plugin_data = get_transient( $wppic.'_'.preg_replace( '/\-/', '_', $pluginName) );
		
		if ( false === $wppic_plugin_data) {
			$args = (object) array( 'slug' => $pluginName );
			$request = array( 'action' => 'plugin_information', 'timeout' => 15, 'request' => serialize( $args) );
			$url = 'http://api.wordpress.org/plugins/info/1.0/';
			$response = wp_remote_post( $url, array( 'body' => $request ) );
			$plugin_info = unserialize( $response['body'] );
		
			$wppic_plugin_data  = (object) array( 
				'slug' => $pluginName,
				'url' => 'https://wordpress.org/plugins/'.$pluginName.'/',
				'name' => $plugin_info->name,
				'version' => $plugin_info->version,
				'author' => $plugin_info->author,
				'requires' => $plugin_info->requires,
				'rating' => $plugin_info->rating,
				'downloaded' => $plugin_info->downloaded,
				'last_updated' => $plugin_info->last_updated,
				'download_link' => $plugin_info->download_link
			);
			
			//Transient duration 5min
			set_transient( 'wppic_'.preg_replace('/\-/', '_', $pluginName ), $wppic_plugin_data, 10*60);
		}
		
		return $wppic_plugin_data;
	}
}