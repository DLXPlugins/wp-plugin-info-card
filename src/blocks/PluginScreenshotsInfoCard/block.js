import metadata from './block.json';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType(metadata, {
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			viewBox="0 0 80 80"
			width="24"
			height="24"
		>
			<path d="M47 41.5c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7zm12-10v20c0 1.7-1.3 3-3 3H24c-1.7 0-3-1.3-3-3v-20c0-1.7 1.3-3 3-3h8c.4 0 .8-.3.9-.7l1.8-5.3h10.6l1.8 5.3c.1.4.5.7.9.7h8c1.7 0 3 1.3 3 3zm-10 10c0-5-4-9-9-9s-9 4-9 9 4 9 9 9 9-4 9-9zM76 40c0 19.9-16.1 36-36 36S4 59.9 4 40 20.1 4 40 4s36 16.1 36 36zm-15-8.5c0-2.8-2.2-5-5-5h-7.3l-1.8-5.3c-.1-.4-.5-.7-.9-.7H34c-.4 0-.8.3-.9.7l-1.8 5.3H24c-2.8 0-5 2.2-5 5v20c0 2.8 2.2 5 5 5h32c2.8 0 5-2.2 5-5v-20z" />
		</svg>
	),
	edit,

	// Render via PHP
	save() {
		return null;
	},
});
