'use strict';
/**
 * Lazy load and queue the profile badges.
 *
 * @since 5.0.0
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import lozad from 'lozad';

( () => {
	const DEFAULTS = {
		selector: '[data-is-loading="true"]',
		endpoint: wppicProfileBadgesLazyLoad.restUrl,
	};
	const ready = ( fn ) => {
		if ( document.readyState === 'loading' ) {
			document.addEventListener( 'DOMContentLoaded', fn, { once: true } );
		} else {
			fn();
		}
	};

	// Global state.
	let badges = [];
	let initialized = false;
	let observer = null;

	const fetchBadges = async ( element ) => {
		const authorSlug = element.dataset.authorSlug;
		const token = element.dataset.token;
		const data = {
			authorSlug: authorSlug,
			token: token,
		};
		try {
			const response = await apiFetch( {
				url: DEFAULTS.endpoint,
				parse: true,
				headers: {
					'X-WP-Nonce': wppicProfileBadgesLazyLoad.restNonce,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify( data ),
			} );
			if ( ! response.html ) {
				const errorElement = document.createElement( 'div' );
				errorElement.className = 'wppic-profile-badges-error';
				errorElement.innerHTML = __( 'Profile badges could not be loaded.', 'wp-plugin-info-card' );
				element.replaceWith( errorElement );
				return;
			}
			// Replace the entire skeleton div with the badge HTML.
			// The wrapper (with styles, classes, etc.) remains intact.
			element.outerHTML = response.html;
			return response.html;
		} catch ( error ) {
			const errorElement = document.createElement( 'div' );
			errorElement.className = 'wppic-profile-badges-error';
			errorElement.innerHTML = __( 'Profile badges could not be loaded.', 'wp-plugin-info-card' );
			element.replaceWith( errorElement );
		}
	};

	const init = () => {
		if ( initialized ) {
			return;
		}
		const maybeBadges = document.querySelectorAll( DEFAULTS.selector );
		if ( maybeBadges.length === 0 ) {
			return;
		}
		badges = Array.from( maybeBadges );
		if ( badges.length > 0 && ! initialized ) {
			initialized = true;
		}
		initialized = true;
		observer = lozad( maybeBadges, {
			load: ( element ) => {
				fetchBadges( element );
			},
		} );
		observer.observe();
	};

	ready( init );
} )();

