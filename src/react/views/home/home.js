import React, { useState, Suspense, useCallback, useRef } from 'react';
import update from 'immutability-helper'
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import { useAsyncResource } from 'use-async-resource';
import { __ } from '@wordpress/i18n';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { isURL, cleanForSlug } from '@wordpress/url';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BeatLoader from 'react-spinners/BeatLoader';
import SaveResetButtons from '../../components/SaveResetButtons';

import {
	TextControl,
	Button,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import {
	AlertCircle,
	PlusCircle,
	ExternalLink,
	DatabaseZap,
	Cog,
	BookText,
	XCircle,
} from 'lucide-react';
import ErrorBoundary from '../../components/ErrorBoundary';
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';

const Plugin = ( { slug, index, movePlugin } ) => {
	const ref = useRef( null );
	const [ spec, dropRef ] = useDrop( {
		accept: 'plugin',
		drop: ( item, monitor ) => {
			if ( ! monitor.didDrop() ) {
				if ( item.index !== index ) {
					movePlugin( item.index, index );
				}
			}
		},
		collect: ( monitor ) => ( {
			canDrop: monitor.canDrop(),
			isOver: monitor.isOver(),
			handlerId: monitor.getHandlerId(),
		} ),
		hover( item, monitor ) {
			if ( ! ref.current ) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if ( dragIndex === hoverIndex ) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY =
				( hoverBoundingRect.bottom - hoverBoundingRect.top ) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if ( dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) {
				return;
			}
			// Dragging upwards
			if ( dragIndex > hoverIndex && hoverClientY > hoverMiddleY ) {
				return;
			}
			// Time to actually perform the action
			movePlugin( dragIndex, hoverIndex );
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	} );
	const [ { opacity, isDragging }, dragRef ] = useDrag( {
		type: 'plugin',
		item: () => {
			return { index };
		},
		collect: ( monitor ) => ( {
			opacity: monitor.isDragging() ? 0.4 : 1,
			isDragging: monitor.isDragging(),
		} ),
	} );
	const dragDropRef = dragRef( dropRef( ref ) );
	const classes = classNames( 'wppic-plugin-drag', {
		'is-dragging': isDragging,
		'can-drop': spec.canDrop,
		'is-over': spec.isOver,
	} );
	return (
		<div
			className={ classes }
			ref={ dragDropRef }
			style={ { opacity } }
			data-handler-id={ spec.handlerId }
		>
			<div className="wppic-org-asset-label">{ slug }</div>
			<Button
				className="button-reset wppic-close-btn"
				variant="secondary"
				label={ __( 'Remove Plugin', 'wp-plugin-info-card' ) }
				onClick={ () => {
					console.log( 'remove ' + slug );
				} }
				icon={ () => <XCircle /> }
			/>
		</div>
	);
};

const AddPlugin = ( props ) => {
	const [ value, setValue ] = useState( '' );
	return (
		<div className="wppic-add-plugin-wrapper">
			<TextControl
				label={ __( 'Plugin Slug', 'wp-plugin-info-card' ) }
				value={ value }
				onChange={ ( newValue ) => {
					if ( isURL( newValue ) ) {
						return;
					}
					setValue( newValue );
				} }
				onPaste={ ( event ) => {
					// Get contents from clipboard.
					const clipboardData = event.clipboardData
						.getData( 'text/plain' )
						.trim();

					if ( isURL( clipboardData ) ) {
						// Extract out the slug from the URL.
						const urlRegex = /([^/]*)\/$/;
						const newSlug = urlRegex.exec(
							clipboardData,
						)[ 1 ];
						setValue( newSlug );
					}
				} }
				help={ __(
					'Enter the plugin slug. Example: "wp-plugin-info-card".',
					'wp-plugin-info-card',
				) }
			/>
			<Button
				className="wppic-btn has-icon-right "
				variant="secondary"
				label={ __( 'Add Plugin', 'wp-plugin-info-card' ) }
				onClick={ () => {
					const sanitizedSlug = cleanForSlug( value );
					props.onChange( sanitizedSlug );
					setValue( '' );
				} }
				icon={ () => <PlusCircle /> }
			>
				{ __( 'Add Plugin', 'wp-plugin-info-card' ) }
			</Button>
		</div>
	);
};

const retrieveHomeOptions = () => {
	return SendCommand( 'wppic_get_home_options', {
		nonce: wppicAdminHome.getNonce,
	} );
};

const HomeScreen = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveHomeOptions, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load Home options.', 'wp-plugin-info-card' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<>
						<div className="wppic-admin-panel-loading">
							<h2>{ __( 'Loading Options', 'wp-plugin-info-card' ) }</h2>
							<BeatLoader
								color={ '#DB3939' }
								loading={ true }
								cssOverride={ true }
								size={ 25 }
								speedMultiplier={ 0.65 }
							/>
						</div>
					</>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

const Interface = ( props ) => {
	const { defaults } = props;
	const response = defaults();
	const { data, success } = response.data;

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setValue,
		setError,
		trigger,
	} = useForm( {
		defaultValues: {
			default_layout: data.default_layout,
			colorscheme: data.colorscheme,
			widget: data.widget,
			ajax: data.ajax,
			enqueue: data.enqueue,
			credit: wppicAdminHome.credit,
			cache_expiration: data.cache_expiration,
			list: data.list ?? [],
			'theme-list': data[ 'theme-list' ] ?? [],
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	const movePlugin = useCallback( ( dragIndex, hoverIndex ) => {
		const prevPlugins = getValues( 'list' );
		const dragItem = prevPlugins[ dragIndex ];
		const hoverItem = prevPlugins[ hoverIndex ];
		const newPlugins = [];
		console.log( prevPlugins );
		prevPlugins.forEach( ( plugin, index ) => {
			if ( index !== dragIndex && index !== hoverIndex ) {
				newPlugins.push( plugin );
			} else {
				if ( index === hoverIndex && dragIndex < hoverIndex ) {
					newPlugins.push( hoverItem );
					newPlugins.push( dragItem );
				}
				if ( index === hoverIndex && dragIndex > hoverIndex ) {
					newPlugins.push( dragItem );
					newPlugins.push( hoverItem );
				}
			}
		} );
		setValue( 'list', newPlugins );
	}, [] );

	/**
	 * Placeholder for submit event.
	 *
	 * @param {Object} formData contains the form data.
	 */
	const onSubmit = ( formData ) => { };

	const getPlugins = () => {
		const { list } = formValues;
		if ( list.length > 0 ) {
			return (
				<>
					{ list.map( ( item, index ) => {
						return (
							<div className="wppic-org-asset-row" key={ index }>
								<Controller
									name={ `list[${ index }]` }
									key={ index }
									control={ control }
									rules={ { required: true } }
									render={ ( { field: { onChange, value } } ) => (
										<TextControl
											value={ value }
											onChange={ onChange }
											type="hidden"
										/>
									) }
								/>
								<div className="wppic-org-asset-row__actions">
									<Plugin slug={ item } index={ index } movePlugin={ movePlugin } />
								</div>
							</div>
						);
					} ) }
				</>
			);
		}
	};

	return (
		<>
			<div className="wppic-admin-panel-container with-sidebar">
				<div className="wppic-admin-panel-options-wrapper">
					<div className="wppic-admin-panel-area">
						<div className="wppic-admin-panel-area__section">
							<h2>
								<Cog />
								{ __( 'Settings', 'wp-plugin-info-card' ) }
							</h2>
							<p className="description">
								{ __(
									'Set the defaults for WP Plugin Info Card.',
									'wp-plugin-info-card',
								) }
							</p>
							<form onSubmit={ handleSubmit( onSubmit ) }>
								<table className="form-table form-table-row-sections">
									<tbody>
										<tr>
											<th scope="row">
												{ __( 'Layout and Colors', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="default_layout"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																label={ __(
																	'Default Layout',
																	'wp-plugin-info-card',
																) }
																value={ value }
																options={ [
																	{
																		label: __( 'Card', 'wp-plugin-info-card' ),
																		value: 'default',
																	},
																	{
																		label: __(
																			'WordPress Appearance',
																			'wp-plugin-info-card',
																		),
																		value: 'wordpress',
																	},
																	{
																		label: __(
																			'Large Card Layout',
																			'wp-plugin-info-card',
																		),
																		value: 'large',
																	},
																	{
																		label: __(
																			'Flex Layout',
																			'wp-plugin-info-card',
																		),
																		value: 'flex',
																	},
																] }
																onChange={ onChange }
															/>
														) }
													/>
												</div>
												<div className="wppic-admin-row">
													<Controller
														name="colorscheme"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<SelectControl
																label={ __(
																	'Color Scheme',
																	'wp-plugin-info-card',
																) }
																value={ value }
																options={ [
																	/* Color Schemes 1-14 */
																	{
																		label: __( 'Default', 'wp-plugin-info-card' ),
																		value: 'default',
																	},
																	{
																		label: __(
																			'Color Scheme 1',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme1',
																	},
																	{
																		label: __(
																			'Color Scheme 2',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme2',
																	},
																	{
																		label: __(
																			'Color Scheme 3',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme3',
																	},
																	{
																		label: __(
																			'Color Scheme 4',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme4',
																	},
																	{
																		label: __(
																			'Color Scheme 5',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme5',
																	},
																	{
																		label: __(
																			'Color Scheme 6',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme6',
																	},
																	{
																		label: __(
																			'Color Scheme 7',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme7',
																	},
																	{
																		label: __(
																			'Color Scheme 8',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme8',
																	},
																	{
																		label: __(
																			'Color Scheme 9',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme9',
																	},
																	{
																		label: __(
																			'Color Scheme 10',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme10',
																	},
																	{
																		label: __(
																			'Color Scheme 11',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme11',
																	},
																	{
																		label: __(
																			'Color Scheme 12',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme12',
																	},
																	{
																		label: __(
																			'Color Scheme 13',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme13',
																	},
																	{
																		label: __(
																			'Color Scheme 14',
																			'wp-plugin-info-card',
																		),
																		value: 'scheme14',
																	},
																] }
																onChange={ onChange }
															/>
														) }
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Scripts and Styles', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="widget"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Force Enqueue Scripts and Styles',
																	'wp-plugin-info-card',
																) }
																checked={ value }
																onChange={ onChange }
																help={ __(
																	'By default the plugin enqueues scripts (JS & CSS) only for pages containing the shortcode. If you wish to force scripts enqueuing, check this box.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">{ __( 'Cache', 'wp-plugin-info-card' ) }</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="cache_expiration"
														control={ control }
														rules={ { required: true } }
														render={ ( { field: { onChange, value } } ) => (
															<TextControl
																label={ __(
																	'Cache Expiration',
																	'wp-plugin-info-card',
																) }
																value={ value }
																onChange={ onChange }
																help={ __(
																	'Set the cache expiration in seconds. Default is 3600 seconds (1 hour).',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
													{ 'required' === errors.cache_expiration?.type && (
														<Notice
															message={ __(
																'This is a required field.',
																'wp-plugin-info-card',
															) }
															status="error"
															politeness="assertive"
															inline={ false }
															icon={ () => <AlertCircle /> }
														/>
													) }
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{ __( 'Dashboard Widget', 'wp-plugin-info-card' ) }
											</th>
											<td>
												<div className="wppic-admin-row">
													<Controller
														name="widget"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Enable Dashboard Widget',
																	'wp-plugin-info-card',
																) }
																checked={ value }
																onChange={ onChange }
																help={ __(
																	'Check this box to enable the Dashboard Widget.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</div>
												<div className="wppic-admin-row">
													<Controller
														name="ajax"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Enable Ajax Loading',
																	'wp-plugin-info-card',
																) }
																checked={ value }
																onChange={ onChange }
																help={ __(
																	'Check this box to enable the Ajax loading of the Dashboard Widget.',
																	'wp-plugin-info-card',
																) }
															/>
														) }
													/>
												</div>
												<div className="wppic-admin-row">
													<AddPlugin
														onChange={ ( value ) => {
															const oldPlugins = getValues( 'list' );
															const newPlugins = [ ...oldPlugins, value ];
															setValue( 'list', newPlugins );
														} }
													/>
												</div>
												<div className="wppic-admin-row">{ getPlugins() }</div>
											</td>
										</tr>
									</tbody>
								</table>
								<SaveResetButtons
									formValues={ formValues }
									setError={ setError }
									reset={ reset }
									errors={ errors }
									isDirty={ isDirty }
									dirtyFields={ dirtyFields }
									trigger={ trigger }
								/>
							</form>
						</div>
					</div>
				</div>
				<div className="wppic-admin-panel-sidebar">
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
						<Button
							variant="primary"
							onClick={ () => {
								console.log( 'clicked' );
							} }
							className="wppic-btn"
							label={ __( 'Clear Cache', 'wp-plugin-info-card' ) }
						>
							{ __( 'Clear Cache', 'wp-plugin-info-card' ) }
						</Button>
					</div>
					<div className="wppic-admin-panel-sidebar-card">
						<h3>
							<BookText />
							{ __( 'Documentation', 'wp-plugin-info-card' ) }
						</h3>
						<p>
							{ __(
								'Find out how to use WP Plugin Info Card, its blocks, and its shortcodes.',
								'wp-plugin-info-card',
							) }
						</p>
						<Button
							variant="primary"
							onClick={ () => {
								console.log( 'clicked' );
							} }
							className="wppic-btn has-icon-right btn-full-width"
							icon={ () => <ExternalLink /> }
							iconPosition="right"
						>
							{ __( 'English Documentation', 'wp-plugin-info-card' ) }
						</Button>
						<Button
							variant="primary"
							onClick={ () => {
								console.log( 'clicked' );
							} }
							className="wppic-btn has-icon-right btn-full-width"
							icon={ () => <ExternalLink /> }
							iconPosition="right"
						>
							{ __( 'French Documentation', 'wp-plugin-info-card' ) }
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default HomeScreen;
