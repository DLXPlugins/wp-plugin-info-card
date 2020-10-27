/**
 * External dependencies
 */
import axios from "axios";
import { kebabCase } from 'lodash/kebabCase';
import isEmpty from 'validator/lib/isEmpty';
import Logo from "./Logo";
const HtmlToReactParser = require("html-to-react").Parser;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
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
				<PanelBody
					title={__("Layout", "wp-plugin-info-card")}
				>
					<PanelRow>
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
					</PanelRow>
					<PanelRow>
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
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={__("Options", "wp-plugin-info-card")}
					initialOpen={false}
				>
					<PanelRow>
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
					</PanelRow>
					<PanelRow>
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
									<button
										className="components-button is-button"
										onClick={open}
									>
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
					</PanelRow>
					<PanelRow>
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
						</PanelRow>
						<PanelRow>
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
					</PanelRow>
					<PanelRow>
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
					</PanelRow>
					<PanelRow>
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
					</PanelRow>
					<PanelRow>
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
					</PanelRow>
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
							<Logo size="75" />
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
														label={__(
															"Select a Plugin or Theme",
															"wp-plugin-info-card"
														)}
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
														label={__(
															"Plugin or Theme Slug",
															"wp-plugin-info-card"
														)}
														value={this.state.slug}
														onChange={(value) => {
															this.props.setAttributes({
																slug: value,
															});
															this.slugChange(value);
														}}
														help={__(
															"Comma separated slugs are supported.",
															"wp-plugin-info-card"
														)}
													/>
													<CheckboxControl
														label={__(
															"Enable Multi Output",
															"wp-plugin-info-card"
														)}
														help="Comma-separated slugs are outputted into multiple cards instead of shuffling between cards."
														checked={multi}
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
															label={__(
																"Select an initial layout",
																"wp-plugin-info-card"
															)}
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
									icon={
										<Logo size="25" />
									}
									isSecondary
									id="wppic-input-submit"
									onClick={(event) => {
										event.preventDefault();
										this.props.setAttributes({ loading: false });
										this.pluginOnClick(event);
									}}
								>
									{__("Preview and Configure", "wp-plugin-info-card")}
								</Button>
							</div>
						</div>
					)}
					{this.state.card_loading && (
						<Fragment>
							<div className="wppic-loading-placeholder">
								<div className="wppic-loading">
								<Logo size="45" />
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
