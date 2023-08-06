import metadata from './block.json';
import InfoCardIcon from '../components/InfoCardIcon';
import { registerBlockType, createBlock } from '@wordpress/blocks';

//  Import main block file.
import edit from './edit';

registerBlockType( metadata, {
	icon: <InfoCardIcon fill="#333" />,
	edit,
	save() {
		return null;
	},
	transforms: {
		from: [
			{
				type: 'raw',
				isMatch: ( node ) => {
					if ( node.nodeName === 'P' ) {
						// RegEx for detecting plugin slug in WordPress URL.
						const regex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
						const match = regex.exec( node.textContent );
						if ( match ) {
							return true;
						}
					}
					return false;
				},
				priority: 5,
				transform: ( node ) => {
					// Extract slug from URL.
					const regex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
					const match = regex.exec( node.textContent );
					const slugMatch = match[ 1 ];
					return createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
						slug: slugMatch,
						type: 'plugin',
						layout: 'large',
						sheme: 'scheme11',
						loading: false,
						defaultsApplied: true,
					} );
				},
			},
		],
	},
} );
