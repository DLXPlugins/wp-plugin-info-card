import { useState } from 'react';
import { Modal, Button, Spinner, TextControl } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { RefreshCcw, ShieldX } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import SendCommand from '../../../utils/SendCommand';
import Notice from '../../../components/Notice';

/**
 * Import Sidebar Rest Detach Modal.
 *
 * @param {Object}   props              - The component props.
 * @param {Function} props.onClose      - The function to call when the modal is closed.
 * @param {string}   props.restApiUrl   - The URL of the REST API.
 * @param {Function} props.onPluginData - The function to call when the plugin data is updated.
 * @return {JSX.Element} The Import Sidebar Rest Detach Modal component.
 */
const ImportSidebarRestModal = ( props ) => {
	const [ isDetaching, setIsDetaching ] = useState( false );
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
			setIsSuccess( true );
			setStatusMessage( __( 'Plugin is now detached from the REST API. You can edit the plugin data as normal.', 'wp-plugin-info-card' ) );

			// Close the modal after 3 seconds.
			setTimeout( () => {
				props.onPluginData( { ...data.data.content } );
				props.onClose();
			}, 3000 );
		} else {
			setIsDetaching( false );
			setStatusMessage( '' );
			setSyncError( __( 'Error fetching plugin data.', 'wp-plugin-info-card' ) );
		}
	};

	/**
	 * Detach the plugin from the REST API.
	 */
	const detachFromRest = async () => {
		setStatusMessage( '' );
		setIsDetaching( true );
		const response = await SendCommand( 'wppic_detach_custom_plugin_from_rest', {
			nonce,
			id,
		} );
		const { success, data } = response.data;
		if ( success ) {
			await fetchPlugin();
		} else {
			setStatusMessage( '' );
			setSyncError( __( 'Error syncing plugin data.', 'wp-plugin-info-card' ) );
			setIsDetaching( false );
		}
	};

	return (
		<>
			<Modal
				title={ __( 'Detach Plugin from REST', 'wp-plugin-info-card' ) }
				onRequestClose={ () => {
					setIsDetaching( false );
					props.onClose();
				} }
				shouldCloseOnEsc={ false }
				shouldCloseOnClickOutside={ false }
			>
				<div className="wppic-admin-row">
					<p className="description">
						{
							__( 'This will detach the plugin from its original REST API source. You can edit the plugin data as normal.', 'wp-plugin-info-card' )
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
										isDestructive={ true }
										disabled={ isDetaching }
										icon={ isDetaching ? <Spinner /> : <ShieldX /> }
										onClick={ () => {
											detachFromRest();
										} }
									>
										{ __( 'Detach Plugin from REST', 'wp-plugin-info-card' ) }
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
