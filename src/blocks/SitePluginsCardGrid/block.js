import metadata from './block.json';
import GridIcon from '../components/GridIcon';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks;

registerBlockType( metadata, {
	icon: (
		<GridIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
