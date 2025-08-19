import { useState } from 'react';
import classNames from 'classnames';
import { Button } from '@wordpress/components';
import { Loader2, ClipboardCheck, Database } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import SendCommand from '../../utils/SendCommand';
import SnackPop from '../SnackPop';

const CacheButton = ( { nonce } ) => {
	const [ clearing, setClearing ] = useState( false );
	const [ isCleared ] = useState( false );
	const [ clearPromise, setClearPromise ] = useState( null );

	const getCacheText = () => {
		if ( clearing ) {
			return __( 'Clearing…', 'wp-plugin-info-card' );
		}
		if ( isCleared ) {
			return __( 'Cache Cleared', 'wp-plugin-info-card' );
		}
		return __( 'Clear Cache', 'wp-plugin-info-card' );
	};

	const clearCache = async () => {
		const clearOptionsPromise = SendCommand( 'wppic_clear_cache', { nonce } );
		setClearPromise( clearOptionsPromise );
		setClearing( true );
		await clearOptionsPromise;
		setClearing( false );
	};

	const getCacheIcon = () => {
		if ( clearing ) {
			return () => <Loader2 />;
		}
		if ( isCleared ) {
			return () => <ClipboardCheck />;
		}
		return <Database />;
	};

	return (
		<>
			<Button
				variant="primary"
				onClick={ () => {
					clearCache();
				} }
				icon={ getCacheIcon() }
				iconSize="18"
				iconPosition="right"
				disabled={ clearing }
				className={
					classNames( 'wppic-btn wppic-btn-cache has-icon-right', {
						'is-saving': clearing && ! isCleared,
						'is-saved': isCleared,
					} ) }
				label={ getCacheText() }
			>
				{ getCacheText() }
			</Button>
			<SnackPop
				ajaxOptions={ clearPromise }
				loadingMessage={ __( 'Clearing Cache…', 'wp-plugin-info-card' ) }
			/>
		</>
	);
};
export default CacheButton;