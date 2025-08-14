import { Modal, TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ImportPluginFile from './import-plugin-file';
import ImportPluginRestUrl from './import-plugin-rest-url';

const ImportPluginModal = ( props ) => {
	return (
		<Modal
			title={ __( 'Import Plugin', 'wp-plugin-info-card' ) }
			onRequestClose={ () => {
				props.onClose();
			} }
		>
			<TabPanel
				tabs={ [
					{
						name: 'import-file',
						title: __( 'Import from File', 'wp-plugin-info-card' ),
						className: 'wppic-import-plugin',

					},
					{
						name: 'import-rest',
						title: __( 'Import from REST API', 'wp-plugin-info-card' ),
						className: 'wppic-import-plugin',
					},
				] }
				onSelect={ ( tab ) => {
					console.log( tab );
				} }
			>
				{ ( tab ) => {
					switch ( tab.name ) {
						case 'import-file':
							return <ImportPluginFile onClose={ props.onClose } />;
						case 'import-rest':
							return <ImportPluginRestUrl onClose={ props.onClose } />;
					}
				} }
			</TabPanel>
		</Modal>
	);
};

export default ImportPluginModal;
