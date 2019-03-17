/**
 * External dependencies
 */
import axios from 'axios';
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
		this.state = {
			type: this.props.attributes.type,
			slug: this.props.attributes.slug,
			loading: this.props.attributes.loading,
		};
	}

	slugChange = (event) => {
		this.setState( {
			slug: event.target.value
		} );
	}

	typeChange = (event) => {
		this.setState( {
			type: event.target.value
		} );
	}

	pluginOnClick = (event) => {
		if( '' !== this.state.type && '' !== this.state.slug ) {
			this.setState( {
				loading: false
			} );
		}
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { type, slug, loading } = attributes;
		return(
			<Fragment>
				<Fragment>
					{this.state.loading &&
						<Placeholder>
							<div className="wppic-block">
								<div>
									<h3><label for="wppic-type-select">{__( 'Select a Type', 'wp-plugin-info-card' )}</label></h3>
									<select id="wppic-type-select" onChange={ ( event ) => { this.props.setAttributes( { type: event.target.value } ); this.typeChange(event); } }>
										<option value="theme" selected={this.state.type === 'theme' ? 'selected': '' }>{__( 'Theme', 'wp-plugin-info-card' )}</option>
										<option value="plugin" selected={this.state.type === 'plugin' ? 'selected': '' }>{__( 'Plugin', 'wp-plugin-info-card' )}</option>
									</select>
								</div>
								<div>
									<h3><label for="wppic-input-slug">{__( 'Enter a slug', 'wp-plugin-info-card' )}</label></h3>
								</div>
								<div>
									<input type="text" id="wppic-input-slug" value={this.state.slug} onChange={ ( event ) => { this.props.setAttributes( { slug: event.target.value } ); this.slugChange(event); } } />
								</div>
								<div>
									<input type="submit" id="wppic-input-submit" value={__( 'Go', 'wp-plugin-info-card' )} onClick={ ( event ) => { this.props.setAttributes( { loading: false } ); this.pluginOnClick(event); } }  />
								</div>
							</div>
						</Placeholder>
					}
					{!this.state.loading &&
						<Fragment>
							Hello!
						</Fragment>
					}
				</Fragment>
			</Fragment>
		);
	}
}

export default WP_Plugin_Card;
