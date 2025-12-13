//  Import CSS.
import edit from './edit';
import BadgesIcon from '../components/WordPressIcon';

import metadata from './block.json';

const { registerBlockType } = wp.blocks;
registerBlockType( metadata, {
	icon: (
		<BadgesIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
