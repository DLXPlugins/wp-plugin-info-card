//  Import CSS.
import edit from './edit';
import AvatarIcon from '../components/AvatarIcon';

import metadata from './block.json';

const { registerBlockType } = wp.blocks;
registerBlockType( metadata, {
	icon: (
		<AvatarIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
