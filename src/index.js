/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
import InfoCardIcon from './blocks/components/InfoCardIcon';

import './blocks/PluginInfoCard/block';
import './blocks/PluginInfoCardQuery/wppic-query';
import './blocks/SitePluginsCardGrid/block';
import './blocks/PluginScreenshotsInfoCard/block';

/**
 * Add Block Category Icon.
 */
( function() {
	const InfoCardSVG = <InfoCardIcon fill="#DB3939" />;
	wp.blocks.updateCategory( 'wp-plugin-info-card', { icon: InfoCardSVG } );
}() );
