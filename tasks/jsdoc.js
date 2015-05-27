"use strict";
var config = require("../config");
var jsdoc = require("gulp-jsdoc");
var gulp = require("gulp");
/**
 * @module tasks/jsdoc
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
	options = options || {};
	var name = options.name ? options.name : "jsdoc";
	var src = options.src ? options.src : "./**/*.js";
	var dest = options.dest ? options.dest : "./docs";
	return gulp.task(name, function() {
		return gulp.src(src)
			.pipe(jsdoc.parser())
			.pipe(jsdoc.generator(dest, {
				path: "ink-docstrap",
				systemName: config.app.name + " Documentation",
				footer: "Something",
				copyright: "Something",
				navType: "vertical",
				theme: "cerulean",
				linenums: true,
				collapseSymbols: false,
				inverseNav: false,
				plugins: ["plugins/markdown", "plugins/summarize"]
			}));
	});
}

module.exports = task;
