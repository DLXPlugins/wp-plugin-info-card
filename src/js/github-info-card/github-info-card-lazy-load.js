'use strict';
/**
 * Lazy load and queue the GitHub info card.
 *
 * @since 1.2.0
 */
import apiFetch from '@wordpress/api-fetch';
import { safeDecodeURIComponent, isURL, removeQueryArgs } from '@wordpress/url';
import lozad from 'lozad';

( () => {
	const DEFAULTS = {
		selector: '[data-is-github-card-loading="true"]',
		endpoint: '/wp-json/wppic/v2/get_github_card_html',
	};
	const ready = ( fn ) => {
		if ( document.readyState === 'loading' ) {
			document.addEventListener( 'DOMContentLoaded', fn, { once: true } );
		} else {
			fn();
		}
	};

	// Global state.
	let cards = [];
	let initialized = false;
	let observer = null;

	const fetchCard = async ( element ) => {
		const data = {
			username: safeDecodeURIComponent( element.dataset.username ),
			repo: safeDecodeURIComponent( element.dataset.repo ),
			nonce: safeDecodeURIComponent( element.dataset.nonce ),
			cardAttributes: wppicGithubInfoCardLazyLoad.cardAttributes[ element.dataset.username + '_' + element.dataset.repo ], /* todo: harden */
		};
		const response = await apiFetch( {
			url: DEFAULTS.endpoint,
			parse: true,
			headers: {
				'X-WP-Nonce': wppicGithubInfoCardLazyLoad.restNonce,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify( data ),
		} );
		console.log( 'response', response );
		// Replace element with response.html.
		// Create element from new html.
		const newElement = document.createElement( 'div' );
		newElement.innerHTML = response.html;
		element.replaceWith( newElement );
		return response.html;
	};

	const init = () => {
		if ( initialized ) {
			return;
		}
		const maybeCards = document.querySelectorAll( DEFAULTS.selector );
		if ( maybeCards.length === 0 ) {
			return;
		}
		cards = Array.from( maybeCards );
		if ( cards.length > 0 && ! initialized ) {
			initialized = true;
		}
		
		console.log( 'init', maybeCards );
		initialized = true;
		observer = lozad( maybeCards, {
			load: ( element ) => {
				console.log( 'load', element );
				fetchCard( element );
			},
		} );
		observer.observe();
	};

	ready( init );
} )();
