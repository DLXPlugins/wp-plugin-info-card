import metadata from './block.json';
import CustomInfoCardIcon from '../components/CustomInfoCardIcon';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( metadata, {
	icon: (
		<CustomInfoCardIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
