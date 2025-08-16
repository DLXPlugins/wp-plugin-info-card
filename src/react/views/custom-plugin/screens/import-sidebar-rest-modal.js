import { useState } from 'react';
import { Modal, Button, Spinner, TextControl } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { RefreshCcw, ShieldX } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import SendCommand from '../../../utils/SendCommand';
import Notice from '../../../components/Notice';

/**
 * Import Sidebar Rest Modal.
 *
 * @param {Object}   props              - The component props.
 * @param {Function} props.onClose      - The function to call when the modal is closed.
 * @param {string}   props.restApiUrl   - The URL of the REST API.
 * @param {Function} props.onPluginData - The function to call when the plugin data is updated.
 * @return {JSX.Element} The Import Sidebar Rest Modal component.
 */
const ImportSidebarRestModal = ( props ) => {
	const [ showSyncModal, setShowSyncModal ] = useState( false );
	const [ showDetachModal, setShowDetachModal ] = useState( false );
	const [ isSyncing, setIsSyncing ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ syncError, setSyncError ] = useState( '' );
	const [ isSuccess, setIsSuccess ] = useState( false );

	const { id, nonce } = useParams( {
		shouldThrow: false,
	} );

	const fetchPlugin = async () => {
		const response = await SendCommand( 'wppic_get_custom_plugin_data', {
			nonce,
			id,
		} );
		const { success, data } = response.data;
		if ( success ) {
			props.onPluginData( { ...data.data.content } );

			setIsSuccess( true );
			setStatusMessage( __( 'Plugin data synced successfully.', 'wp-plugin-info-card' ) );

			// Close the modal after 3 seconds.
			setTimeout( () => {
				props.onClose();
			}, 3000 );
		} else {
			setIsSyncing( false );
			setStatusMessage( '' );
			setSyncError( __( 'Error fetching plugin data.', 'wp-plugin-info-card' ) );
		}
	};

	/**
	 * Sync plugin data from REST API.
	 */
	const syncPluginData = async () => {
		setStatusMessage( '' );
		setSyncError( '' );
		setShowSyncModal( true );
		setIsSyncing( true );

		const formDataObj = new FormData();
		formDataObj.append( 'postId', id );
		formDataObj.append( 'nonce', nonce );
		const response = await fetch( wppicAdminCustomPlugin.importPluginRestRefreshUrl, {
			method: 'POST',
			body: formDataObj,
			headers: {
				'X-WP-Nonce': wppicAdminCustomPlugin.restNonce,
			},
		} );
		if ( response.ok ) {
			const data = await response.json();
			const maybeErrors = data.errors;
			if ( maybeErrors.length > 0 ) {
				let errorMessage = '';
				maybeErrors.forEach( ( error ) => {
					errorMessage += error + '\n\r';
				} );
				setSyncError( errorMessage );
			}
			await fetchPlugin();
		} else {
			setStatusMessage( '' );
			if ( response.status === 400 ) {
				setSyncError( __( 'REST API Path unreachable. It may be disabled or blocked by a firewall or proxy.', 'wp-plugin-info-card' ) );
			} else {
				setSyncError( __( 'Error syncing plugin data.', 'wp-plugin-info-card' ) + ' ' + response.statusText );
			}
			setIsSyncing( false );
		}
	};

	return (
		<>
			<Modal
				title={ __( 'Resync Plugin Data', 'wp-plugin-info-card' ) }
				onRequestClose={ () => {
					setIsSyncing( false );
					props.onClose();
				} }
				shouldCloseOnEsc={ false }
				shouldCloseOnClickOutside={ false }
			>
				<div className="wppic-admin-row">
					<p className="description">
						{
							__( 'This will rsync the plugin data from its original REST API source.', 'wp-plugin-info-card' )
						}
					</p>
					<TextControl
						label={ __( 'The original source URL', 'wp-plugin-info-card' ) }
						value={ props.restApiUrl }
						disabled={ true }
						readOnly={ true }
						help={ __( 'This is the original source URL of the plugin.', 'wp-plugin-info-card' ) }
					/>
					{
						! isSuccess && (
							<>
								<div className="wppic-admin-buttons">
									<Button
										variant="primary"
										disabled={ isSyncing }
										icon={ isSyncing ? <Spinner /> : <RefreshCcw /> }
										onClick={ () => {
											syncPluginData();
										} }
									>
										{ __( 'Rsync Plugin Data', 'wp-plugin-info-card' ) }
									</Button>
									<Button
										variant="secondary"
										onClick={ () => {
											props.onClose();
										} }
									>
										{ __( 'Cancel', 'wp-plugin-info-card' ) }
									</Button>
								</div>
							</>	
						)
					}
					{
						statusMessage && (
							<Notice
								message={ statusMessage }
								status="success"
								politeness="assertive"
							/>
						)
					}
					{
						syncError && (
							<Notice
								message={ syncError }
								status="error"
								politeness="assertive"
							/>
						)
					}
				</div>
			</Modal>
		</>
	);
};

export default ImportSidebarRestModal;
