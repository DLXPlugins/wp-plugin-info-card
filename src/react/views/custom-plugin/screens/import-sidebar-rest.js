import { useState } from 'react';
import { Modal, Button, Spinner } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { RefreshCcw, ShieldX } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import SendCommand from '../../../utils/SendCommand';
import Notice from '../../../components/Notice';
import ImportSidebarRestModal from './import-sidebar-rest-modal';
import ImportSidebarRestDetachModal from './import-sidebar-rest-detach-modal';

/**
 * Import Sidebar Rest.
 *
 * @param {Object}   props              - The component props.
 * @param {Function} props.onPluginData - The function to call when the plugin data is updated.
 * @param {string}   props.restApiUrl   - The URL of the REST API.
 * @param {string}   props.id           - The ID of the plugin.
 * @param {string}   props.nonce        - The nonce of the plugin.
 * @return {JSX.Element} The Import Sidebar Rest component.
 */
const ImportSidebarRest = ( props ) => {
	const [ showSyncModal, setShowSyncModal ] = useState( false );
	const [ showDetachModal, setShowDetachModal ] = useState( false );

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
						setShowSyncModal( true );
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
					isDestructive={ true }
					onClick={ ( e ) => {
						e.preventDefault();
						setShowDetachModal( true );
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
					<ImportSidebarRestModal
						restApiUrl={ props.restApiUrl }
						onClose={ () => {
							setShowSyncModal( false );
						} }
						onPluginData={ ( newPluginData ) => {
							props.onPluginData( newPluginData );
						} }
					/>
				)
			}
			{
				showDetachModal && (
					<ImportSidebarRestDetachModal
						restApiUrl={ props.restApiUrl }
						onClose={ () => {
							setShowDetachModal( false );
						} }
						onPluginData={ ( newPluginData ) => {
							props.onPluginData( newPluginData );
						} }
					/>
				)
			}
		</>
	);
};

export default ImportSidebarRest;
