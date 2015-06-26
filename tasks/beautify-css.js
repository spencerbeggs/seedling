"use strict";
var gulp = require("gulp");
var prettydiff = require("gulp-prettydiff");
var fs = require("fs");
var path = require("path");
var conf = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../.jsbeautifyrc")));
conf = conf.css ? conf.css : {};
var _ = require("lodash");

/**
 * @module tasks/beautifyCSS
 * @description Factory function that sets up a new [Prettydiff]{@link https://http://prettydiff.com} task for CSS.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=beautify-css] - Name of the gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of files to beautify.
 * @param {string} [options.dest=./] - Path to output beautifed files to
 * @return {Function}
 */
function task(options) {
	options = options || {};
	options.lang = "css";
	options.mode = "beautify";
	if (_.has(conf, "preserve_newlines")) {
		if (conf.preserve_newlines) {
			options.preserve = "css";
		} else {
			options.preserve = "none";
		}
	} else {
		options.preserve = "css";
	}
	if (_.has(conf, "selector_separator_newline")) {
		if (conf.selector_separator_newline) {
			options.vertical = "css";
		} else {
			options.vertical = "none";
		}
	} else {
		options.vertical = "css";
	}
	options.inchar = _.has(conf, "indent_char") ? String(conf.indent_char) : " ";
	options.insize = _.has(conf, "indent_size") ? Number(conf.indent_size) : 4;
	options.cssinsertlines = _.has(conf, "newline_between_rules") ? Boolean(conf.newline_between_rules) : false;
	console.log(options);
	var name = options.name ? options.name : "beautify-css";
	var dest = options.dest ? options.dest : "./";
	gulp.task(name, function() {
		return gulp.src(options.src)
			.pipe(prettydiff(options))
			.pipe(gulp.dest(dest));
	});
}

module.exports = task;
