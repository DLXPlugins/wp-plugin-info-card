<?php
/**
 * Set up add plugin functionality.
 *
 * @package WPPIC
 */

namespace MediaRon\WPPIC\Admin;

use MediaRon\WPPIC\Functions;

/**
 * Init settings class for WPPIC.
 */
class Settings {
	/**
	 * Registers and outputs placeholder for settings.
	 *
	 * @since 1.0.0
	 */
	public static function settings_page() {
		self::get_settings_header();
		?>
		<div class="wppic-settings-wrapper">
			<div class="wppic-settings-tabs">
				<?php
				self::get_settings_tabs();
				?>
				<span aria-hidden="true"></span>
			</div>
		</div>
		<?php
		self::get_settings_footer();
		?>
		<?php
	}

	/**
	 * Output Generic Settings Place holder for React goodness.
	 */
	public static function get_settings_header() {
		$user      = wp_get_current_user();
		$user_id   = $user->ID;
		$firstname = get_user_meta( $user_id, 'first_name', true );
		$lastname  = get_user_meta( $user_id, 'last_name', true );
		$website   = home_url();

		$support_url = add_query_arg(
			array(
				'firstname' => $firstname,
				'lastname'  => $lastname,
				'site'      => $website,
				'email'     => $user->data->user_email,
				'license'   => '',
				'product'   => 'Ajaxify Comments',
				'subject'   => 'Ajaxify Comments support',
				'support'   => 'Yes',
			),
			'https://dlxplugins.com/support/'
		);
		?>
		<header id="wppic-admin-header">
			<div id="wppic-admin-header-content">
				<div class="wppic-admin-header-logo">
					<h1>
						<a href="<?php echo esc_url( Functions::get_settings_url() ); ?>" class="wppic-admin-logo"><img src="<?php echo esc_url( Functions::get_plugin_url( 'assets/img/wppic-square.png' ) ); ?>" alt="WP Plugin Info Card" /></a>
					</h1>
				</div>
				<p class="wppic-admin-header-description">
					<?php esc_html_e( 'Show off WordPress Plugin and Theme directory items in beautiful card layouts.', 'wp-plugin-info-card' ); ?>
				</p>
				<div class="wppic-admin-header-quick-links">
					<a href="https://wppic.dlxplugins.com/"><?php esc_html_e( 'Documentation', 'wp-plugin-info-card' ); ?></a> | <a href="https://dlxplugins.com/support/"><?php esc_html_e( 'Support', 'wp-plugin-info-card' ); ?></a>
				</div>
			</div>
		</header>
		<?php
	}

