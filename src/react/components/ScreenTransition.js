import React, { useState, useEffect, useTransition } from 'react';
import { useRouter } from '@tanstack/react-router';

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

const ScreenTransition = ( { children } ) => {
	const router = useRouter();
	const [ , startTransition ] = useTransition();
	const [ currentPath, setCurrentPath ] = useState( '#' + router.state.location.pathname );
	const [ currentChildren, setCurrentChildren ] = useState( children );
	const [ isAnimating, setIsAnimating ] = useState( false );
	const [ shouldUpdateContent, setShouldUpdateContent ] = useState( false );

	// Handle animation end
	const handleTransitionEnd = ( event ) => {
		// Only handle the opacity transition end
		if ( event.propertyName === 'opacity' && isAnimating ) {
			if ( shouldUpdateContent ) {
				// Content update phase
				startTransition( () => {
					setCurrentPath( '#' + router.state.location.pathname );
					setCurrentChildren( children );
					setShouldUpdateContent( false );
					// Trigger fade in
					requestAnimationFrame( () => {
						setIsAnimating( false );
					} );
				} );
			} else {
				// Initial fade out complete, update content
				setShouldUpdateContent( true );
			}
		}
	};

	useEffect( () => {
		// If the path changed, trigger animation
		if ( currentPath !== '#' + router.state.location.pathname ) {
			// Start fade out
			setIsAnimating( true );
		}
	}, [ router.state.location.pathname, currentPath ] );

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
