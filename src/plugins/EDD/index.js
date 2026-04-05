const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
import { __} from '@wordpress/i18n';
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