	/**
	 * Get the admin footer.
	 */
	public static function get_admin_header() {
		// Make sure we enqueue on the right admin screen.
		$screen = get_current_screen();
		if ( ! isset( $screen->id ) ) {
			return;
		}
		if ( isset( $screen->base ) && 'settings_page_wp-plugin-info-card' !== $screen->base ) {
			return;
		}
		?>
		<svg width="0" height="0" class="hidden">
			<symbol aria-hidden="true" data-prefix="fas" data-icon="home-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="home-heart">
				<g class="fa-group"><path class="fa-secondary" fill="currentColor" d="M64.11 311.38V496a16.05 16.05 0 0 0 16 16h416a16.05 16.05 0 0 0 16-16V311.38c-6.7-5.5-44.7-38.31-224-196.4-180.11 158.9-217.6 191.09-224 196.4zm314.1-26.31a60.6 60.6 0 0 1 4.5 89.11L298 459.77a13.94 13.94 0 0 1-19.8 0l-84.7-85.59a60.66 60.66 0 0 1 4.3-89.11c24-20 59.7-16.39 81.6 5.81l8.6 8.69 8.6-8.69c22.01-22.2 57.71-25.81 81.61-5.81z" opacity="0.4"></path><path class="fa-primary" fill="currentColor" d="M378.21 285.07c-23.9-20-59.6-16.39-81.6 5.81l-8.6 8.69-8.6-8.69c-21.9-22.2-57.6-25.81-81.6-5.81a60.66 60.66 0 0 0-4.3 89.11l84.7 85.59a13.94 13.94 0 0 0 19.8 0l84.7-85.59a60.6 60.6 0 0 0-4.5-89.11zm192.6-48.8l-58.7-51.79V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v51.7l-101.3-89.43a40 40 0 0 0-53.5 0l-256 226a16 16 0 0 0-1.2 22.61l21.4 23.8a16 16 0 0 0 22.6 1.2l229.4-202.2a16.12 16.12 0 0 1 21.2 0L528 284a16 16 0 0 0 22.6-1.21L572 259a16.11 16.11 0 0 0-1.19-22.73z"></path></g>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" id="file-code">
				<path fill="currentColor" class="fa-primary" d="M384 160L224 0V128c0 17.7 14.3 32 32 32H384zM153 289c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L71 303c-9.4 9.4-9.4 24.6 0 33.9l48 48c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-31-31 31-31zM265 255c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l48-48c9.4-9.4 9.4-24.6 0-33.9l-48-48z"/><path fill="currentColor" class="fa-secondary" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM153 289c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L71 303c-9.4 9.4-9.4 24.6 0 33.9l48 48c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-31-31 31-31zM265 255c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l48-48c9.4-9.4 9.4-24.6 0-33.9l-48-48z" opacity="0.4"/>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" id="brush">
				<path fill="currentColor" class="fa-primary" d="M0 288H384v32c0 35.3-28.7 64-64 64H256v64c0 35.3-28.7 64-64 64s-64-28.7-64-64V384H64c-35.3 0-64-28.7-64-64V288zM192 464a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/><path fill="currentColor" class="fa-secondary" d="M162.4 6c-1.5-3.6-5-6-8.9-6h-19c-3.9 0-7.5 2.4-8.9 6L104.9 57.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6H48C21.5 0 0 21.5 0 48V256v22.4V288H9.6 374.4 384v-9.6V256 48c0-26.5-21.5-48-48-48H230.5c-3.9 0-7.5 2.4-8.9 6L200.9 57.7c-3.2 8-14.6 8-17.8 0L162.4 6z" opacity="0.4"/>
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" id="icon-text">
				<path fill="currentColor" class="fa-primary" d="M384 288v16c0 17.7-14.3 32-32 32s-32-14.3-32-32V272c0-26.5 21.5-48 48-48H592c26.5 0 48 21.5 48 48v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V288H512l0 128h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H432c-17.7 0-32-14.3-32-32s14.3-32 32-32h16l0-128H384z"/><path fill="currentColor" class="fa-secondary" d="M64 96v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V80C0 53.5 21.5 32 48 32H192 336c26.5 0 48 21.5 48 48v48c0 17.7-14.3 32-32 32s-32-14.3-32-32V96H224l0 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32h32l0-320H64z" opacity="0.4" />
			</symbol>
			<symbol aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="icon-tower-broadcast">
				<path fill="currentColor" class="fa-primary" d="M320 183.4c19.1-11.1 32-31.7 32-55.4c0-35.3-28.7-64-64-64s-64 28.7-64 64c0 23.7 12.9 44.4 32 55.4V480c0 17.7 14.3 32 32 32s32-14.3 32-32V183.4z"/><path fill="currentColor" class="fa-secondary" d="M80.3 44C86.9 27.6 79 9 62.6 2.3S27.6 3.6 20.9 20C7.4 53.4 0 89.9 0 128s7.4 74.6 20.9 108c6.6 16.4 25.3 24.3 41.7 17.7S86.9 228.4 80.3 212C69.8 186.1 64 157.8 64 128s5.8-58.1 16.3-84zM555.1 20C548.4 3.6 529.8-4.3 513.4 2.3S489.1 27.6 495.7 44C506.2 69.9 512 98.2 512 128s-5.8 58.1-16.3 84c-6.6 16.4 1.3 35 17.7 41.7s35-1.3 41.7-17.7c13.5-33.4 20.9-69.9 20.9-108s-7.4-74.6-20.9-108zM170.6 76.8c7.1-16.2-.3-35.1-16.5-42.1s-35.1 .3-42.1 16.5C101.7 74.8 96 100.8 96 128s5.7 53.2 16 76.8c7.1 16.2 25.9 23.6 42.1 16.5s23.6-25.9 16.5-42.1C163.8 163.6 160 146.3 160 128s3.8-35.6 10.6-51.2zM464 51.2c-7.1-16.2-25.9-23.6-42.1-16.5s-23.6 25.9-16.5 42.1C412.2 92.4 416 109.7 416 128s-3.8 35.6-10.6 51.2c-7.1 16.2 .3 35.1 16.5 42.1s35.1-.3 42.1-16.5c10.3-23.6 16-49.6 16-76.8s-5.7-53.2-16-76.8z" opacity="0.4" />
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="flask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="flask">
				<path fill="currentColor" opacity="0.4" d="M309.5 320h-171L64.8 439.8c-.5 .9-.8 1.8-.8 2.8c0 3 2.4 5.4 5.4 5.4H378.6c3 0 5.4-2.4 5.4-5.4c0-1-.3-2-.8-2.8L309.5 320z"/><path fill="currentColor" d="M160 0H288h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V196.8c0 11.8 3.3 23.5 9.5 33.5L437.7 406.2c6.7 10.9 10.3 23.5 10.3 36.4c0 38.3-31.1 69.4-69.4 69.4H69.4C31.1 512 0 480.9 0 442.6c0-12.8 3.6-25.4 10.3-36.4L118.5 230.4c6.2-10.1 9.5-21.7 9.5-33.5V64c-17.7 0-32-14.3-32-32s14.3-32 32-32h32zm32 64V196.8c0 23.7-6.6 46.9-19 67.1L64.8 439.8c-.5 .9-.8 1.8-.8 2.8c0 3 2.4 5.4 5.4 5.4H378.6c3 0 5.4-2.4 5.4-5.4c0-1-.3-2-.8-2.8L275 263.9c-12.4-20.2-19-43.4-19-67.1V64H192z"/>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fad" data-icon="hands-helping" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 512" id="hands-helping">
				<g class="fa-group"><path class="fa-secondary" fill="currentColor" d="M224 248V121.68a31.78 31.78 0 0 1 15-27.1l33.5-20.9A64.48 64.48 0 0 1 306.4 64h102.21L512 4.28A32 32 0 0 1 555.72 16l80 138.6a32 32 0 0 1-11.7 43.7l-80 46.2V216a56 56 0 0 0-56-56H304v88a40 40 0 1 1-80 0z" opacity="0.4"></path><path class="fa-primary" fill="currentColor" d="M4.32 357.38A31.92 31.92 0 0 1 16 313.68l80-46.2v-47.3a63.86 63.86 0 0 1 31.1-54.8l64.89-39V248a72 72 0 1 0 144 0v-56H488a23.94 23.94 0 0 1 24 24v48a23.94 23.94 0 0 1-24 24h-8v64a32 32 0 0 1-32 32h-16a64.06 64.06 0 0 1-64 64H231.41L128 507.68A32 32 0 0 1 84.32 496z"></path></g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fad" data-icon="hourglass-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="hourglass-clock">
				<path fill="currentColor" class="fa-primary" d="M432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"  /><path class="fa-secondary" fill="currentColor" d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l36 36c-11 23-17.2 48.8-17.2 76c0 59.5 29.6 112.1 74.8 144H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM96 64V75c0 19 5.6 37.4 16 53H272c10.3-15.6 16-34 16-53V64H96z" opacity="0.4"/>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fad" data-icon="comment-dots" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="comment-dots">
				<path fill="currentColor" class="fa-primary" d="M96 240a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm160-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/><path class="fa-secondary" fill="currentColor" d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" opacity="0.4" />
			</symbol>
			<symbol aria-hidden="true" data-prefix="fad" data-icon="plug-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="plug-plus">
				<path fill="currentColor" class="fa-primary" d="M288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-80c-8.8 0-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304c0-8.8-7.2-16-16-16z"/><path fill="currentColor" class="fa-secondary" d="M128 32v96H64V32C64 14.3 78.3 0 96 0s32 14.3 32 32zm192 0v96H256V32c0-17.7 14.3-32 32-32s32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32c0 2.3-.3 4.6-.7 6.8C309.8 220 256 287.7 256 368c0 11.4 1.1 22.5 3.1 33.3c-11.1 5.1-22.9 9-35.1 11.5V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V412.8C87 398 32 333.4 32 256V224c-17.7 0-32-14.3-32-32z" opacity="0.4"/>
			</symbol>
		</svg>
		<?php do_action( 'dlxplugins/ajaxify/admin/header_content' ); ?>
		<?php
	}
	/**
	 * Output the top-level admin tabs.
	 */
	public static function get_settings_tabs() {

		$settings_url_base = Functions::get_settings_url( 'home' );

		$tabs = array();
		/**
		 * Filer the output of the tab output.
		 *
		 * Potentially modify or add your own tabs.
		 *
		 * @since 1.0.0
		 *
		 * @param array $tabs Associative array of tabs.
		 */
		$tabs       = apply_filters( 'wppic_comments_admin_tabs', $tabs );
		$tab_html   = '<nav class="wppic-admin-options">';
		$tabs_count = count( $tabs );
		if ( $tabs && ! empty( $tabs ) && is_array( $tabs ) ) {
			$active_tab = Functions::get_admin_tab();
			if ( null === $active_tab ) {
				$active_tab = 'home';
			}
			$is_tab_match = false;
			if ( 'home' === $active_tab ) {
				$active_tab = 'home';
			} else {
				foreach ( $tabs as $tab ) {
					$tab_get = isset( $tab['get'] ) ? $tab['get'] : '';
					if ( $active_tab === $tab_get ) {
						$is_tab_match = true;
					}
				}
				if ( ! $is_tab_match ) {
					$active_tab = 'home';
				}
			}
			$do_action = false;
			foreach ( $tabs as $tab ) {
				$classes = array();
				$tab_get = isset( $tab['get'] ) ? $tab['get'] : '';
				if ( $active_tab === $tab_get ) {
					$classes[] = 'nav-tab-active';
					$do_action = isset( $tab['action'] ) ? $tab['action'] : false;
				} elseif ( ! $is_tab_match && 'home' === $tab_get ) {
					$classes[] = 'nav-tab-active';
					$do_action = isset( $tab['action'] ) ? $tab['action'] : false;
				}
				$tab_url   = isset( $tab['url'] ) ? $tab['url'] : '';
				$tab_label = isset( $tab['label'] ) ? $tab['label'] : '';
				$tab_html .= sprintf(
					'<a href="%s" class="%s" id="eff-%s"><svg class="wppic-icon wppic-icon-tab">%s</svg><span>%s</span></a>',
					esc_url( $tab_url ),
					esc_attr( implode( ' ', $classes ) ),
					esc_attr( $tab_get ),
					sprintf( '<use xlink:href="#%s"></use>', esc_attr( $tab['icon'] ) ),
					esc_html( $tab['label'] )
				);
			}
			$tab_html .= '</nav>';
			if ( $tabs_count > 0 ) {
				echo wp_kses( $tab_html, Functions::get_kses_allowed_html() );
			}

			$current_tab     = Functions::get_admin_tab();
			$current_sub_tab = Functions::get_admin_sub_tab();

			/**
			 * Filer the output of the sub-tab output.
			 *
			 * Potentially modify or add your own sub-tabs.
			 *
			 * @since 1.0.0
			 *
			 * @param array Associative array of tabs.
			 * @param string Tab
			 * @param string Sub Tab
			 */
			$sub_tabs = apply_filters( 'wppic_comments_admin_sub_tabs', array(), $current_tab, $current_sub_tab );

			// Check to see if no tabs are available for this view.
			if ( null === $current_tab && null === $current_sub_tab ) {
				$current_tab = 'home';
			}
			ob_start();
			if ( $sub_tabs && ! empty( $sub_tabs ) && is_array( $sub_tabs ) ) {
				if ( null === $current_sub_tab ) {
					$current_sub_tab = '';
				}
				$is_tab_match      = false;
				$first_sub_tab     = current( $sub_tabs );
				$first_sub_tab_get = $first_sub_tab['get'];
				if ( $first_sub_tab_get === $current_sub_tab ) {
					$active_tab = $current_sub_tab;
				} else {
					$active_tab = $current_sub_tab;
					foreach ( $sub_tabs as $tab ) {
						$tab_get = isset( $tab['get'] ) ? $tab['get'] : '';
						if ( $active_tab === $tab_get ) {
							$is_tab_match = true;
						}
					}
					if ( ! $is_tab_match ) {
						$active_tab = $first_sub_tab_get;
					}
				}
				$sub_tab_html_array = array();
				$do_subtab_action   = false;
				$maybe_sub_tab      = '';
				foreach ( $sub_tabs as $sub_tab ) {
					$classes = array( 'wppic-sub-tab' );
					$tab_get = isset( $sub_tab['get'] ) ? $sub_tab['get'] : '';
					if ( $active_tab === $tab_get ) {
						$classes[]        = 'wppic-sub-tab-active';
						$do_subtab_action = true;
						$current_sub_tab  = $tab_get;
					} elseif ( ! $is_tab_match && $first_sub_tab_get === $tab_get ) {
						$classes[]        = 'wppic-sub-tab-active';
						$do_subtab_action = true;
						$current_sub_tab  = $first_sub_tab_get;
					}
					$tab_url   = isset( $sub_tab['url'] ) ? $sub_tab['url'] : '';
					$tab_label = isset( $sub_tab['label'] ) ? $sub_tab['label'] : '';
					if ( $current_sub_tab === $tab_get ) {
						$sub_tab_html_array[] = sprintf( '<span class="%s" id="wppic-tab-%s">%s</span>', esc_attr( implode( ' ', $classes ) ), esc_attr( $tab_get ), esc_html( $sub_tab['label'] ) );
					} else {
						$sub_tab_html_array[] = sprintf( '<a href="%s" class="%s" id="wppic-tab-%s">%s</a>', esc_url( $tab_url ), esc_attr( implode( ' ', $classes ) ), esc_attr( $tab_get ), esc_html( $sub_tab['label'] ) );
					}
				}
				if ( ! empty( $sub_tab_html_array ) ) {
					echo '<nav class="wppic-sub-links">' . wp_kses_post( rtrim( implode( ' | ', $sub_tab_html_array ), ' | ' ) ) . '</nav>';
				}
				if ( $do_subtab_action ) {
					/**
					 * Perform a sub tab action.
					 *
					 * Perform a sub tab action. Useful for loading scripts or inline styles as necessary.
					 *
					 * @since 1.0.0
					 *
					 * eff_admin_sub_tab_{current_tab}_{current_sub_tab}
					 * @param string Sub Tab
					 */
					do_action(
						sprintf( // phpcs:ignore
							'wppic_comments_admin_sub_tab_%s_%s',
							sanitize_title( $current_tab ),
							sanitize_title( $current_sub_tab )
						)
					);
				}
			}
			$subtab_content = ob_get_clean();

			if ( $do_action ) {
				echo '<div class="wppic-admin-tab-content">';
				if ( ! empty( $subtab_content ) ) {
					echo wp_kses( $subtab_content, Functions::get_kses_allowed_html() );
				}
				/**
				 * Perform a tab action.
				 *
				 * Perform a tab action.
				 *
				 * @since 1.0.0
				 *
				 * @param string $action Can be any action.
				 * @param string Tab
				 * @param string Sub Tab
				 */
				do_action( $do_action, $current_tab, $current_sub_tab );

				echo '</div>';
			}
		}
	}

	/**
	 * Run script and enqueue stylesheets and stuff like that.
	 */
	public static function get_settings_footer() {
		?>
		<?php
	}
}
