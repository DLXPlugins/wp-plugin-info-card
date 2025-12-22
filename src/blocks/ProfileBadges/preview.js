import React, { useState, useEffect } from 'react';

import {
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	PanelRow,
	ButtonGroup,
	BaseControl,
	RangeControl,
	Button,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { badges as badgeMap } from '../components/Badges';
import NumbersComponent from '../components/Numbers';

const Preview = ( props ) => {
	const blockUniqueId = useInstanceId( Preview, 'wp-plugin-info-card-badges' );

	const {
		attributes,
		setAttributes,
		onEdit,
	} = props;

	const [ loading, setLoading ] = useState( true );

	const {
		badges,
		colGap,
		rowGap,
		cols,
		layout,
		baseSize,
		headingColor,
		hideHeading,
	} = attributes;

	useEffect( () => {
		// Reorder badges by alphabetical order and then show the interface(label).
		badges.sort( ( a, b ) => a.label.localeCompare( b.label ) );

		// Recursively update the badge order. This is needed for the future if I introduce drag and drop reordering.
		badges.forEach( ( badge, index ) => {
			badge.order = index + 1;
		} );
		if ( loading ) {
			// This makes sure reordering is only done initially.
			if ( badges !== attributes.badges ) {
				setAttributes( { badges: [ ...badges ] } );
			}
			setLoading( false );
		}
	}, [ badges ] );

	useEffect( () => {
		setAttributes( { uniqueId: blockUniqueId } );
	}, [] );

	/**
	 * Retrieve colums interface for sidebar options.
	 *
	 * @return {Element} The columns interface.
	 */
	const getCols = () => {
		return (
			<BaseControl id="col-count" label={ __( 'Select How Many Columns', 'wp-plugin-info-card' ) }>
				<ButtonGroup>
					<Button
						variant={ cols === 1 ? 'primary' : 'secondary' }
						onClick={ () => {
							setAttributes( {
								cols: 1,
							} );
						} }
					>
						{ __( 'One', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						variant={ cols === 2 ? 'primary' : 'secondary' }
						onClick={ () => {
							setAttributes( {
								cols: 2,
							} );
						} }
					>
						{ __( 'Two', 'wp-plugin-info-card' ) }
					</Button>
					<Button
						variant={ cols === 3 ? 'primary' : 'secondary' }
						onClick={ () => {
							setAttributes( {
								cols: 3,
							} );
						} }
					>
						{ __( 'Three', 'wp-plugin-info-card' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
		);
	};

	const inspectorControls = (
		<>
			<InspectorControls>
				{
					<PanelBody title={ __( 'Layout', 'wp-plugin-info-card' ) }>
						<SelectControl
							label={ __( 'Badge Layout', 'wp-plugin-info-card' ) }
							options={ [
								{ value: 'horizontal', label: __( 'Horizontal', 'wp-plugin-info-card' ) },
								{ value: 'centered', label: __( 'Centered', 'wp-plugin-info-card' ) },
							] }
							value={ layout }
							onChange={ ( value ) => {
								setAttributes( { layout: value } );
							} }
						/>
						<ToggleControl
							label={ __( 'Hide Heading', 'wp-plugin-info-card' ) }
							checked={ hideHeading }
							onChange={ ( value ) => {
								setAttributes( { hideHeading: value } );
							} }
						/>
						<PanelRow className="wppic-panel-rows-cols">
							{ getCols() }
						</PanelRow>
						<PanelRow className="wppic-panel-rows-numbers">
							<NumbersComponent
								value={ colGap }
								label={ __( 'Column Gap (in px)', 'wp-plugin-info-card' ) }
								numbers={ [ 20, 40, 60, 80 ] }
								onClick={ ( value ) => {
									setAttributes( { colGap: parseInt( value ) } );
								} }
								id="wppic-col-gap"
							/>
						</PanelRow>
						<PanelRow className="wppic-panel-rows-numbers">
							<NumbersComponent
								value={ rowGap }
								label={ __( 'Row Gap (in px)', 'wp-plugin-info-card' ) }
								numbers={ [ 20, 40, 60, 80 ] }
								onClick={ ( value ) => {
									setAttributes( { rowGap: parseInt( value ) } );
								} }
								id="wppic-row-gap"
							/>
						</PanelRow>
					</PanelBody>
				}
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title={ __( 'Badge and Heading Size', 'wp-plugin-info-card' ) }>
					<RangeControl
						label={ __( 'Base Size', 'wp-plugin-info-card' ) }
						value={ baseSize }
						onChange={ ( value ) => {
							setAttributes( { baseSize: parseInt( value ) } );
						} }
						help={ __( 'This is the base size of the badges and heading.', 'wp-plugin-info-card' ) }
						step={ 1 }
						min={ 1 }
						max={ 96 }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Heading Color', 'wp-plugin-info-card' ) }>
					<ColorPalette
						value={ headingColor }
						onChange={ ( value ) => {
							setAttributes( { headingColor: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);

	const toolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon="edit"
					title={ __(
						'Edit and Configure',
						'wp-plugin-info-card',
					) }
					onClick={ () => onEdit() }
				/>
			</ToolbarGroup>
		</BlockControls>
	);

	if ( loading ) {
		return null;
	}

	const gridStyles = `
		#${ blockUniqueId }.wppic-badges-grid {
			--wppic-grid-row-gap: ${ rowGap }px;
			--wppic-grid-col-gap: ${ colGap }px;
			--wppic-base-size: ${ baseSize }px;
			--wppic-heading-color: ${ headingColor };
		}
	`;

	return (
		<>
			{ inspectorControls }
			{ toolbar }
			<style>{ gridStyles }</style>
			<>
				{
					badges && badges.length > 0 && (
						badges.map( ( badge ) => {
							let image = null;
							const badgeData = badgeMap.find( ( b ) => b.class === badge.class );
							if ( ! badgeData ) {
								return null;
							}
							if ( 'image' === badgeData.iconType ) {
								image = <img src={ badgeData.icon } alt={ badgeData.name } />;
							} else {
								image = <span className={ `dashicons ${ badgeData.class } ${ badgeData.icon }` }></span>;
							}
							return (
								<div key={ badge.class + badge.order } className="wppic-profile-badge">
									{ ! hideHeading && (
										<h3 className="wppic-profile-badge-title">
											{
												badgeData.label
											}
										</h3>
									) }
									<div className={ `badge ${ badgeData.class } ` }>
										{
											image
										}
									</div>
								</div>
							);
						} )
					)
				}
			</>
		</>
	);
};
export default Preview;
