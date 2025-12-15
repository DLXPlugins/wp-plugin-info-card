//  Import CSS.
import { useState } from '@wordpress/element';
import Edit from './edit';
import BadgesIcon from '../components/WordPressIcon';
import ProfileBadgesContext from '../contexts/ProfileBadges';

import metadata from './block.json';

const EditComponent = ( props ) => {
	const [ isEditing, setIsEditing ] = useState( false );

	return (
		<ProfileBadgesContext.Provider value={ { isEditing, setIsEditing } }>
			<Edit { ...props } />
		</ProfileBadgesContext.Provider>
	);
};

const { registerBlockType } = wp.blocks;
registerBlockType( metadata, {
	icon: (
		<BadgesIcon fill="#333" />
	),
	edit: EditComponent,
	save() {
		return null;
	},
} );
