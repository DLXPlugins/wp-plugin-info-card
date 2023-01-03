const { Fragment } = wp.element;

const BannerWrapper = ( props ) => {
	let bannerImage = props.defaultBanner;
	if ( 'high' in props.bannerImage && false !== props.bannerImage.high ) {
		bannerImage = props.bannerImage.high;
	} else if ( 'low' in props.bannerImage && false !== props.bannerImage ) {
		bannerImage = props.bannerImage.low;
	}
	if ( props.image ) {
		bannerImage = props.image;
	}

	return (
		<Fragment>
			<div className="wp-pic-banner-wrapper">
				<img src={ bannerImage } alt={ props.name } />
			</div>
		</Fragment>
	);
};

BannerWrapper.defaultProps = {
	name: '',
	banners: {},
	hasBanner: false,
	bannerImage: {},
	// eslint-disable-next-line no-undef
	defaultBanner: wppic.wppic_banner_default,
	image: false,
};

export default BannerWrapper;
