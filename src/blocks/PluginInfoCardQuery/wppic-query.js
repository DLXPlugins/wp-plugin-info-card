//  Import CSS.
import edit from './edit-query';
import GearIcon from '../components/GearIcon';

import metadata from './block.json';

const { registerBlockType } = wp.blocks;
registerBlockType( metadata, {
	icon: (
		<GearIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
