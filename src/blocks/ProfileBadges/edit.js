// @ts-nocheck
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { useState, useEffect, Fragment, useCallback } from 'react';

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

const ProfileHighlightsAuthorAvatar = ( props ) => {
	const { attributes, setAttributes } = props;

	const generatedUniqueId = useInstanceId( ProfileHighlightsAuthorAvatar, 'wp-plugin-info-card-query' );

	const {
		preview,
		align,
		layout,
		cols,
		marginSpacing,
		marginSpacingTarget,
	} = attributes;

	const block = (
		<>
			<OrgProfile
				attributes={ attributes }
				setAttributes={ setAttributes }
				Preview={ Preview }
			/>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames(
			`wppic-badges-grid align${ align } layout-${ layout } is-grid cols-${ cols } wppic-margin-spacing-${ marginSpacing } wppic-margin-spacing-target-${ marginSpacingTarget }`,
		),
	} );

	if ( preview ) {
		return (
			<>
				<img
					src={ wppic.query_preview }
					style={ { width: '100%', height: 'auto' } }
				/>
			</>
		);
	}

	return (
		<div { ...blockProps } id={ attributes.uniqueId }>
			{ block }
		</div>
	);
};

export default ProfileHighlightsAuthorAvatar;
