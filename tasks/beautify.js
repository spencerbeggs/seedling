"use strict";
var gulp = require("gulp");
var esformatter = require("gulp-esformatter");
var pkg = require("../package.json");

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
	options = options || {}; var name = options.name ? options.name : "beautify";
	var config = options.config ? options.config : {};
	var dest = options.dest ? options.dest : "./";
	gulp.task(name, function () {
		return gulp.src(options.src)
			.pipe(esformatter(pkg.esformatter))
			.pipe(gulp.dest(dest));
	});
}

module.exports = task;
