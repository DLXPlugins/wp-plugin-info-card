=== WP Plugin Info Card ===
Contributors: briKou, ronalfy
Tags: API, plugin, card, theme, block, blocks, gutenberg
Requires at least: 3.7
Tested up to: 6.1
Stable tag: 4.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html


WP Plugin Info Card displays plugins & themes data in a beautiful box with a smooth rotation effect using WP Plugin & Theme APIs. Dashboard widget included.

== Description ==

> Credits: Originally developed and maintained by <a href="https://www.b-website.com/">Brice CAPOBIANCO</a>.

WPPIC displays plugins & themes data in a beautiful box with a smooth rotation effect using WP Plugin & Theme APIs. Dashboard widget included.

> Please rate the plugin if you like it. <a href="https://wordpress.org/support/plugin/wp-plugin-info-card/reviews/#new-post">Leave a review</a>!

[youtube https://www.youtube.com/watch?v=8eKDCEoXGKU&rel=0]

= How does it work? =

This thirteen minute video gives you an extensive overview on how WP Plugin Info Card works.

[youtube https://www.youtube.com/watch?v=aPcU27-R6lU&rel=0]

WP Plugin Info Card lets you display plugins & themes identity cards in a beautiful box with a smooth 3D rotation effect, or in a more large and responsive layout.

It uses WordPress.org plugins API & themes API to fetch data. All you need to do is provide a valid plugin/theme ID (slug name), and then insert the shortcode in any page to make it work at once!

This plugin is very light and includes scripts and CSS only if and when required (you can force scripts enqueuing in admin settings). The shortcode may be added anywhere shortcodes are supported within your theme.

The plugin also uses WordPress transients to store data returned by the API for 12 hours (720min by default), so your page loading time will not be increased due to too many requests.

The dashboard widget is very easy to set up: you simply add as many plugins and themes as you want in the admin page and they become visible in your dashboard. Fields are added on-the-fly and are sortable via drag-and-drop.

It is perfect to keep track of your own plugins and themes!


[CHECK OUT THE DEMO](https://mediaron.com/wp-plugin-info-card/ "Try It!")

= Quick Links (Shortcode Documentation) =

* <a href="https://wppic.mediaron.com/shortcodes/wp-pic">[wp-pic] shortcode and parameters</a>.
* <a href="https://wppic.mediaron.com/shortcodes/wp-pic-query">[wp-pic-query] shortcode and parameters</a>.
* <a href="https://wppic.mediaron.com/shortcodes/wp-pic-site-plugins">[wp-pic-site-plugins] shortcode and parameters</a>.

= Quick Links (Block Documentation) =

* <a href="https://wppic.mediaron.com/blocks/wp-plugin-info-card-block">WP Plugin Info Card block</a>.
* <a href="https://wppic.mediaron.com/blocks/wp-plugin-info-card-query-block">WP Plugin Info Card Query block</a>.
* <a href="https://wppic.mediaron.com/blocks/site-plugins-card-grid">Site Plugins Card Grid block</a>.

[CHECK OUT MORE EXAMPLES](https://mediaron.com/wp-plugin-info-card/ "More documentation")

[PREMIUM ADD-ON - WP Envato Affiliate Card](http://b-website.com/wp-envato-affiliate-card-powered-envato-market-api "WP Envato Affiliate Card")

= Languages =

Please <a href="https://translate.wordpress.org/projects/wp-plugins/wp-plugin-info-card">contribute a translation on the plugin translation page</a>.

= GitHub =

Feel free to make pull requests or issues on the <a href="https://github.com/mediaron/wp-plugin-info-card">WP Plugin Info Card GitHub account</a>.


== Installation ==

1. Upload and activate the plugin (or install it through the WP admin console)
2. Click on the "WP Plugin Info Card" sub-menu
3. Follow instructions, every option is documented ;-)

== Frequently Asked Questions ==

= Is the card-flipping effect cross-browser compatible? =

Yes, it is compatible with most recent browsers, except for Opera (but IE10+ works!)

= How do I create my own template? =

This video shows you how:

[youtube https://www.youtube.com/watch?v=hFsVrjQXV_E&t=6s&rel=0]


== Screenshots ==

1. Plugin identity card
2. Admin page
3. Dashboard widget
4. Shortcode builder
5. Shortcode button
6. Another example with a theme (back of the card), a plugin with a custom icon, a plugin without icon (default WorPress logo)
7. Theme with the large layout
8. Plugin with the large layout
9. Plugin with the large layout in the sidebar
10. WordPress layout with a plugin card
11. WordPress layout with themes and 2 columns

== Changelog ==

= 4.0.0 =
* Released 2023-01-20
* New shortcode and block: <a href="https://wppic.mediaron.com/blocks/site-plugins-card-grid">Site Plugins Card Grid</a>.
* The plugin's code and build scripts have been updated to the latest standards.

= 3.4.6 =
* Released 2023-01-07
* Added ability to sort results by active installs, downloads, and last updated in the Query shortcode/block.

= 3.4.2 =
* Released 2023-01-02
* Fixing defaults not being applied correctly for blocks.

= 3.4.1 =
* Released 2022-12-30
* The Plugin Info Card Query block got a bit of a makeover.
* Fixing numerous style and data inconsistencies in the block editor.
* Updating block editor and plugin build scripts. <a href="https://github.com/MediaRon/wp-plugin-info-card">See GitHub</a>.

= 3.3.3 =
* Released 2021-06-04
* Re-worked admin panel options.
* Re-worked primary Gutenberg block.

= 3.1.21 =
* WordPress 5.5 compatibility.

= 3.1.20 =
* Released 2020-01-30
* Improved Gutenberg block loading and edit screens.
* Blocks are full-width by default.
* Added block previews to blocks.
* New multi mode to allow multiple plugin output using one shortcode or one block.
* Added two new color schemes.

= 3.1.16 =
* Released 2019-06-23
* Gutenberg block improvements
* New color scheme (Scheme 12) for Magenta.

= 3.1.15 =
* Released 2019-06-02.
* Added Center as the default layout choice.
* Added layout to the Gutenberg layout settings upon load.
* Code cleanup and fixes.

= 3.1.12 =
* Released 2019-05-24
* Documentation updates.
* New scheme - Dark mode

= 3.1.11 =
* Released 2019-05-21
* Fixing card styles not showing properly.

= 3.1.10 =
* Released 2019-05-21
* Documentation Update

= 3.1.9 =
* Released 2019-05-17
* Gutenberg fixes and enhancements
* New FLEX layout option in Gutenberg and the shortcodes

= 3.1.5 =
* Released 2019-05-15
* Adding loading animation to Gutenberg blocks
* Fixed theme download count from active installs to downloads

= 3.1.1 =
* Released 2019-05-13
* Fixed float on one column query layouts

= 3.1.0 =
* Released 2019-05-13
* Added Query Selector Gutenberg block
* Removing Custom from Gutenberg blocks as it makes no sense from a block perspective
* Fixing PHP error in query Selector
* Adding Reset button to Gutenberg blocks so you can change your settings

= 3.0.1 =
* Released 2019-03-18
* Fixing PHP notices and showing theme download count in dashboard widget.

= 3.0.0 =
* Released 2019-03-17
* Fixed downloaded being blank (changed to active installs)
* Added Gutenberg block

= 2.5.2 - 03/14/2019 =
* Tested on WP 5.1 with success!
* Tested on WP 4.7.3 with success!
* Fix broken image URLs after plugins directory update

= 2.5.1 - 11/03/2016 =
* French translation update (thanks to @wolforg)
* Change text-domain to take advantage of language packs translate.wordpress.org

= 2.5 - 08/19/2016 =
* New: Add "WordPress" layouts for plugins and themes
* New: Add the ability to use custom queries to retrieve plugins & themes by tags, author, etc. (new shortcode: wp-pic-query)
* New: The new shortcode wp-pic-query is able to output items in a grid system (1, 2 or 3 cols).
* New: use wppic_api_query hook to perform query customization
* New: use wppic_query_content to filter what wp-pic-query shortcode returns
* Fix translations + add new string to translations files
* Fix live preview URL for themes
* Fix typo on themes layouts
* Fix a warning in the theme large layout
* Improve API parser (store more data from the API). Eg: active installs, description
* Improve CSS
* Improve register_activation_hook and register_uninstall_hook call for better performance
* Enqueue minified CSS (forget in the previous version)
* Update french translation
* Tested on WP 4.6 with success!

= 2.4.3 - 12/14/2015 =
* Fix an issue on options save in the admin page
* Tested on WP 4.4.2 with success!

= 2.4.2 - 12/14/2015 =
* Make the shortcode_atts_wppic_default hook available thanks to the shortcode_atts() third parameter
* Fix a minor CSS bug on the large layout height reported by @posykrat: https://wordpress.org/support/topic/height-100-for-large-display
* Best compliance with WordPress coding standards
* New WPPIC_VERSION constant. Will ease improving refresh browser caching after plugin updates (mainly on CSS and JS files)...

= 2.4.1 - 10/09/2015 =
* Replace jQuery live() function by on() function to prevent JS error (fix an issue with Visual composer)

= 2.4 - 08/25/2015 =
* Tested on WP 4.3 with success!

= 2.3.9 =
* Fix a PHP warning using is_wp_error if plugin or theme slug does not exists
* Fix a JS bug on the preview card when changing the color sheme on the fly
* Minor CSS fix in the admin with WP 4.2 (.card class is now used by the core in admin)
* Tested on WP 4.2 with success!
* readme.txt update

= 2.3.8 =
* Serbo-Croatian translation by Andrijana Nikolic from [Web Hosting Geeks](http://webhostinggeeks.com/ "Web Hosting Geeks")
* Targeting user appreciation links to 5 stars :)
* Replace the credit's link target with the plugin's documentation english page

= 2.3.7 =
* French translation updated
* New option added to ask for displaying the credit on cards.
* Security issue fix thanks to [Julio Potier](https://profiles.wordpress.org/juliobox "Julio Potier") :)


= 2.3.6 =
* Minor CSS fix - max-with 100% for large layout image
* Use PNG icon as SVG fallback on the visual editor button

= 2.3.5 =
* Change "Download" into "More info" on card layout
* Translations update

= 2.3.4 =
* Deutsch translation by [Christian Zumbrunnen](https://profiles.wordpress.org/chzumbrunnen "Christian Zumbrunnen")

= 2.3.3 =
* Minor security improvements
* Minor CSS fix on dashboard widget
* Purge transients on plugin activation/updates

= 2.3.2 =
* Fix date format on dashboard widget
* Date internationalization
* Templates update for better date support

= 2.3.1 =
* Minor PHP improvements
* Check if Memcache is loaded to prevent unncessary db request during transients purge
* Template update - differents links added on icons
* Remove logo from meta
* Minor CSS updates

= 2.3 =
* PHP fixes on admin error
* Better performance - options stored in a global var (less db requests)
* Relief of admin page functions (more maintainable)
* FR Translation fixes - backslash issues

= 2.2.1 =
* New hook added
* readme.txt update

= 2.2 =
* Total re-factoring of the plugin core files and structures
* Many hooks added
* CSS updates and fixes
* Translation update
* PHP fixes
* Fixed issue on Widget cache duration (5min)
* Random slug from slugs list (comma-separated)
* Large layout template added
* Color scheme and layout parameters added to WYSIWYG UI
* Custom template layout support
* Better scripts enqueuing (new action)
* New option to force scripts enqueuing
* Tested on WP 4.1 with success!
* New screenshots
* readme.txt update
* Special thanks to [Hugh Lashbrooke](https://profiles.wordpress.org/hlashbrooke "Hugh Lashbrooke") for his help in improving the plugin :)

= 2.1 =
* Many hooks added
* More clean code and template render
* Clear cache button in admin
* CSS updates and fixes
* Translation update
* PHP fixes
* Remove ugly paypal donate button in admin
* Random slug from slugs list (comma-separated)
* Large layout template added

= 2.0.1 =
* SVG logo in admin menu (base64 encoded)
* Improvement of theme & plugin template
* PHP fix
* Square image for themes card
* readme.txt update

= 2.0 =
* Media upload in TinyMCE ui modal for default thumb
* Introduction of card template (beta)
* Theme API added + new template
* Using WordPress native functions to fetch data from API, including icon and banner
* Remove banner + logo parameters
* Many PHP bug fixes
* Js improvement (better ui)
* CSS improvement (better ui)
* Widget improvement fot plugins+theme display
* Set transient default lifetime to 720 (before 10)
* Specifice transient for widget (10 min)
* Translation string added
* Form validation in TinyMCE ui modal
* New admin options for theme API
* readme.txt update

= 1.7 =
* New option for color scheme
* New param for color scheme
* Minor CSS improvements
* 10 new colors schemes/skins

= 1.6.2 =
* Polish translation by [Kuba Mikita](http://www.wpart.pl/ "Kuba Mikita")
* Widget UI translation
* Plugin meta translation

= 1.6.1.1 =
* Logo on plugin directory list
* Remove unnecessary files from trunk

= 1.6.1 =
* New logo
* Minor CSS fixes
* Admin + widget minor updates

= 1.6 =
* New param added to ajaxify the card
* Fix minor php issue
* Improve dashboard widget ajax function.
* New admin option to activate or deactivate ajax on widget
* Minor CSS fixes and improvement
* Now use minify css and scripts un front
* Added error message when slug is wrong or plugin offline
* readme.txt update + admin page documentation update

= 1.5 =
* Shortcode may now be displayed everywhere in the page (content/widget) because JS & CSS are loaded via a global var.
* Ajaxify dashboard widget.
* Fix bug on saving empty plugin list with deactivated dashboard widget
* New param added to specify transient life time
* Daily cron added to purge transients

= 1.04 =
* Fix on foreach. Related topic: https://wordpress.org/support/topic/errors-on-saving-dashboard-widget?replies=5#post-6197891

= 1.03 =
* Fix on widget if plugin list is empty

= 1.02 =
* Typo fix.
* PHP fix if no plugin slug is set during options updates
* CSS fix for transparent logos
* Fix if required version already includes 'WP'
* Now translatable + add French translation
* Update readme.txt

= 1.01 =
* Typo fix.
* Add link to admin page
* Update readme.txt

= 1.0 =
* First release.

== Upgrade Notice ==

= 4.0.0 =
Added new site plugins shortcode and block. The plugin's code and build tools have been updated to the latest standards.