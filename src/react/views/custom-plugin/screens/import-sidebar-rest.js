import { useState } from 'react';
import { Modal, Button, Spinner } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { RefreshCcw, ShieldX } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import SendCommand from '../../../utils/SendCommand';
import Notice from '../../../components/Notice';

const ImportSidebarRest = ( props ) => {
	const [ showSyncModal, setShowSyncModal ] = useState( false );
	const [ isSyncing, setIsSyncing ] = useState( false );
	const [ isDetaching, setIsDetaching ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ syncError, setSyncError ] = useState( '' );

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
		}
	};

	/**
	 * Sync plugin data from REST API.
	 */
	const syncPluginData = async () => {
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
			setIsSyncing( false );
			setStatusMessage( __( 'Plugin data synced successfully.', 'wp-plugin-info-card' ) );
			setTimeout( () => {
				setShowSyncModal( false );
			}, 3000 );
			await fetchPlugin();
		} else {
			setStatusMessage( __( 'Error syncing plugin data.', 'wp-plugin-info-card' ) );
			setTimeout( () => {
				setIsSyncing( false );
			}, 3000 );
		}
	};

	return (
		<>
			<div className="wppic-admin-panel-sidebar-card">
				<h3>
					<RefreshCcw />
					{ __( 'Resync Rest Plugin Data', 'wp-plugin-info-card' ) }
				</h3>
				<p>
					{ __(
						'Resync the plugin data from the REST API. Alternatively, you can detach the plugin from the REST API and edit the plugin manually.',
						'wp-plugin-info-card',
					) }
				</p>
				<Button
					variant="primary"
					href="#"
					onClick={ ( e ) => {
						e.preventDefault();
						syncPluginData();
					} }
					iconPosition="left"
					className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
					icon={ () => <RefreshCcw /> }
				>
					{ __( 'Resync Plugin Data', 'wp-plugin-info-card' ) }
				</Button>
				<Button
					variant="secondary"
					href="#"
					onClick={ ( e ) => {
						e.preventDefault();
					} }
					iconPosition="left"
					className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
					icon={ () => <ShieldX /> }
				>
					{ __( 'Detach From REST', 'wp-plugin-info-card' ) }
				</Button>
			</div>
			{
				showSyncModal && (
					<Modal
						title={ __( 'Resync Plugin Data', 'wp-plugin-info-card' ) }
						onRequestClose={ () => {
							setIsSyncing( false );
						} }
						shouldCloseOnEsc={ false }
						shouldCloseOnClickOutside={ false }
					>
						<div className="wppic-admin-row">
							{
								isSyncing && (
									<p>
										{ __( 'Resyncing plugin data…', 'wp-plugin-info-card' ) }
										<Spinner />
									</p>
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
				)
			}
		</>
	);
};

export default ImportSidebarRest;
