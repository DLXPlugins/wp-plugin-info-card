const { Fragment } = wp.element;

const BannerWrapper = ( { 
	name = '', 
	banners = {}, 
	hasBanner = false, 
	bannerImage = {}, 
	// eslint-disable-next-line no-undef
	defaultBanner = typeof wppic !== 'undefined' ? wppic.wppic_banner_default : '', 
	image = false 
} ) => {
	let bannerImageSrc = defaultBanner;
	if ( 'high' in bannerImage && false !== bannerImage.high ) {
		bannerImageSrc = bannerImage.high;
	} else if ( 'low' in bannerImage && false !== bannerImage ) {
		bannerImageSrc = bannerImage.low;
	}
	if ( image ) {
		bannerImageSrc = image;
	}

	return (
		<Fragment>
			<div className="wp-pic-banner-wrapper">
				<img src={ bannerImageSrc } alt={ name } />
			</div>
		</Fragment>
	);
};

export default BannerWrapper;
