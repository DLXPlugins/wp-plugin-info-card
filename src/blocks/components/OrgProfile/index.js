import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
	TextControl,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { cleanForSlug } from '@wordpress/url';
import classnames from 'classnames';
import Logo from '../../Logo';
import Notice from '../../components/Notice';
import Loading from '../../components/Loading';
import { badges as badgeMap } from '../Badges';

/**
  /**
 * OrgProfile component displays the organization profile,
 * including badge information and author slug editor.
 *
 * @param {Object}        props                - The component props.
 * @param {Object}        props.attributes     - Block attributes.
 * @param {Function}      props.setAttributes  - Updates block attributes.
 * @param {JSX.Component} [props.Preview]      - Optional preview component.
 * @param {boolean}       [props.isEditing]    - Editing mode state (if provided by context).
 * @param {Function}      [props.setIsEditing] - Setter for the editing mode (if provided).
 * @return {JSX.Element} The rendered component.
 */
const OrgProfile = ( props ) => {
	const { attributes, setAttributes, Preview, isEditing, setIsEditing } = props;
	const [ authorSlugSearchValue, setAuthorSlugSearchValue ] = useState( attributes.authorSlug );
	const [ authorError, setAuthorError ] = useState( false );
	const [ authorErrorMessage, setAuthorErrorMessage ] = useState( '' );
	const [ cardLoading, setCardLoading ] = useState( false );

	const loadProfileData = useCallback( async ( authorSlug ) => {
		setIsEditing( true );
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
						member_badges,
					} = data;
					let badgeOrder = 0;
					/**
					 * Reduce the member badges array to an array of objects with the badge class, label, enabled, and order.
					 *
					 * @param {Array}  acc   - The accumulator array.
					 * @param {string} badge - The badge ID.
					 * @return {Array} The accumulator array.
					 */
					const badges = member_badges.reduce( ( acc, badge ) => {
						const badgeData = badgeMap.find( ( b ) => b.id === badge );
						if ( badgeData ) {
							badgeOrder++;
							acc.push( {
								class: badgeData.class,
								label: badgeData.label,
								enabled: true,
								order: badgeOrder,
							} );
						}
						return acc;
					}, [] );
					setAuthorSlugSearchValue( authorSlug );
					setAttributes( {
						authorSlug,
						badges,
						lastUpdated: new Date().getTime().toString(),
					} );
				} else {
					setAuthorErrorMessage( data.message );
					setAuthorError( true );
				}
			} ).then( () => {
				setIsEditing( false );
				setCardLoading( false );
			} );
	}, [ setIsEditing, setAttributes ] );

	// Refetch data if lastUpdated is a week old or more.
	useEffect( () => {
		if ( attributes.lastUpdated && ! cardLoading && attributes.authorSlug ) {
			// Convert string timestamp to number before creating Date object.
			const lastUpdatedTimestamp = Number( attributes.lastUpdated );
			if ( isNaN( lastUpdatedTimestamp ) ) {
				return;
			}
			const lastUpdated = new Date( lastUpdatedTimestamp );
			const now = new Date();
			const diffTime = Math.abs( now - lastUpdated );
			const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );
			if ( diffDays >= 7 ) {
				loadProfileData( attributes.authorSlug );
			}
		}
	}, [] );

	// Show loading if loading.
	if ( cardLoading ) {
		return (
			<>
				<InspectorControls>
					<></>
				</InspectorControls>
				<Loading />
			</>
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
						setIsEditing( true );
						loadProfileData( attributes.authorSlug );
					} }
				/>
			</>
		);
	}

	const block = (
		<>
			<>
				<InspectorControls>
					<></>
				</InspectorControls>
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
							onClick={ () => {
								// Error out if author slug is empty.
								if ( '' === authorSlugSearchValue ) {
									setAuthorError( true );
									setAuthorErrorMessage( __( 'Please enter a username.', 'wp-plugin-info-card' ) );
									setCardLoading( false );
									return;
								}
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
