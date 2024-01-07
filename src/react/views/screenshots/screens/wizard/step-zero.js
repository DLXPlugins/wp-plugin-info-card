import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import './store.js';
import SendCommand from '../../../../utils/SendCommand.js';

const StepZero 
= ( props ) => {
	const { go, nextStep, prevStep } = props;

	const { setFormData } = useDispatch( 'dlxplugins/pluginScreenshots' );
	const { getFormData } = useSelect( 'dlxplugins/pluginScreenshots' );

	const [ enablingScreenshots, setEnablingScreenshots ] = useState( false );
	const [ statusText, setStatusText ] = useState( '' );

	const navigate = useNavigate();

	const checkOrgConnection = async () => {
		setEnablingScreenshots( true );
		setStatusText( __( 'Checking connection to WordPress.org…', 'wp-plugin-info-card' ) );
		const response = await SendCommand( 'wppic_check_org_connection', { nonce: wppicAdminScreenshots.checkOrgNonce } );
		const { data, success } = response.data;
		if ( ! success ) {
			setEnablingScreenshots( false );
			setStatusText( __( 'Could not connect to WordPress.org. Please try again later.', 'wp-plugin-info-card' ) );
		} else {
			// Now let's check if cron is enabled.
			setStatusText( __( 'Connection to WordPress.org successful. Checking cron status…', 'wp-plugin-info-card' ) );
			const cronResponse = await SendCommand( 'wppic_check_cron', { nonce: wppicAdminScreenshots.checkCronNonce } );
			console.log( cronResponse );
		}
	}

	return (
		<div className="wppic-admin-panel-container is-narrow">
			<div className="wppic-admin-panel-options-wrapper">
				<div className="wppic-admin-panel-area">
					<div className="wppic-admin-panel-area__section-centered">
						<h2>
							{ __( 'Welcome to Screenshots', 'wp-plugin-info-card' ) }
						</h2>
						<p className="description">
							{ __(
								'With two blocks and two shortcodes, you can easily display a fully featured plugin and theme card with screenshots. This makes for a stylish way to display plugins and themes.',
								'wp-plugin-info-card',
							) }
						</p>
						<div className="wppic-screenshot-placeholder">
							<img src={ wppicAdminScreenshots.screenshotsExampleImage } width="400" height="433" style={ { width: '400px', height: '433px' } } alt={ __( 'Plugin Screenshots Example', 'wp-plugin-info-card' ) } />
						</div>
						<div className="wppic-admin-button-row">
							<Button
								variant="primary"
								className="wppic-btn wppic-btn--primary btn-large"
								onClick={ () => {
									checkOrgConnection();
								} }
								disabled={ enablingScreenshots }
							>
								{ __( 'Enable Screenshots and Start the Wizard', 'wp-plugin-info-card' ) }
							</Button>
						</div>
						{
							enablingScreenshots && (
								<>
									<BeatLoader color={ '#333' } loading={ true } cssOverride={ true } size={ 25 } speedMultiplier={ 0.65 } />
									<div className="wppic-wizard-status-message">
										<span className="wppic-wizard-status-message__text">{ statusText }</span>
									</div>
								</>
								
							)
							
						}
						
					</div>
				</div>
			</div>
		</div>


	);
};
export default StepZero;
