"use strict";
var browserSync = require("browser-sync");
var config = require("../config");
var gulp = require("gulp");
var gulpif = require("gulp-if");
var gutil = require("gulp-util");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var Prefixer = require("less-plugin-autoprefix");
var prettyHrtime = require("pretty-hrtime");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var watch = require("gulp-watch");

var autoprefixer = new Prefixer({
	browsers: ["last 3 versions"]
});
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
	options = options || {}; var name = options.name ? options.name : "less";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output;
	var outputPath;

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

	return gulp.task(name, function (done) {
		var startTime;
		var logger = {
			start: function () {
				startTime = process.hrtime();
			},

			end: function (filepath) {
				var taskTime = process.hrtime(startTime);
				var prettyTime = prettyHrtime(taskTime);
				gutil.log("[less] Bundled", gutil.colors.green(filepath), "in", gutil.colors.magenta(prettyTime));
			},

			error: function (err) {
				gutil.log(err);
			}
		};
		function rebundle() {
			logger.start(output); return gulp.src(options.src)
				.pipe(gulpif(config.app.not.production, sourcemaps.init({
					loadMaps: true
				})))
				.pipe(less({
					plugins: [autoprefixer]
				}))
				.pipe(gulpif(config.app.is.production, minifyCSS({
					keepSpecialComments: 0
				})))
				.pipe(rename(function (path) {
					path.basename = output.replace(".css", "");
				}))
				.pipe(gulpif(config.app.not.production, sourcemaps.write("./")))
				.pipe(gulp.dest(outputPath))
				.on("end", function () {
					logger.end(output);

					if (config.app.not.dev) {
						done();
					} else {
						browserSync.reload({
							stream: true
						});
					}
				});
		}

		watch(options.src, rebundle); return rebundle();
	});
}

module.exports = task;
