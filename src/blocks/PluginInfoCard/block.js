import metadata from './block.json';
import InfoCardIcon from '../components/InfoCardIcon';

import { createBlock } from '@wordpress/blocks';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( metadata, {
	icon: (
		<InfoCardIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/embed' ],
				transform: ( { url, providerNameSlug}) => {
					const pluginRegex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
					const themeRegex = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
					const match = pluginRegex.exec( url );
					if ( match ) {
						return createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
							slug: match[ 1 ],
							type: 'plugin',
							loading: false,
							defaultsApplied: false,
						} );
					}
					const themeMatch = themeRegex.exec( url );
					if ( themeMatch ) {
						return createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
							slug: themeMatch[ 1 ],
							type: 'theme',
							loading: false,
							defaultsApplied: false,
						} );
					}
				}
			},
			{
				type: 'raw',
				isMatch: ( node ) => {
					if ( node.nodeName === 'P' ) {
						// RegEx for detecting plugin slug in WordPress URL.
						const regex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
						const themeRegex = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
						const match = regex.exec( node.textContent );
						const themeMatch = themeRegex.exec( node.textContent  );
						if ( match || themeMatch ) {
							return true;
						}
					}
					return false;
				},
				priority: 5,
				transform: ( node ) => {
					// Extract slug from URL.
					const regex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
					const themeRegex = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
					const match = regex.exec( node.textContent );
					const themeMatch = themeRegex.exec( node.textContent  );
					let slugMatch = '';
					if ( match ) {
						slugMatch = match[ 1 ];
					}
					if ( themeMatch ) {
						slugMatch = themeMatch[ 1 ];
					}
					return createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
						slug: slugMatch,
						type: match ? 'plugin' : 'theme',
						loading: false,
						defaultsApplied: false,
					} );
				},
			},
		],
	},
} );
