"use strict";
var gulp = require("gulp");
var jshint = require("gulp-jshint");
require("jshint-stylish");

/**
 * @module tasks/jshint
 * @description Factory function that sets up a new [Gulp JSHint]{@link https://github.com/spalger/gulp-jshint} task to lint the app.
 */

/**
 * @description Factory function that sets up a new [Gulp JSHint]{@link https://github.com/spalger/gulp-jshint} task to lint the app. * @param {Object} options - Task options.
 * @param {string} [options.name=jshint] - Name of the gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) the search for files to document.
 * @param {string} [options.dest=./docs] - Destination to output generated documentation.
 * @return {Function}
 */

function task(options) {
	options = options || {};
	var name = options.name ? options.name : "jshint";
	var reporter = options.reporter ? options.reporter : "jshint-stylish";
	return gulp.task(name, function(callback) {
		gulp.src(options.src)
			.pipe(jshint())
			.pipe(jshint.reporter(reporter));
		callback();
	});
}

module.exports = task;
