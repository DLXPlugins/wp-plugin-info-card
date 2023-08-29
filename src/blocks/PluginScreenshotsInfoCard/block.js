import metadata from './block.json';

//  Import main block file.
import edit from './edit';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType(metadata, {
	icon: (
		<svg viewBox="0 0 7509 6702" width="24" height="24">
			<path
			d="M677.904 0h6152.96c186.275 0 356.237 75.859 479.153 198.763 121.94 122.903 198.75 291.901 198.75 479.14v5346.39c0 186.289-76.81 355.273-198.75 478.177-122.916 122.917-292.878 198.776-479.153 198.776H677.904c-187.227 0-356.237-75.859-479.141-198.776C75.872 6379.566 0 6210.582 0 6024.293V677.903c0-187.239 75.872-356.237 198.763-479.14C321.667 75.859 490.677 0 677.904 0Z" fill="#231f20" />
			<path
			d="m542.526 5434.75 2021.21-2499.41c49.935-60.507 122.904-96.991 200.69-99.856 78.737-2.891 153.62 27.839 207.396 85.456l1364.44 1447.98 611.654-519.479 15.365-13.437c48.971-38.399 110.416-58.594 173.788-54.753 62.409 2.93 121.94 28.815 166.12 72.044l14.401 14.401 1648.67 1720.68v435.925c0 36.497-15.364 70.104-39.362 95.078-24.987 24.935-58.594 40.312-96.041 40.312H677.897c-37.448 0-71.055-15.377-96.016-40.312-24.01-24.974-39.362-58.581-39.362-95.078v-589.544Z" fill="#FFF"
			/>
			<path d="M4788.52 1254.02c156.497-156.511 373.515-253.49 611.641-253.49 239.101 0 455.156 96.979 612.603 253.49 156.524 156.523 252.552 373.515 252.552 611.64 0 239.102-96.028 455.143-252.552 611.654-157.447 156.51-373.502 253.476-612.603 253.476-238.126 0-455.144-96.966-611.641-253.476-156.498-156.511-252.526-372.552-252.526-611.654 0-238.125 96.028-455.117 252.526-611.64Z" />
		</svg>
	),
	edit,

	// Render via PHP
	save() {
		return null;
	},
});