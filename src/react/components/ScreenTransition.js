import React, { useState, useEffect, useTransition } from 'react';

const TransitionContent = ( { children, isAnimating, onTransitionEnd, currentPath } ) => {
	return (
		<div
			className={ `screen-transition-content ${ isAnimating ? 'is-animating' : '' }` }
			data-path={ currentPath }
			onTransitionEnd={ onTransitionEnd }
		>
			{ children }
		</div>
	);
};

const ScreenTransition = ( { children, location } ) => {
	const [ , startTransition ] = useTransition();
	const [ currentPath, setCurrentPath ] = useState( location?.pathname || '/' );
	const [ currentChildren, setCurrentChildren ] = useState( children );
	const [ isAnimating, setIsAnimating ] = useState( false );

	// Handle animation end.
	const handleTransitionEnd = ( event ) => {
		// Only handle the opacity transition end.
		if ( event.propertyName === 'opacity' && isAnimating ) {
			// Fade out complete, now update content and fade in.
			startTransition( () => {
				setCurrentPath( location?.pathname || '/' );
				setCurrentChildren( children );
				// Trigger fade in by removing isAnimating.
				setIsAnimating( false );
			} );
		}
	};

	useEffect( () => {
		// If the path changed, trigger animation.
		if ( currentPath !== ( location?.pathname || '/' ) ) {
			console.log('Path changed, starting fade out:', currentPath, '->', location?.pathname );
			// Start fade out.
			setIsAnimating( true );
		}
	}, [ location?.pathname, currentPath ] );

	return (
		<div className="screen-transition-wrapper">
			<TransitionContent
				isAnimating={ isAnimating }
				onTransitionEnd={ handleTransitionEnd }
				currentPath={ currentPath }
			>
				{ currentChildren }
			</TransitionContent>
		</div>
	);
};

export default ScreenTransition;