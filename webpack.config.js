const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = [
	{
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ],

					},
				},
				{
					test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images/',
								esModule: false,
							},
						},
					],
				},
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
			],
		},
		devtool: 'source-map',
		externals: {
			// Use external version of React
			react: 'React',
			'react-dom': 'ReactDOM',
			lodash: 'lodash',
			'@wordpress': 'wp',
			'@wordpress/blocks': 'wp.blocks',
			'@wordpress/element': 'wp.element',
			'@wordpress/components': 'wp.components',
			'@wordpress/block-editor': 'wp.blockEditor',
			'@wordpress/i18n': 'wp.i18n',
		},
		optimization: {
			// Only concatenate modules in production, when not analyzing bundles.
			concatenateModules: false,
			minimizer: [
				new TerserPlugin( {
					parallel: true,
					terserOptions: {
						mangle: {
							reserved: [ '__', '_n', '_nx', '_x' ],
						},
						keep_fnames: true,
						keep_classnames: true,
					},
				} ),
			],
		},
		plugins: [ new MiniCssExtractPlugin() ],
	},
	{
		mode: process.env.NODE_ENV,
		entry: {
			'wppic-admin': [ './src/scss/wppic-admin-style.scss' ],
			'wppic-styles': [ './src/scss/wppic-style.scss' ],
		},
		output: {},
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
			],
		},
		devtool: 'source-map',
		plugins: [
			new MiniCssExtractPlugin(),
		],
	},
];

