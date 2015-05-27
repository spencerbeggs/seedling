"use strict";
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var stripDebug = require("gulp-strip-debug");
var pjson = require("../package.json");
var plumber = require("gulp-plumber");

/**
 * @module tasks/buildJs
 * @description Factory function that sets up a new [Browserify]{@link https://github.com/substack/node-browserify} task to compile JS files for production.
 */

/**
 * @description Factory function that sets up a new [Browserify]{@link https://github.com/substack/node-browserify} task to compile JS files for production.
 * @param {Object} options - Task options.
 * @param {string} [options.name=build-js] - Name of the Gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of JS files to compile.
 * @param {string} [options.dest=./] - Output path of compiled JS.
 * @return {Function}
 */
function task(opts) {
	var options = opts || {};
	var name = options.name ? options.name : "build-js";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output, outputPath;
	if (arr[arr.length - 1] !== "") {
		var outputArr = arr[arr.length - 1].split(".");
		outputArr[0] = outputArr[0] + "-" + pjson.version;
		output = outputArr.join(".");
	}
	else {
		output = dest;
	}
	if (arr.length > 1) {
		arr.pop();
		outputPath = arr.join("/");
	}
	else {
		outputPath = "./";
	}
	return gulp.task(name, function() {
		var bundler = browserify(options.src);
		var stream = bundler.bundle();
		return stream
			.pipe(plumber())
			.pipe(source(output))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(stripDebug())
			.pipe(gulp.dest(outputPath));

	});
}

module.exports = task;
