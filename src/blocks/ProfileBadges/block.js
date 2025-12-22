//  Import CSS.
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import BadgesIcon from '../components/BadgesIcon';
import BadgesIcon2 from '../components/BadgesIcon2';
import ProfileBadgesContext from '../contexts/ProfileBadges';

import metadata from './block.json';

const EditComponent = ( props ) => {
	const [ isEditing, setIsEditing ] = useState( false );
	const [ isRefreshing, setIsRefreshing ] = useState( false );

	return (
		<ProfileBadgesContext.Provider value={ { isEditing, setIsEditing, isRefreshing, setIsRefreshing } }>
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
	variations: [
		{
			name: 'wp-plugin-info-card/profile-highlights-badges-dynamic',
			title: __( 'Profile Badges - Dynamic', 'wp-plugin-info-card' ),
			description: __( 'Display your WordPress.org badges in a grid format for a specific author slug. This updates automatically every few weeks.', 'wp-plugin-info-card' ),
			icon: <BadgesIcon2 fill="#333" />,
			attributes: {
				type: 'dynamic',
				badges: [],
				authorSlug: '',
				lastUpdated: '',
			},
			isActive: ( attributes ) => {
				return attributes.type === 'dynamic' && attributes.authorSlug !== '';
			},
			keywords: [ __( 'Profile Badges', 'wp-plugin-info-card' ), __( 'Dynamic', 'wp-plugin-info-card' ), __( 'Author Slug', 'wp-plugin-info-card' ), __( 'Badges', 'wp-plugin-info-card' ) ],
			scope: [ 'inserter' ],
			isDefault: false,
		},
	],
} );

/*
{
    "uniqueId": "wp-plugin-info-card-badges-1",
    "authorSlug": "ronalfy",
    "type": "dynamic",
    "anchor": "",
    "align": "center",
    "preview": false,
    "baseSize": 16,
    "badges": [
        "badge-code",
        "badge-meta-contributor",
        "badge-plugins",
        "badge-translation-contributor",
        "badge-translation-editor",
        "badge-speaker"
    ],
    "lastUpdated": "1766379590717",
    "colGap": 20,
    "rowGap": 20,
    "cols": 2,
    "layout": "centered",
    "hideHeading": false,
    "headingColor": "#000000",
    "gbBlockCondition": "",
    "gbBlockConditionInvert": false
}
	*/
