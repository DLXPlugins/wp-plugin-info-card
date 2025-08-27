import metadata from './block.json';
import { GitHubIcon } from '../components/GitHubIcons';
import { InnerBlocks } from '@wordpress/block-editor';

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
} );
