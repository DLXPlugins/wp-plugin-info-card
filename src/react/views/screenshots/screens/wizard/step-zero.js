import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BeatLoader from 'react-spinners/BeatLoader';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelect } from '@wordpress/data';
import './store.js';
import SendCommand from '../../../../utils/SendCommand.js';

const StepZero 
= ( props ) => {
	const { go, nextStep, prevStep } = props;

	const { setFormData, setWPCronStatus } = useDispatch( 'dlxplugins/pluginScreenshots' );
	const { getFormData } = useSelect( 'dlxplugins/pluginScreenshots' );

	const [ enablingScreenshots, setEnablingScreenshots ] = useState( false );
	const [ statusText, setStatusText ] = useState( '' );

	const navigate = useNavigate();

	/**
	 * Enable screenshots and redirect programmatically.
	 */
	const enableScreenshots = async () => {
		setEnablingScreenshots( true );
		setStatusText( __( 'Enabling Screenshots', 'wp-plugin-info-card' ) );
		const response = await SendCommand( 'enableScreenshots', { nonce: wppicAdminScreenshots.enableScreenshotsNonce } );
		console.log( response );
	};

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
								className={
									classnames( 'wppic-btn components-button wppic-btn--primary btn-large', {
										'is-saving': enablingScreenshots,
									} )
								}
								onClick={ () => {
									enableScreenshots();
								} }
								icon={ enablingScreenshots ? <Loader2 /> : null }
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
