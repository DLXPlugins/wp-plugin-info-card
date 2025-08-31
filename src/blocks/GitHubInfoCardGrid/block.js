import metadata from './block.json';
import { GitHubIcon } from '../components/GitHubIcons';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( metadata, {
	icon: (
		<GitHubIcon fill="#333" />
	),
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/embed' ],
				transform: ( { url, providerNameSlug } ) => {
					// https://github.com/dlxplugins/alertsdlx
					const githubRegex = /https:\/\/github\.com\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/i;
					const githubMatch = githubRegex.exec( url );
					if ( githubMatch ) {
						return createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {},
							[
								createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
									username: githubMatch[ 1 ],
									repo: githubMatch[ 2 ],
									loading: true,
								} ),
							],
						);
					}
					return false;
				},
			},
			{
				type: 'raw',
				isMatch: ( node ) => {
					if ( node.nodeName === 'P' ) {
						// RegEx for detecting plugin slug in WordPress URL.
						const githubRegex = /https:\/\/github\.com\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/i;
						const match = githubRegex.exec( node.textContent );
						if ( match ) {
							return true;
						}
					}
					return false;
				},
				priority: 5,
				transform: ( node ) => {
					const githubRegex = /https:\/\/github\.com\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/i;
					const match = githubRegex.exec( node.textContent );
					if ( match ) {
						return createBlock( 'wp-plugin-info-card/github-info-card-grid', {},
							[
								createBlock( 'wp-plugin-info-card/github-info-card', {
									username: match[ 1 ],
									repo: match[ 2 ],
									loading: true,
								} ),
							],
						);
					}
					return false;
				},
			},
		],
	},
} );
