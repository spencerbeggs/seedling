"use strict";
var gulp = require("gulp");
var beautify = require("gulp-jsbeautifier");
/**
 * @module tasks/beautify
 * @description Factory function that sets up a new [Gulp JS Beautifier]{@link https://github.com/tarunc/gulp-jsbeautifier} task.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=beautify] - Name of the gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of files to beautify.
 * @param {string} [options.dest=./] - Path to output beauti
 * @return {Function}
 */
function task(options) {
	options = options || {};
	var name = options.name ? options.name : "beautify";
	var settings = options.settings ? options.settings : {};
	var dest = options.dest ? options.dest : "./";
	return gulp.task(name, function() {
		return gulp.src(options.src)
			.pipe(beautify(settings))
			.pipe(gulp.dest(dest));
	});
}

module.exports = task;
