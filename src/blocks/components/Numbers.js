/**
 * Number Component.
 */

const { __, sprintf, _x } = wp.i18n;
const { useState, useEffect } = wp.element;
const { ButtonGroup, Button, Tooltip, BaseControl, TextControl } = wp.components;
import SwitchIcon from './SwitchIcon';

const NumbersComponent = ( props ) => {
	const [ isCustom, setIsCustom ] = useState( false );
	const { label, value, onClick, numbers, id } = props;

	useEffect( () => {
		if ( ! numbers.includes( value ) ) {
			setIsCustom( true );
		} else {
			setIsCustom( false );
		}
	}, [] );

	return (
		<BaseControl className="wppic-numbers-component" label={ label } id={ id }>
			<div className="wppic-numbers-component-buttons">
				{ ! isCustom && (
					<ButtonGroup
						className={ `wppic-numbers-component-buttons__numbers cols-${ numbers.length }` }
					>
						{ numbers.map( ( number ) => {
							const numberLabel = number;

							return (
								<Tooltip
									text={ sprintf(
									/* translators: Unit type (px, em, %) */
										__( '%spx Gap', 'wp-plugin-info-card' ),
										numberLabel
									) }
									key={ numberLabel }
								>
									<Button
										key={ numberLabel }
										className={ 'components-wppic-control-button__number' }
										isPrimary={ value === number }
										aria-pressed={ value === number }
										onClick={ () => onClick( number ) }
										text={ numberLabel }
									/>
								</Tooltip>
							);
						} ) }
						<Tooltip
							text={ __( 'Custom', 'wp-plugin-info-card' ) }
						>
							<Button
								className={ 'components-wppic-control-button__number' }
								isPrimary={ isCustom }
								aria-pressed={ isCustom }
								onClick={ () => setIsCustom( ! isCustom ) }
								label={ __( 'Custom', 'wp-plugin-info-card' ) }
								icon={ SwitchIcon }
							/>
						</Tooltip>

					</ButtonGroup>
				) }
				{ isCustom && (
					<ButtonGroup
						className={ `wppic-numbers-component-buttons__custom` }
					>
						<TextControl
							type="number"
							value={ value }
							onChange={ ( newValue ) => onClick( newValue ) }
							aria-label={ __( 'Enter a custom value', 'wp-plugin-info-card' ) }
						/>
						<Tooltip
							text={ __( 'View Presets', 'wp-plugin-info-card' ) }
						>
							<Button
								className={ 'components-wppic-control-button__number' }
								isPrimary={ isCustom }
								aria-pressed={ isCustom }
								onClick={ () => setIsCustom( ! isCustom ) }
								label={ __( 'Custom', 'wp-plugin-info-card' ) }
								icon={ SwitchIcon }
							/>
						</Tooltip>

					</ButtonGroup>
				) }
			</div>
		</BaseControl>
	);
};

export default NumbersComponent;
