"use strict";
var gulp = require("gulp");
var browserify = require("browserify");
var babel = require("gulp-babel");
var babelify = require("babelify");
var watchify = require("watchify");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var gutil = require("gulp-util");
var prettyHrtime = require("pretty-hrtime");
var source = require("vinyl-source-stream");
var envify = require("envify/custom");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");

/**
 * @module tasks/browserify
 * @description Factory function that sets up a new [Browserify]{@link https://github.com/substack/node-browserify} task.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=browserify] - Name of the Gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of files to beautify.
 * @param {string} [options.dest=./] - Output path of compiled bundle.
 * @return {Function}
 */
function task(options) {
	options = options || {};
	var name = options.name ? options.name : "browserify";
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
	if (!options.src) {
		throw new Error("You must specify an entry module.");
	}
	if (!options.dest) {
		throw new Error("You must specify an output.");
	}
	return gulp.task(name, function() {
		function rebundle(changes) {
			if (changes) {
				gutil.log("[browserify] Changed: " + changes.join(", "));
			}
			var startTime = process.hrtime();
			var stream = bundler.bundle();
			return stream
				.on("error", function() {
					var args = Array.prototype.slice.call(arguments);
					// Send error to notification center with gulp-notify
					notify.onError({
						title: "Compile Error",
						message: "<%= error.message %>"
					}).apply(this, args);
					// Keep gulp from hanging on this task
					this.emit("end");
				})
				.pipe(source(output))
				.pipe(buffer())
				.pipe(sourcemaps.init({
					loadMaps: true
				}))
				// .pipe(babel({
				// 	sourceMaps: "inline"
				// }))
				.pipe(sourcemaps.write("./"))
				.pipe(gulp.dest(outputPath))
				.on("end", function() {
					// Log when bundling completes
					var taskTime = process.hrtime(startTime);
					var prettyTime = prettyHrtime(taskTime);
					gutil.log("[browserify] Bundled", gutil.colors.green(output), "in", gutil.colors.magenta(prettyTime));
					browserSync.reload();
				});
		}

		// add custom browserify options here
		var customOpts = {
			entries: options.src,
			debug: true
		};
		var opts = Object.assign({}, watchify.args, customOpts);
		var bundler = watchify(browserify(opts));
		// bundler.transform(babelify.configure({
		// 	optional: ["runtime"]
		// }));
		bundler.transform(envify({
			BROWSERIFY: "true"
		}));
		bundler.on("update", rebundle); // on any dep update, runs the bundler
		bundler.on("log", gutil.log); // output build logs to terminal
		return rebundle();
	});
}

module.exports = task;
