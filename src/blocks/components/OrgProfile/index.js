import { useState } from 'react';
import axios from 'axios';
import {
	TextControl,
	Button,
	Spinner,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { cleanForSlug } from '@wordpress/url';
import classnames from 'classnames';
import Logo from '../../Logo';
import Notice from '../../components/Notice';
import Loading from '../../components/Loading';


const OrgProfile = ( props ) => {
	const { attributes, setAttributes, Preview } = props;
	const [ authorSlugSearchValue, setAuthorSlugSearchValue ] = useState( attributes.authorSlug );
	const [ authorError, setAuthorError ] = useState( false );
	const [ authorErrorMessage, setAuthorErrorMessage ] = useState( '' );
	const [ cardLoading, setCardLoading ] = useState( false );
	const [ isEditing, setIsEditing ] = useState( false );

	const loadProfileData = async ( authorSlug ) => {
		setCardLoading( true );
		const restUrl = wppic.rest_url + 'wppic/v2/get_profile_data';
		axios
			.get(
				restUrl + `?author=${ authorSlug }`,
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
						member_website,
						member_badges,
					} = data;
					setAuthorSlugSearchValue( authorSlug );
					setAttributes( {
						authorSlug,
						badges: member_badges,
						lastUpdated: new Date().getTime().toString(),
					} );
				} else {
					setAuthorErrorMessage( data.message );
					setAuthorError( true );
				}
			} ).then( () => {
				setCardLoading( false );
			} );
	};

	// Show loading if loading.
	if ( cardLoading ) {
		return (
			<Loading />
		);
	}

	// If we have an authorSlug and lastUpdated isn't empty, show the preview.
	if ( authorSlugSearchValue && attributes.lastUpdated && ! isEditing ) {
		return (
			<>
				<Preview
					attributes={ attributes }
					setAttributes={ setAttributes }
					onEdit={ () => {
						setIsEditing( true );
					} }
					onRefresh={ () => {
						loadProfileData( attributes.authorSlug );
					} }
				/>
			</>
		);
	}

	const block = (
		<>
			<>
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
							setAuthorError( false );
							setAuthorSlugSearchValue( value );
						} }
						name={ 'searchOrgUsername' }
						className={
							classnames( 'wppic-input', {
								'wppic-input-error': authorError,
							} )
						}
						placeholder={ __( 'Enter a .org username…', 'wp-plugin-info-card' ) }
					/>
					{ authorError && (
						<Notice
							status="error"
							isDismissible={ false }
							className="wppic-error-notice"
						>
							{ authorErrorMessage }
						</Notice>
					) }
					<div className="wp-pic-gutenberg-button">
						<Button
							iconSize={ 20 }
							icon={ <Logo size="25" /> }
							isSecondary
							id="wppic-input-submit"
							onClick={ ( event ) => {
								// Error out if author slug is empty.
								if ( '' === authorSlugSearchValue ) {
									setAuthorError( true );
									setAuthorErrorMessage( __( 'Please enter a username.', 'wp-plugin-info-card' ) );
									setCardLoading( false );
									return;
								}
								setIsEditing( false );
								loadProfileData( cleanForSlug( authorSlugSearchValue ) );
							} }
						>
							{ __(
								'Get Author Information',
								'wp-plugin-info-card',
							) }
						</Button>
					</div>
				</div>
			</>
		</>
	);
	return (
		<>
			{ block }
		</>
	);
};

export default OrgProfile;
