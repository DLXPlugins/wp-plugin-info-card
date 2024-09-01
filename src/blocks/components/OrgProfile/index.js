import { useState } from 'react';
import axios from 'axios';
import {
	TextControl,
	Button,
	Spinner,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import Logo from '../../Logo';
import Notice from '../../components/Notice';


const OrgProfile = ( props ) => {
	const [ authorSlugSearchValue, setAuthorSlugSearchValue ] = useState( '' );
	const [ authorError, setAuthorError ] = useState( false );
	const [ authorErrorMessage, setAuthorErrorMessage ] = useState( '' );
	const [ cardLoading, setCardLoading ] = useState( false );

	const loadProfileData = async ( authorSlug ) => {
		// Error out if author slug is empty.
		if ( '' === authorSlug ) {
			setAuthorError( true );
			setAuthorErrorMessage( __( 'Please enter a username.', 'wp-plugin-info-card' ) );
			setCardLoading( false );
			return;
		}

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
					props.profileLoaded( authorSlug, data );
				} else {
					setAuthorErrorMessage( data.message );
					setAuthorError( true );
				}
			} ).then( () => {
				setCardLoading( false );
			} );
	};

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
								setCardLoading( true );
								loadProfileData( authorSlugSearchValue );
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
