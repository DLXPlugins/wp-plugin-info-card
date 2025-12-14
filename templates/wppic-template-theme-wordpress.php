<?php
/**
 * Template for the theme WordPress card.
 *
 * @package WP_Plugin_Info_Card
 */

use MediaRon\WPPIC\Functions;

/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, preview_url, author_def, author, screenshot_url, rating, num_ratings, downloaded, last_updated_mk, last_updated, homepage, description, download_link
 ***************************************************************/

// Needed to load the rating star function.
require_once ABSPATH . 'wp-admin/includes/template.php';

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
<div class="wp-pic-wordpress" style="display: none;">
	<div class="wp-pic-wordpress-content">
		<div class="wp-pic-theme-card-top">
			<div class="wp-pic-theme-screenshot">
				<?php echo wp_kses_post( $banner ); ?>
				<a class="wp-pic-theme-preview" href="<?php echo esc_url( $wppic_data->preview_url ); ?>" title="<?php esc_attr_e( 'Theme Preview', 'wp-plugin-info-card' ); ?>" target="_blank"><span><?php esc_html_e( 'Theme Preview', 'wp-plugin-info-card' ); ?></span></a>
				<?php echo wp_kses_post( $wppic_data->credit ); ?>
			</div>
			<h3>
				<a href="<?php echo esc_url( $wppic_data->url ); ?>"  title="<?php /* Translators: %s is the theme name */ printf( esc_attr__( 'More information about %s', 'wp-plugin-info-card' ), esc_html( $wppic_data->name ) ); ?>" target="_blank">
					<?php echo esc_html( $wppic_data->name ); ?>
				</a>
				<span class="wp-pic-author"><?php /* Translators: %s is the theme author */ printf( esc_html__( 'By %s', 'wp-plugin-info-card' ), wp_kses_post( $wppic_data->author ) ); ?></span>
			</h3>
			<div class="wp-pic-action-links">
				<a class="wp-pic-action-buttons" href="<?php echo esc_url( $wppic_data->download_link ); ?>" title="<?php esc_attr_e( 'Download', 'wp-plugin-info-card' ); ?>" target="_blank"><?php esc_html_e( 'Download', 'wp-plugin-info-card' ); ?></a>
			</div>
		</div>
		<div class="wp-pic-theme-card-bottom">
			<div class="wp-pic-column-rating" title="<?php /* Translators: %s is the number of ratings */ printf( esc_attr( _n( '(based on %s rating)', '(based on %s ratings)', $wppic_data->num_ratings, 'wp-plugin-info-card' ) ), esc_html( number_format_i18n( $wppic_data->num_ratings ) ) ); ?>">
				<?php
				wp_star_rating(
					array(
						'rating' => $wppic_data->rating,
						'type'   => 'percent',
						'number' => $wppic_data->num_ratings,
					)
				);
				?>
				<span class="wp-pic-num-ratings" aria-hidden="true">(<?php echo number_format_i18n( $wppic_data->num_ratings ); ?>)</span>
			</div>
			<div class="wp-pic-column-updated">
				<strong><?php esc_html_e( 'Last Updated:', 'wp-plugin-info-card' ); ?></strong> <?php /* Translators: %s is the time ago */ printf( esc_html__( '%s ago', 'wp-plugin-info-card' ), human_time_diff( strtotime( $wppic_data->last_updated_mk ) ) ); ?>
			</div>
			<div class="wp-pic-column-downloaded">
				<?php /* Translators: %s is the number of downloads */ printf( esc_html__( '%s Downloads', 'wp-plugin-info-card' ), esc_html( number_format_i18n( Functions::get_downloaded_count_from_string( $wppic_data->downloaded ) ) ) ); ?>
			</div>
			<div class="wp-pic-column-version">
				<span><?php /* Translators: %s is the theme version */ printf( esc_html__( 'Version: %s', 'wp-plugin-info-card' ), esc_html( $wppic_data->version ) ); ?></span>
			</div>
		</div>
	</div>
</div>
