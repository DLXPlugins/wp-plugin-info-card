import metadata from './block.json';
import DownloadIcon from '../components/DownloadIcon';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks;

registerBlockType( metadata, {
	icon: (
		<DownloadIcon fill="#333" />
	),
	edit,
	save() {
		return null;
	},
} );
