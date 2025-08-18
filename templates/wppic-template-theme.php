<?php
/**
 * Template for the theme card.
 *
 * @package WP_Plugin_Info_Card
 */

/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, preview_url, author_def, author, screenshot_url, rating, num_ratings, downloaded, last_updated, homepage, description, download_link
 ***************************************************************/

// ScreenShot URL.
// $image is the custom image URL if you provided it.
if ( ! empty( $image ) ) {
	$background_image = 'style="background-image: url( ' . $image . ' );"';
} elseif ( ! empty( $wppic_data->screenshot_url ) ) {
	$background_image = 'style="background-image: url( ' . esc_attr( $wppic_data->screenshot_url ) . ' );"';
} else {
	$background_image = 'data="no-image"';
}

/***************************************************************
 * Start template
 */
?>
<div class="wp-pic-flip" style="display: none;">
	<div class="wp-pic-face wp-pic-front">
		<a class="wp-pic-logo" href="<?php echo esc_url( $wppic_data->url ); ?>" <?php echo wp_kses_post( $background_image ); ?> target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>"></a>
		<a class="wp-pic-name" href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>"><?php echo esc_html( $wppic_data->name ); ?></a>
		<p class="wp-pic-author"><?php esc_html_e( 'Author(s):', 'wp-plugin-info-card' ); ?> <?php echo wp_kses_post( $wppic_data->author ); ?></p>
		<div class="wp-pic-bottom">
			<div class="wp-pic-bar">
				<a href="https://wordpress.org/support/view/theme-reviews/<?php echo esc_attr( $wppic_data->slug ); ?>" class="wp-pic-rating" target="_blank" title="<?php esc_attr_e( 'Ratings', 'wp-plugin-info-card' ); ?>">
					<?php echo round( $wppic_data->rating ); ?>%<em><?php esc_html_e( 'Ratings', 'wp-plugin-info-card' ); ?></em>
				</a>
				<a href="<?php echo esc_url( $wppic_data->download_link ); ?>" class="wp-pic-downloaded" target="_blank" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>">
				<?php echo number_format( filter_var( $wppic_data->downloaded, FILTER_SANITIZE_NUMBER_INT ) ); ?> <em><?php esc_html_e( 'Downloads', 'wp-plugin-info-card' ); ?></em>
				</a>
				<a href="<?php echo esc_url( $wppic_data->url ); ?>" class="wp-pic-version" target="_blank" title="<?php esc_attr_e( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ); ?>">
					<?php echo esc_html( $wppic_data->version ); ?><em><?php esc_html_e( 'Version', 'wp-plugin-info-card' ); ?></em>
				</a>
			</div>
			<div class="wp-pic-download">
				<span><?php esc_html_e( 'More info', 'wp-plugin-info-card' ); ?></span>
			</div>
		</div>
	</div>
	<div class="wp-pic-face wp-pic-back">
		<a class="wp-pic-dl-ico" href="<?php echo esc_url( $wppic_data->download_link ); ?>" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>"></a>
		<p><a class="wp-pic-dl-link" href="<?php echo esc_url( $wppic_data->download_link ); ?>" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>"><?php echo esc_html( basename( $wppic_data->download_link ) ); ?></a></p>
		<a class="wp-pic-preview" href="<?php echo esc_url( $wppic_data->preview_url ); ?>" title="<?php esc_attr_e( 'Theme Preview', 'wp-plugin-info-card' ); ?>" target="_blank"><span><?php esc_html_e( 'Theme Preview', 'wp-plugin-info-card' ); ?></span></a>
		<p class="wp-pic-updated"><span><?php esc_html_e( 'Last Updated:', 'wp-plugin-info-card' ); ?></span> <?php echo esc_html( $wppic_data->last_updated ); ?></p>
		<div class="wp-pic-bottom">
			<div class="wp-pic-bar">
				<a href="https://wordpress.org/support/view/theme-reviews/<?php echo esc_attr( $wppic_data->slug ); ?>" class="wp-pic-rating" target="_blank" title="<?php esc_attr_e( 'Ratings', 'wp-plugin-info-card' ); ?>">
					<?php echo round( $wppic_data->rating ); ?>%<em><?php esc_html_e( 'Ratings', 'wp-plugin-info-card' ); ?></em>
				</a>
				<a href="<?php echo esc_url( $wppic_data->download_link ); ?>" class="wp-pic-downloaded" target="_blank" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>">
					<?php echo number_format( filter_var( $wppic_data->downloaded, FILTER_SANITIZE_NUMBER_INT ) ); ?><em><?php esc_html_e( 'Downloads', 'wp-plugin-info-card' ); ?></em>
				</a>
				<a href="<?php echo esc_url( $wppic_data->url ); ?>" class="wp-pic-version" target="_blank" title="<?php esc_attr_e( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ); ?>">
					<?php echo esc_html( $wppic_data->version ); ?><em><?php esc_html_e( 'Version', 'wp-plugin-info-card' ); ?></em>
				</a>
			</div>
			<a class="wp-pic-page" href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>"><?php esc_html_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?></a>
		</div>
		<a class="wp-pic-asset-bg" <?php echo wp_kses_post( $background_image ); ?> href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>">
			<span class="wp-pic-asset-bg-title"><span><?php echo esc_html( $wppic_data->name ); ?></span></span>
		</a>
		<div class="wp-pic-goback" title="<?php esc_html_e( 'Back', 'wp-plugin-info-card' ); ?>"><span></span></div>
		<?php echo wp_kses_post( $wppic_data->credit ); ?>
	</div>
</div>