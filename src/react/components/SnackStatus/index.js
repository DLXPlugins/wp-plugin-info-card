import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Snackbar as WPSnackBar, Modal, Button } from '@wordpress/components';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import Notice from '../Notice';

/**
 * SnackPop is a component which handles alerts and notifications for the user.
 * It can handle multiple alerts at once, toggles and forms, and will display the notifications in a queue.
 *
 * @param {Object} props Component props.
 *
 * @return {Element} JSX markup for the component.
 */
const SnackStatus = ( props ) => {
	const { snackbarOptions } = props;

	const snackbarDefaults = {
		type: 'info',
		message: '',
		title: '',
		isDismissable: false,
		isPersistent: false,
		isBusy: false,
		loadingMessage: '',
		politeness: 'polite', /* can also be assertive */
	};

	const [ notificationOptions, setNotificationOptions ] = useState( snackbarDefaults );
	const [ isBusy, setIsBusy ] = useState( snackbarOptions.isBusy || false );
	const [ isModalVisible, setIsModalVisible ] = useState( false );
	const [ isSnackbarVisible, setIsSnackbarVisible ] = useState( false );
	const [ snackbarTimeout, setSnackbarTimeout ] = useState( null );

	useEffect( () => {
		if ( ! snackbarOptions.isVisible ) {
			return;
		}

		// Set state to busy.
		setNotificationOptions( snackbarDefaults );
		setIsSnackbarVisible( true );
		setIsBusy( snackbarOptions.isBusy || false );

		// Get the type of notification. (error, info, success, warning, critical, confirmation).
		const type = snackbarOptions.type || 'info';

		// Get the message.
		const message = snackbarOptions.message || '';

		// Get the title.
		const title = snackbarOptions.title || ''; /* title of snackbar or modal */

		// Get whether the notification is dismissable.
		const isDismissable = snackbarOptions.dismissable || false; /* whether the snackbar or modal is dismissable */

		// Get whether the notification is persistent.
		const isPersistent = snackbarOptions.persistent || false; /* whether the snackbar or modal is persistent */

		// Get the politeness based on if successful.
		const politeness = 'success' === type ? 'polite' : 'assertive';

		// Set state with the notification.
		setNotificationOptions( {
			type,
			message,
			title,
			isDismissable,
			isBusy,
			isPersistent,
			politeness,
		} );

		clearTimeout( snackbarTimeout );
		setSnackbarTimeout( setTimeout( () => {
			setIsSnackbarVisible( false );
			setNotificationOptions( snackbarDefaults );
			props.onTimeout();
		}, 6000 ) );
	}, [ snackbarOptions ] );

	if ( ! snackbarOptions.isVisible ) {
		return (
			<></>
		);
	}

	/**
	 * Gets the icon for the notification.
	 *
	 * @return {Element} JSX markup for the icon.
	 */
	const getIcon = () => {
		switch ( notificationOptions.type ) {
			case 'success':
				return <CheckCircle2 />;
			case 'error':
			case 'critical':
				return <AlertCircle />;
			default:
				return <Loader2 />;
		}
	};

	const getSnackbarActions = () => {
		const actions = [];
		if ( notificationOptions.type === 'success' ) {
			actions.push( {
				label: __( 'Back to Top', 'wp-plugin-info-card' ),
				url: '#wppic-admin-header',
				variant: 'link',
				className: 'wppic-admin__notice-action wppic-admin__notice-action--to-top',
			} );
		}
		return actions;
	};

	const getSnackBar = () => {
		return (
			<WPSnackBar
				className={
					classnames(
						`wppic-snackbar wppic-snackbar-${ notificationOptions.type }`,
						{
							'wppic-snackbar-loading': isBusy,
						},
					)
				}
				actions={ getSnackbarActions() }
				icon={ getIcon() }
				onDismiss={ () => setIsSnackbarVisible( false ) }
				explicitDismiss={ notificationOptions.isDismissable }
			>
				{ isBusy ? notificationOptions.loadingMessage : notificationOptions.message }
			</WPSnackBar>
		);
	};

	const getModal = () => {
		if ( 'critical' === notificationOptions.type ) {
			return (
				<Modal
					className={
						classnames(
							`wppic-modal wppic-modal-${ notificationOptions.type }`,
							{
								'wppic-modal-loading': isBusy,
							},
						)
					}
					bodyOpenClassName={ 'wppic-modal-body-open' }
					title={ notificationOptions.title }
					onRequestClose={ () => {
						setIsModalVisible( false );
					} }
					isDismissible={ true }
					shouldCloseOnClickOutside={ notificationOptions.isPersistent }
					shouldCloseOnEsc={ notificationOptions.isPersistent }
				>
					<Notice
						message={ notificationOptions.message }
						status={ notificationOptions.type }
						politeness={ notificationOptions.politeness }
						icon={ getIcon }
						inline={ false }
					/>
					<div className="wppic-modal-button-group">
						<Button
							className="button button-error"
							variant="secondary"
							onClick={ () => {
								setIsModalVisible( false );
							} }
						>
							{ __( 'OK', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</Modal>
			);
		}
	};

	return (
		<>
			{ isSnackbarVisible && getSnackBar() } { /* Show snackbar */ }
			{ isModalVisible && getModal() } { /* Show modal */ }
		</>
	);
};
export default SnackStatus;
