import { useState } from 'react';
import { Modal, Button, Spinner, TextControl } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { RefreshCcw, ShieldX, Trash } from 'lucide-react';
import { useParams, useNavigate } from '@tanstack/react-router';
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
const ImportSidebarDeletePluginModal = ( props ) => {
	const [ isDeleting, setIsDeleting ] = useState( false );
	const [ statusMessage, setStatusMessage ] = useState( '' );
	const [ syncError, setSyncError ] = useState( '' );
	const [ isSuccess, setIsSuccess ] = useState( false );

	const { id, nonce } = useParams( {
		shouldThrow: false,
	} );

	const navigate = useNavigate();

	/**
	 * Detach the plugin from the REST API.
	 */
	const deletePlugin = async () => {
		setStatusMessage( '' );
		setIsDeleting( true );
		const response = await SendCommand( 'wppic_delete_plugin', {
			nonce,
			id,
		} );
		const { success, data } = response.data;
		if ( success ) {
			setIsSuccess( true );
			setStatusMessage( __( 'Plugin deleted successfully.', 'wp-plugin-info-card' ) );

			// Close the modal after 3 seconds.
			setTimeout( () => {
				props.onClose();
				navigate( { to: '/' } );
			}, 3000 );
		} else {
			setStatusMessage( '' );
			setSyncError( __( 'Error deleting plugin.', 'wp-plugin-info-card' ) );
			setIsDeleting( false );
		}
	};

	return (
		<>
			<Modal
				title={ __( 'Delete Plugin', 'wp-plugin-info-card' ) }
				onRequestClose={ () => {
					setIsDeleting( false );
					props.onClose();
				} }
				shouldCloseOnEsc={ false }
				shouldCloseOnClickOutside={ false }
			>
				<div className="wppic-admin-row">
					<p className="description">
						{
							__( 'This will delete the plugin from the database. This will cause any existing plugin cards using this plugin to be blank.', 'wp-plugin-info-card' )
						}
					</p>
					<p className="description">
						{ __( 'This action cannot be undone.', 'wp-plugin-info-card' ) }
					</p>
					{
						! isSuccess && (
							<>
								<div className="wppic-admin-buttons">
									<Button
										variant="primary"
										isDestructive={ true }
										disabled={ isDeleting }
										icon={ isDeleting ? <Spinner /> : <Trash /> }
										onClick={ () => {
											deletePlugin();
										} }
									>
										{ __( 'Delete Plugin', 'wp-plugin-info-card' ) }
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

export default ImportSidebarDeletePluginModal;
