const config = require("../config");
const gulp = require("gulp");
const webpack = require("webpack");
const path = require("path");
const gutil = require("gulp-util");

const plugins = [
    new webpack.EnvironmentPlugin([
      "BROWSER",
      "NODE_ENV",
      "APP_NAME",
      "APP_SLUG",
      "APP_PROTOCOL",
      "APP_SUBDOMAIN",
      "APP_DOMAIN",
      "APP_PORT",
      "npm_package_version"
    ])
];

if (config.app.is.prod) {
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			screw_ie8: true,
			keep_fnames: true,
			warnings: false
		},
		mangle: {
			screw_ie8: true,
			keep_fnames: true
		}
	}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin());
}

/**
 * @module tasks/webpack
 * @description Factory function that sets up a new [Webpack]{@link https://webpack.github.io/} task.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=browserify] - Name of the Gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of files to beautify.
 * @param {string} [options.dest=./] - Output path of compiled bundle.
 * @return {Function}
 */

function task(options) {
	options = options || {};
	var name = options.name ? options.name : "browserify";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output;
	var outputPath;

	if (typeof options.src === "string") {
		options.src = [options.src];
	}

	if (arr[arr.length - 1] !== "") {
		var outputArr = arr[arr.length - 1].split(".");
		output = outputArr.join(".");
	} else {
		output = dest;
	}

	if (arr.length > 1) {
		arr.pop();
		outputPath = arr.join("/");
	} else {
		outputPath = "./";
	}

	if (!options.src) {
		throw new Error("You must specify an entry module.");
	}

	if (!options.dest) {
		throw new Error("You must specify an output.");
	}

	return gulp.task(name, function (done) {
		webpack({
			entry: [
			"babel-polyfill",
			options.src[0]
			],
			output: {
				filename: options.dest,
				sourceMapFilename: "[file].map"
			},
			devtool: config.app.is.dev ? "source-map" : false,
			watch: config.app.is.dev,
			plugins: plugins,
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
		}, function (err, stats) {
			if (err) {
				throw new gutil.PluginError("webpack", err);
			}

			gutil.log("[webpack]", stats.toString({
			// output options
			}));
			done();
		});
	});
}

module.exports = task;
