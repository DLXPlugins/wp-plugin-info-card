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

import PluginFlex from '../templates/PluginFlex';
import PluginCard from '../templates/PluginCard';
import PluginLarge from '../templates/PluginLarge';
import PluginWordPress from '../templates/PluginWordPress';
import ThemeFlex from '../templates/ThemeFlex';
import ThemeWordPress from '../templates/ThemeWordPress';
import ThemeLarge from '../templates/ThemeLarge';
import ThemeCard from '../templates/ThemeCard';
import PluginRatingsCard from '../templates/PluginRatingsCard';
import ThemeRatingsCard from '../templates/ThemeRatingsCard';
import Logo from '../Logo';
import { Radio } from 'lucide-react';
import NumbersComponent from '../components/Numbers';
import { set, uniqueId } from 'lodash';

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
		avatarId,
		preview,
		authorId,
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

	if ( cardLoading ) {
		return (
			<>
				<div className="wppic-loading-placeholder">
					<div className="wppic-loading">
						<Logo size="45" />
						<br />
						<div className="wppic-spinner">
							<Spinner />
						</div>
					</div>
				</div>
			</>
		) }
	}

	const block = (
		<>
			<>
				{ ( '' === authorSlug && ! cardLoading ) && (
					<div className="wppic-query-block wppic-query-block-panel">
						<div className="wppic-block-svg">
							<Logo size="75" />
						</div>
						<TextControl
							label={ __(
								'Enter a WordPress.org Username Slug',
								'wp-plugin-info-card',
							) }
							value={ authorSlugSearchValue }
							onChange={ ( value ) => {
								setAuthorSlugSearchValue( value );
							} }
							placeholder={ __( 'Enter a .org username…', 'wp-plugin-info-card' ) }
						/>
						<div className="wp-pic-gutenberg-button">
							<Button
								iconSize={ 20 }
								icon={ <Logo size="25" /> }
								isSecondary
								id="wppic-input-submit"
								onClick={ ( event ) => {
									setCardLoading( true );
									loadProfileData();
								} }
							>
								{ __(
									'Get Author Information',
									'wp-plugin-info-card',
								) }
							</Button>
						</div>
					</div>
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
