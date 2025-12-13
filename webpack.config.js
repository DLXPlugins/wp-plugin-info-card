const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

module.exports = ( env ) => {
	return [
		{
			...defaultConfig,
			module: {
				...defaultConfig.module,
				rules: [ ...defaultConfig.module.rules ],
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			entry: {
				'wppic-blocks': './src/index.js',
				'edd-sidebar': './src/plugins/EDD/index.js',
			},
		},
		{
			entry: {
				'wppic-admin': [ './src/scss/wppic-admin-style.scss' ],
				'wppic-styles': [ './src/scss/wppic-style.scss' ],
				'wppic-editor': [ './src/scss/editor.scss' ],
				'wppic-admin-home': [ './src/react/views/home/index.js' ],
				'wppic-admin-edd': [ './src/react/views/edd/index.js' ],
				'wppic-admin-github-info-cards': [ './src/react/views/github-info-cards/index.js' ],
				'wppic-admin-custom-plugin': [ './src/react/views/custom-plugin/index.js' ],
				'wppic-fancybox': './src/js/fancyapps/carousel.js',
				'wppic-fancybox-css': './src/scss/carousel.scss',
				'github-info-card': './src/scss/github-cards.scss',
				'github-info-card-lazy-load': './src/js/github-info-card/github-info-card-lazy-load.js',
				badges: './src/scss/badges.scss',
			},
			mode: env.mode,
			devtool: 'production' === env.mode ? false : 'source-map',
			output: {
				filename: '[name].js',
				sourceMapFilename: '[file].map[query]',
				assetModuleFilename: 'fonts/[name][ext]',
				clean: true,
			},
			resolve: {
				alias: {
					react: path.resolve( 'node_modules/react' ),
				},
			},
			module: {
				rules: [
					{
						test: /\.scss$/,
						exclude: /(node_modules|bower_components)/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
									url: false,
								},
							},
							'sass-loader',
						],
					},
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-transform-arrow-functions',
								'lodash',
							],
						},
					},
				],
			},
			plugins: [
				new RemoveEmptyScriptsPlugin(),
				new MiniCssExtractPlugin(),
				new DependencyExtractionWebpackPlugin(),
			],
		},
	];
};
