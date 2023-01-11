import metadata from './block.json';
import InfoCardIcon from '../components/InfoCardIcon';

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
} );
