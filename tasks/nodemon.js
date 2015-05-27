"use strict";
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync");

/**
 * @module tasks/nodemon
 * @description Factory function that sets up a new [Gulp Nodemon]{@link https://github.com/JacksonGariety/gulp-nodemon} task to keep the server running and restarting in development mode.
 */

/**
 * @description Factory function that sets up a new [Gulp Nodemon]{@link https://github.com/JacksonGariety/gulp-nodemon} task to keep the server running and restarting in development mode.
 * @param {Object} options - Task options.
 * @param {string} [options.name=less] - Name of the Gulp task.
 * @param {string} [options.start=index.js] - Path to start script from Gulpfile.
 * @param {string|string[]} [options.watch=index.js] - Glob(s) to watch for reload.
 * @param {string|string[]} options.ignore - Glob(s) to ignore.
 */
function task(options) {
	var options = options || {};
	var name = options.name ? options.name : "nodemon";
	var start = options.start ? options.start : "index.js";
	var watch = options.watch ? options.watch : start;
	var ignore = options.ignore ? options.ignore : [];
	return gulp.task(name, function(cb) {
		var called = false;
		return nodemon({
				// nodemon our expressjs server
				script: start,
				// watch core server file(s) that require server restart on change
				watch: watch,
				ignore: ignore
			})
			.on("start", function onStart() {
				// ensure start only got called once
				if (!called) {
					cb();
				}
				called = true;
			})
			.on("restart", function onRestart() {
				// reload connected browsers after a slight delay
				setTimeout(function reload() {
					browserSync.reload({
						stream: false
					});
				}, 1000);
			});
	});
}

module.exports = task;
