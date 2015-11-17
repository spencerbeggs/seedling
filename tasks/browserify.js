"use strict";
var browserify = require("browserify");
var browserSync = require("browser-sync");
var babelify = require("babelify");
var buffer = require("vinyl-buffer");
var config = require("../config");
var data = require("browserify-data");
var envify = require("envify/custom");
var gulp = require("gulp");
var gulpif = require("gulp-if");
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var prettyHrtime = require("pretty-hrtime");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var watchify = require("watchify");

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

	if (!options.src) {
		throw new Error("You must specify an entry module.");
	}

	if (!options.dest) {
		throw new Error("You must specify an output.");
	}

	return gulp.task(name, function (done) {
		function rebundle(changes) {
			if (changes) {
				gutil.log("[browserify] Changed: " + changes.join(", "));
			}

			var startTime = process.hrtime();
			var stream = bundler.bundle();
			return stream
				.on("error", function () {
					var args = Array.prototype.slice.call(arguments);
					notify.onError({
						title: "Compile Error",
						message: "<%= error.message %>"
					}).apply(this, args); this.emit("end");
				})
				.pipe(source(output))
				.pipe(buffer())
				.pipe(gulpif(config.app.not.production, sourcemaps.init({
					loadMaps: true
				})))
				.pipe(gulpif(config.app.is.production, uglify()))
				.pipe(gulpif(config.app.not.production, sourcemaps.write("./")))

				.pipe(gulp.dest(outputPath))
				.on("end", function () {
					var taskTime = process.hrtime(startTime);
					var prettyTime = prettyHrtime(taskTime);
					gutil.log("[browserify] Bundled", gutil.colors.green(output), "in", gutil.colors.magenta(prettyTime));

					if (config.app.not.dev) {
						done();
					} else {
						browserSync.reload();
					}
				});
		}

		var opts = Object.assign(config.app.is.dev ? watchify.args : {}, {
			entries: options.src,
			debug: config.app.not.prod
		});

		if (options.basedir) {
			opts.basedir = options.basedir;
		}

		var bundler = browserify(opts);

		if (config.app.is.dev) {
			bundler = watchify(bundler);
		}

		bundler.transform(data);
		bundler.transform(babelify, {
			presets: [
				"stage-0",
				"react",
				"es2015"
			],
			plugins: [
				"transform-class-properties",
				"transform-flow-strip-types",
				"transform-object-rest-spread"
			]
		});
		bundler.transform(envify(Object.assign({}, process.env, {
			BROWSERIFY: "true"
		})));
		bundler.on("update", rebundle);
		bundler.on("log", gutil.log);
		return rebundle();
	});
}

module.exports = task;
