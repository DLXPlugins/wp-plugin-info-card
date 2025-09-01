import metadata from './block.json';
import { ForkIcon } from '../components/GitHubIcons';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

if ( wppic.is_github_info_cards_enabled ) {
	registerBlockType( metadata, {
		icon: (
			<ForkIcon fill="#333" />
		),
		edit,
		save() {
			return null;
		},
	} );
}
