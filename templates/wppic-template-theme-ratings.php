<?php
/***************************************************************
 * $wppic_data Object contain the following values:
 * url, name, slug, version, author, author_profile, contributors, requires, tested, requires, rating, num_ratings, ratings,
 * active_installs, downloaded, last_updated, last_updated_mk, added, homepage, short_description, download_link, donate_link, icons, banners
 ***************************************************************/

// Define card image
// $image is the custom image URL if you provided it
$bgImage = esc_url( $wppic_data->screenshot_url);


/***************************************************************
 * Start template
 */
?>
<div class="wp-pic-ratings wp-pic-plugin-ratings wp-pic-card" style="display: none;">
	<div class="wp-pic-ratings wp-pic-ratings-front">
		<div class="wp-pic-logo wp-pic-rating-logo"><a class="wp-pic-logo-anchor" href="<?php echo esc_url( $wppic_data->url ); ?>" target="_blank" title="<?php _e( 'WordPress.org Plugin Page', 'wp-plugin-info-card' ); ?>"><img src="<?php echo esc_url_raw( $bgImage ); ?>" width="85" height="85" alt="WordPress plugin logo" /></a></div>
		<div class="wp-pic-rating-row">
			<?php
			$rating = round( $wppic_data->rating / 20, 1 );

			?>
			<div class="wp-pic-rating">
				<?php
					$percentage = round( $wppic_data->rating / 20, 1 ) * 20;
				?>
				<span class="wp-pic-rating-background" style="display: inline-block; letter-spacing: 5px; background: linear-gradient(90deg, var(--wppic-plugin-ratings-card-star-color) <?php echo esc_attr( $percentage ); ?>%, #cccccc <?php echo esc_attr( $percentage ); ?>%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
					★★★★★
				</span>
			</div>
		</div>
		<div class="wp-pic-name"><?php echo esc_html( $wppic_data->name ); ?></div>
		<?php /* Translators: %d is the number of ratings for a plugin */ ?>
		<div class="wp-pic-rating-stats"><?php echo esc_html( round( $wppic_data->rating / 20, 1 ) ); ?> <?php printf( __( 'stars based on %s ratings', 'wp-plugin-info-card' ), number_format_i18n( absint( $wppic_data->num_ratings ) ) ); ?></div>
		<div class="wp-pic-bottom wp-pic-bottom-ratings">
			<div class="wp-pic-bar">
				<a href="<?php echo esc_url( $wppic_data->download_link ); ?>">
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
				</a>
				<a href="<?php echo esc_url( $wppic_data->preview_url); ?>">
					<div class="wp-pic-bar-item">
						<div class="wp-pic-plugin-screenshots-meta-item-svg">
							<svg width="24" height="24">
								<use xlink:href="#wppic-icon-wordpress"></use>
							</svg>
						</div>
						<div class="wp-pic-plugin-screenshots-meta-item-label">
							<?php esc_html_e( 'Preview', 'wp-plugin-info-card' ); ?>
						</div>
					</div>
				</a>
				<a href="<?php echo esc_url( sprintf( 'https://wordpress.org/themes/%s/', $wppic_data->slug ) ); ?>">
					<div class="wp-pic-bar-item">
						<div class="wp-pic-plugin-screenshots-meta-item-svg">
							<svg width="24" height="24">
								<use xlink:href="#wppic-icon-download-cloud"></use>
							</svg>
						</div>
						<div class="wp-pic-plugin-screenshots-meta-item-label">
							<?php echo esc_html( $wppic_data->downloaded ); ?>+ <?php esc_html_e( 'Downloads', 'wp-plugin-info-card' ); ?>
						</div>
					</div>
				</a>
			</div>
			<div class="wp-pic-download">
				<span><a href="<?php echo esc_url_raw( $wppic_data->download_link ); ?>"><?php _e( 'Download', 'wp-plugin-info-card' ); ?></a></span>
			</div>
		</div>
	</div>
</div>