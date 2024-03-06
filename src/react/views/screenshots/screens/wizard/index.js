import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import './store.js';
import StepZero from './step-zero.js';
import StepOne from './step-one.js';
import StepTwo from './step-two.js';
import StepThree from './step-three.js';

const stepOne = () => {
	return (
		<div>
			<h1>Step One</h1>
		</div>
	);
};

const stepTwo = () => {
	return (
		<div>
			<h1>Step Two</h1>
		</div>
	);
};

const defaultSteps = [
	{ id: 0, path: '/', element: StepZero },
	{ id: 1, path: '/config', element: StepOne },
	{ id: 2, path: '/setup/', element: StepTwo },
	{ id: 3, path: '/cron/', element: StepTwo },
	{ id: 4, path: '/finish', element: StepThree },
];

const useStep = ( initialStep = 0, steps ) => {
	const { getCurrentStep } = useSelect( 'dlxplugins/pluginScreenshots' );
	const { setCurrentStep } = useDispatch( 'dlxplugins/pluginScreenshots' );

	/**
	 * Go to the next step in the wizard.
	 *
	 * @return {number} The next step. null on failure.
	 */
	const nextStep = () => {
		const nextStep = getCurrentStep() + 1;
		// Check that step exists.
		if ( ! steps[ nextStep ] ) {
			return null;
		}
		setCurrentStep( nextStep );
		return nextStep;
	};

	/**
	 * Go to the previous step in the wizard.
	 *
	 * @return {number} The next step. null on failure.
	 */
	const prevStep = () => {
		const prevStep = getCurrentStep() - 1;
		// Check that step exists.
		if ( ! steps[ prevStep ] ) {
			return null;
		}
		setCurrentStep( prevStep );
		return prevStep;
	};

	/**
	 * Go to a specific step in the wizard.
	 *
	 * @param {number} step The step to go to.
	 * @return {number} The step. null on failure.
	 */
	const go = ( step ) => {
		if ( ! steps[ step ] ) {
			return null;
		}
		setCurrentStep( step );
		return step;
	};

	/**
	 * Get the current step element.
	 *
	 * @param {number} step The step to get.
	 * @return {element} The current step. null on failure.
	 */
	const getStep = ( step ) => {
		if ( ! steps[ step ] ) {
			return null;
		}
		// Return as component.
		const Step = steps[ step ].element;
		const props = {
			go,
			nextStep,
			prevStep,
		};

		return <Step { ...props } />;
	};

	return {
		go,
		nextStep,
		prevStep,
		getStep,
	};
};

const Wizard = () => {
	const { getStep } = useStep( 0, defaultSteps );

	return (
		<Router>
			<Routes>
				<Route path="/setup/" element={ getStep( 1 ) } />
				<Route path="/cron/" element={ getStep( 2 ) } />
				<Route path="/finish/" element={ getStep( 3 ) } />
				<Route path="/" exact element={ getStep( 0 ) } />
				<Route path="*" element={ <Navigate to="/" /> } />
			</Routes>
		</Router>
	);
};
export default Wizard;
