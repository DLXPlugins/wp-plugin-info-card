import metadata from './block.json';
import { ForkIcon } from '../components/GitHubIcons';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( metadata, {
	icon: (
		<ForkIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
