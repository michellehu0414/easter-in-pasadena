// webpack/webpack.common.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "index.js",
		assetModuleFilename: "assets/[name][ext]",
		clean: true
	},
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "../src"),
			"@assets": path.resolve(__dirname, "../src/assets/"),
			"@scss": path.resolve(__dirname, "../src/scss/"),
			"@components": path.resolve(__dirname, "../src/components/")
		},
		extensions: [".js", ".json", ".scss", ".css"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(woff2?|ttf|otf|eot)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext]"
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[name][ext]"
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/assets/images", to: "assets/images", noErrorOnMissing: true },
				{ from: "src/assets/svg", to: "assets/svg", noErrorOnMissing: true },
				{ from: "src/assets/fonts", to: "assets/fonts", noErrorOnMissing: true }
			]
		})
	]
};
