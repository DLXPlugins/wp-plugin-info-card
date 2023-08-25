<?php
/***************************************************************
 * $wppic_data Object contain the following values: 
 * url, name, slug, version, author, author_profile, contributors, requires, tested, requires, rating, num_ratings, ratings,  
 * active_installs, downloaded, last_updated, last_updated_mk, added, homepage, short_description, download_link, donate_link, icons, banners
 ***************************************************************/

				
				
 //Needed to load the rating star function
require_once( ABSPATH . 'wp-admin/includes/template.php' );

//Icon URL
if ( !empty( $wppic_data->icons[ 'svg' ] ) ) {
	$icon = $wppic_data->icons[ 'svg' ];
} elseif ( !empty( $wppic_data->icons[ '2x' ] ) ) {
	$icon = $wppic_data->icons[ '2x' ];
} elseif ( !empty( $wppic_data->icons[ '1x' ] ) ) {
	$icon = $wppic_data->icons[ '1x' ];
}

//Define card image
if( !empty( $image ) ){
	//$image is the custom image URL if you provided it
	$logo = '<img src="' . esc_attr( $image ) . '" class="wp-pic-plugin-icon" alt="">';
} else if( isset($icon) ) {
	$logo = '<img src="' . esc_attr( $icon ) . '" class="wp-pic-plugin-icon" alt="">';
} else {
	$logo = '<span class="wp-pic-plugin-icon" data="no-image"></span>';
}

//Active installs
if ( $wppic_data->active_installs >= 1000000 ) {
	$active_installs_text = _x( '1+ Million', 'Active plugin installs' );
} else {
	$active_installs_text = number_format_i18n( $wppic_data->active_installs ) . '+';
}

/***************************************************************
 * Start template
 ***************************************************************/
?>
<div class="wp-pic-wordpress" style="display: none;">
	<div class="wp-pic-wordpress-content">
		<div class="wp-pic-plugin-card-top">
			<div class="wp-pic-column-name">
				<h3>
					<a href="<?php echo $wppic_data->url; ?>"  title="<?php printf( __( 'More information about %s' ), $wppic_data->name ); ?>">
						<?php echo $wppic_data->name ?>
						<?php echo $logo ?>
					</a>
				</h3>
			</div>
			<div class="wp-pic-action-links">
				<a class="wp-pic-action-buttons" href="<?php echo $wppic_data->download_link ?>" title="<?php _e( 'Download', 'wp-plugin-info-card' ) ?>" target="_blank"><?php _e( 'Download' ) ?></a>
			</div>
			<div class="wp-pic-column-description">
				<p><?php echo strip_tags( $wppic_data->short_description ); ?></p>
				<p class="authors"><cite><?php printf( __( 'By %s' ), $wppic_data->author ) ?></cite></p>
			</div>
			<?php echo $wppic_data->credit ?>
		</div>
		<div class="wp-pic-plugin-card-bottom">
			<div class="wp-pic-column-rating" title="<?php printf( _n( '(based on %s rating)', '(based on %s ratings)', $wppic_data->num_ratings ), number_format_i18n( $wppic_data->num_ratings ) ); ?>">
				<?php wp_star_rating( array( 'rating' => $wppic_data->rating, 'type' => 'percent', 'number' => $wppic_data->num_ratings ) ); ?>
				<span class="wp-pic-num-ratings" aria-hidden="true">(<?php echo number_format_i18n( $wppic_data->num_ratings ); ?>)</span>
			</div>
			<div class="wp-pic-column-updated">
				<strong><?php _e( 'Last Updated:', 'wp-plugin-info-card' ) ?></strong> <?php printf( __( '%s ago' ), human_time_diff( strtotime( $wppic_data->last_updated_mk ) ) ); ?>
			</div>
			<div class="wp-pic-column-downloaded">
				<?php printf( __( '%s Active Installs' ), $active_installs_text ); ?>
			</div>
			<div class="wp-pic-column-compatibility">
				<span class="wp-pic-compatibility-compatible"><?php _e( 'Compatible with WordPress', 'wp-plugin-info-card' ) ?> <?php echo $wppic_data->requires ?></span>
			</div>
		</div>
	</div>
</div>
<?php //end of template