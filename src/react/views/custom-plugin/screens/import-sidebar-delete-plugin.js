import { useState } from 'react';
import { Modal, Button, Spinner } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { RefreshCcw, ShieldX, Trash } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import SendCommand from '../../../utils/SendCommand';
import Notice from '../../../components/Notice';
import ImportSidebarDeletePluginModal from './import-sidebar-delete-plugin-modal';

const ImportSidebarDeletePlugin = ( props ) => {
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );

	return (
		<>
			<div className="wppic-admin-panel-sidebar-card">
				<h3>
					<Trash />
					{ __( 'Delete Plugin', 'wp-plugin-info-card' ) }
				</h3>
				<p>
					{ __(
						'Delete the plugin from the database. This will cause any existing plugin cards using this plugin to be blank.',
						'wp-plugin-info-card',
					) }
				</p>
				<Button
					variant="secondary"
					href="#"
					isDestructive={ true }
					onClick={ ( e ) => {
						e.preventDefault();
						setShowDeleteModal( true );
					} }
					iconPosition="left"
					className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
					icon={ () => <Trash /> }
				>
					{ __( 'Delete Plugin', 'wp-plugin-info-card' ) }
				</Button>
			</div>
			{
				showDeleteModal && (
					<ImportSidebarDeletePluginModal
						restApiUrl={ props.restApiUrl }
						onClose={ () => {
							setShowDeleteModal( false );
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

export default ImportSidebarDeletePlugin;
