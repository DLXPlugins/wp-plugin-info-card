import metadata from './block.json';
import InfoCardIcon from '../components/InfoCardIcon';

import { useState, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { doAction, addAction } from '@wordpress/hooks';
import { Modal } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useDispatch, store } from '@wordpress/data';
import ImportPluginRestUrl from '../../react/views/custom-plugin/screens/import-plugin-rest-url';

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
				transform: ( { url, providerNameSlug } ) => {
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
				},
			},
			{
				type: 'block',
				blocks: [ 'wp-plugin-info-card/plugin-screenshots-info-card' ],
				transform: ( { slug, assetData } ) => {
					// Convert from object to array.
					return createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
						slug,
						type: 'plugin',
						loading: true,
						defaultsApplied: false,
					} );
				},
			},
			{
				type: 'raw',
				isMatch: ( node ) => {
					if ( node.nodeName === 'P' ) {
						// RegEx for detecting plugin slug in WordPress URL.
						const regex = /\/wp-json\/wppic\/v1\/plugins\/([a-z0-9-]+)\/[a-z0-9]+\/?/i;
						const match = regex.exec( node.textContent );
						if ( match ) {
							return true;
						}
						return false;
					}
					return false;
				},
				priority: 5,
				transform: ( node ) => {
					// Extract slug from URL.
					const regex = /\/wp-json\/wppic\/v1\/plugins\/([a-z0-9-]+)\/[a-z0-9]+\/?/i;
					const match = regex.exec( node.textContent );
					let slugMatch = '';
					if ( match ) {
						slugMatch = match[ 1 ];
					}
					if ( wppic.can_edit_others_posts ) {
						doAction( 'wppic-import-plugin-modal-show', {
							slug: slugMatch,
							restApiUrl: node.textContent,
						} );
					}
					return null;
				},
			},
			{
				type: 'raw',
				isMatch: ( node ) => {
					if ( node.nodeName === 'P' ) {
						// RegEx for detecting plugin slug in WordPress URL.
						const regex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
						const themeRegex = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
						const match = regex.exec( node.textContent );
						const themeMatch = themeRegex.exec( node.textContent );
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
					const themeMatch = themeRegex.exec( node.textContent );
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
		to: [
			{
				type: 'block',
				blocks: [ 'wp-plugin-info-card/plugin-screenshots-info-card' ],
				transform: ( { slug, assetData } ) => {
					return createBlock( 'wp-plugin-info-card/plugin-screenshots-info-card', {
						slug,
						skipAnimatedGifs: true,
						loading: true,
					} );
				},
			},
		],
	},
} );

/**
 * Show a plugin import modal when a REST API URL is detected.
 */
registerPlugin( 'wppic-import-plugin-modal', {
	render: () => {
		const [ showModal, setShowModal ] = useState( false );
		const [ hasInserted, setHasInserted ] = useState( false );

		const { insertBlocks } = useDispatch( store )( 'core/block-editor' );

		useEffect( () => {
			addAction( 'wppic-import-plugin-modal-show', 'wppic', ( { slug, restApiUrl } ) => {
				setShowModal( {
					slug,
					restApiUrl,
				} );
			} );
		}, [ showModal ] );

		// If more than one block is selected, add toolbar option to replace the Unique ID.
		return (
			<>
				{ showModal && (
					<Modal
						title="Import Plugin"
						onRequestClose={ () => {
							setShowModal( false );
							setHasInserted( true );
						} }
					>
						<ImportPluginRestUrl
							slug={ showModal.slug }
							restApiUrl={ showModal.restApiUrl }
							onClose={ () => {
								const block = createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
									slug: showModal.slug,
									type: 'plugin',
									loading: false,
									defaultsApplied: false,
								} );
								setHasInserted( true );
								setShowModal( false );
								// Insert the block at the cursor position.
								insertBlocks( block );
							} }
						/>
					</Modal>
				) }
			</>
		);
	},
} );
