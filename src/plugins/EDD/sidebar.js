import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { ToggleControl, TextControl, PanelRow } from '@wordpress/components';
import { useDispatch, select } from '@wordpress/data';
import { over } from 'lodash';

const Sidebar = ( props ) => {
	const [ pluginAuthor, setPluginAuthor ] = useState( '' );
	const [ overrideRatings, setOverrideRatings ] = useState( false );
	const [ numRatings, setNumRatings ] = useState( 0 );
	const [ ratingPercentage, setRatingPercentage ] = useState( 0 );

	const { editPost } = useDispatch( 'core/editor' );

	const setMetaFieldValue = ( key, value ) => {
		editPost( { meta: { [ key ]: value } } );
	};

	/* Initialize the initial state */
	useEffect( () => {
		const {
			_wppic_plugin_author,
			_wppic_override_ratings,
			_wppic_num_ratings,
			_wppic_rating_percentage
		} = select( 'core/editor' )
			.getEditedPostAttribute( 'meta' );

		// Set plugin author.
		if ( _wppic_plugin_author !== null || typeof _wppic_plugin_author !== 'undefined' ) {
			setPluginAuthor( _wppic_plugin_author );
		} else {
			setPluginAuthor( '' );
		}

		// Set override ratings.
		if ( _wppic_override_ratings !== null || typeof _wppic_override_ratings !== 'undefined' ) {
			setOverrideRatings( _wppic_override_ratings );
		}

		// Set number of ratings.
		if ( _wppic_num_ratings !== null || typeof _wppic_num_ratings !== 'undefined' ) {
			setNumRatings( _wppic_num_ratings );
		}

		// Set rating percentage.
		if ( _wppic_rating_percentage !== null || typeof _wppic_rating_percentage !== 'undefined' ) {
			setRatingPercentage( _wppic_rating_percentage );
		}
	}, [] );
	return (
		<>
			<PanelRow>
				<TextControl
					label={ __( 'Plugin Author', 'wp-plugin-info-card' ) }
					value={ pluginAuthor }
					onChange={ ( value ) => {
						setPluginAuthor( value );
						setMetaFieldValue( '_wppic_plugin_author', value );
					} }
					help={ __( 'Enter the plugin author name, or the author of the plugin. If this is blank, the post author will be used.', 'wp-plugin-info-card' ) }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={ __( 'Override the Plugin Rating', 'wp-plugin-info-card' ) }
					help={ __(
						'If the ratings do not match your download, or you need to enter custom values, you can enable overrides to set the rating data manually.',
						'wp-plugin-info-card'
					) }
					checked={ overrideRatings }
					onChange={ ( value ) => {
						setOverrideRatings( value );
						setMetaFieldValue( '_wppic_override_ratings', value );
					} }
				/>
			</PanelRow>
			{
				overrideRatings && (
					<>
						<PanelRow>
							<TextControl
								label={ __( 'Number of Ratings', 'wp-plugin-info-card' ) }
								value={ numRatings }
								onChange={ ( value ) => {
									setNumRatings( value );
									setMetaFieldValue( '_wppic_num_ratings', value );
								} }
								type="number"
								help={ __( 'Enter the number of ratings for the plugin.', 'wp-plugin-info-card' ) }
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __( 'Rating Percentage', 'wp-plugin-info-card' ) }
								value={ ratingPercentage }
								onChange={ ( value ) => {
									setRatingPercentage( value );
									setMetaFieldValue( '_wppic_rating_percentage', value );
								} }
								type="number"
								help={ __( 'Enter the rating percentage for the plugin (e.g., 95).', 'wp-plugin-info-card' ) }
							/>
						</PanelRow>
					</>
				)
			}
		</>
	);
};

export default Sidebar;
