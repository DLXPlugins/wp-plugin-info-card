//  Import CSS.
import edit from './edit-query';
import InfoCardIcon from '../components/InfoCardIcon';

import metadata from './block.json';

const { registerBlockType } = wp.blocks;
registerBlockType( metadata, {
	icon: (
		<InfoCardIcon fill="#DB3939" />
	),
	edit,
	save() {
		return null;
	},
} );
