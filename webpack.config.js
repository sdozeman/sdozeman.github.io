const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, argv) => ({
	entry: {
		scripts: './assets/src/js/scripts.js',
		styles: './assets/src/scss/styles.scss',
		vendor: ['imagesloaded']
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'assets/dist/js'),
		chunkFilename: '[id].[chunkhash].js'
	},

	// https://webpack.js.org/configuration/devtool/
	devtool: argv.mode === 'production' ? 'none' : 'source-map',

	// https://webpack.js.org/configuration/performance/
	performance: {
		maxEntrypointSize: 350000,
		assetFilter: function(assetFilename) {
      return !(/\.(jpg|png|gif|svg|map)$/.test(assetFilename));
    }
	},

	// https://webpack.js.org/configuration/stats/
	stats: {
		modules: false,
	},
	
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								['@babel/preset-react', { development: argv.mode === 'production' ? false : true } ]
							]
						}
					}
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
							minimize: true,
							sourceMap: argv.mode === 'production' ? false : true,
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: argv.mode === 'production' ? false : true,
							plugins: [
								// https://github.com/postcss/autoprefixer#options
								require('autoprefixer')({ 
									grid: true, // CSS Grid Layout
									'overrideBrowserslist': [
										'IE 10'
									]
								})
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: argv.mode === 'production' ? false : true
						}
					}
				]
			},
			{
				test: /\.(gif|jpg|png|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '../img/[name].[ext]'
					}
				}
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '../fonts/[name].[ext]'
					}
				}
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: argv.mode === 'production' ? false : true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
  },
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: '../css/[name].css'
		}),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'assets/src/img'), to: path.resolve(__dirname, 'assets/dist/img')},
			{ from: path.resolve(__dirname, 'assets/src/fonts'), to: path.resolve(__dirname, 'assets/dist/fonts')}
		]),
	].concat(argv.mode === 'production' ? [] : [])
});