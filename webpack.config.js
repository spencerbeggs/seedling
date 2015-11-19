var path = require("path");

module.exports = {
	entry: [
		"babel-polyfill",
		"./app/react/index.jsx"
	],
	output: {
		filename: "./public/js/react-0.0.0.js",
		sourceMapFilename: "[file].map"
	},
	devtool: "source-map",
	watch: true,
	module: {
		loaders: [{
			loader: "babel-loader",

			// Skip any files outside of your project's `src` directory
			exclude: /(node_modules|bower_components)/,

			// Only run `.js` and `.jsx` files through Babel
			test: /\.jsx?$/,

			// Options to configure babel with
			query: {
				plugins: ["transform-runtime"],
				presets: ["es2015", "stage-0", "react"]
			}
		}, {
			test: /node_modules\/auth0-lock\/.*\.js$/,
			loaders: [
				"transform-loader/cacheable?brfs",
				"transform-loader/cacheable?packageify"
			]
		}, {
			test: /node_modules\/auth0-lock\/.*\.ejs$/,
			loader: "transform-loader/cacheable?ejsify"
		}, {
			test: /\.json$/,
			loader: "json-loader"
		}]
	}
};
