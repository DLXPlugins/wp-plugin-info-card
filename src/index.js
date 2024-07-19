import { useState, useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useCommand } from '@wordpress/commands';
import { __ } from '@wordpress/i18n';
import { Modal, TextControl, Button } from '@wordpress/components';
import InfoCardIcon from './blocks/components/InfoCardIcon';

import './blocks/PluginInfoCard/block';
import './blocks/PluginInfoCardQuery/wppic-query';
import './blocks/SitePluginsCardGrid/block';
import './blocks/PluginScreenshotsInfoCard/block';
//import './blocks/EDDCardGrid/block';

/**
 * Add Block Category Icon.
 */
( function() {
	const InfoCardSVG = <InfoCardIcon fill="#DB3939" />;
	wp.blocks.updateCategory( 'wp-plugin-info-card', { icon: InfoCardSVG } );
}() );

const WPPicCommands = () => {
	const [ showAddPluginModal, setShowAddPluginModal ] = useState( false );
	const [ pluginValue, setPluginValue ] = useState( '' );
	const [ pluginTextInput, setPluginTextInput ] = useState( null );
	const [ showAddThemeModal, setShowAddThemeModal ] = useState( false );
	const [ themeValue, setThemeValue ] = useState( '' );
	const [ themeTextInput, setThemeTextInput ] = useState( null );

	// Select the plugin text input when the modal is opened.
	useEffect( () => {
		if ( pluginTextInput ) {
			pluginTextInput.focus();
		}
	}, [ pluginTextInput ] );

	// Select the theme text input when the modal is opened.
	useEffect( () => {
		if ( themeTextInput ) {
			themeTextInput.focus();
		}
	}, [ themeTextInput ] );

	useCommand(
		{
			name: 'add-wppic-plugin',
			label: 'Add Plugin',
			icon: <InfoCardIcon fill="#333" />,
			callback: () => {
				setPluginValue( '' );
				setShowAddPluginModal( true );
			},
		},
	);
	useCommand(
		{
			name: 'add-wppic-theme',
			label: 'Add Theme',
			icon: <InfoCardIcon fill="#333" />,
			callback: () => {
				setThemeValue( '' );
				setShowAddThemeModal( true );
			},
		},
	);
	return (
		<>
			{ showAddPluginModal && (
				<Modal
					title="Add Plugin"
					onRequestClose={ () => setShowAddPluginModal( false ) }
				>
					<TextControl
						label="Plugin Slug"
						value={ pluginValue }
						onChange={ ( newValue ) => {
							setPluginValue( newValue );
						} }
						ref={ setPluginTextInput }
					/>
					<Button
						variant="primary"
						onClick={ () => {
							const regex = /https:\/\/wordpress\.org\/plugins\/([a-z0-9-]+)\/?/i;
							const slugRegex = /([a-z0-9-]+)\/?/i;
							const match = regex.exec( pluginValue );
							const slugMatch = slugRegex.exec( pluginValue );

							if ( match ) {
								wp.data.dispatch( 'core/editor' ).insertBlocks( [
									wp.blocks.createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
										slug: match[ 1 ],
										type: 'plugin',
										loading: false,
										defaultsApplied: false,
									} ),
								] );

								// Select the new block.
								const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
								const newBlock = blocks[ blocks.length - 1 ];
								wp.data.dispatch( 'core/block-editor' ).selectBlock( newBlock.clientId );
							} else if ( slugMatch ) {
								wp.data.dispatch( 'core/editor' ).insertBlocks( [
									wp.blocks.createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
										slug: slugMatch[ 1 ],
										type: 'plugin',
										loading: false,
										defaultsApplied: false,
									} ),
								] );

								// Select the new block.
								const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
								const newBlock = blocks[ blocks.length - 1 ];
								wp.data.dispatch( 'core/block-editor' ).selectBlock( newBlock.clientId );
							}
							setShowAddPluginModal( false );
						} }
					>
						{ __( 'Add Plugin', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						variant="secondary"
						onClick={ () => {
							setShowAddPluginModal( false );
							setPluginValue( '' );
						} }
					>
						{ __( 'Cancel', 'wp-plugin-info-card' ) }
					</Button>
				</Modal>
			) }
			{ showAddThemeModal && (
				<Modal
					title="Add Theme"
					onRequestClose={ () => setShowAddThemeModal( false ) }
				>
					<TextControl
						label="Theme Slug"
						value={ themeValue }
						onChange={ ( newValue ) => {
							setThemeValue( newValue );
						} }
						ref={ setThemeTextInput }
					/>
					<Button
						variant="primary"
						onClick={ () => {
							const regex = /https:\/\/wordpress\.org\/themes\/([a-z0-9-]+)\/?/i;
							const slugRegex = /([a-z0-9-]+)\/?/i;
							const match = regex.exec( themeValue );
							const slugMatch = slugRegex.exec( themeValue );

							if ( match ) {
								wp.data.dispatch( 'core/editor' ).insertBlocks( [
									wp.blocks.createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
										slug: match[ 1 ],
										type: 'theme',
										loading: false,
										defaultsApplied: false,
									} ),
								] );

								// Select the new block.
								const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
								const newBlock = blocks[ blocks.length - 1 ];
								wp.data.dispatch( 'core/block-editor' ).selectBlock( newBlock.clientId );
							} else if ( slugMatch ) {
								wp.data.dispatch( 'core/editor' ).insertBlocks( [
									wp.blocks.createBlock( 'wp-plugin-info-card/wp-plugin-info-card', {
										slug: slugMatch[ 1 ],
										type: 'theme',
										loading: false,
										defaultsApplied: false,
									} ),
								] );

								// Select the new block.
								const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
								const newBlock = blocks[ blocks.length - 1 ];
								wp.data.dispatch( 'core/block-editor' ).selectBlock( newBlock.clientId );
							}
							setShowAddThemeModal( false );
						} }
					>
						{ __( 'Add Theme', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						variant="secondary"
						onClick={ () => {
							setShowAddThemeModal( false );
							setThemeValue( '' );
						} }
					>
						{ __( 'Cancel', 'wp-plugin-info-card' ) }
					</Button>
				</Modal>
			) }
		</>
	);
};

registerPlugin(
	'wp-plugin-info-card-commands',
	{
		render: WPPicCommands,
	}
)
