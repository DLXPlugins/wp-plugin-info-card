/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */
import './editor.scss';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import rgb2hex from 'rgb2hex';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

import {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
	ColorPalette,
	Button,
} from '@wordpress/components';

const ColorPickerControl = ( props ) => {
	const [ colorKey, setColorKey ] = useState( props.slug );
	const [ isVisible, setIsVisible ] = useState( false );
	const [ color, setColor ] = useState( props.value );
	const [ opacity, setOpacity ] = useState( props.opacity );

	const {
		defaultColor,
		defaultColors,
		value,
		onChange,
		onOpacityChange,
		label,
		alpha = false,
		slug,
		hideLabelFromVision = false,
	} = props;

	useEffect( () => {
		setColor( value );
	}, [ value ] );

	/**
	 * Return a color based on passed alpha value.
	 *
	 * @param {string} colorValue   hex, rgb, rgba, or CSS var.
	 * @param {number} opacityValue The opacity (from 0 - 1).
	 * @return {string} The color in hex, rgba, or CSS var format.
	 */
	const getColor = ( colorValue, opacityValue = 1 ) => {
		// Test for CSS var values in color value.
		if ( colorValue.indexOf( 'var(' ) === 0 ) {
			return colorValue;
		}

		// Test for RGBA at the beginning, and return value.
		if ( colorValue.indexOf( 'rgba' ) === 0 ) {
			// Calculate hex value from rgba.
			const hex = rgb2hex( colorValue ).hex;
			return hexToRgba( hex, opacityValue );
		}

		// Test for RGB at the beginning, and return hex if found.
		if ( colorValue.indexOf( 'rgb' ) === 0 ) {
			return hexToRgba( rgb2hex( colorValue ).hex, opacityValue );
		}

		if ( alpha ) {
			return hexToRgba( colorValue, opacityValue );
		}

		return colorValue;
	};

	// Retrieve colors while avoiding duplicates.
	const getDefaultColors = () => {
		const existingColors = [];
		const newColors = [];
		defaultColors.forEach( ( maybeNewColor, index ) => {
			if ( ! existingColors.includes( maybeNewColor.color ) ) {
				existingColors.push( maybeNewColor.color );
				newColors.push( maybeNewColor );
			}
		} );
		return newColors;
	};

	const opacityIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={ 24 }
			height={ 24 }
			viewBox="0 0 488.47 488.47"
		>
			<path d="M244.235 0S61.058 174.454 61.058 314.016c0 96.347 82.011 174.454 183.177 174.454s183.177-78.107 183.177-174.454C427.412 174.454 244.235 0 244.235 0zm0 91.588c46.976 52.953 97.174 123.655 114.946 183.177H129.292c17.771-59.522 67.968-130.223 114.943-183.177z" />
		</svg>
	);

	/**
	 * Toggle whether the color popup is showing.
	 */
	const toggleVisible = () => {
		setIsVisible( true );
	};

	/**
	 * Close color popup if visible.
	 */
	const toggleClose = () => {
		if ( isVisible ) {
			setIsVisible( false );
		}
	};

	return (
		<BaseControl className="wppic-component-color-picker-wrapper">
			{ ( !! label && ! hideLabelFromVision ) && (
				<h3 className="wppic-color-component-label">
					<span>{ label }</span>
				</h3>
			) }
			<div className="wppic-component-color-picker">
				<div className="wppic-color-picker-area wppic-component-color-picker-palette">
					{ ! isVisible && (
						<>
							<div
								className={ classnames(
									'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper wppic-color-picker-area wppic-component-color-picker-palette',

									value ? '' : 'components-color-palette__custom-color'
								) }
							>
								<Tooltip text={ __( 'Choose Color', 'wp-plugin-info-card' ) }>
									<button
										type="button"
										aria-expanded={ isVisible }
										className="components-button components-circular-option-picker__option is-pressed"
										onClick={ toggleVisible }
										aria-label={ __(
											'Custom color picker',
											'wp-plugin-info-card'
										) }
										style={ {
											background: getColor( color, opacity ),
										} }
									>
										<span className="components-color-palette__custom-color-gradient" />
									</button>
								</Tooltip>
							</div>
						</>
					) }

					{ isVisible && (
						<div
							className={ classnames(
								'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper wppic-color-picker-area wppic-component-color-picker-palette',

								value ? '' : 'components-color-palette__custom-color'
							) }
						>
							<Tooltip text={ __( 'Choose Color', 'wp-plugin-info-card' ) }>
								<button
									type="button"
									aria-expanded={ isVisible }
									className="components-button components-circular-option-picker__option is-pressed"
									onClick={ toggleClose }
									aria-label={ __(
										'Custom color picker',
										'wp-plugin-info-card'
									) }
									style={ {
										background: getColor( color, opacity ),
									} }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					) }

					{ isVisible && (
						<Popover
							className="wppic-component-color-picker"
							onClose={ toggleClose }
							noArrow={ false }
						>
							<BaseControl key={ colorKey }>
								<ColorPicker
									key={ colorKey }
									color={ color }
									onChangeComplete={ ( newColor ) => {
										const maybeNewColor = getColor( newColor.hex, opacity );
										setColor( maybeNewColor );
										onChange( slug, maybeNewColor );
									} }
									disableAlpha
									defaultValue={ defaultColor }
								/>
							</BaseControl>

							{ alpha && (
								<div className="wppic-component-color-opacity">
									<Tooltip text={ __( 'Opacity', 'wp-plugin-info-card' ) }>
										{ opacityIcon }
									</Tooltip>

									<RangeControl
										value={ opacity }
										onChange={ ( opacityValue ) => {
											const newColor = getColor( color, opacityValue );
											setOpacity( opacityValue );
											setColor( newColor );
											onChange( slug, newColor );
											onOpacityChange( opacityValue );
										} }
										min={ 0 }
										max={ 1 }
										step={ 0.01 }
										initialPosition={ 1 }
									/>
								</div>
							) }
							<BaseControl className="wppic-component-color-picker-palette">
								<ColorPalette
									colors={ getDefaultColors() }
									value={ color }
									onChange={ ( newColor ) => {
										const maybeNewColor = getColor( newColor );
										onChange( slug, maybeNewColor );
										setColor( maybeNewColor );
									} }
									disableCustomColors={ true }
									clearable={ false }
								/>
							</BaseControl>
							<div className="components-color-clear-color">
								<Button
									onClick={ () => {
										onChange( slug, defaultColor );
										setColor( defaultColor );
									} }
								>
									{ __( 'Clear Color', 'wp-plugin-info-card' ) }
								</Button>
							</div>
						</Popover>
					) }
				</div>
			</div>
		</BaseControl>
	);
};

ColorPickerControl.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onOpacityChange: PropTypes.func,
	value: PropTypes.string,
	defaultColor: PropTypes.string,
	alpha: PropTypes.bool,
	hideLabelFromVision: PropTypes.bool,
	defaultColors: PropTypes.array.isRequired,
};

ColorPickerControl.defaultProps = {
	label: __( 'Color', 'wp-plugin-info-card' ),
	value: '',
	defaultColor: 'transparent',
	alpha: false,
	hideLabelFromVision: false,
	onOpacityChange: () => {},
};

export default ColorPickerControl;
