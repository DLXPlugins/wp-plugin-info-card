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
		add_action( 'admin_init', array( $self, 'register_settings' ) );
		add_action( 'wp_ajax_async_wppic_clear_cache', array( $self, 'ajax_clear_cache' ) );
		add_action( 'wp_ajax_wppic_widget_render', array( $self, 'ajax_dashboard_widget_render' ) );
		add_action( 'wp_dashboard_setup', array( $self, 'add_dashboard_widgets' ) );
		return $self;
	}

	/**
	 * Enqueue the scripts needed for the admin panel.
	 *
	 * @param string $hook The current admin page.
	 */
	public function enqueue_admin_scripts( $hook ) {
		// Bail if we're not on the plugin's admin page or the dashboard page.
		if ( 'settings_page_wp-plugin-info-card' !== $hook && 'index.php' !== $hook ) {
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
			<?php $this->about_output(); ?>
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
				echo wp_kses( do_shortcode( '[wp-pic type="plugin" scheme="scheme1" layout="card" slug="wp-plugin-info-card"]' ), Functions::get_kses_allowed_html() );
				?>
				</div>
				<div id="plugin-info-admim-demo-wordpress" style="display: none; width: 100%; max-width: 800px">
				<?php
				echo wp_kses( do_shortcode( '[wp-pic type="plugin" scheme="scheme1" layout="wordpress" slug="wp-plugin-info-card"]' ), Functions::get_kses_allowed_html() );
				?>
				</div>
				<div id="plugin-info-admim-demo-large" style="display: none; width: 100%; max-width: 800px">
				<?php
				echo wp_kses( do_shortcode( '[wp-pic type="theme" scheme="scheme1" layout="large" slug="twentytwenty"]' ), Functions::get_kses_allowed_html() );
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
				echo wp_kses( $memcache, Functions::get_kses_allowed_html() );
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

	/**
	 * Register settings API settings.
	 */
	public function register_settings() {
		register_setting(
			'wppic_settings',
			'wppic_settings',
			array( $this, 'sanitize_settings' )
		);
		add_settings_section(
			'wppic_options',
			'',
			'',
			Functions::get_plugin_slug() . 'options'
		);
		add_settings_field(
			'wppic-default-layout',
			__( 'Default Layout', 'wp-plugin-info-card' ),
			array( $this, 'default_layout_settings' ),
			Functions::get_plugin_slug() . 'options',
			'wppic_options'
		);
		add_settings_field(
			'wppic-color-scheme',
			__( 'Color scheme', 'wp-plugin-info-card' ),
			array( $this, 'color_schemes' ),
			Functions::get_plugin_slug() . 'options',
			'wppic_options'
		);
		add_settings_field(
			'wppic-enqueue',
			__( 'Force enqueuing CSS & JS', 'wp-plugin-info-card' ),
			array( $this, 'checkbox' ),
			Functions::get_plugin_slug() . 'options',
			'wppic_options',
			array(
				'id'    => 'wppic-enqueue',
				'name'  => 'enqueue',
				'label' => __( 'By default the plugin enqueues scripts (JS & CSS) only for pages containing the shortcode. If you wish to force scripts enqueuing, check this box.', 'wp-plugin-info-card' ),
			)
		);
		add_settings_field(
			'wppic-credit',
			__( 'Display a discrete credit', 'wp-plugin-info-card' ),
			array( $this, 'checkbox' ),
			Functions::get_plugin_slug() . 'options',
			'wppic_options',
			array(
				'id'    => 'wppic-credit',
				'name'  => 'credit',
				'label' => __( 'Help spread the word about this plugin.', 'wp-plugin-info-card' ),
			)
		);

		add_settings_section(
			'wppic_list',
			'',
			'',
			Functions::get_plugin_slug() . 'widget'
		);
		add_settings_field(
			'wppic-list-widget',
			__( 'Enable dashboard widget', 'wp-plugin-info-card' ),
			array( $this, 'checkbox' ),
			Functions::get_plugin_slug() . 'widget',
			'wppic_list',
			array(
				'id'    => 'wppic-widget',
				'name'  => 'widget',
				'label' => __( 'Help: Don\'t forget to open the dashboard option panel (top right) to display it on your dashboard.', 'wp-plugin-info-card' ),
			)
		);
		add_settings_field(
			'wppic-list-ajax',
			__( 'Ajaxify dashboard widget', 'wp-plugin-info-card' ),
			array( $this, 'checkbox' ),
			Functions::get_plugin_slug() . 'widget',
			'wppic_list',
			array(
				'id'    => 'wppic-ajax',
				'name'  => 'ajax',
				'label' => __( 'Will load the data asynchronously with AJAX.', 'wp-plugin-info-card' ),
			)
		);
		add_settings_field(
			'wppic-list-form',
			__( 'List of items to display', 'wp-plugin-info-card' ),
			array( $this, 'list_form' ),
			Functions::get_plugin_slug() . 'widget',
			'wppic_list'
		);
	}

	/**
	 * Settings to validate.
	 *
	 * @param array $settings Array of admin settings.
	 */
	public function validate_settings( $settings ) {
		if ( isset( $settings['list'] ) && ! empty( $settings['list'] ) ) {

			$validation_list = array();
			$validation_list = apply_filters( 'wppic_add_list_valdiation', $validation_list );

			foreach ( $validation_list as $element ) {
				if ( isset( $settings[ $element[0] ] ) && ! empty( $settings[ $element[0] ] ) ) {

					// remove duplicate.
					$settings[ $element[0] ] = array_unique( $settings[ $element[0] ] );

					foreach ( $settings[ $element[0] ] as $key => $item ) {
						if ( ! preg_match( $element[2], $item ) ) {
							if ( ! empty( $item ) ) {
								add_settings_error(
									'wppic-admin-notice',
									esc_attr( 'wppic-error' ),
									'<i>"' . $item . '"</i> ' . $element[1],
									'error'
								);
							}
							unset( $settings[ $element[0] ][ $key ] );
						}
					}
				}
			}
		}
		return $settings;
	}

	/**
	 * Output layout settings.
	 */
	public function default_layout_settings() {
		$options = Options::get_options();

		$layout = $options['default_layout'] ?? 'card';

		$content  = '<td>';
		$content .= '<select id="wppic-default-layout" name="wppic_settings[default_layout]">';
		$content .= '<option value="card"  ' . selected( $layout, 'card', false ) . ' >' . esc_html__( 'Card', 'wp-plugin-info-card' ) . '</option>';
		$content .= '<option value="wordpress"  ' . selected( $layout, 'WordPress', false ) . ' >' . esc_html__( 'WordPress Appearance', 'wp-plugin-info-card' ) . '</option>';
		$content .= '<option value="large"  ' . selected( $layout, 'large', false ) . ' >' . esc_html__( 'Large Card Layout', 'wp-plugin-info-card' ) . '</option>';
		$content .= '<option value="flex"  ' . selected( $layout, 'flex', false ) . ' >' . esc_html__( 'Wide Screen Flex Layout', 'wp-plugin-info-card' ) . '</option>';
		$content .= '</select>';
		$content .= '<label for="wppic-default-layout">' . esc_html__( 'Default layout for your cards.', 'wp-plugin-info-card' ) . '</label>';
		$content .= '</td>';
		echo wp_kses( $content, Functions::get_kses_allowed_html( true, true ) );
	}

	/**
	 * Output the color schemes interface.
	 */
	public function color_schemes() {
		$options = Options::get_options();
		$scheme  = $options['colorscheme'] ?? 'default';

		$content  = '<td>';
		$content .= '<select id="wppic-color-scheme" name="wppic_settings[colorscheme]">';
		$content .= '<option value="default"  ' . selected( $scheme, 'default', false ) . ' >Default</option>';
		$content .= '<option value="scheme1"  ' . selected( $scheme, 'scheme1', false ) . ' >Color scheme 1</option>';
		$content .= '<option value="scheme2"  ' . selected( $scheme, 'scheme2', false ) . ' >Color scheme 2</option>';
		$content .= '<option value="scheme3"  ' . selected( $scheme, 'scheme3', false ) . ' >Color scheme 3</option>';
		$content .= '<option value="scheme4"  ' . selected( $scheme, 'scheme4', false ) . ' >Color scheme 4</option>';
		$content .= '<option value="scheme5"  ' . selected( $scheme, 'scheme5', false ) . ' >Color scheme 5</option>';
		$content .= '<option value="scheme6"  ' . selected( $scheme, 'scheme6', false ) . ' >Color scheme 6</option>';
		$content .= '<option value="scheme7"  ' . selected( $scheme, 'scheme7', false ) . ' >Color scheme 7</option>';
		$content .= '<option value="scheme8"  ' . selected( $scheme, 'scheme8', false ) . ' >Color scheme 8</option>';
		$content .= '<option value="scheme9"  ' . selected( $scheme, 'scheme9', false ) . ' >Color scheme 9</option>';
		$content .= '<option value="scheme10" ' . selected( $scheme, 'scheme10', false ) . '>Color scheme 10</option>';
		$content .= '<option value="scheme11" ' . selected( $scheme, 'scheme11', false ) . '>Color scheme 11</option>';
		$content .= '<option value="scheme12" ' . selected( $scheme, 'scheme12', false ) . '>Color scheme 12</option>';
		$content .= '<option value="scheme13" ' . selected( $scheme, 'scheme13', false ) . '>Color scheme 13</option>';
		$content .= '<option value="scheme14" ' . selected( $scheme, 'scheme14', false ) . '>Color scheme 14</option>';
		$content .= '</select>';
		$content .= '<label for="wppic-color-scheme">' . esc_html__( 'Default color scheme for your cards.', 'wp-plugin-info-card' ) . '</label>';
		$content .= '</td>';
		echo wp_kses( $content, Functions::get_kses_allowed_html() );
	}

	/**
	 * Checkbox output for settings.
	 *
	 * @param array $args Checkbox setting arguments.
	 */
	public function checkbox( $args ) {
		$options  = Options::get_options();
		$content  = '<td>';
		$content .= '<input type="checkbox" id="' . $args['id'] . '" name="wppic_settings[' . $args['name'] . ']"  value="1" ';
		if ( isset( $options[ $args['name'] ] ) ) {
			$content .= checked( 1, $options[ $args['name'] ], false );
		}
		$content .= '/>';
		$content .= '<label for="' . $args['id'] . '">' . $args['label'] . '</label>';
		$content .= '</td>';
		echo $content;
	}

	/**
	 * Output the list form.
	 */
	public function list_form() {
		$options         = Options::get_options();
		$wppic_list_form = array();
		$wppic_list_form = apply_filters( 'wppic_add_list_form', $wppic_list_form );

		$content = '<td>';

		if ( ! empty( $wppic_list_form ) ) {
			foreach ( $wppic_list_form as $wppic_item_form ) {
				$content     .= '<div class="form-list">';
					$content .= '<button class="button wppic-add-fields" data-type="' . $wppic_item_form[0] . '">' . $wppic_item_form[1] . '</button><input type="text" name="wppic-add" class="wppic-add"  value="">';
					$content .= '<ul id="wppic-' . $wppic_item_form[0] . '" class="wppic-list">';
				if ( ! empty( $options[ $wppic_item_form[0] ] ) ) {
					foreach ( $options[ $wppic_item_form[0] ] as $item ) {
						$content .= '<li class="wppic-dd"><input type="text" name="wppic_settings[' . $wppic_item_form[0] . '][]"  value="' . $item . '"><span class="wppic-remove-field" title="remove"></span></li>';
					}
				}
					$content .= '</ul>';
					$content .= '<p>' . $wppic_item_form[2] . ' - <i>' . $wppic_item_form[3] . '</i> -<p>';
				$content     .= '</div>';
			}
		}

		$content .= '</td>';
		echo wp_kses( $content, Functions::get_kses_allowed_html( true, true ) );
	}

	/**
	 * Output the about section.
	 */
	private function about_output() {
		$content = '<hr />
			<div id="wppic-about-list">
				<a class="wppic-button wppic-pluginHome" href="https://mediaron.com/wp-plugin-info-card/" target="_blank">' . __( 'Plugin homepage', 'wp-plugin-info-card' ) . '</a>
				<a class="wppic-button wppic-pluginPage" href="https://wordpress.org/plugins/wp-plugin-info-card/" target="_blank">WordPress.org</a>
				<a class="wppic-button wppic-pluginSupport" href="https://wordpress.org/support/plugin/wp-plugin-info-card" target="_blank">' . __( 'Support', 'wp-plugin-info-card' ) . '</a>
				<a class="wppic-button wppic-pluginRate" href="https://wordpress.org/support/view/plugin-reviews/wp-plugin-info-card?rate=5#postform" target="_blank">' . __( 'Rate Us Five Stars', 'wp-plugin-info-card' ) . '</a>
				<a class="wppic-button wppic-pluginCode" href="https://github.com/MediaRon/wp-plugin-info-card" target="_blank">' . __( 'Find Us On GitHub', 'wp-plugin-info-card' ) . '</a>
				<a class="wppic-button wppic-pluginContact" href="https://mediaron.com/contact/" target="_blank">' . __( 'Contact Us', 'wp-plugin-info-card' ) . '</a>
			</div>
			<hr />
		';
		echo wp_kses( $content, Functions::get_kses_allowed_html() );
	}

	/**
	 * Clear Plugin cache.
	 */
	public function ajax_clear_cache() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		wppic_delete_transients();
	}

	/**
	 * Adds a dashboard widget to the dashboard.
	 */
	public function add_dashboard_widgets() {
		$options = Options::get_options();

		// Ensure widget option is valid boolean.
		$options_widget = $options['widget'] ?? false;
		$options_widget = filter_var( $options_widget, FILTER_VALIDATE_BOOLEAN );

		// Get SVG.
		$wppic_svg = Functions::get_plugin_url( 'assets/img/wppic.svg' );
		if ( true === $options_widget ) {
			wp_add_dashboard_widget(
				'wppic-dashboard-widget',
				'<img src="' . esc_url( $wppic_svg ) . '" class="wppic-logo" alt="b*web" style="display:none"/>&nbsp;&nbsp;' . Functions::get_plugin_name() . ' board',
				array( $this, 'output_dashboard_widgets' )
			);
		}
	}

	/**
	 * Output dashboard widgets.
	 */
	public function output_dashboard_widgets() {
		$options    = Options::get_options();
		$list_state = false;
		$ajax_class = '';

		if ( isset( $options['ajax'] ) && true === $options['ajax'] ) {
			$ajax_class = 'ajax-call';
		}

		$wppic_types = array();
		$wppic_types = apply_filters( 'wppic_add_widget_type', $wppic_types );

		$content = '<div class="wp-pic-list ' . $ajax_class . '">';

		foreach ( $wppic_types as $wppic_type ) {

			$rows = array();

			if ( isset( $options[ $wppic_type[1] ] ) && ! empty( $options[ $wppic_type[1] ] ) ) {

				$list_state  = true;
				$other_lists = false;

				foreach ( $wppic_types as $wppic_list ) {
					if ( $wppic_type[1] !== $wppic_list[1] ) {
						$rows[] = $wppic_list[1];
					}
				}

				foreach ( $rows as $row ) {
					if ( isset( $options[ $row ] ) && ! empty( $options[ $row ] ) ) {
						$other_lists = true;
					}
				}

				if ( $other_lists ) {
					$content .= '<h4>' . $wppic_type[2] . '</h4>';
				}

				if ( isset( $options['ajax'] ) && true === $options['ajax'] ) {
					$content .= '<div class="wp-pic-loading" style="background-image: url( ' . admin_url() . 'images/spinner-2x.gif);" data-type="' . $wppic_type[0] . '" data-list="' . htmlspecialchars( json_encode( ( $options[ $wppic_type[1] ] ) ), ENT_QUOTES, 'UTF-8' ) . '"></div>';
				} else {
					$content .= $this->render_widget( $wppic_type[0], $options[ $wppic_type[1] ] );
				}
			}
		}

		// Nothing found.
		if ( ! $list_state ) {

			$content .= '<div class="wp-pic-item" style="display:block;">';
			$content .= '<span class="wp-pic-no-item"><a href="admin.php?page=' . WPPIC_ID . '">' . __( 'Nothing found, please add at least one item in the WP Plugin Info Card settings page.', 'wp-plugin-info-card' ) . '</a></span>';
			$content .= '</div>';

		}

		$content .= '</div>';

		echo wp_kses( $content, Functions::get_kses_allowed_html() );

	}

	/**
	 * Renders a widget via Ajax.
	 */
	public function ajax_dashboard_widget_render() {
		$type  = filter_input( INPUT_POST, 'wppic-type', FILTER_DEFAULT );
		$list  = filter_input( INPUT_POST, 'wppic-list', FILTER_DEFAULT );
		$slugs = array( sanitize_text_field( $list ) );

		$content = $this->render_widget( $type, $slugs );

		if ( ! empty( $list ) ) {
			echo wp_kses( $content, Functions::get_kses_allowed_html() );
		} else {
			return $content;
		}
		exit;
	}

	/**
	 * Render a dashboard widget item.
	 *
	 * @param string $type  Type of the item (plugins, themes).
	 * @param array  $slugs Slug of the item.
	 *
	 * @return string $content.
	 */
	private function render_widget( $type, $slugs ) {
		$content = '';

		if ( ! empty( $slugs ) ) {
			foreach ( $slugs as $slug ) {
				$wppic_data = wppic_api_parser( $type, $slug, '5', 'widget' );

				if ( ! $wppic_data ) {

					$content .= '<div class="wp-pic-item ' . $slug . '">';
					$content .= '<span class="wp-pic-no-item">' . esc_html__( 'Item not found:', 'wp-plugin-info-card' ) . ' "' . $slug . '" ' . esc_html__( 'does not exist.', 'wp-plugin-info-card' ) . '</span>';
					$content .= '</div>';

				} else {

					$content = apply_filters( 'wppic_add_widget_item', $content, $wppic_data, $type );

				}
			}
		}

		return $content;
	}
}
