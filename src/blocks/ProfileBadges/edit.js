// @ts-nocheck
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { useState, useEffect, Fragment, useCallback, useContext } from 'react';

import {
	PanelBody,
	SelectControl,
	Spinner,
	TextControl,
	Button,
	ToggleControl,
	Notice,
	TabPanel,
	PanelRow,
	ToolbarItem,
	DropdownMenu,
	MenuItemsChoice,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import { debounce, useInstanceId } from '@wordpress/compose';

import {
	InspectorControls,
	BlockControls,
	MediaUpload,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';

import Logo from '../Logo';
import { Radio } from 'lucide-react';
import NumbersComponent from '../components/Numbers';
import { set, uniqueId } from 'lodash';
import OrgProfile from '../components/OrgProfile';
import Preview from './preview';
import ProfileBadgesContext from '../contexts/ProfileBadges';
import BadgeSelectionModal from '../components/BadgeSelectionModal';

const ProfileBadges = ( props ) => {
	const { attributes, setAttributes } = props;
	const { isEditing, setIsEditing, isRefreshing, setIsRefreshing } = useContext( ProfileBadgesContext );
	const {
		preview,
		align,
		type,
		layout,
		cols,
		badges,
	} = attributes;

	const [ showBadgeModal, setShowBadgeModal ] = useState( false );

	// Ensure badges is an array.
	const currentBadges = badges || [];

	const hasBadges = currentBadges && currentBadges.length > 0;

	const getBlock = () => {
		if ( type === 'dynamic' && ! preview ) {
			return <OrgProfile attributes={ attributes } setAttributes={ setAttributes } Preview={ Preview } isEditing={ isEditing } setIsEditing={ setIsEditing } isRefreshing={ isRefreshing } />;
		}
		return (
			<>
				{ hasBadges && (
					<>
						<Preview
							attributes={ attributes }
							setAttributes={ setAttributes }
							onEdit={ () => setShowBadgeModal( true ) }
							onRefresh={ () => setIsRefreshing( true ) }
						/>
					</>
				) }
				{ ! hasBadges && (
					<>
						<div className="wppic-query-block wppic-query-block-panel">
							<div className="wppic-block-svg">
								<Logo size="75" />
							</div>
							<div className="wppic-badges-grid-empty">
								<div className="wp-pic-gutenberg-button">
									<Button
										iconSize={ 20 }
										icon={ <Logo size="25" /> }
										isSecondary
										id="wppic-input-submit"
										onClick={ () => {
											setShowBadgeModal( true );
										} }
									>
										{ __(
											'Add Badges',
											'wp-plugin-info-card',
										) }
									</Button>
								</div>
							</div>
						</div>
						<InspectorControls>
							<></>
						</InspectorControls>
						<InspectorControls group="styles">
							<></>
						</InspectorControls>
					</>
				) }
				<BadgeSelectionModal
					isOpen={ showBadgeModal }
					onClose={ () => setShowBadgeModal( false ) }
					badges={ currentBadges }
					setAttributes={ setAttributes }
				/>
			</>
		);
	};

	const block = getBlock();

	const blockProps = useBlockProps( {
		className: classnames(
			`wppic-badges-grid`,
			{
				[ `align${ align }` ]: ! isEditing,
				[ `layout-${ layout }` ]: ! isEditing,
				'is-grid': ! isEditing,
				[ `cols-${ cols }` ]: ! isEditing,
				'has-no-title': attributes.hideHeading,
				'is-editing': isEditing || ( type === 'dynamic' && '' === attributes.authorSlug ) || ( type === 'static' && ! hasBadges ),
			},
		),
	} );

	return (
		<div { ...blockProps } id={ attributes.uniqueId }>
			{ block }
		</div>
	);
};

export default ProfileBadges;
