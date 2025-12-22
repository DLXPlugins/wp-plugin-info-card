import React, { useMemo, useCallback } from 'react';
import {
	Modal,
	ToggleControl,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { badges as badgeMap } from './Badges';

/**
 * BadgeSelectionModal component for selecting which badges to display.
 *
 * @param {Object}   props               - The component props.
 * @param {Array}    props.badges        - Current badges array.
 * @param {Function} props.setAttributes - Function to update block attributes.
 * @param {boolean}  props.isOpen        - Whether the modal is open.
 * @param {Function} props.onClose       - Callback to close the modal.
 * @return {JSX.Element|null} The modal component or null if not open.
 */
const BadgeSelectionModal = ( { badges, setAttributes, isOpen, onClose } ) => {
	/**
	 * Handle badge toggle.
	 *
	 * @param {Object}  badge - The badge object from badgeMap.
	 * @param {boolean} value - Whether the badge should be enabled.
	 */
	const handleBadgeToggle = useCallback( ( badge, value ) => {
		// Create a copy of badges to avoid mutating the original array.
		const updatedBadges = [ ...badges ];

		if ( ! value ) {
			// Remove badge if disabled.
			const badgeIndex = updatedBadges.indexOf( badge.class );
			if ( badgeIndex !== -1 ) {
				updatedBadges.splice( badgeIndex, 1 );
			}
		} else if ( ! updatedBadges.includes( badge.class ) ) {
			// Add badge if enabled.
			updatedBadges.push( badge.class );
		}

		setAttributes( { badges: updatedBadges } );
	}, [ badges, setAttributes ] );

	/**
	 * Handle select all badges.
	 */
	const handleSelectAll = useCallback( () => {
		const allBadges = badgeMap.map( ( badge ) => badge.class );
		setAttributes( { badges: allBadges } );
	}, [ setAttributes ] );

	/**
	 * Handle deselect all badges.
	 */
	const handleSelectNone = useCallback( () => {
		setAttributes( { badges: [] } );
	}, [ setAttributes ] );

	// Calculate selection state.
	const selectedCount = badges.length;
	const totalCount = badgeMap.length;

	const modalContent = useMemo( () => {
		return (
			<>
				<p>{ __( 'Select the badges you want to display in your profile.', 'wp-plugin-info-card' ) }</p>
				<div className="wppic-badge-selection-modal__actions">
					<div className="wppic-badge-selection-modal__buttons">
						<Button
							variant="secondary"
							onClick={ handleSelectAll }
						>
							{ __( 'Select All', 'wp-plugin-info-card' ) }
						</Button>
						{ selectedCount > 0 && (
							<Button
								variant="secondary"
								onClick={ handleSelectNone }
							>
								{ __( 'Select None', 'wp-plugin-info-card' ) }
							</Button>
						) }
					</div>
					{ selectedCount > 0 && (
						<p className="wppic-badge-selection-modal__counter">
							{ __( 'Selected:', 'wp-plugin-info-card' ) } { selectedCount } { __( 'of', 'wp-plugin-info-card' ) } { totalCount }
						</p>
					) }
				</div>
				<div className="wppic-profile-badges-modal wppic-profile-badges">
					{ badgeMap.map( ( badge ) => {
						const isEnabled = badges.includes( badge.class );
						const hasOverlay = badge.class.includes( 'has-overlay' );

						return (
							<div key={ badge.class } className="wppic-profile-badge-modal-item wppic-profile-badge">
								<div className={ `wppic-profile-badge-modal-item__row` }>
									<div className={ `badge ${ badge.class } ${ hasOverlay ? 'has-overlay' : '' }` }>
										{ 'image' === badge.iconType ? (
											<img src={ badge.icon } alt={ badge.label } className={ hasOverlay ? 'has-overlay' : '' } />
										) : (
											<span className={ `dashicons ${ badge.class } ${ badge.icon } ${ hasOverlay ? 'has-overlay' : '' }` }></span>
										) }
									</div>
									<ToggleControl
										label={ badge.label }
										checked={ isEnabled }
										onChange={ ( value ) => handleBadgeToggle( badge, value ) }
									/>
								</div>
							</div>
						);
					} ) }
				</div>
			</>
		);
	}, [ badges, handleBadgeToggle, selectedCount, totalCount, handleSelectAll, handleSelectNone ] );

	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Select Badges', 'wp-plugin-info-card' ) }
			onRequestClose={ onClose }
			shouldCloseOnClickOutside={ true }
			shouldCloseOnEsc={ true }
		>
			{ modalContent }
		</Modal>
	);
};

export default BadgeSelectionModal;

