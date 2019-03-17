/**
 * External dependencies
 */
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
	ColorPalette,
	Button,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	RichText,
	AlignmentToolbar,
	PanelColorSettings,
} = wp.editor;

// Import block dependencies and components
import classnames from 'classnames';


class WP_Plugin_Card extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return(
			<Fragment>
				<Fragment>
					<PanelBody>
						<div>
							<select>
								<option value="theme">Theme</option>
								<option value="plugin">Plugin</option>
							</select>
						</div>
						<div><label for="input-slug">Enter a slug</label></div>

						<input type="text" id="input-slug" value="" />
					</PanelBody>
				</Fragment>
			</Fragment>
		);
	}
}

export default WP_Plugin_Card;
