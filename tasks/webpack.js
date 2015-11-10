var gulp = require("gulp");
var webpack = require("webpack");
var gulpWebpack = require("gulp-webpack");

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
	options = options || {}; var name = options.name ? options.name : "browserify";
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
	gulp.src(options.src)
		.pipe(gulpWebpack({}, webpack))
		.pipe(gulp.dest(outputPath));
});
}

module.exports = task;
