//  Import CSS.
import edit from './edit';
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
