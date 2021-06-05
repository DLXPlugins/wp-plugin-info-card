/**
 * BLOCK: wp-plugin-info-card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";
import edit from "./edit-query";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("wp-plugin-info-card/wp-plugin-info-card-query", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("WP Plugin Info Card Query", "wp-plugin-info-card"), // Block title.
	icon: (
		<svg
			version="1.1"
			id="Calque_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="850.39px"
			height="850.39px"
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
	),
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__("WP Plugin Info Card Query", "wp-plugin-info-card"),
		__("Plugin", "wp-plugin-info-card"),
		__("Info", "wp-plugin-info-card"),
	],
	description: __(
		"Query plugins or themes and have them displayed in a column layout",
		"wp-plugin-info-card"
	),

	edit: edit,

	// Render via PHP
	save() {
		return null;
	},
	supports: {
		align: ["left", "center", "right", "full"],
	},
	example: {
		attributes: {
			preview: true,
		},
	},
});
