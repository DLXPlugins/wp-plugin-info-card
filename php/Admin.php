<?php
/**
 * Set up admin and admin functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC;

/**
 * Helper class for for admin functionality.
 */
class Admin {

	/**
	 * Main class runner.
	 *
	 * @return Admin.
	 */
	public function run() {
		$self = new self();

		add_action( 'admin_enqueue_scripts', array( $self, 'enqueue_admin_scripts' ) );
		add_action( 'admin_menu', array( $self, 'add_options_page' ) );
		return $self;
	}

	/**
	 * Enqueue the scripts needed for the admin panel.
	 *
	 * @param string $hook The current admin page.
	 */
	public function enqueue_admin_scripts( $hook ) {
		if ( 'settings_page_wp-plugin-info-card' !== $hook ) {
			return;
		}

		// Enqueue the admin scripts.
		wp_register_script(
			'wppic-lightbox',
			Functions::get_plugin_url( 'assets/lightbox/jquery.fancybox.min.js' ),
			array( 'jquery' ),
			Functions::get_plugin_version(),
			true
		);
		wp_enqueue_script(
			'wppic-admin-js',
			Functions::get_plugin_url( 'assets/js/wppic-admin-script.js' ),
			array( 'jquery', 'wppic-lightbox', 'jquery-ui-sortable' ),
			Functions::get_plugin_version(),
			true
		);
		wp_enqueue_script(
			'wppic-js',
			Functions::get_plugin_url( 'assets/js/wppic-script.min.js' ),
			array( 'jquery' ),
			Functions::get_plugin_version(),
			true
		);

		// Enqueue the admin styles.
		wp_register_style(
			'wppic-lightbox',
			Functions::get_plugin_url( 'assets/lightbox/jquery.fancybox.min.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_enqueue_style(
			'wppic-admin-css',
			Functions::get_plugin_url( 'dist/wppic-admin.css' ),
			array( 'wppic-lightbox', 'dashicons' ),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Add the options page to the admin menu.
	 */
	public function add_options_page() {
		add_options_page(
			Functions::get_plugin_name(),
			Functions::get_plugin_name(),
			'manage_options',
			Functions::get_plugin_slug(),
			array( $this, 'output_options' )
		);
	}

	/**
	 * Output the options page.
	 */
	public function output_options() {
		$options = Options::get_options();

		// Get default color scheme.
		$scheme = $options['colorscheme'] ?? 'default';
		if ( 'default' === $scheme ) {
			$scheme = '';
		}

		// Get default layout.
		$layout = $options['default_layout'] ?? 'card';

		// Get admin assets.
		$spinner   = admin_url() . 'images/spinner-2x.gif';
		$wppic_svg = Functions::get_plugin_url( 'assets/img/wppic.svg' );
		$wppic_gif = Functions::get_plugin_url( 'assets/img/wppic.gif' );

		// Check for memcache.
		$memcache = '';
		if ( ! extension_loaded( 'Memcache' ) ) {
			$memcache = '
				<p class="wppic-cache-clear">
					<button class="wppic-cache-clear-button first button button-primary" data-success="' . esc_html__( 'Cache was successfully cleared', 'wp-plugin-info-card' ) . '" data-error="' . esc_html__( 'Something went wrong', 'wp-plugin-info-card' ) . '">' . esc_html__( 'Clear cache', 'wp-plugin-info-card' ) . '</button>
					<span class="wppic-cache-clear-loader" style="display: none; background-image: url(' . esc_url( $spinner ) . ');"></span>
				</p>
			';
		}

		?>
		<div class="wrap">
			<div id="post-body-content">
				<div id="wppic-admin-page" class="postbox meta-box-sortables">
					<h1 style="display: flex; align-items: center; font-size: 36px"><img src="<?php echo esc_url( $wppic_svg ); ?>" class="wppic-logo" alt="b*web" style="width: 36px; height: 36px;" /> <?php echo esc_html( Functions::get_plugin_name() ); ?></h1>
					<h2 class="description"><?php esc_html_e( 'Beautiful plugin and theme cards by:', 'wp-plugin-info-card' ); ?> <a class="wppic-admin-link" href="https://www.b-website.com/">Brice CAPOBIANCO</a> <?php esc_html_e( 'and', 'wp-plugin-info-card' ); ?> <a class="wppic-admin-link" href="https://mediaron.com">Ronald Huereca</a></h2>
				</div>
			</div>
			<?php echo wppic_plugins_about(); ?>
			<div id="wppic-shortcode">
				<h2><span><?php esc_html_e( 'Documentation', 'wp-plugin-info-card' ); ?></span></h2>
				<div class="inside">
					<p><a class="documentation wppic-admin-link" href="https://mediaron.com/wp-plugin-info-card/" target="_blank" title="<?php esc_attr_e( 'View Documentation and examples', 'wp-plugin-info-card' ); ?>"><?php esc_html_e( 'View Documentation and Examples', 'wp-plugin-info-card' ); ?> <span class="dashicons dashicons-external"></span></a></p>
				</div><!-- /.inside -->
				<h2><?php esc_html_e( 'The Block Editor', 'wp-plugin-info-card' ); ?></h2>
			<div class="inside">
				<p class="description"> <?php esc_html_e( 'Use our blocks to show your cards in the block editor. All options are supported.', 'wp-plugin-info-card' ); ?></p>
				<a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-caption="<?php esc_attr_e( 'WP Plugin Info Card in the Block Editor', 'wp-plugin-info-card' ); ?>" href="<?php echo esc_url( $wppic_gif ); ?>"><?php esc_html_e( 'View Block Demo', 'wp-plugin-info-card' ); ?></a>
			</div><!-- /.inside -->
			<h2><span><?php esc_html_e( 'Shortcodes', 'wp-plugin-info-card' ); ?></span></h2>
			<div class="inside">
				<p class="description"> <?php esc_html_e( 'Use shortcodes to show a plugin or theme card just about anywhere.', 'wp-plugin-info-card' ); ?></p>
				<a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-src="#plugin-info-admim-demo-card" data-caption="<?php esc_attr_e( 'WP Plugin Info Card Layout', 'wp-plugin-info-card' ); ?>" href="javascript:;"><?php esc_html_e( 'View Card Demo', 'wp-plugin-info-card' ); ?></a> <a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-src="#plugin-info-admim-demo-wordpress" data-caption="<?php esc_attr_e( 'WP Plugin Info Card WordPress Layout', 'wp-plugin-info-card' ); ?>" href="javascript:;"><?php esc_html_e( 'View WordPress Demo', 'wp-plugin-info-card' ); ?></a> <a class="button button-secondary" data-animation-effect="zoom" data-animation-duration="1000" data-fancybox data-src="#plugin-info-admim-demo-large" data-caption="<?php esc_attr_e( 'WP Plugin Info Card Large Layout', 'wp-plugin-info-card' ); ?>" href="javascript:;"><?php esc_html_e( 'View Large Demo', 'wp-plugin-info-card' ); ?></a>
				<div id="plugin-info-admim-demo-card" style="display: none; width: 100%; max-width: 400px">
				<?php
				// todo - escaping.
				// todo - can reuse escaping wpkses in functions.php.
				echo do_shortcode( '[wp-pic type="plugin" scheme="scheme1" layout="card" slug="wp-plugin-info-card"]' );
				?>
				</div>
				<div id="plugin-info-admim-demo-wordpress" style="display: none; width: 100%; max-width: 800px">
				<?php
				// todo - escaping.
				// todo - can reuse escaping wpkses in functions.php.
				echo do_shortcode( '[wp-pic type="plugin" scheme="scheme1" layout="wordpress" slug="wp-plugin-info-card"]' );
				?>
				</div>
				<div id="plugin-info-admim-demo-large" style="display: none; width: 100%; max-width: 800px">
				<?php
				// todo - escaping.
				// todo - can reuse escaping wpkses in functions.php.
				echo do_shortcode( '[wp-pic type="theme" scheme="scheme1" layout="large" slug="twentytwenty"]' );
				?>
				</div>
				<h3 class="wp-pic-title"><?php echo esc_html_e( 'Shortcode parameters', 'wp-plugin-info-card' ); ?></h3>
				<ul>
					<li><strong>type:</strong> plugin, theme - <?php esc_html_e( '(default: plugin)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>slug:</strong> <?php esc_html_e( 'plugin slug name - Please refer to the plugin URL on wordpress.org to determine its slug: https://wordpress.org/plugins/THE-SLUG/', 'wp-plugin-info-card' ); ?></li>
					<li><strong>layout:</strong> <?php esc_html_e( 'template layout to use - Default is "card" so you may leave this parameter empty. Available layouts are: card, large, WordPress, and flex', 'wp-plugin-info-card' ); ?></li>
					<li><strong>scheme:</strong> <?php esc_html_e( 'card color scheme: scheme1 through scheme14 (default: default color scheme defined in admin)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>image:</strong> <?php esc_html_e( 'Image URL to override default WP logo (default: empty)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>align:</strong> center, left, right <?php esc_html_e( '(default: empty)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>containerid:</strong> <?php esc_html_e( 'custom div id, may be used for anchor (default: wp-pic-PLUGIN-NAME)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>margin:</strong> <?php esc_html_e( 'custom container margin - eg: "15px 0" (default: empty)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>clear:</strong> <?php esc_html_e( 'clear float before or after the card: before, after (default: empty', 'wp-plugin-info-card' ); ?></li>
					<li><strong>expiration:</strong> <?php esc_html_e( 'cache duration in minutes - numeric format only (default: 720)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>ajax: (BETA)</strong> <?php esc_html_e( 'load the plugin data asynchronously with AJAX: yes, no (default: no)', 'wp-plugin-info-card' ); ?></li>
					<li><strong>custom:</strong> <?php esc_html_e( 'value to display: (default: empty)', 'wp-plugin-info-card' ); ?>
						<ul>
							<li>&nbsp;&nbsp;&nbsp;&nbsp;- <?php esc_html_e( 'For plugins:', 'wp-plugin-info-card' ); ?> <i>url, name, icons, banners, version, author, requires, rating, num_ratings, downloaded, last_updated, download_link</i></li>
							<li>&nbsp;&nbsp;&nbsp;&nbsp;- <?php esc_html_e( 'For themes:', 'wp-plugin-info-card' ); ?> <i>url, name, version, author, screenshot_url, rating, num_ratings, downloaded, last_updated, homepage, download_link</i></li>
						</ul>
					</li>
				</ul>
				<p>&nbsp;</p>
				<p>
					<code class="wppic-admin-shortcode">[wp-pic type="plugin" slug="adblock-notify-by-bweb" layout="large" scheme="scheme13"]</code>
				</p>
				<p class="description">' . esc_html__( 'Select a default layout and scheme and you can just write it like:', 'wp-plugin-info-card' ) . '</p>
				<p>
					<code class="wppic-admin-shortcode">[wp-pic type="plugin" slug="adblock-notify-by-bweb"]</code>
				</p>
				<?php
				// todo - sanitize.
				echo $memcache;
				?>
				</div><!-- /.inside -->
			</div><!-- /#wppic-shortcode -->
			<form method="post" id="wppic_settings" action="options.php">
				<?php settings_fields( 'wppic_settings' ); ?>
				<div class="meta-box-sortabless">
					<div id="wppic-form" class="postbox">
						<h3 class="hndle"><span><?php esc_html_e( 'General options', 'wp-plugin-info-card' ); ?></span></h3>
						<div class="inside">
							<table class="form-table">
								<tr valign="top">
									<?php do_settings_sections( Functions::get_plugin_slug() . 'options' ); ?>
								</tr>
							</table>
							<?php submit_button(); ?>
						</div><!-- /.inside -->
					</div>
				</div>
				<div class="meta-box-sortabless">
					<div id="wppic-form" class="postbox">
						<h3 class="hndle"><span><?php _e( 'Dashboard Widget Settings', 'wp-plugin-info-card' ); ?></span></h3>
						<div class="inside">
							<table class="form-table">
								<tr valign="top">
									<?php do_settings_sections( Functions::get_plugin_slug() . 'widget' ); ?>
								</tr>
							</table>
							<?php submit_button(); ?>
						</div>
					</div>

				</div>
			</form>
		</div><!-- /.wrap -->
		<?php
	}
}
