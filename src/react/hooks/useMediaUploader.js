import { __ } from '@wordpress/i18n';
const getCropSettings = ( overrides = {} ) => {
	// Set the settings for the media uploader and cropper.
	let settings = {
		id: '',
		attachmentId: 0,
		aspectRatio: '1:1',
		suggestedWidth: '500',
		suggestedHeight: '500',
		nonce: '',
		postId: 0,
		title: __( 'Image', 'wp-plugin-info-card' ),
		buttonLabel: __( 'Add Image', 'wp-plugin-info-card' ),
		main: this,
	};
	settings = { ...settings, ...overrides };
	return settings;
};

const getCropControl = ( overrides = {} ) => {
	const settings = getCropSettings( overrides );
	const cropControl = {
		id: 'control-id',
		params: {
			flex_width: false, // set to true if the width of the cropped image can be different to the width defined here
			flex_height: false, // set to true if the height of the cropped image can be different to the height defined here
			width: settings.suggestedWidth, // set the desired width of the destination image here
			height: settings.suggestedHeight, // set the desired height of the destination image here
		},
	};
	return cropControl;
};

const useMediaUploader = ( props ) => {
	/**
	 * Retrieve crop options for an attachment.
	 *
	 * @param {Object} attachment   Attachment image object.
	 * @param {Object} controller   Media controller object.
	 * @param {Object} cropSettings Crop settings.
	 *
	 * @return {Object} Cropping options.
	 */
	const cropOptions = ( attachment, controller, cropSettings ) => {
		const settings = getCropSettings( cropSettings );
		const control = controller.get( 'control' );
		const realWidth = attachment.get( 'width' );
		const realHeight = attachment.get( 'height' );

		let xInit = parseInt( control.params.width, 10 );
		let yInit = parseInt( control.params.height, 10 );

		const ratio = xInit / yInit;
		const ratioReal = realWidth / realHeight;

		// Determine if user can skip crop.
		let canSkipCrop = false;

		// If ratios match, can skip crop.
		if ( ratio === ratioReal ) {
			canSkipCrop = true;
		}
		controller.set( 'canSkipCrop', canSkipCrop );

		let xImg = xInit;
		let yImg = yInit;

		if ( realWidth / realHeight > ratio ) {
			if ( yImg > realHeight ) {
				yImg = realHeight;
			}
			yInit = yImg;
			xInit = yInit * ratio;
		} else {
			if ( xImg > realWidth ) {
				xImg = realWidth;
			}
			xInit = xImg;
			yInit = xInit / ratio;
		}

		let x1 = ( realWidth - xInit ) / 2;
		let y1 = ( realHeight - yInit ) / 2;

		if ( x1 === 0 ) {
			if ( ratio > 0 ) {
				x1 = y1 * ratio;
			} else {
				x1 = y1 / ratio;
			}
		}
		if ( y1 === 0 ) {
			if ( ratio > 0 ) {
				y1 = x1 * ratio;
			} else {
				y1 = x1 / ratio;
			}
		}

		let cropWidthX2 = 0;
		let cropHeightY2 = 0;
		if ( xInit + x1 > realWidth ) {
			cropWidthX2 = xInit - 1;
		} else {
			cropWidthX2 = xInit + x1;
		}
		if ( yInit + y1 > realHeight ) {
			cropHeightY2 = yInit - 1;
		} else {
			cropHeightY2 = yInit + y1;
		}

		const imgSelectOptions = {
			handles: true,
			keys: true,
			instance: true,
			persistent: true,
			imageWidth: realWidth,
			imageHeight: realHeight,
			x1,
			y1,
			x2: cropWidthX2,
			y2: cropHeightY2,
			aspectRatio: settings.aspectRatio,
		};
		return imgSelectOptions;
	};
	return {
		openMediaUploader: ( cropSettings, callback ) => {
			const settings = getCropSettings( cropSettings );
			const cropControl = getCropControl( cropSettings );
			const uploader = wp.media( {
				states: [
					new wp.media.controller.Library( {
						title: cropSettings.title || settings.title,
						library: wp.media.query( { type: 'image' } ),
						multiple: false,
						date: false,
						priority: 20,
						suggestedWidth: settings.suggestedWidth,
						suggestedHeight: settings.suggestedHeight,
					} ),
					new wp.media.controller.CustomizeImageCropper( {
						control: cropControl,
						imgSelectOptions: ( attachment, controller ) => cropOptions( attachment, controller, cropSettings ),
					} ),
				],
			} );

			// Set the toolbar.
			uploader.on(
				'toolbar:create',
				function( toolbar ) {
					const options = {};
					options.items = {};
					options.items.select = {
						text: settings.buttonLabel,
						style: 'primary',
						click: wp.media.view.Toolbar.Select.prototype.clickSelect,
						requires: { selection: true },
						event: 'select',
						reset: false,
						close: false,
						state: false,
						syncSelection: true,
					};
					this.createSelectToolbar( toolbar, options );
				},
				uploader,
			);

			//For when the Add Profile Image is clicked
			let originalAttachmentId = 0;
			uploader.on( 'select', function() {
				// Get avatar attributes.
				const attachment = uploader.state().get( 'selection' ).first().toJSON();

				// Get original attachment ID.
				originalAttachmentId = attachment.id;

				// Calculate ratio.
				const ratio = attachment.width / attachment.height;
				const desiredRatio = cropControl.params.width / cropControl.params.height;
				if ( ratio === desiredRatio ) {
					const selection = uploader.state().get( 'selection' ).single();
					callback( selection.attributes );
					uploader.close();
				} else {
					uploader.setState( 'cropper' );
				}
			} );
			//When the remove buttons is clicked
			uploader.on( 'remove', function() {
			} );

			//For when the window is closed (update the thumbnail)
			uploader.on( 'escape', function() {
			} );

			// When image is cropped.
			uploader.on( 'cropped', function( croppedImage ) {
				callback( croppedImage );
			} );

			// When image cropping is skipped.
			uploader.on( 'skippedcrop', function( selection ) {
				callback( selection.attributes );
			} );

			uploader.on( 'open', function() {
				const attachment = wp.media.attachment( settings.attachmentId );
				const selection = uploader.state( 'library' ).get( 'selection' );
				selection.add( attachment );
			} );
			uploader.open();
		},
	};
};
export default useMediaUploader;