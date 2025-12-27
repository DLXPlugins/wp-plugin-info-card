<?php
/**
 * Template for the theme large card.
 *
 * @package WP_Plugin_Info_Card
 */

use MediaRon\WPPIC\Functions;

/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, preview_url, author_def, author, screenshot_url, rating, num_ratings, downloaded, last_updated, homepage, description, download_link
 ***************************************************************/

// ScreenShot URL.
// $image is the custom image URL if you provided it.
$banner = '';
if ( ! empty( $image ) ) {
	$banner = '<img src="' . esc_url_raw( $image ) . '" alt="' . esc_attr( $wppic_data->name ) . '" />';
} elseif ( ! empty( $wppic_data->screenshot_url ) ) {
	$banner = '<img src="' . esc_url_raw( $wppic_data->screenshot_url ) . '" alt="' . esc_attr( $wppic_data->name ) . '" />';
}

/***************************************************************
 * Start template
 */
?>
<div class="wp-pic-large" style="display: none;">
	<div class="wp-pic-large-content">
		<a class="wp-pic-asset-bg" href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>">
			<?php echo wp_kses_post( $banner ); ?>
			<span class="wp-pic-asset-bg-title"><span><?php echo esc_html( $wppic_data->name ); ?></span></span>
		</a>
		<div class="wp-pic-half-first">
			<a class="wp-pic-logo" href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>"></a>
			<p class="wp-pic-author"><?php esc_html_e( 'Author(s):', 'wp-plugin-info-card' ); ?> <?php echo wp_kses_post( $wppic_data->author ); ?></p>
			<p class="wp-pic-version"><span><?php esc_html_e( 'Current Version:', 'wp-plugin-info-card' ); ?></span> <?php echo esc_html( $wppic_data->version ); ?></p>
			<p class="wp-pic-updated"><span><?php esc_html_e( 'Last Updated:', 'wp-plugin-info-card' ); ?></span> <?php echo esc_html( $wppic_data->last_updated ); ?></p>
			<p><a class="wp-pic-dl-link" href="<?php echo esc_url( $wppic_data->download_link ); ?>" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>"><?php echo esc_html( basename( $wppic_data->download_link ) ); ?></a></p>
			<?php echo $wppic_data->credit; ?>
		</div>
		<div class="wp-pic-half-last">
			<div class="wp-pic-bottom">
				<div class="wp-pic-bar">
					<a href="https://wordpress.org/support/view/theme-reviews/<?php echo esc_attr( $wppic_data->slug ); ?>" class="wp-pic-rating" target="_blank" title="<?php esc_attr_e( 'Ratings', 'wp-plugin-info-card' ); ?>">
						<?php echo round( $wppic_data->rating ); ?>%<em><?php esc_html_e( 'Ratings', 'wp-plugin-info-card' ); ?></em>
					</a>
					<a href="<?php echo esc_url( $wppic_data->download_link ); ?>" class="wp-pic-downloaded" target="_blank" title="<?php esc_attr_e( 'Direct download', 'wp-plugin-info-card' ); ?>">
						<?php echo number_format_i18n( Functions::get_downloaded_count_from_string( $wppic_data->downloaded ) ); ?> <em><?php esc_html_e( 'Downloads', 'wp-plugin-info-card' ); ?></em>
					</a>
					<a href="<?php echo esc_url( $wppic_data->url ); ?>" class="wp-pic-version" target="_blank" title="<?php esc_attr_e( 'WordPress.org Theme Page', 'wp-plugin-info-card' ); ?>">
						<?php echo esc_html( $wppic_data->version ); ?><em><?php esc_html_e( 'Version', 'wp-plugin-info-card' ); ?></em>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>