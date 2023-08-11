
const wpInfoCardImageCrop = (event, options) => {

	const __ = wp.i18n.__;

	const defaultSettings = {
		id: '',
		attachmentId: 0,
		aspectRatio: '1:1',
		suggestedWidth: '1000',
		suggestedHeight: '1000',
		nonce: '',
		postId: 0,
		title: __('Image', 'wp-plugin-info-card'),
		buttonLabel: __('Add Image', 'wp-plugin-info-card'),
		main: this,
		callback: () => {},
	};
	const settings = { ...defaultSettings, ...options };
	
	

	const cropOptions = (attachment, controller) => {
		const control = controller.get('control');
		const realWidth = attachment.get('width');
		const realHeight = attachment.get('height');

		console.log( controller );
		let xInit = parseInt(control.params.width, 10);
		let yInit = parseInt(control.params.height, 10);

		const ratio = xInit / yInit;
		const ratioReal = realWidth / realHeight;

		let canSkipCrop = ratio === ratioReal;
		controller.set('canSkipCrop', canSkipCrop );

		let xImg = xInit;
		let yImg = yInit;

		if (realWidth / realHeight > ratio) {
			if (yImg > realHeight) {
				yImg = realHeight;
			}
			yInit = yImg;
			xInit = yInit * ratio;
		} else {
			if (xImg > realWidth) {
				xImg = realWidth;
			}
			xInit = xImg;
			yInit = xInit / ratio;
		}

		let x1 = (realWidth - xInit) / 2;
		let y1 = (realHeight - yInit) / 2;

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
		if ( ( xInit + x1 ) > realWidth ) {
			cropWidthX2 = xInit -1;
		} else {
			cropWidthX2 = xInit + x1;
		}
		if ( ( yInit + y1 ) > realHeight ) {
			cropHeightY2 = yInit -1;
		} else {
			cropHeightY2 = yInit + y1;
		}


		let imgSelectOptions = {
			handles: true,
			keys: true,
			instance: true,
			persistent: true,
			imageWidth: realWidth,
			imageHeight: realHeight,
			x1: x1,
			y1: y1,
			x2: cropWidthX2,
			y2: cropHeightY2,
			aspectRatio: settings.aspectRatio,
		};
		return imgSelectOptions;
	}

	const cropControl = {
		id: 'control-id',
		params: {
			flex_width: false,
			flex_height: false,
			width: settings.suggestedWidth,
			height: settings.suggestedHeight,
		},
	};

	const setAttachmentImage = (image) => {
		const container = element.querySelector('.course-maker-img-container a');
		container.innerHTML = `<img src="${image.url}" />`;
	}

	const saveCropped = (attachment_id, attachment_url) => {
		fetch(ajaxurl, {
			method: 'POST',
			body: new URLSearchParams({
				action: settings.id,
				nonce: settings.nonce,
				attachment_id: attachment_id,
				url: attachment_url,
				post_id: settings.postId,
			}),
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				settings.callback(data.data);
				settings.attachmentId = data.data.attachment_id;
			}
		});
	}

	const handleUpload = (e) => {
		e.preventDefault();
console.log( cropControl );
		let mediaUploader = wp.media({
			button: {
				text: settings.buttonLabel,
				close: false,
			},
			states: [
				new wp.media.controller.Library({
					title: settings.title,
					library: wp.media.query({ type: 'image' }),
					multiple: false,
					date: false,
					priority: 20,
					suggestedWidth: settings.suggestedWidth,
					suggestedHeight: settings.suggestedHeight,
				}),
				new wp.media.controller.CustomizeImageCropper({
					imgSelectOptions: cropOptions,
					control: cropControl,
				}),
			],
		});

		// When image is cropped.
		mediaUploader.on('cropped', (croppedImage) => {
			saveCropped(croppedImage.id, croppedImage.url);
		});

		// When image cropping is skipped.
		mediaUploader.on('skippedcrop', (selection) => {
			saveCropped(selection.id, selection.get('url'));
		});

		mediaUploader.on('select', () => {
			let attachment = mediaUploader.state().get('selection').first().toJSON();

			let ratio = attachment.width / attachment.height;
			let desiredRatio = cropControl.params.width / cropControl.params.height;
			if (
				ratio === desiredRatio
			) {
				let selection = mediaUploader.state().get('selection').single();
				saveCropped(selection.attributes.id, selection.attributes.url);
				mediaUploader.close();
			} else {
				mediaUploader.setState('cropper');
			}
		});

		mediaUploader.on('open', function () {
			// Set attached image upon media library opened.
			let attachment = wp.media.attachment(settings.attachmentId);
			let selection = mediaUploader.state('library').get('selection');
			selection.add(attachment);
		});

		mediaUploader.open();
	}

	// Start the media manager.
	handleUpload( event );
}
export default wpInfoCardImageCrop;