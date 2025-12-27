/**
 * Alignment Group (Left|Center|Right) with a label and button icons.
 *
 * Pass onClick prop to propagate up to parent. Values are (left|center|right).
 */
import React from 'react';

import { __, _x } from '@wordpress/i18n';

import { BaseControl, Button, ButtonGroup } from '@wordpress/components';

import './editor.scss';

const AlignmentGroup = ( {
	alignment = 'left',
	label = __( 'Change Alignment', 'wp-plugin-info-card' ),
	alignLeftLabel = _x(
		'Align Left',
		'Align items left',
		'wp-plugin-info-card',
	),
	alignCenterLabel = _x(
		'Align Center',
		'Align items center/middle',
		'wp-plugin-info-card',
	),
	alignRightLabel = _x(
		'Align Right',
		'Align items right',
		'wp-plugin-info-card',
	),
	leftOn = true,
	centerOn = true,
	rightOn = true,
	onClick,
} ) => {
	return (
		<div className="ajaxify-alignment-component-base">
			<BaseControl
				id="ajaxify-alignment-component-base"
				label={ label }
			>
				<ButtonGroup>
					<>
						{ leftOn &&
						<Button
							isPressed={ 'left' === alignment ? true : false }
							isSecondary
							icon="editor-alignleft"
							label={ alignLeftLabel }
							onClick={ () => {
								onClick( 'left' );
							} }
						/>
						}
						{ centerOn &&
						<Button
							isPressed={ 'center' === alignment ? true : false }
							isSecondary
							icon="editor-aligncenter"
							label={ alignCenterLabel }
							onClick={ () => {
								onClick( 'center' );
							} }
						/>
						}
						{ rightOn &&
						<Button
							isPressed={ 'right' === alignment ? true : false }
							isSecondary
							icon="editor-alignright"
							label={ alignRightLabel }
							onClick={ () => {
								onClick( 'right' );
							} }
						/>
						}

					</>

				</ButtonGroup>
			</BaseControl>
		</div>
	);
};

export default AlignmentGroup;
