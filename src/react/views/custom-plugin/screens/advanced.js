import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { Cog, BookText, ExternalLink } from 'lucide-react';
import SendCommand from '../../../utils/SendCommand';

const Breadcrumbs = () => (
	<div className="wppic-admin-panel-breadcrumbs">
		<div className="wppic-admin-panel-breadcrumbs__item">
			<Link href="/">
				{ __( 'Custom Plugins', 'wp-plugin-info-card' ) }
			</Link>
			{ ' > ' }
			<span className="wppic-admin-panel-breadcrumbs__item-current">
				{ __( 'Advanced Settings', 'wp-plugin-info-card' ) }
			</span>
		</div>
	</div>
);

const Advanced = () => {
	const {
		control,
		handleSubmit,
	} = useForm( {
		defaultValues: {
			enable_rest_api: false,
			restrict_rest_api: false,
			nonce: wppicAdminCustomPlugin.saveNonce,
		},
	} );

	/**
	 * Save the advanced settings.
	 *
	 * @param {Object} formData Form data to save.
	 */
	const onSubmit = async ( formData ) => {
		try {
			const response = await SendCommand( 'wppic_save_advanced_settings', {
				nonce: formData.nonce,
				enable_rest_api: formData.enable_rest_api,
				restrict_rest_api: formData.restrict_rest_api,
			} );

			const { success } = response.data;
			if ( success ) {
				// Show success notice.
			}
		} catch ( error ) {
			// Show error notice.
		}
	};

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<Breadcrumbs />
						<div className="wppic-admin-panel-area">
							<div className="wppic-admin-panel-area__section">
								<h2>
									<Cog />
									<span className="wppic-admin-panel-area__section-title">
										{ __( 'Advanced Settings', 'wp-plugin-info-card' ) }
									</span>
								</h2>
							</div>
							<table className="form-table form-table-row-sections">
								<tbody>
									<tr>
										<th scope="row">
											{ __( 'REST API Settings', 'wp-plugin-info-card' ) }
										</th>
										<td>
											<div className="wppic-admin-row">
												<Controller
													control={ control }
													name="enable_rest_api"
													render={ ( { field } ) => (
														<ToggleControl
															{ ...field }
															checked={ field.value }
															label={ __( 'Enable REST API', 'wp-plugin-info-card' ) }
															help={ __( 'Enable the REST API for custom plugins and post types.', 'wp-plugin-info-card' ) }
														/>
													) }
												/>
											</div>
											<div className="wppic-admin-row">
												<Controller
													control={ control }
													name="restrict_rest_api"
													render={ ( { field } ) => (
														<ToggleControl
															{ ...field }
															checked={ field.value }
															label={ __( 'Restrict REST API Access', 'wp-plugin-info-card' ) }
															help={ __( 'Only allow logged-in users to access the REST API endpoints.', 'wp-plugin-info-card' ) }
														/>
													) }
												/>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="wppic-admin-panel-area__section">
								<button
									type="submit"
									className="button button-primary"
								>
									{ __( 'Save Settings', 'wp-plugin-info-card' ) }
								</button>
							</div>
						</div>
					</form>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Learn more about the REST API and advanced settings in WP Plugin Info Card.',
								'wp-plugin-info-card',
							) }
						</p>
						<a
							href="https://wppic.dlxplugins.com/"
							className="button button-secondary wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							target="_blank"
							rel="noopener noreferrer"
						>
							{ __( 'View Documentation', 'wp-plugin-info-card' ) }
							<ExternalLink />
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Advanced;
