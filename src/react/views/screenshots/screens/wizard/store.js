
import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
	currentStep: 0,
	formData: {
		enable_screenshots: true,
		enable_local_screenshots: false,
		exclude_animated_gifs: true,
		enable_table_creation: false,
		enable_local_screenshots_download_missing: false,
		enable_local_screenshots_keep_current: false,
		enable_local_screenshots_cli_command: false,
	},
	wpCronEnabled: false,
};

const actions = {
	setCurrentStep( step ) {
		return {
			type: 'SET_CURRENT_STEP',
			step,
		};
	},
	setFormData( formData ) {
		return {
			type: 'SET_FORM_DATA',
			formData,
		};
	},
	setWPCronStatus( enabled ) {
		return {
			type: 'SET_WP_CRON_STATUS',
			enabled,
		};
	},
	// setModalClosed() {
	// 	return {
	// 		type: 'SET_MODAL_STATUS_CLOSE',
	// 	};
	// },
};

const store = createReduxStore( 'dlxplugins/pluginScreenshots', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_CURRENT_STEP':
				return {
					...state,
					currentStep: action.step,
				};
			case 'SET_FORM_DATA':
				return {
					...state,
					formData: action.formData,
				};
			case 'SET_WP_CRON_STATUS':
				return {
					...state,
					wpCronEnabled: action.enabled,
				};
			// case 'SET_MODAL_STATUS_OPEN':
			// 	return {
			// 		...state,
			// 		isPatternModalOpen: true,
			// 	};
			// case 'SET_MODAL_STATUS_CLOSE':
			// 	return {
			// 		...state,
			// 		isPatternModalOpen: false,
			// 	};
			default:
				return state;
		}
	},
	actions,
	selectors: {
		getCurrentStep( state ) {
			return state.currentStep;
		},
		getFormData( state ) {
			return state.formData;
		},
		getWPCronStatus( state ) {
			return state.wpCronEnabled;
		},
	},
} );

register( store );
