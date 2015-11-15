var gulp = require("gulp");
var mocha = require("gulp-mocha");

/**
 * @module tasks/mocha
 * @description Factory function that sets up a new [Gulp Mocha]{@link https://github.com/sindresorhus/gulp-mocha} task to build test JS.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=less] - Name of the Gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of LESS files to beautify.
 * @param {string} [options.dest=./] - Output path of compiled CSS.
 * @return {Function}
 */
 function task(options) {
	options = options || {}; var name = options.name ? options.name : "mocha";
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

	gulp.task(name, function () {
		return gulp.src(options.src, {read: false});

		// gulp-mocha needs filepaths so you can't have any plugins before it
		// /.pipe(mocha({reporter: "nyan"}));
	});
}

module.exports = task;
