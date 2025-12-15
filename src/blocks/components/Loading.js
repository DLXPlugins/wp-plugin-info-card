import React, { useRef, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import Logo from '../Logo';

/**
 * Creates animation keyframes in the specified document context.
 * This is needed for iframe rendering in the block editor.
 *
 * @param {Document} targetDocument - The document to inject styles into.
 * @param {string}   loaderName     - The loader name.
 * @param {string}   frames         - The keyframe animation frames.
 * @param {string}   suffix         - The animation suffix.
 * @return {string} The animation name.
 */
const createAnimationInDocument = ( targetDocument, loaderName, frames, suffix ) => {
	const animationName = `react-spinners-${ loaderName }-${ suffix }`;

	// Check if document is available.
	if ( ! targetDocument || ! targetDocument.head ) {
		return animationName;
	}

	// Check if animation already exists to avoid duplicates.
	const existingStyle = targetDocument.getElementById( `wppic-${ animationName }` );
	if ( existingStyle ) {
		return animationName;
	}

	// Create style element and inject into the target document's head.
	const styleEl = targetDocument.createElement( 'style' );
	styleEl.id = `wppic-${ animationName }`;
	const keyFrames = `
    @keyframes ${ animationName } {
      ${ frames }
    }
  `;
	styleEl.textContent = keyFrames;
	targetDocument.head.appendChild( styleEl );

	return animationName;
};

const LoadingScreen = ( props ) => {
	const loaderRef = useRef( null );
	useEffect( () => {
		if ( loaderRef.current ) {
			// Get document owner (iframe document in block editor).
			const ownerDocument = loaderRef.current.ownerDocument;
			if ( ownerDocument && ownerDocument !== document ) {
				// Inject animations into the iframe's document.
				createAnimationInDocument(
					ownerDocument,
					'BarLoader',
					'0% { left: -35%; right: 100% } 60% { left: 100%; right: -90% } 100% { left: 100%; right: -90% }',
					'long',
				);
				createAnimationInDocument(
					ownerDocument,
					'BarLoader',
					'0% { left: -200%; right: 100% } 60% { left: 107%; right: -8% } 100% { left: 107%; right: -8% }',
					'short',
				);
			}
		}
	}, [ loaderRef ] );
	return (
		<>
			<div className="wppic-loading-placeholder">
				<div className="wppic-loading" ref={ loaderRef }>
					<Logo size="45" />
					<h2>{ props.label }</h2>
					<div className="wppic-spinner">
						<BarLoader
							color={ '#DB3939' }
							speedMultiplier={ 1 }
							cssOverride={ true }
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default LoadingScreen;
