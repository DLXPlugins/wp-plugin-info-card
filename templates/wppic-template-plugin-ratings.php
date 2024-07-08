<?php
/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, author, author_profile, contributors, requires, tested, requires, rating, num_ratings, ratings,
 * active_installs, downloaded, last_updated, last_updated_mk, added, homepage, short_description, download_link, donate_link, icons, banners
 ***************************************************************/

//Fix for requiered version with extra info. EG: WP 3.9, BP 2.1+
if( is_numeric( $wppic_data->requires ) ){
	$wppic_data->requires = 'WP ' . $wppic_data->requires . '+';
}

//Icon URL
if ( !empty( $wppic_data->icons[ 'svg' ] ) ) {
	$icon = $wppic_data->icons[ 'svg' ];
} elseif ( !empty( $wppic_data->icons[ '2x' ] ) ) {
	$icon = $wppic_data->icons[ '2x' ];
} elseif ( !empty( $wppic_data->icons[ '1x' ] ) ) {
	$icon = $wppic_data->icons[ '1x' ];
}

//Define card image
//$image is the custom image URL if you provided it
if( !empty( $image ) ){
	$bgImage = esc_url( $image );
} else if( isset( $icon ) ) {
	$bgImage = esc_url( $icon );
} else {
	$bgImage = '#';
}

//Plugin banner
$banner = '';
if ( !empty( $wppic_data->banners[ 'low' ] ) ) {
	$banner = 'style="background-image: url(' . esc_attr( $wppic_data->banners[ 'low' ] ) . ' );"';
}


/***************************************************************
 * Start template
 ***************************************************************/
?>
<div class="wp-pic-ratings wp-pic-plugin-ratings wp-pic-card" style="display: none;">
	<div class="wp-pic-ratings wp-pic-ratings-front">
		<div class="wp-pic-logo"><a class="wp-pic-logo-anchor" href="<?php echo esc_url( $wppic_data->url ) ?>" target="_blank" title="<?php _e( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ) ?>"><img src="<?php echo esc_url_raw( $bgImage ); ?>" width="85" height="85" alt="WordPress plugin logo" /></a></div>
		<div class="wp-pic-rating-row">*****</div>
		<div class="wp-pic-name"><?php echo esc_html( $wppic_data->name ); ?></div>
		<div class="wp-pic-rating-stats">test</div>
		<div class="wp-pic-bottom">
			<div class="wp-pic-bar">
				<div class="wp-pic-bar-item">
					<div class="wp-pic-plugin-screenshots-meta-item-svg">
						<svg width="24" height="24">
							<use xlink:href="#wppic-icon-code"></use>
						</svg>
					</div>
					<div class="wp-pic-plugin-screenshots-meta-item-label">
						v<?php echo esc_html( $wppic_data->version ); ?>
					</div>
				</div>
				<div class="wp-pic-bar-item">
					<div class="wp-pic-plugin-screenshots-meta-item-svg">
						<svg width="24" height="24">
							<use xlink:href="#wppic-icon-wordpress"></use>
						</svg>
					</div>
					<div class="wp-pic-plugin-screenshots-meta-item-label">
						<?php echo esc_html( $wppic_data->requires ); ?>
					</div>
				</div>
				<div class="wp-pic-bar-item">
					<div class="wp-pic-plugin-screenshots-meta-item-svg">
						<svg width="24" height="24">
							<use xlink:href="#wppic-icon-download-cloud"></use>
						</svg>
					</div>
					<div class="wp-pic-plugin-screenshots-meta-item-label">
						<?php echo esc_html( number_format_i18n( $wppic_data->active_installs ) ); ?>
					</div>
				</div>
			</div>
			<div class="wp-pic-download">
				<span><a href="<?php echo esc_url_raw( $wppic_data->download_link ); ?>"><?php _e( 'Download', 'wp-plugin-info-card' ); ?></a></span>
			</div>
		</div>
	</div>
</div>
<?php //end of template
