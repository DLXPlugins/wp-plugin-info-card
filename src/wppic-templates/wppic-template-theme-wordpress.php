<?php
/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, preview_url, author_def, author, screenshot_url, rating, num_ratings, downloaded, last_updated_mk, last_updated, homepage, description, download_link
 ***************************************************************/

//Needed to load the rating star function
require_once( ABSPATH . 'wp-admin/includes/template.php' );

//ScreenShot URL
//$image is the custom image URL if you provided it
$banner = '';
if( !empty( $image ) ){
	$banner = '<img src="' . $image . '" alt="' . $wppic_data->name . '" />';
} else if( !empty( $wppic_data->screenshot_url ) ){
	$banner = '<img src="' . esc_attr( $wppic_data->screenshot_url ) . '" alt="' . $wppic_data->name . '" />';
}

/***************************************************************
 * Start template
 ***************************************************************/
?>
<div class="wp-pic-wordpress" style="display: none;">
	<div class="wp-pic-wordpress-content">
		<div class="wp-pic-theme-card-top">
			<div class="wp-pic-theme-screenshot">
				<?php echo $banner ?>
				<a class="wp-pic-theme-preview" href="<?php echo $wppic_data->preview_url ?>" title="<?php _e( 'Theme Preview', 'wp-plugin-info-card' ) ?>" target="_blank"><span><?php _e( 'Theme Preview', 'wp-plugin-info-card' ) ?></span></a>
				<?php echo $wppic_data->credit ?>
			</div>
			<h3>
				<a href="<?php echo $wppic_data->url; ?>"  title="<?php printf( __( 'More information about %s' ), $wppic_data->name ); ?>" target="_blank">
					<?php echo $wppic_data->name ?>
				</a>
				<span class="wp-pic-author"><?php printf( __( 'By %s' ), $wppic_data->author ) ?></span>
			</h3>
			<div class="wp-pic-action-links">
				<a class="wp-pic-action-buttons" href="<?php echo $wppic_data->download_link ?>" title="<?php _e( 'Download', 'wp-plugin-info-card' ) ?>" target="_blank"><?php _e( 'Download' ) ?></a>
			</div>
		</div>
		<div class="wp-pic-theme-card-bottom">
			<div class="wp-pic-column-rating" title="<?php printf( _n( '(based on %s rating)', '(based on %s ratings)', $wppic_data->num_ratings ), number_format_i18n( $wppic_data->num_ratings ) ); ?>">
				<?php wp_star_rating( array( 'rating' => $wppic_data->rating, 'type' => 'percent', 'number' => $wppic_data->num_ratings ) ); ?>
				<span class="wp-pic-num-ratings" aria-hidden="true">(<?php echo number_format_i18n( $wppic_data->num_ratings ); ?>)</span>
			</div>
			<div class="wp-pic-column-updated">
				<strong><?php _e( 'Last Updated:', 'wp-plugin-info-card' ) ?></strong> <?php printf( __( '%s ago' ), human_time_diff( strtotime( $wppic_data->last_updated_mk ) ) ); ?>
			</div>
			<div class="wp-pic-column-downloaded">
				<?php echo number_format( filter_var( $wppic_data->downloaded, FILTER_SANITIZE_NUMBER_INT ) ); ?> <?php _e( 'Downloads', 'wp-plugin-info-card' ) ?>
			</div>
			<div class="wp-pic-column-version">
				<span><?php printf( __( 'Version: %s' ), $wppic_data->version ) ?></span>
			</div>
		</div>
	</div>
</div>
<?php //end of template
/*
<div class="wp-pic-wordpress theme" style="display: none;">
	<div class="wp-pic-large-content">

		<div class="theme-card-left">
			<div class="theme-screenshot">
				<?php echo $banner ?>
			</div>

			<div class="theme-author"><?php printf( __( 'By %s' ), $wppic_data->author ) ?></div>
			<h3 class="theme-name"><?php echo $wppic_data->name ?></h3>

			<div class="theme-actions">
				<a class="button button-primary" href="<?php echo $wppic_data->download_link ?>" title="<?php _e( 'Direct download', 'wp-plugin-info-card' ) ?>"><?php esc_html_e( 'Install' ); ?></a>
				<a class="button button-secondary preview install-theme-preview" href="<?php echo $wppic_data->preview_url ?>" title="<?php esc_html_e( 'Preview' ); ?>"><?php esc_html_e( 'Preview' ); ?></a>
			</div>
		</div>

		<div class="theme-card-right">
			<strong><?php _e( 'Last Updated:', 'wp-plugin-info-card' ) ?></strong> <?php printf( __( '%s ago' ), human_time_diff( strtotime( $wppic_data->last_updated_mk ) ) ); ?>
			<?php wp_star_rating( array( 'rating' => $wppic_data->rating, 'type' => 'percent', 'number' => $wppic_data->num_ratings ) ); ?>
			<span class="num-ratings" aria-hidden="true">(<?php echo number_format_i18n( $wppic_data->num_ratings ); ?>)</span>

			<?php echo $contentSummary ?>
			<?php echo $wppic_data->credit ?>
		</div>

	</div>
</div>

			*/