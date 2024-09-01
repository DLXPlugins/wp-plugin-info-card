// @ts-nocheck
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { __ } = wp.i18n;

const { useState, useEffect, Fragment, useCallback } = wp.element;

const {
	PanelBody,
	SelectControl,
	Spinner,
	TextControl,
	Button,
	ToolbarGroup,
	ToggleControl,
	Notice,
	TabPanel,
	PanelRow,
	ToolbarItem,
	DropdownMenu,
	MenuItemsChoice,
} = wp.components;

import { debounce, useInstanceId } from '@wordpress/compose';

const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	useBlockProps,
} = wp.blockEditor;

import Logo from '../Logo';
import { Radio } from 'lucide-react';
import NumbersComponent from '../components/Numbers';
import { set, uniqueId } from 'lodash';
import OrgProfile from '../components/OrgProfile';

const ProfileHighlightsAuthorAvatar = ( props ) => {
	const { attributes, setAttributes } = props;

	const generatedUniqueId = useInstanceId( ProfileHighlightsAuthorAvatar, 'wp-plugin-info-card-query' );

	const [ loading, setLoading ] = useState( false );
	const [ cardLoading, setCardLoading ] = useState( false );
	const [ noData, setNoData ] = useState( false );
	const [ authorSlugSearchValue, setAuthorSlugSearchValue ] = useState( '' );
	const [ authorError, setAuthorError ] = useState( false );


	const {
		authorSlug,
		avatarUrl,
		preview,
		authorName,
		authorWebsite,
		showAvatar,
		showName,
		showWebsite,
	} = attributes;

	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] ); 

	const loadProfileData = () => {
		setLoading( false );
		setCardLoading( true );
		setNoData( false );
		const restUrl = wppic.rest_url + 'wppic/v2/get_profile_data';
		axios
			.get(
				restUrl + `?author=${ authorSlugSearchValue }`,
				{
					headers: {
						'X-WP-Nonce': wppic.rest_nonce,
					},
				},
			)
			.then( ( response ) => {
				const { success, data } = response.data;
				if ( success ) {
					const {
						author_name,
						author_avatar,
						member_website
					} = data;
					setAttributes( {
						authorSlug: authorSlugSearchValue,
						avatarUrl: author_avatar,
						authorWebsite: member_website,
						authorName: author_name,
					} );
				} else {
					setAuthorError( true );
					setNoData( true );
				}
			} ).then( () => {
				setCardLoading( false );
			} );
	};

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Query Options', 'wp-plugin-info-card' ) }
			>
				test
			</PanelBody>
			<PanelBody
				title={ __( 'WP Plugin Info Card', 'wp-plugin-info-card' ) }
			>
				test
			</PanelBody>
		</InspectorControls>
	);

	const block = (
		<>
			<>
				{ ( '' === authorSlug ) && (
					<>
						<OrgProfile
							profileLoaded={ ( slug, data ) => {
								console.log( data );
								const {
									author_name,
									author_avatar,
									member_website
								} = data;
								setAttributes( {
									authorSlug: slug,
									avatarUrl: author_avatar,
									authorWebsite: member_website,
									authorName: author_name,
								} );
							} }
						/>
					</>
				) }
				{ ( authorSlug ) && (
					<>
						<div className="wppic-author-avatar">
							<img
								src={ avatarUrl }
								alt={ authorName }
							/>
						</div>
					</>
				) }
			</>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames( `profile-highlights-author-avatar` ),
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
