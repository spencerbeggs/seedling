"use strict";
var config = require("../config");
var esdoc = require("gulp-esdoc");
var gulp = require("gulp");
/**
 * @module tasks/esdoc
 * @description Factory function that sets up a new [Gulp JSDoc]{@link https://github.com/jsBoot/gulp-jsdoc} task to build documentation.
 */

/**
 * @description Factory function that sets up a new [Gulp JSDoc]{@link https://github.com/jsBoot/gulp-jsdoc} task to build documentation.
 * @param {Object} options - Task options.
 * @param {string} [options.name=jsdoc] - Name of the gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) the search for files to document.
 * @param {string} [options.dest=./docs] - Destination to output generated documentation.
 * @return {Function}
 */
function task(options) {
	options = options || {}; var name = options.name ? options.name : "esdoc";
	var src = options.src ? options.src : "./**/*.js";
	var dest = options.dest ? options.dest : "./esdoc";
	return gulp.task(name, function (done) {
		return gulp.src(src)
			.pipe(esdoc({
				destination: dest
			}));
		done();
	});
}

module.exports = task;
