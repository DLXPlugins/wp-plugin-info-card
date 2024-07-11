const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import InfoCardIcon from '../../blocks/components/InfoCardIcon';

import Sidebar from './sidebar';

registerPlugin( 'wppic-edd-sidebar', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					title={ __( 'Plugin Info Card', 'wp-plugin-info-card' ) }
					icon={ <InfoCardIcon /> }
					className="wppic-edd-sidebar"
				>
					<Sidebar />
				</PluginDocumentSettingPanel>
			</>
		);
	},
} );
