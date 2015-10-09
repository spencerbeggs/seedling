"use strict";
var gulp = require("gulp");
var config = require("../config");
var scss = require("gulp-scss");
var browserSync = require("browser-sync");
var gutil = require("gulp-util");
var prettyHrtime = require("pretty-hrtime");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var watch = require("gulp-watch");

/**
 * @module tasks/less
 * @description Factory function that sets up a new [Gulp LESS]{@link https://github.com/plus3network/gulp-less} task to build CSS for development.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=less] - Name of the Gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of LESS files to beautify.
 * @param {string} [options.dest=./] - Output path of compiled CSS.
 * @return {Function}
 */
function task(options) {
	options = options || {};
	var name = options.name ? options.name : "less";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output, outputPath;
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
	return gulp.task(name, function() {
		var startTime;

		var logger = {
			start: function() {
				startTime = process.hrtime();
			},
			end: function(filepath) {
				var taskTime = process.hrtime(startTime);
				var prettyTime = prettyHrtime(taskTime);
				gutil.log("[less] Bundled", gutil.colors.green(filepath), "in", gutil.colors.magenta(prettyTime));
			},
			error: function(err) {
				gutil.log(err);
			}
		};

		function rebundle() {
			logger.start(output);
			return gulp.src(options.src)
				.pipe(sourcemaps.init())
				.pipe(scss())
				.pipe(rename(function(path) {
					path.basename = filename;
				}))
				.pipe(sourcemaps.write("./"))
				.pipe(gulp.dest(outputPath))
				.on("end", function() {
					logger.end(output);
					browserSync.reload({
						stream: true
					});
				});
		}

		watch(options.src, rebundle);
		return rebundle();

	});
}

module.exports = task;
