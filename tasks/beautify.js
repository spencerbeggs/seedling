"use strict";
var gulp = require("gulp");
var beautify = require("gulp-jsbeautifier");
var path = require("path");
var prettydiff = require("prettydiff").api;
console.log(prettydiff);
var through = require('through2');
var gutil = require("gulp-util");
var _ = require("lodash");
var PluginError = gutil.PluginError;
/**
 * @module tasks/beautify
 * @description Factory function that sets up a new [Gulp JS Beautifier]{@link https://github.com/tarunc/gulp-jsbeautifier} task.
 */

function transform(file, enc, cb) {

    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new PluginError('gulp-coffee', 'Streaming not supported'));

    var data;
    var str = file.contents.toString('utf8');
    try {
      data = prettydiff({
			source: str,
			lang  : "less"
		});
		console.log(str);
    } catch (err) {
      return cb(new PluginError('gulp-coffee', err));
    }

    if (data && data.v3SourceMap && file.sourceMap) {
      applySourceMap(file, data.v3SourceMap);
      file.contents = new Buffer(data.js);
    } else {
      file.contents = new Buffer(data);
    }

    cb(null, file);
		return through.obj(transform);

};

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
	var config = options.config ? options.config : {};
	var dest = options.dest ? options.dest : "./";
	gulp.task(name, function() {
		return gulp.src(options.src)
			.pipe(transform())
			.pipe(gulp.dest(dest));
	});
}

module.exports = task;
