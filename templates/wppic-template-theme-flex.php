<?php
/**
 * Template for the theme flex card.
 *
 * @package WP_Plugin_Info_Card
 */

/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, preview_url, author_def, author, screenshot_url, rating, num_ratings, downloaded, last_updated, homepage, description, download_link
 */

// ScreenShot URL.
// $image is the custom image URL if you provided it.
if ( ! empty( $image ) ) {
	$background_image = 'style="background-image: url( ' . esc_url_raw( $image ) . ' );"';
} elseif ( ! empty( $wppic_data->screenshot_url ) ) {
	$background_image = 'style="background-image: url( ' . esc_url_raw( $wppic_data->screenshot_url ) . ' );"';
} else {
	$background_image = 'data="no-image"';
}


/***************************************************************
 * Start template
 */
?>
<div class="wp-pic-flip" style="display: none;">
	<div class="wp-pic-face wp-pic-front">
		<div class="wp-pic-banner-wrapper">
			<a href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>"><img src="<?php echo esc_url( $wppic_data->screenshot_url ); ?>" alt="<?php echo esc_attr( $wppic_data->name ); ?>" /></a>
		</div>
		<div class="wp-pic-name-wrapper">
			<a class="wp-pic-name" href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>"><strong><?php echo esc_html( $wppic_data->name ); ?></strong></a>
		</div>
		<div class="wp-pic-preview-wrapper">
			<a class="wp-pic-preview" href="<?php echo esc_url( $wppic_data->preview_url ); ?>" title="<?php esc_attr_e( 'Theme Preview', 'wp-plugin-info-card' ); ?>" target="_blank"><span><?php esc_html_e( 'Theme Preview', 'wp-plugin-info-card' ); ?></span></a>
		</div>
		<div class="wp-pic-updated-wrapper">
			<p class="wp-pic-updated"><span><?php esc_html_e( 'Last Updated:', 'wp-plugin-info-card' ); ?></span> <?php echo esc_html( $wppic_data->last_updated ); ?></p>
		</div>
		<div class="wp-pic-author-wrapper">
			<p class="wp-pic-author"><?php esc_html_e( 'Author(s):', 'wp-plugin-info-card' ); ?> <?php echo esc_html( $wppic_data->author ); ?></p>
		</div>
		<div class="wp-pic-bottom">
			<div class="wp-pic-bar">
				<a href="https://wordpress.org/support/view/theme-reviews/<?php echo esc_attr( $wppic_data->slug ); ?>" class="wp-pic-rating" target="_blank" title="<?php esc_attr_e( 'Ratings', 'wp-plugin-info-card' ); ?>">
					<?php echo round( $wppic_data->rating ); ?>%<em><?php esc_html_e( 'Ratings', 'wp-plugin-info-card' ); ?></em>
				</a>
				<a href="<?php echo esc_url( $wppic_data->download_link ); ?>" class="wp-pic-downloaded" target="_blank" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>">
				<?php echo number_format( filter_var( $wppic_data->downloaded, FILTER_SANITIZE_NUMBER_INT ) ); ?> <em><?php esc_html_e( 'Downloads', 'wp-plugin-info-card' ); ?></em>
				</a>
				<a href="<?php echo esc_url( $wppic_data->url ); ?>" class="wp-pic-version" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>">
					<?php echo esc_html( $wppic_data->version ); ?><em><?php esc_html_e( 'Version', 'wp-plugin-info-card' ); ?></em>
				</a>
			</div>
			<div class="wp-pic-download-link">
				<a href="<?php echo esc_url( $wppic_data->download_link ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>">
				<span><?php esc_html_e( 'Download:', 'wp-plugin-info-card' ); ?> <?php echo esc_html( $wppic_data->name ); ?></span>
				</a>
			</div>
		</div>
	</div>
</div>