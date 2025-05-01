import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import {
	Plug2,
	Plus,
	Cog,
	BookText,
	ExternalLink,
} from 'lucide-react';
import PluginIcon from '../../../components/PluginIcon';

const PluginHome = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<PluginIcon />
								{ __( 'Custom Plugins', 'wp-plugin-info-card' ) }
							</h2>
							<p className="description">
								{ __(
									'Add a custom plugin, enable a REST API endpoint, and share the plugin with the world.',
									'wp-plugin-info-card',
								) }
							</p>
						</div>
					</div>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<Plug2 />
							{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Add a new plugin to the list of plugins.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="primary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								navigate( { to: '/new-plugin' } );
							} }
							iconPosition="left"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <Plus /> }
						>
							{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<Cog />
							{ __( 'Advanced Settings', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Configure REST API settings and other advanced options.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								navigate( { to: '/advanced' } );
							} }
							iconPosition="right"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <ExternalLink /> }
						>
							{ __( 'Configure Settings', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Learn more about custom plugins and how to use them in WP Plugin Info Card.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							src="https://wppic.dlxplugins.com/"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							target="_blank"
							rel="noopener noreferrer"
							icon={ () => <ExternalLink /> }
						>
							{ __( 'View Documentation', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default PluginHome;
