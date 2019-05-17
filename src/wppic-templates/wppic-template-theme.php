<?php
/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, preview_url, author_def, author, screenshot_url, rating, num_ratings, downloaded, last_updated, homepage, description, download_link
 ***************************************************************/

//ScreenShot URL
//$image is the custom image URL if you provided it
if( !empty( $image ) ){
	$bgImage = 'style="background-image: url( ' . $image . ' );"';
} else if( !empty( $wppic_data->screenshot_url ) ){
	$bgImage = 'style="background-image: url( ' . esc_attr( $wppic_data->screenshot_url ) . ' );"';
} else {
	$bgImage = 'data="no-image"';
}

/***************************************************************
 * Start template
 ***************************************************************/
?>
<div class="wp-pic-flip" style="display: none;">
	<div class="wp-pic-face wp-pic-front">
		<a class="wp-pic-logo" href="<?php echo $wppic_data->url ?>" <?php echo $bgImage ?> target="_blank" title="<?php _e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ) ?>"></a>
		<a class="wp-pic-name" href="<?php echo $wppic_data->url ?>" target="_blank" title="<?php _e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ) ?>"><?php echo $wppic_data->name ?></a>
		<p class="wp-pic-author"><?php _e( 'Author(s):', 'wp-plugin-info-card' ) ?> <?php echo $wppic_data->author ?></p>
		<div class="wp-pic-bottom">
			<div class="wp-pic-bar">
				<a href="https://wordpress.org/support/view/theme-reviews/<?php echo $wppic_data->slug ?>" class="wp-pic-rating" target="_blank" title="<?php _e( 'Ratings', 'wp-plugin-info-card' ) ?>">
					<?php echo $wppic_data->rating ?>%<em><?php _e( 'Ratings', 'wp-plugin-info-card' ) ?></em>
				</a>
				<a href="<?php echo $wppic_data->download_link ?>" class="wp-pic-downloaded" target="_blank" title="<?php _e( 'Direct download', 'wp-plugin-info-card' ) ?>">
				<?php echo number_format( filter_var( $wppic_data->downloaded, FILTER_SANITIZE_NUMBER_INT ) ); ?> <em><?php _e( 'Downloads', 'wp-plugin-info-card' ) ?></em>
				</a>
				<a href="<?php echo $wppic_data->url ?>" class="wp-pic-version" target="_blank" title="<?php _e( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ) ?>">
					<?php echo $wppic_data->version ?><em><?php _e( 'Version', 'wp-plugin-info-card' ) ?></em>
				</a>
			</div>
			<div class="wp-pic-download">
				<span><?php _e( 'More info', 'wp-plugin-info-card' ) ?></span>
			</div>
		</div>
	</div>
	<div class="wp-pic-face wp-pic-back">
		<a class="wp-pic-dl-ico" href="<?php echo $wppic_data->download_link ?>" title="<?php _e( 'Direct download', 'wp-plugin-info-card' ) ?>"></a>
		<p><a class="wp-pic-dl-link" href="<?php echo $wppic_data->download_link ?>" title="<?php _e( 'Direct download', 'wp-plugin-info-card' ) ?>"><?php echo basename($wppic_data->download_link) ?></a></p>
		<a class="wp-pic-preview" href="<?php echo $wppic_data->preview_url ?>" title="<?php _e( 'Theme Preview', 'wp-plugin-info-card' ) ?>" target="_blank"><span><?php _e( 'Theme Preview', 'wp-plugin-info-card' ) ?></span></a>
		<p class="wp-pic-updated"><span><?php _e( 'Last Updated:', 'wp-plugin-info-card' ) ?></span> <?php echo $wppic_data->last_updated ?></p>
		<div class="wp-pic-bottom">
			<div class="wp-pic-bar">
				<a href="https://wordpress.org/support/view/theme-reviews/<?php echo $wppic_data->slug ?>" class="wp-pic-rating" target="_blank" title="<?php _e( 'Ratings', 'wp-plugin-info-card' ) ?>">
					<?php echo $wppic_data->rating ?>%<em><?php _e( 'Ratings', 'wp-plugin-info-card' ) ?></em>
				</a>
				<a href="<?php echo $wppic_data->download_link ?>" class="wp-pic-downloaded" target="_blank" title="<?php _e( 'Direct download', 'wp-plugin-info-card' ) ?>">
					<?php echo number_format( filter_var( $wppic_data->downloaded, FILTER_SANITIZE_NUMBER_INT ) ); ?><em><?php _e( 'Downloads', 'wp-plugin-info-card' ) ?></em>
				</a>
				<a href="<?php echo $wppic_data->url ?>" class="wp-pic-version" target="_blank" title="<?php _e( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ) ?>">
					<?php echo $wppic_data->version ?><em><?php _e( 'Version', 'wp-plugin-info-card' ) ?></em>
				</a>
			</div>
			<a class="wp-pic-page" href="<?php echo $wppic_data->url ?>" target="_blank" title="<?php _e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ) ?>"><?php _e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ) ?></a>
		</div>
		<a class="wp-pic-asset-bg" <?php echo $bgImage ?> href="<?php echo $wppic_data->url ?>" target="_blank" title="<?php _e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ) ?>">
			<span class="wp-pic-asset-bg-title"><span><?php echo $wppic_data->name ?></span></span>
		</a>
		<div class="wp-pic-goback" title="<?php _e( 'Back', 'wp-plugin-info-card' ) ?>"><span></span></div>
		<?php echo $wppic_data->credit ?>
	</div>
</div>
<?php //end of template