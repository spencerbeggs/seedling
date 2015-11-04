"use strict";
var gulp = require("gulp");
var jsonFormat = require("gulp-json-format");
var eol = require("gulp-eol");

/**
 * @module tasks/json
 * @description Factory function that sets up a new [Gulp JSON Format]{@link https://github.com/Dragory/gulp-json-format} task to cleanup JSON files.
 */

/**
 * @description Factory function that sets up a new [Gulp JSON Format]{@link https://github.com/Dragory/gulp-json-format} task to cleanup JSON files.
 * @param {string} [options.name=json] - Name of the gulp task.
 * @param {string|string[]} [options.src=./**\/*.json] - Glob path(s) the search for JSON files.
 * @param {string} [options.dest=./] - Destination to output formatted files.
 * @param {string} [options.space=\t] - Space delimiter.
 */
function task(options) {
	options = options || {}; var name = options.name ? options.name : "json";
	var space = options.space ? options.space : "\t";
	var dest = options.dest ? options.dest : "./";
	return gulp.task(name, function (callback) {
		gulp.src(options.src)
			.pipe(jsonFormat(space))
			.pipe(eol())
			.pipe(gulp.dest(dest));
		callback();
	});
}

module.exports = task;
