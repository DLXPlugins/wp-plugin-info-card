// @ts-nocheck
/**
 * External dependencies
 */
import axios from 'axios';
import classnames from 'classnames';
const HtmlToReactParser = require( 'html-to-react' ).Parser;

const { __ } = wp.i18n;

const { useState, useEffect } = wp.element;

const {
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	Toolbar,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	useBlockProps,
} = wp.blockEditor;

const WP_Plugin_Card_Query = ( props ) => {
	const { attributes, setAttributes } = props;

	const [ loading, setLoading ] = useState( false );
	const [ cardLoading, setCardLoading ] = useState( false );

	const {
		type,
		slug,
		html,
		align,
		image,
		containerid,
		margin,
		clear,
		expiration,
		ajax,
		scheme,
		layout,
		width,
		search,
		tag,
		author,
		user,
		browse,
		per_page,
		preview,
		cols,
	} = attributes;

	useEffect( () => {
		// If we have HTML, then we don't need to load it.
		if ( ! html ) {
			setLoading( true );
		} else {
			setLoading( false );
		}

		// Apply defaults.
		if ( ! attributes.defaultsApplied ) {
			setAttributes( {
				defaultsApplied: true,
				scheme: wppic.default_scheme,
				layout: wppic.default_layout,
			} );
		}
	}, [] );

	const pluginOnClick = ( event ) => {
		if ( '' !== type ) {
			setCardLoading( true );
			const rest_url = wppic.rest_url + 'wppic/v1/get_query/';
			axios
				.get(
					rest_url +
						`?type=${ attributes.type }&slug=${ attributes.slug }&align=${ attributes.align }&image=${ attributes.image }&containerid=${ attributes.containerid }&margin=${ attributes.margin }&clear=${ attributes.clear }&expiration=${ attributes.expiration }&ajax=${ attributes.ajax }&scheme=${ attributes.scheme }&layout=${ attributes.layout }&search=${ attributes.search }&tag=${ attributes.tag }&author=${ attributes.author }&user=${ attributes.user }&browse=${ attributes.browse }&per_page=${ attributes.per_page }&cols=${ attributes.cols }}`
				)
				.then( ( response ) => {
					// Now Set State
					setLoading( false );
					setCardLoading( false );
					setAttributes( { html: response.data } );
				} );
		}
	};

	const htmlToReactParser = new HtmlToReactParser();

	const resetSelect = [
		{
			icon: 'edit',
			title: __( 'Reset', 'wp-plugin-info-card' ),
			onClick: () => setLoading( true ),
		},
	];
	const clearOptions = [
		{ value: 'none', label: __( 'None', 'wp-plugin-info-card' ) },
		{ value: 'before', label: __( 'Before', 'wp-plugin-info-card' ) },
		{ value: 'after', label: __( 'After', 'wp-plugin-info-card' ) },
	];
	const ajaxOptions = [
		{ value: 'false', label: __( 'No', 'wp-plugin-info-card' ) },
		{ value: 'true', label: __( 'Yes', 'wp-plugin-info-card' ) },
	];
	const schemeOptions = [
		{ value: 'default', label: __( 'Default', 'wp-plugin-info-card' ) },
		{ value: 'scheme1', label: __( 'Scheme 1', 'wp-plugin-info-card' ) },
		{ value: 'scheme2', label: __( 'Scheme 2', 'wp-plugin-info-card' ) },
		{ value: 'scheme3', label: __( 'Scheme 3', 'wp-plugin-info-card' ) },
		{ value: 'scheme4', label: __( 'Scheme 4', 'wp-plugin-info-card' ) },
		{ value: 'scheme5', label: __( 'Scheme 5', 'wp-plugin-info-card' ) },
		{ value: 'scheme6', label: __( 'Scheme 6', 'wp-plugin-info-card' ) },
		{ value: 'scheme7', label: __( 'Scheme 7', 'wp-plugin-info-card' ) },
		{ value: 'scheme8', label: __( 'Scheme 8', 'wp-plugin-info-card' ) },
		{ value: 'scheme9', label: __( 'Scheme 9', 'wp-plugin-info-card' ) },
		{ value: 'scheme10', label: __( 'Scheme 10', 'wp-plugin-info-card' ) },
		{ value: 'scheme11', label: __( 'Scheme 11', 'wp-plugin-info-card' ) },
		{ value: 'scheme12', label: __( 'Scheme 12', 'wp-plugin-info-card' ) },
		{ value: 'scheme13', label: __( 'Scheme 13', 'wp-plugin-info-card' ) },
		{ value: 'scheme14', label: __( 'Scheme 14', 'wp-plugin-info-card' ) },
	];
	const layoutOptions = [
		{ value: 'card', label: __( 'Card', 'wp-plugin-info-card' ) },
		{ value: 'large', label: __( 'Large', 'wp-plugin-info-card' ) },
		{ value: 'wordpress', label: __( 'WordPress', 'wp-plugin-info-card' ) },
		{ value: 'flex', label: __( 'Flex', 'wp-plugin-info-card' ) },
	];
	const customThemeOptions = [
		{ value: '', label: __( 'None', 'wp-plugin-info-card' ) },
		{ value: 'url', label: __( 'URL', 'wp-plugin-info-card' ) },
		{ value: 'name', label: __( 'Name', 'wp-plugin-info-card' ) },
		{ value: 'version', label: __( 'Version', 'wp-plugin-info-card' ) },
		{ value: 'author', label: __( 'Author', 'wp-plugin-info-card' ) },
		{
			value: 'screenshot_url',
			label: __( 'Screenshot URL', 'wp-plugin-info-card' ),
		},
		{ value: 'rating', label: __( 'Ratings', 'wp-plugin-info-card' ) },
		{
			value: 'num_ratings',
			label: __( 'Number of Ratings', 'wp-plugin-info-card' ),
		},
		{
			value: 'active_installs',
			label: __( 'Active Installs', 'wp-plugin-info-card' ),
		},
		{
			value: 'last_updated',
			label: __( 'Last Updated', 'wp-plugin-info-card' ),
		},
		{ value: 'homepage', label: __( 'Homepage', 'wp-plugin-info-card' ) },
		{
			value: 'download_link',
			label: __( 'Download Link', 'wp-plugin-info-card' ),
		},
	];
	const widthOptions = [
		{ value: 'none', label: __( 'Default', 'wp-plugin-info-card' ) },
		{ value: 'full', label: __( 'Full Width', 'wp-plugin-info-card' ) },
	];

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'WP Plugin Info Card', 'wp-plugin-info-card' ) }
			>
				<SelectControl
					label={ __( 'Scheme', 'wp-plugin-info-card' ) }
					options={ schemeOptions }
					value={ scheme }
					onChange={ ( value ) => {
						setAttributes( { scheme: value } );
						attributes.scheme = value;
						pluginOnClick();
					} }
				/>
				<SelectControl
					label={ __( 'Layout', 'wp-plugin-info-card' ) }
					options={ layoutOptions }
					value={ layout }
					onChange={ ( value ) => {
						setAttributes( { layout: value } );
						attributes.layout = value;
						pluginOnClick();
					} }
				/>
				<SelectControl
					label={ __( 'Width', 'wp-plugin-info-card' ) }
					options={ widthOptions }
					value={ width }
					onChange={ ( value ) => {
						setAttributes( { width: value } );
					} }
				/>
				<MediaUpload
					onSelect={ ( imageObject ) => {
						setAttributes( {
							image: imageObject.url,
						} );
						attributes.image = imageObject.url;
						pluginOnClick();
					} }
					type="image"
					value={ image }
					render={ ( { open } ) => (
						<>
							<button
								className="components-button is-button"
								onClick={ open }
							>
								{ __( 'Upload Image!', 'wp-plugin-info-card' ) }
							</button>
							{ image && (
								<>
									<div>
										<img
											src={ image }
											alt={ __(
												'Plugin Card Image',
												'wp-plugin-info-card'
											) }
											width="250"
											height="250"
										/>
									</div>
									<div>
										<button
											className="components-button is-button"
											onClick={ ( event ) => {
												setAttributes( {
													image: '',
												} );
												attributes.image = '';
												pluginOnClick();
											} }
										>
											{ __(
												'Reset Image',
												'wp-plugin-info-card'
											) }
										</button>
									</div>
								</>
							) }
						</>
					) }
				/>
				<TextControl
					label={ __( 'Container ID', 'wp-plugin-info-card' ) }
					type="text"
					value={ containerid }
					onChange={ ( value ) => {
						setAttributes( { containerid: value } );
						attributes.containerId = value;
						setTimeout( function () {
							pluginOnClick();
						}, 5000 );
					} }
				/>
				<TextControl
					label={ __( 'Margin', 'wp-plugin-info-card' ) }
					type="text"
					value={ margin }
					onChange={ ( value ) => {
						setAttributes( { margin: value } );
						attributes.margin = value;
						setTimeout( function () {
							pluginOnClick();
						}, 5000 );
					} }
				/>
				<SelectControl
					label={ __( 'Clear', 'wp-plugin-info-card' ) }
					options={ clearOptions }
					value={ clear }
					onChange={ ( value ) => {
						setAttributes( { clear: value } );
						attributes.clear = value;
						pluginOnClick();
					} }
				/>
				<TextControl
					label={ __(
						'Expiration in minutes',
						'wp-plugin-info-card'
					) }
					type="number"
					value={ expiration }
					onChange={ ( value ) => {
						setAttributes( { expiration: value } );
						attributes.expiration = value;
						setTimeout( function () {
							pluginOnClick();
						}, 5000 );
					} }
				/>
				<SelectControl
					label={ __( 'Load card via Ajax?', 'wp-plugin-info-card' ) }
					options={ ajaxOptions }
					value={ ajax }
					onChange={ ( value ) => {
						setAttributes( { ajax: value } );
						attributes.ajax = value;
						pluginOnClick();
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
	
	const block = (
		<>
			<>
				{ loading && (
					<Placeholder>
						<div className="wppic-query-block">
							<div>
								<svg
									version="1.1"
									id="Calque_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="150px"
									height="150px"
									viewBox="0 0 850.39 850.39"
									enableBackground="new 0 0 850.39 850.39"
								>
									<path
										fill="#DB3939"
										d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
								c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
								l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
								h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
								l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
									/>
								</svg>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-type-select">
										{ __(
											'Select a Type',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
								<select
									id="wppic-type-select"
									onChange={ ( event ) => {
										setAttributes( {
											type: event.target.value,
										} );
									} }
								>
									<option
										value="theme"
										selected={
											type === 'theme' ? 'selected' : ''
										}
									>
										{ __( 'Theme', 'wp-plugin-info-card' ) }
									</option>
									<option
										value="plugin"
										selected={
											type === 'plugin' ? 'selected' : ''
										}
									>
										{ __(
											'Plugin',
											'wp-plugin-info-card'
										) }
									</option>
								</select>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-input-search">
										{ __(
											'Search',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
							</div>
							<div>
								<input
									type="text"
									id="wppic-input-search"
									value={ search }
									onChange={ ( event ) => {
										setAttributes( {
											search: event.target.value,
										} );
									} }
								/>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-input-tag">
										{ __(
											'Tags (can be comma separated)',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
							</div>
							<div>
								<input
									type="text"
									id="wppic-input-tag"
									value={ tag }
									onChange={ ( event ) => {
										setAttributes( {
											tag: event.target.value,
										} );
									} }
								/>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-input-author">
										{ __(
											'Username',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
								<p>
									{ __(
										'Filter by Username',
										'wp-plugin-info-card'
									) }
								</p>
							</div>
							<div>
								<input
									type="text"
									id="wppic-input-author"
									value={ author }
									onChange={ ( event ) => {
										setAttributes( {
											author: event.target.value,
										} );
									} }
								/>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-input-user">
										{ __( 'User', 'wp-plugin-info-card' ) }
									</label>
								</h3>
								<p>
									{ __(
										'See the favorites from this username',
										'wp-plugin-info-card'
									) }
								</p>
							</div>
							<div>
								<input
									type="text"
									id="wppic-input-user"
									value={ user }
									onChange={ ( event ) => {
										setAttributes( {
											user: event.target.value,
										} );
									} }
								/>
							</div>

							<div>
								<h3>
									<label htmlFor="wppic-input-browse">
										{ __(
											'Browse',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
							</div>
							<div>
								<select
									id="wppic-type-browse"
									onChange={ ( event ) => {
										setAttributes( {
											browse: event.target.value,
										} );
									} }
								>
									<option
										value=""
										selected={
											browse === '' ? 'selected' : ''
										}
									>
										{ __( 'None', 'wp-plugin-info-card' ) }
									</option>
									<option
										value="featured"
										selected={
											browse === 'featured'
												? 'selected'
												: ''
										}
									>
										{ __(
											'Featured',
											'wp-plugin-info-card'
										) }
									</option>
									<option
										value="updated"
										selected={
											browse === 'updated'
												? 'selected'
												: ''
										}
									>
										{ __(
											'Updated',
											'wp-plugin-info-card'
										) }
									</option>
									<option
										value="favorites"
										selected={
											browse === 'favorites'
												? 'selected'
												: ''
										}
									>
										{ __(
											'Favorites',
											'wp-plugin-info-card'
										) }
									</option>
									<option
										value="popular"
										selected={
											browse === 'popular'
												? 'selected'
												: ''
										}
									>
										{ __(
											'Popular',
											'wp-plugin-info-card'
										) }
									</option>
								</select>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-input-per-page">
										{ __(
											'Per Page',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
							</div>
							<div>
								<input
									type="number"
									id="wppic-input-per-page"
									value={ per_page }
									onChange={ ( event ) => {
										setAttributes( {
											per_page: event.target.value,
										} );
									} }
								/>
							</div>
							<div>
								<h3>
									<label htmlFor="wppic-input-columns">
										{ __(
											'Columns',
											'wp-plugin-info-card'
										) }
									</label>
								</h3>
							</div>
							<div>
								<select
									id="wppic-input-columns"
									onChange={ ( event ) => {
										setAttributes( {
											cols: event.target.value,
										} );
									} }
								>
									<option
										value="1"
										selected={
											cols === 1 ? 'selected' : ''
										}
									>
										{ __( '1', 'wp-plugin-info-card' ) }
									</option>
									<option
										value="2"
										selected={
											cols === 2 ? 'selected' : ''
										}
									>
										{ __( '2', 'wp-plugin-info-card' ) }
									</option>
									<option
										value="3"
										selected={
											cols === 3 ? 'selected' : ''
										}
									>
										{ __( '3', 'wp-plugin-info-card' ) }
									</option>
								</select>
							</div>
							<div>
								<input
									className="button button-primary"
									type="submit"
									id="wppic-input-submit"
									value={ __(
										'Search',
										'wp-plugin-info-card'
									) }
									onClick={ ( event ) => {
										setLoading( false );
										pluginOnClick( event );
									} }
								/>
							</div>
						</div>
					</Placeholder>
				) }
				{ cardLoading && (
					<>
						<Placeholder className="wppic-loading-placeholder">
							<div className="wppic-loading">
								<svg
									version="1.1"
									id="Calque_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="40px"
									height="40px"
									viewBox="0 0 850.39 850.39"
									enableBackground="new 0 0 850.39 850.39"
								>
									<path
										fill="#DB3939"
										d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
								c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
								l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
								h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
								l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
									/>
								</svg>
								<br />
								<div className="wppic-spinner">
									<Spinner />
								</div>
							</div>
						</Placeholder>
					</>
				) }
				{ ! loading && ! cardLoading && (
					<>
						{ inspectorControls }
						<BlockControls>
							<Toolbar controls={ resetSelect } />
							{ 'flex' === layout && (
								<BlockAlignmentToolbar
									value={ align }
									onChange={ ( value ) => {
										setAttributes( {
											align: value,
										} );
										pluginOnClick( value );
									} }
								></BlockAlignmentToolbar>
							) }
							{ 'card' === layout && (
								<AlignmentToolbar
									value={ align }
									onChange={ ( value ) => {
										setAttributes( {
											align: value,
										} );
										pluginOnClick( value );
									} }
								></AlignmentToolbar>
							) }
						</BlockControls>
						<div
							className={
								'' !== width ? 'wp-pic-full-width' : ''
							}
						>
							{ htmlToReactParser.parse( html ) }
						</div>
					</>
				) }
			</>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames( `wp-plugin-info-card-query align${ align }` ),
	} );
	if ( preview ) {
		return (
			<>
				<img src={ wppic.query_preview } style={ { width: '100%', height: 'auto' } } />
			</>
		);
	}
	return <div { ...blockProps }>{ block }</div>;
};

export default WP_Plugin_Card_Query;
