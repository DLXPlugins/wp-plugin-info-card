/**
 * External dependencies
 */
import axios from 'axios';
var HtmlToReactParser = require('html-to-react').Parser;
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
			html: this.props.attributes.html,
			align: this.props.attributes.align,
			image: this.props.attributes.image,
			containerid: this.props.attributes.containerid,
			margin: this.props.attributes.margin,
			clear: this.props.attributes.clear,
			expiration: this.props.attributes.expiration,
			ajax: this.props.attributes.ajax,
			scheme: this.props.attributes.scheme,
			layout: this.props.attributes.layout,
			width: this.props.attributes.width,
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
			var rest_url = wppic.rest_url + 'wppic/v1/get_html/';
			axios.get(rest_url + `?type=${this.state.type}&slug=${this.state.slug}&align=${this.props.attributes.align}&image=${this.props.attributes.image}&containerid=${this.props.attributes.containerid}&margin=${this.props.attributes.margin}&clear=${this.props.attributes.clear}&expiration=${this.props.attributes.expiration}&ajax=${this.props.attributes.ajax}&scheme=${this.props.attributes.scheme}&layout=${this.props.attributes.layout}}` ).then( ( response ) => {
				// Now Set State
				this.setState( {
					html: response.data
				} );
				this.props.setAttributes({html: response.data});
			} );
		}
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { type, slug, loading, align, image, containerid, margin, clear, expiration, ajax, scheme, layout, width} = attributes;
		let htmlToReactParser = new HtmlToReactParser();

		const resetSelect = [
			{
				icon: 'update',
				title: __( 'Reset', 'wp-plugin-info-card' ),
				onClick: () => this.setState( { loading: true } )
			}
		];
		const alignOptions = [
			{ value: 'left', label: __('Left', 'wp-plugin-info-card' ) },
			{ value: 'center', label: __('Center', 'wp-plugin-info-card' ) },
			{ value: 'right', label: __('Right', 'wp-plugin-info-card' ) },
		];
		const clearOptions = [
			{ value: 'none', label: __('None', 'wp-plugin-info-card' ) },
			{ value: 'before', label: __('Before', 'wp-plugin-info-card' ) },
			{ value: 'after', label: __('After', 'wp-plugin-info-card' ) },
		];
		const ajaxOptions = [
			{ value: 'false', label: __('No', 'wp-plugin-info-card' ) },
			{ value: 'true', label: __('Yes', 'wp-plugin-info-card' ) },
		];
		const schemeOptions = [
			{ value: 'default', label: __('Default', 'wp-plugin-info-card' ) },
			{ value: 'scheme1', label: __('Scheme 1', 'wp-plugin-info-card' ) },
			{ value: 'scheme2', label: __('Scheme 2', 'wp-plugin-info-card' ) },
			{ value: 'scheme3', label: __('Scheme 3', 'wp-plugin-info-card' ) },
			{ value: 'scheme4', label: __('Scheme 4', 'wp-plugin-info-card' ) },
			{ value: 'scheme5', label: __('Scheme 5', 'wp-plugin-info-card' ) },
			{ value: 'scheme6', label: __('Scheme 6', 'wp-plugin-info-card' ) },
			{ value: 'scheme7', label: __('Scheme 7', 'wp-plugin-info-card' ) },
			{ value: 'scheme8', label: __('Scheme 8', 'wp-plugin-info-card' ) },
			{ value: 'scheme9', label: __('Scheme 9', 'wp-plugin-info-card' ) },
			{ value: 'scheme10', label: __('Scheme 10', 'wp-plugin-info-card' ) },
		];
		const layoutOptions = [
			{ value: 'card', label: __('Card', 'wp-plugin-info-card' ) },
			{ value: 'large', label: __('Large', 'wp-plugin-info-card' ) },
			{ value: 'wordpress', label: __('WordPress', 'wp-plugin-info-card' ) }
		];
		const customThemeOptions = [
			{ value: '', label: __('None', 'wp-plugin-info-card' ) },
			{ value: 'url', label: __('URL', 'wp-plugin-info-card' ) },
			{ value: 'name', label: __('Name', 'wp-plugin-info-card' ) },
			{ value: 'version', label: __('Version', 'wp-plugin-info-card' ) },
			{ value: 'author', label: __('Author', 'wp-plugin-info-card' ) },
			{ value: 'screenshot_url', label: __('Screenshot URL', 'wp-plugin-info-card' ) },
			{ value: 'rating', label: __('Ratings', 'wp-plugin-info-card' ) },
			{ value: 'num_ratings', label: __('Number of Ratings', 'wp-plugin-info-card' ) },
			{ value: 'active_installs', label: __('Active Installs', 'wp-plugin-info-card' ) },
			{ value: 'last_updated', label: __('Last Updated', 'wp-plugin-info-card' ) },
			{ value: 'homepage', label: __('Homepage', 'wp-plugin-info-card' ) },
			{ value: 'download_link', label: __('Download Link', 'wp-plugin-info-card' ) },
		];
		const widthOptions = [
			{ value: 'none', label: __('Default', 'wp-plugin-info-card' ) },
			{ value: 'full', label: __('Full Width', 'wp-plugin-info-card' ) },
		];
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'WP Plugin Info Card', 'wp-plugin-info-card' ) }>
					<SelectControl
							label={ __( 'Scheme', 'wp-plugin-info-card' ) }
							options={ schemeOptions }
							value={ scheme }
							onChange={ ( value ) => { this.props.setAttributes( { scheme: value } ); this.props.attributes.scheme = value; this.setState( { scheme: value}); this.pluginOnClick(value); } }
					/>
					<SelectControl
							label={ __( 'Layout', 'wp-plugin-info-card' ) }
							options={ layoutOptions }
							value={ layout }
							onChange={ ( value ) => { this.props.setAttributes( { layout: value } ); this.props.attributes.layout = value; this.setState( { layout: value}); this.pluginOnClick(value); } }
					/>
					<SelectControl
							label={ __( 'Width', 'wp-plugin-info-card' ) }
							options={ widthOptions }
							value={ width }
							onChange={ ( value ) => {  this.props.setAttributes( { width: value } ); this.props.attributes.width = value; this.setState( { width: value}); } }
					/>
					<SelectControl
							label={ __( 'Align', 'wp-plugin-info-card' ) }
							options={ alignOptions }
							value={ align }
							onChange={ ( value ) => {  this.props.setAttributes( { align: value } ); this.props.attributes.align = value; this.setState( { align: value}); this.pluginOnClick(value); } }
					/>
					<MediaUpload
						onSelect={(imageObject) => { this.props.setAttributes( { image: imageObject.url}); this.props.attributes.image = imageObject.url; this.setState( { image: imageObject.url } ); this.pluginOnClick(imageObject); } }
						type="image"
						value={image}
						render={({ open }) => (
							<Fragment>
								<button onClick={open}>
									{__( 'Upload Image!', 'wp-plugin-info-card' )}
								</button>
								{image &&
										<img src={image} alt={__( 'Plugin Card Image', 'wp-plugin-info-card' )} width="250" height="250" />
								}
							</Fragment>
						)}
					/>
					<TextControl
						label={ __( 'Container ID',  'wp-plugin-info-card' ) }
						type="text"
						value={ containerid }
						onChange={ ( value ) => { this.props.setAttributes( { containerid: value }); this.props.attributes.containerid = value; this.setState( { containerid: value } ); this.pluginOnClick(value); } }
					/>
					<TextControl
						label={ __( 'Margin',  'wp-plugin-info-card' ) }
						type="text"
						value={ margin }
						onChange={ ( value ) => { this.props.setAttributes( { margin: value }); this.props.attributes.margin = value; this.setState( { margin: value } ); this.pluginOnClick(value); } }
					/>
					<SelectControl
							label={ __( 'Clear', 'wp-plugin-info-card' ) }
							options={ clearOptions }
							value={ clear }
							onChange={ ( value ) => { this.props.setAttributes( { clear: value } ); this.props.attributes.clear = value; this.setState( { clear: value}); this.pluginOnClick(value); } }
					/>
					<TextControl
						label={ __( 'Expiration in minutes',  'wp-plugin-info-card' ) }
						type="number"
						value={ expiration }
						onChange={ ( value ) => { this.props.setAttributes( { expiration: value }); this.props.attributes.expiration = value; this.setState( { expiration: value } ); this.pluginOnClick(value); } }
					/>
					<SelectControl
							label={ __( 'Load card via Ajax?', 'wp-plugin-info-card' ) }
							options={ ajaxOptions }
							value={ ajax }
							onChange={ ( value ) => { this.props.setAttributes( { ajax: value } ); this.props.attributes.ajax = value; this.setState( { ajax: value}); this.pluginOnClick(value); } }
					/>

				</PanelBody>
			</InspectorControls>
		);
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
							{inspectorControls}
							<BlockControls>
								<Toolbar controls={ resetSelect } />
							</BlockControls>
							<div className={'' != width ? 'wp-pic-full-width' : ''}>
								{htmlToReactParser.parse(this.state.html)}
							</div>
						</Fragment>
					}
				</Fragment>
			</Fragment>
		);
	}
}

export default WP_Plugin_Card;
