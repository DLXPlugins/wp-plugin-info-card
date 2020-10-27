/**
 * External dependencies
 */
import axios from "axios";
const HtmlToReactParser = require("html-to-react").Parser;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	TextControl,
	Toolbar,
	CheckboxControl,
	TabPanel,
	Button,
	ColorPalette,
} = wp.components;

const {
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	AlignmentToolbar,
} = wp.blockEditor;

class WP_Plugin_Card extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			type: this.props.attributes.type,
			slug: this.props.attributes.slug,
			loading: this.props.attributes.loading,
			card_loading: false,
			html: this.props.attributes.html,
			image: this.props.attributes.image,
			containerid: this.props.attributes.containerid,
			margin: this.props.attributes.margin,
			clear: this.props.attributes.clear,
			expiration: this.props.attributes.expiration,
			ajax: this.props.attributes.ajax,
			scheme: this.props.attributes.scheme,
			layout: this.props.attributes.layout,
			width: this.props.attributes.width,
			multi: this.props.attributes.multi,
		};
	}

	slugChange = (event) => {
		this.setState({
			slug: event,
		});
	};

	typeChange = (event) => {
		this.setState({
			type: event.target.value,
		});
	};

	pluginOnClick = (event) => {
		if ("" !== this.state.type && "" !== this.state.slug) {
			this.setState({
				loading: false,
			});
			this.setState({
				card_loading: true,
			});
			const restUrl = wppic.rest_url + "wppic/v1/get_html/";
			axios
				.get(
					restUrl +
						`?type=${this.props.attributes.type}&slug=${this.props.attributes.slug}&align=${this.props.attributes.align}&image=${this.props.attributes.image}&containerid=${this.props.attributes.containerid}&margin=${this.props.attributes.margin}&clear=${this.props.attributes.clear}&expiration=${this.props.attributes.expiration}&ajax=${this.props.attributes.ajax}&scheme=${this.props.attributes.scheme}&layout=${this.props.attributes.layout}&multi=${this.props.attributes.multi}`
				)
				.then((response) => {
					// Now Set State
					this.setState({
						card_loading: false,
						html: response.data,
					});
					this.props.setAttributes({ html: response.data });
				});
		}
	};

	onTabSelect = (tab) => {
		console.log(tab);
	};

	render() {
		const { attributes } = this.props;
		const {
			image,
			containerid,
			margin,
			clear,
			expiration,
			ajax,
			scheme,
			layout,
			width,
			preview,
			multi,
		} = attributes;
		const htmlToReactParser = new HtmlToReactParser();

		const resetSelect = [
			{
				icon: "edit",
				title: __("Reset", "wp-plugin-info-card"),
				onClick: () => this.setState({ loading: true }),
			},
		];
		const assetType = [
			{ value: "plugin", label: __("Plugin", "wp-plugin-info-card") },
			{ value: "theme", label: __("Theme", "wp-plugin-info-card") },
		];
		const clearOptions = [
			{ value: "none", label: __("None", "wp-plugin-info-card") },
			{ value: "before", label: __("Before", "wp-plugin-info-card") },
			{ value: "after", label: __("After", "wp-plugin-info-card") },
		];
		const ajaxOptions = [
			{ value: "false", label: __("No", "wp-plugin-info-card") },
			{ value: "true", label: __("Yes", "wp-plugin-info-card") },
		];
		const schemeOptions = [
			{ value: "default", label: __("Default", "wp-plugin-info-card") },
			{ value: "scheme1", label: __("Scheme 1", "wp-plugin-info-card") },
			{ value: "scheme2", label: __("Scheme 2", "wp-plugin-info-card") },
			{ value: "scheme3", label: __("Scheme 3", "wp-plugin-info-card") },
			{ value: "scheme4", label: __("Scheme 4", "wp-plugin-info-card") },
			{ value: "scheme5", label: __("Scheme 5", "wp-plugin-info-card") },
			{ value: "scheme6", label: __("Scheme 6", "wp-plugin-info-card") },
			{ value: "scheme7", label: __("Scheme 7", "wp-plugin-info-card") },
			{ value: "scheme8", label: __("Scheme 8", "wp-plugin-info-card") },
			{ value: "scheme9", label: __("Scheme 9", "wp-plugin-info-card") },
			{ value: "scheme10", label: __("Scheme 10", "wp-plugin-info-card") },
			{ value: "scheme11", label: __("Scheme 11", "wp-plugin-info-card") },
			{ value: "scheme12", label: __("Scheme 12", "wp-plugin-info-card") },
			{ value: "scheme13", label: __("Scheme 13", "wp-plugin-info-card") },
			{ value: "scheme14", label: __("Scheme 14", "wp-plugin-info-card") },
		];

		const layoutOptions = [
			{ value: "card", label: __("Card", "wp-plugin-info-card") },
			{ value: "large", label: __("Large", "wp-plugin-info-card") },
			{ value: "wordpress", label: __("WordPress", "wp-plugin-info-card") },
			{ value: "flex", label: __("Flex", "wp-plugin-info-card") },
		];
		const widthOptions = [
			{ value: "none", label: __("Default", "wp-plugin-info-card") },
			{ value: "full", label: __("Full Width", "wp-plugin-info-card") },
		];
		const pluginOnClick = this.pluginOnClick;
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={__("WP Plugin Info Card", "wp-plugin-info-card")}>
					<SelectControl
						label={__("Scheme", "wp-plugin-info-card")}
						options={schemeOptions}
						value={scheme}
						onChange={(value) => {
							this.props.setAttributes({ scheme: value });
							this.props.attributes.scheme = value;
							this.setState({ scheme: value });
							this.pluginOnClick(value);
						}}
					/>
					<SelectControl
						label={__("Layout", "wp-plugin-info-card")}
						options={layoutOptions}
						value={layout}
						onChange={(value) => {
							if ("flex" == value) {
								this.props.setAttributes({ layout: value, align: "full" });
								this.props.attributes.layout = value;
								this.props.attributes.align = "full";
								this.setState({ layout: value, align: "full" });
								this.pluginOnClick(value);
							} else {
								this.props.setAttributes({ layout: value, align: "center" });
								this.props.attributes.layout = value;
								this.props.attributes.align = "center";
								this.setState({ layout: value, align: "center" });
								this.pluginOnClick(value);
							}
						}}
					/>
					<SelectControl
						label={__("Width", "wp-plugin-info-card")}
						options={widthOptions}
						value={width}
						onChange={(value) => {
							this.props.setAttributes({ width: value });
							this.props.attributes.width = value;
							this.setState({ width: value });
						}}
					/>
					<MediaUpload
						onSelect={(imageObject) => {
							this.props.setAttributes({ image: imageObject.url });
							this.props.attributes.image = imageObject.url;
							this.setState({ image: imageObject.url });
							this.pluginOnClick(imageObject);
						}}
						type="image"
						value={image}
						render={({ open }) => (
							<Fragment>
								<button className="components-button is-button" onClick={open}>
									{__("Upload Image!", "wp-plugin-info-card")}
								</button>
								{image && (
									<Fragment>
										<div>
											<img
												src={image}
												alt={__("Plugin Card Image", "wp-plugin-info-card")}
												width="250"
												height="250"
											/>
										</div>
										<div>
											<button
												className="components-button is-button"
												onClick={(event) => {
													this.props.setAttributes({ image: "" });
													this.props.attributes.image = "";
													this.setState({ image: "" });
													this.pluginOnClick(event);
												}}
											>
												{__("Reset Image", "wp-plugin-info-card")}
											</button>
										</div>
									</Fragment>
								)}
							</Fragment>
						)}
					/>
					<TextControl
						label={__("Container ID", "wp-plugin-info-card")}
						type="text"
						value={containerid}
						onChange={(value) => {
							this.props.setAttributes({ containerid: value });
							this.props.attributes.containerid = value;
							this.setState({ containerid: value });
							setTimeout(function () {
								pluginOnClick(value);
							}, 5000);
						}}
					/>
					<TextControl
						label={__("Margin", "wp-plugin-info-card")}
						type="text"
						value={margin}
						onChange={(value) => {
							this.props.setAttributes({ margin: value });
							this.props.attributes.margin = value;
							this.setState({ margin: value });
							setTimeout(function () {
								pluginOnClick(value);
							}, 5000);
						}}
					/>
					<SelectControl
						label={__("Clear", "wp-plugin-info-card")}
						options={clearOptions}
						value={clear}
						onChange={(value) => {
							this.props.setAttributes({ clear: value });
							this.props.attributes.clear = value;
							this.setState({ clear: value });
							this.pluginOnClick(value);
						}}
					/>
					<TextControl
						label={__("Expiration in minutes", "wp-plugin-info-card")}
						type="number"
						value={expiration}
						onChange={(value) => {
							this.props.setAttributes({ expiration: value });
							this.props.attributes.expiration = value;
							this.setState({ expiration: value });
							setTimeout(function () {
								pluginOnClick(value);
							}, 5000);
						}}
					/>
					<SelectControl
						label={__("Load card via Ajax?", "wp-plugin-info-card")}
						options={ajaxOptions}
						value={ajax}
						onChange={(value) => {
							this.props.setAttributes({ ajax: value });
							this.props.attributes.ajax = value;
							this.setState({ ajax: value });
							this.pluginOnClick(value);
						}}
					/>
				</PanelBody>
			</InspectorControls>
		);
		if (preview) {
			return (
				<Fragment>
					<img src={wppic.wppic_preview} />
				</Fragment>
			);
		}
		return (
			<Fragment>
				<Fragment>
					{this.state.loading && (
						<div className="wppic-query-block wppic-query-block-panel">
							<div className="wppic-block-svg">
								<svg
									version="1.1"
									id="Calque_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="75px"
									height="75px"
									viewBox="0 0 850.39 850.39"
									enable-background="new 0 0 850.39 850.39"
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
							<div className="wp-pic-tab-panel">
								<TabPanel
									activeClass="active-tab"
									onSelect={this.onTabSelect}
									initialTabName="slug"
									tabs={[
										{
											title: __("Type", "wp-plugin-info-card"),
											name: "slug",
											className: "wppic-tab-slug",
										},
										{
											title: __("Appearance", "wp-plugin-info-card"),
											name: "layout",
											className: "wppic-tab-layout",
										},
									]}
								>
									{(tab) => {
										let tabContent;
										if ("slug" === tab.name) {
											tabContent = (
												<Fragment>
													<SelectControl
														label={__("Select a Plugin or Theme", "wp-plugin-info-card")}
														options={assetType}
														value={this.state.type}
														onChange={(value) => {
															this.props.setAttributes({
																type: event.target.value,
															});
															this.typeChange(event);
														}}
													/>
													<TextControl
														label={__('Plugin or Theme Slug', 'wp-plugin-info-card')}
														value={this.state.slug}
														onChange={(value) => {
															this.props.setAttributes({
																slug: value,
															});
															this.slugChange(value);
														}}
														help={__('Comma separated slugs are supported.', 'wp-plugin-info-card')}
													/>
													<CheckboxControl
														label={__('Enable Multi Output', 'wp-plugin-info-card')}
														help="Comma-separated slugs are outputted into multiple cards instead of shuffling between cards."
														checked={ multi }
														onChange={(value) => {
															this.props.attributes.multi = value;
															this.setState({ multi: value });
														}}
													/>
												</Fragment>
											);
										} else if ("layout" === tab.name) {
											tabContent = (
												<Fragment>
													<div>
														<SelectControl
															label={__('Select an initial layout', 'wp-plugin-info-card')}
															options={layoutOptions}
															value={layout}
															onChange={(value) => {
																if ("flex" == value) {
																	this.props.setAttributes({
																		layout: value,
																		align: "full",
																	});
																	this.props.attributes.layout = value;
																	this.props.attributes.align = "full";
																	this.setState({
																		layout: value,
																		align: "full",
																	});
																} else {
																	this.props.setAttributes({
																		layout: value,
																		align: "center",
																	});
																	this.props.attributes.layout = value;
																	this.props.attributes.align = "center";
																	this.setState({
																		layout: value,
																		align: "center",
																	});
																}
															}}
														/>

														<SelectControl
															label={__("Scheme", "wp-plugin-info-card")}
															options={schemeOptions}
															value={scheme}
															onChange={(value) => {
																this.props.setAttributes({ scheme: value });
																this.props.attributes.scheme = value;
																this.setState({ scheme: value });
															}}
														/>
													</div>
												</Fragment>
											);
										} else {
											tabContent = <Fragment>no data found</Fragment>;
										}
										return <div>{tabContent}</div>;
									}}
								</TabPanel>
							</div>
							<div className="wp-pic-gutenberg-button">
								<Button
									iconSize={20}
									icon={<svg
									version="1.1"
									id="Calque_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									width="25px"
									height="25px"
									viewBox="0 0 850.39 850.39"
									enable-background="new 0 0 850.39 850.39"
								>
									<path
										fill="#DB3939"
										d="M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39
									c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451
									l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07
									h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887
									l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z"
									/>
								</svg>}
									isSecondary
									id="wppic-input-submit"
									onClick={(event) => {
										event.preventDefault();
										this.props.setAttributes({ loading: false });
										this.pluginOnClick(event);
									}}
								>{__("Preview and Configure", "wp-plugin-info-card")}</Button>
							</div>
						</div>
					)}
					{this.state.card_loading && (
						<Fragment>
							<div className="wppic-loading-placeholder">
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
							</div>
						</Fragment>
					)}
					{!this.state.loading && !this.state.card_loading && (
						<Fragment>
							{inspectorControls}
							<BlockControls>
								<Toolbar controls={resetSelect} />
								{"flex" == this.state.layout && (
									<BlockAlignmentToolbar
										value={this.props.attributes.align}
										onChange={(value) => {
											this.props.setAttributes({ align: value });
											this.props.attributes.align = value;
											this.setState({ align: value });
											this.pluginOnClick(value);
										}}
									></BlockAlignmentToolbar>
								)}
								{"card" == this.state.layout && (
									<AlignmentToolbar
										value={this.props.attributes.align}
										onChange={(value) => {
											this.props.setAttributes({ align: value });
											this.props.attributes.align = value;
											this.setState({ align: value });
											this.pluginOnClick(value);
										}}
									></AlignmentToolbar>
								)}
							</BlockControls>
							<div className={"" != width ? "wp-pic-full-width" : ""}>
								{htmlToReactParser.parse(this.state.html)}
							</div>
						</Fragment>
					)}
				</Fragment>
			</Fragment>
		);
	}
}

export default WP_Plugin_Card;
