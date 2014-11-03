=== WP Plugin Info Card ===
Contributors: Brice CAPOBIANCO
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7Z6YVM63739Y8
Tags: API, plugin, card, blog, developper, design, dashboard, shortcode
Requires at least: 3.7
Tested up to: 4.0
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

 
WP Plugin Info Card displays plugins identity cards in a beautiful box with a smooth rotation effect using WP Plugin API. Dashboard widget included.

== Description ==

= How does it work? =

WP Plugin Info Card allows you to display plugins identity cards in a beautiful box with a smooth 3D rotation effect.

It uses Wordpress.org plugin API to fetch data. All you need to do is provide a valid plugin ID (slug name), and then insert the shortcode in any page to make it work at once!

This plugin is very light and includes scripts and CSS only if and when required. It also uses Wordpress transients to store data returned by the API for 10 minutes, so your page loading time will not be increased due to too many requests.

The dashboard widget is very easy to set up: you simply add as many plugins as you want in the admin page and they become visible in your dashboard. Fields are added on-the-fly and are sortable via drag-and-drop.

[CHECK OUT THE DEMO](http://b-website.com/wp-plugin-info-card-for-wordpress "Try It!")

Please ask for help or report bugs if anything goes wrong. It is the best way to make the community benefit !


= Shortcode parameters =

* slug: plugin slug name
* image: image url to replace WP logo (default: empty)
* logo: 128x128.jpg, 256x256.jpg, 128x128.png, 256x256.png, svg, no (default: svg)
* banner: jpg, png, no (default:empty)
* align: center, left, right (default: empty)
* containerid: custom div id, may be used for anchor (default: wp-pic-PLUGIN-NAME)
* margin: custom container margin - eg: "15px 0" (default: empty)
* clear: clear float before or after the card: before, after (default: empty)
* custom: value to output : url, name, version, author, requires, rating, num_ratings, downloaded, last_updated, download_link (default: empty)
 

= Basic example =

The slug is the only required parameter.
`[wp-pic slug="wordpress-seo"]`


= Advanced examples =

If the plugin has a wordpress logo (new feature on wp), you may specify its extension (jpg, png or svg) and whether it is a JPG or PNG file, its dimensions (128x128 or 256x256). If not, set "logo" to "no" to avoid a 404 error in the console log (see explanation below).
`[wp-pic slug="theme-check" logo="128x128.png" align="right" banner="jpg"]`

You may provide a custom image URL for the front rounded image (175px X 175px), it will supplant the "logo" parameter if specified. If you know the banner extension (image displaying on the top of the plugin page), you may provide it to avoid a 404 error in the console log (see explanation below).
`[wp-pic slug="wordpress-seo" image="http//www.mywebsite/custom-image.jpg" align="right" margin="0 0 0 20px" banner="png" containerid="download-sexion"]`

The custom parameter supplants the others (except the "slug") and only returns the value you required.
`[wp-pic slug="wordpress-seo" custom="downloaded"]`


= Known issues =

WordPress.org does not currently include a banner nor plugin logo in the API. As explained in the Developper Center, banners are located in the assets folder of the plugin repository (allowed format are JPG or PNG) and they are named banner-772x250.

It would be nice to test if banner-772x250.jpg or banner-772x250.png exists, but WordPress does not accept HTTP request to their servers, so requests are blocked due to Cross-Origin restriction. It is the same issue for the plugin SVG, JPG or PNG logo.

The workaround is to use CSS backgound fallback, but it gives a 404 server response. To avoid those errors, please specify the "logo" and "banner" parameters. In any case, 404 is not really an "error", but a simple server response.

== Installation ==

1. Upload and activate the plugin (or install it through the WP admin console)
2. Click on the "WP Plugin Info" menu
3. Follow instructions, every option is documented ;-)

== Frequently Asked Questions ==

= Is it cross-browser compatible? =

Yes, it is compatible with most recent browsers, except for Opera (but IE10+ works!)


== Screenshots ==

1. Plugin identity card
2. Admin page
3. Dashboard widget


== Changelog ==

= 1.0 =
* First release.

== Upgrade Notice ==

= 1.0 =
* First release.
