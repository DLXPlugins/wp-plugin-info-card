import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { DataViews } from '@wordpress/dataviews';
import { addQueryArgs, getQueryArgs } from '@wordpress/url';
import {
	Plug2,
	Plus,
	Cog,
	BookText,
	ExternalLink,
	Download,
	CloudDownload,
	DatabaseZap,
} from 'lucide-react';
import PluginIcon from '../../../components/PluginIcon';
import sendCommand from '../../../utils/SendCommand';
import ImportPluginModal from './import-plugin-modal';
import SnackStatus from '../../../components/SnackStatus';
import CacheButton from '../../../components/CacheButton';
import CacheOptionsButton from '../../../components/CacheOptionsButton';

const defaultLayouts = {
	grid: {
		layout: {
			titleField: 'title',
			mediaField: 'plugin-info',
			showMedia: true,
		},
	},
	table: {
		layout: {
			titleField: 'title',
			mediaField: 'plugin-info',
			showMedia: true,
		},
	},
};
const fields = [
	{
		id: 'title',
		label: __( 'Title', 'wp-plugin-info-card' ),
		render: ( { item } ) => {
			return (
				<div className="wppic-custom-plugin-title-wrapper">
					<div className="wppic-custom-plugin-title">{ item.title }</div>
					<div className="wppic-custom-plugin-slug">{ item.slug }</div>
				</div>
			);
		},
		enableSorting: true,
		enableHiding: false,
		enableGlobalSearch: true,
	},
	{
		id: 'plugin-info',
		label: __( 'Plugin Info', 'wp-plugin-info-card' ),
		getValue: ( { item } ) => {
			let itemIcon = wppicAdminCustomPlugin.defaultPluginIcon;
			if ( item.icon ) {
				itemIcon = item.icon;
			}
			return (
				<>
					<div className="wppic-plugin-info-card-img">
						<img src={ itemIcon } alt={ item.title } style={ { maxWidth: '512px', height: 'auto' } } />
					</div>
				</>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
const PluginHome = ( props ) => {
	const [ selectedItems, setSelectedItems ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ customPlugins, setCustomPlugins ] = useState( [] );
	const [ showImportModal, setShowImportModal ] = useState( false );
	const [ snackbarOptions, setSnackbarOptions ] = useState( {
		isVisible: false,
		type: 'info',
		message: '',
		title: '',
		politeness: 'polite',
	} );

	const navigate = useNavigate();

	const actions = [
		{
			id: 'edit',
			icon: 'edit',
			label: __( 'Edit Plugin', 'wp-plugin-info-card' ),
			callback: ( items ) => {
				const item = items[ 0 ];
				navigate( {
					to: `/edit/${ item.id }/${ item.editNonce }`,
				} );
			},
			isPrimary: true,
		},
		{
			id: 'delete',
			hideModalHeader: true,
			icon: 'trash',
			label: __( 'Delete Plugin', 'wp-plugin-info-card' ),
			callback: async ( items ) => {
				setShowDeleteModal( { display: true, items } );
			},
			isPrimary: true,
			isDestructive: true,
			supportsBulk: true,
			modalFocusOnMount: 'firstContentElement',

		},
		{
			id: 'export',
			hideModalHeader: true,
			icon: 'download',
			label: __( 'Export Plugin', 'wp-plugin-info-card' ),
			callback: async ( items ) => {
				const pluginIds = items.map( ( item ) => item.id );
				// Get current item.
				const exportUrl = ajaxurl + '?action=wppic_export_custom_plugin&nonce=' + wppicAdminCustomPlugin.exportNonce + '&pluginIds=' + pluginIds.join( ',' );
				window.open( exportUrl );
			},
			isPrimary: false,
			isDestructive: false,
			supportsBulk: true,
			modalFocusOnMount: 'firstContentElement',

		},
		{
			id: 'copy-rest-url',
			icon: 'copy',
			label: __( 'Copy REST URL', 'wp-plugin-info-card' ),
			callback: async ( items ) => {
				const item = items[ 0 ];
				const restUrl = wppicAdminCustomPlugin.customPluginsRestBase + item.slug + '/' + item.restApiPasscode;
				try {
					const copyBlob = new Blob( [ restUrl ], { type: 'text/plain' } );
					const data = [ new ClipboardItem( { [ copyBlob.type ]: copyBlob } ) ];
					navigator.clipboard.write( data );

					setSnackbarOptions( {
						isVisible: true,
						type: 'success',
						message: __( 'REST URL copied to clipboard.', 'wp-plugin-info-card' ),
						title: __( 'Success', 'wp-plugin-info-card' ),
						politeness: 'polite',
					} );
				} catch ( e ) {
					// Try another method.
					navigator.clipboard.writeText( restUrl );
				}
			},
			isPrimary: false,
			supportsBulk: false,
			isEligible: ( item ) => {
				return 'true' === item.enableRestApi;
			},
		},
	];

	const [ view, setView ] = useState( {
		type: 'table',
		previewSize: 'medium',
		paginationInfo: {
			totalItems: customPlugins.length,
			totalPages: 0,
		},
		page: 1,
		perPage: 20,
		sort: {
			field: 'title',
			direction: 'asc',
		},
		titleField: 'title',
		mediaField: 'plugin-info',
		layout: defaultLayouts.grid.layout,
		fields: [ ...fields ],
	} );
	const fetchData = async ( { order = 'ASC', orderby = 'title', page = 1, perPage = 20, search = '' } ) => {
		setLoading( true );
		const response = await sendCommand( 'wppic_get_custom_plugins', {
			nonce: wppicAdminCustomPlugin.getCustomPlugins,
			order,
			orderby,
			paged: page,
			perPage,
			search,
		} );
		setLoading( false );
		const responseData = response.data;
		if ( responseData.success ) {
			setCustomPlugins( responseData.data.customPlugins );
		} else {
			// todo - error handling.
		}
	};
	useEffect( () => {
		fetchData( {} );
	}, [] );

	/**
	 * When a view is changed, we need to adjust the fields and showMedia based on the view type.
	 *
	 * @param {Object} newView The new view object.
	 */
	const onChangeView = ( newView ) => {
		fetchData( {
			order: newView.sort.direction,
			orderby: newView.sort.field,
			page: newView.page,
			perPage: newView.perPage,
			search: newView.search,
		} );
		setView( newView );
		// Create query args object with view state.
		// const changeQueryArgs = {
		// 	page: parseInt( getQueryArgs( window.location.href ).paged ) || 1,
		// 	per_page: newView.perPage,
		// 	view_type: newView.type,
		// };

		// setView( {
		// 	...newView,
		// 	paginationInfo: {
		// 		totalItems: customPlugins.length,
		// 		totalPages: Math.ceil( customPlugins.length / newView.perPage ),
		// 		page: changeQueryArgs.page + 1,
		// 		perPage: changeQueryArgs.per_page,
		// 	},
		// } );

		// // Only add search if it exists.
		// if ( newView.search ) {
		// 	queryArgs.search = newView.search;
		// }

		// // Add sort parameters if they exist.
		// if ( newView.sort?.field ) {
		// 	queryArgs.orderby = newView.sort.field;
		// 	queryArgs.order = newView.sort.direction;
		// }

		// // Update URL without page reload using addQueryArgs.
		// const newUrl = addQueryArgs( window.location.pathname, queryArgs );
		// window.history.pushState( {}, '', newUrl );

		// Update the view state.
		//setView( newView );
	};

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				{
					showDeleteModal.display && (
						<Modal
							title={ __( 'Delete Plugin', 'wp-plugin-info-card' ) }
							onRequestClose={ () => setShowDeleteModal( { display: false, items: null } ) }
						>
							<p>{ __( 'Are you sure you want to delete this plugin?', 'wp-plugin-info-card' ) }</p>
							<div className="wppic-admin-buttons">
								<Button
									variant="primary"
									onClick={ async () => {
										setLoading( true );
										const pluginIds = [];
										showDeleteModal.items.forEach( ( item ) => {
											pluginIds.push( item.id );
										} );
										const response = await sendCommand( 'wppic_delete_custom_plugin', {
											nonce: wppicAdminCustomPlugin.deleteCustomPlugin,
											pluginIds,
										} );
										setLoading( false );
										const responseData = response.data;
										if ( responseData.success ) {
											setSnackbarOptions( {
												isVisible: true,
												type: 'success',
												message: __( 'Plugin deleted successfully.', 'wp-plugin-info-card' ),
												title: __( 'Success', 'wp-plugin-info-card' ),
												politeness: 'polite',
											} );
											setShowDeleteModal( { display: false, items: null } );
											// Now remove from customPlugins array.
											setCustomPlugins( customPlugins.filter( ( plugin ) => ! pluginIds.includes( plugin.id ) ) );
											
										} else {
											// todo - error handling.
										}
									} }
									isDestructive={ true }
								>
									{ __( 'Delete', 'wp-plugin-info-card' ) }
								</Button>
								<Button
									variant="secondary"
									onClick={ () => setShowDeleteModal( { display: false, items: null } ) }
								>
									{ __( 'Cancel', 'wp-plugin-info-card' ) }
								</Button>
							</div>
						</Modal>
					)
				}
				<div className="wppic-admin-panel-options-wrapper">
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<PluginIcon />
								{ __( 'Custom Plugin Cards', 'wp-plugin-info-card' ) }
							</h2>
							<p className="description">
								{ __(
									'Add a custom plugin, enable a REST API endpoint, and share the plugin with the world in beautiful cards.',
									'wp-plugin-info-card',
								) }
							</p>
							<DataViews
								data={ customPlugins }
								fields={ fields }
								actions={ actions }
								label={ __( 'Plugins', 'wp-plugin-info-card' ) }
								view={ view }
								onChangeView={ onChangeView }
								paginationInfo={ {
									totalItems: customPlugins.length,
									totalPages: Math.ceil( customPlugins.length / view.perPage ),
								} }
								perPageSizes={ [ 10, 25, 50, 100 ] }
								selection={ selectedItems }
								onChangeSelection={ setSelectedItems }
								defaultLayouts={ defaultLayouts }
								searchLabel={ __( 'Search Plugins', 'wp-plugin-info-card' ) }
								isLoading={ loading }
							/>
						</div>
					</div>
				</div>
				<div className="wppic-admin-panel-sidebar">
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<Plug2 />
							{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Add a new plugin to the list of plugins.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="primary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								navigate( { to: '/new-plugin' } );
							} }
							iconPosition="left"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <Plus /> }
						>
							{ __( 'Add New Plugin', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<CloudDownload />
							{ __( 'Import Plugin', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Import a plugin from a REST API endpoint.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								setShowImportModal( true );
							} }
							iconPosition="left"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <Download /> }
						>
							{ __( 'Import Plugin', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<Cog />
							{ __( 'Advanced Settings', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Configure REST API settings and other advanced options.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="#"
							onClick={ ( e ) => {
								e.preventDefault();
								navigate( { to: '/advanced' } );
							} }
							iconPosition="right"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							icon={ () => <Cog /> }
						>
							{ __( 'Configure Settings', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<DatabaseZap />
							{ __( 'Cache Options', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'WP Plugin Info Card uses a cache system to improve performance. You can clear the cache manually by clicking the button below.',
								'wp-plugin-info-card',
							) }
						</p>
						<CacheButton nonce={ wppicAdminCustomPlugin.clearCacheNonce } />
						<p>
							{ __(
								'WP Plugin Info Card stores plugin and theme data as options in case the transient cache fails to update or errors out. You can remove these options by clicking the button below.',
								'wp-plugin-info-card',
							) }
						</p>
						<CacheOptionsButton nonce={ wppicAdminCustomPlugin.clearCacheNonce } />
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Learn more about custom plugins and how to use them in WP Plugin Info Card.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="secondary"
							href="https://docs.dlxplugins.com/wp-plugin-info-card/"
							className="wppic-btn wppic-btn-alt has-icon-right btn-full-width"
							target="_blank"
							onClick={ ( e ) => {
								e.preventDefault();
								window.open( 'https://docs.dlxplugins.com/wp-plugin-info-card/', '_blank' );
							} }
							rel="noopener noreferrer"
							icon={ () => <ExternalLink /> }
						>
							{ __( 'View Documentation', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</div>
			</div>
			{ showImportModal && <ImportPluginModal onClose={ () => {
				setShowImportModal( false ); fetchData( {} );
			} } /> }
			<SnackStatus snackbarOptions={ snackbarOptions } onTimeout={ () => {
				const newSnackbarOptions = {
					...snackbarOptions,
					isVisible: false,
				};
				setSnackbarOptions( newSnackbarOptions );
			} } />
		</>
	);
};

export default PluginHome;
