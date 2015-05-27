"use strict";
var gulp = require("gulp");
var config = require("../config");
var browserify = require("./browserify");
var buildJs = require("./build-js");
var buildCss = require("./build-css");
var less = require("./less");

/**
 * @module tasks/zone
 * @description Factory function that sets up a development and build Gulp tasks for the app.
 */

/**
 * @description Factory function that sets up a development and build Gulp tasks for the app.
 * @param {Object} options - Task options.
 * @param {string} [options.name=less] - Base name of the Gulp task.
 * @param {string} options.js - Path of entry module.
 * @param {string} options.less - Path of LESS module.

 */
function task(options) {

	var suffix = "-" + config.app.version;
	if (config.env === "production") {
		suffix += ".min";
	}

	var devTasks = [];
	var buildTasks = [];

	if (options.js) {

		let devTaskName = options.name + "-js";
		browserify({
			name: devTaskName,
			src: options.js,
			dest: "./public/js/" + options.name + suffix + ".js"
		});
		devTasks.push(devTaskName);

		let buildTaskName = options.name + "-js-build";
		buildJs({
			name: buildTaskName,
			src: options.js,
			dest: "./public/js/" + options.name + suffix + ".js"
		});
		buildTasks.push(buildTaskName);
	}

	if (options.less) {

		let devTaskName = options.name + "-less";
		less({
			name: devTaskName,
			src: options.less,
			dest: "public/css/" + options.name + ".css"
		});
		devTasks.push(devTaskName);

		let buildTaskName = options.name + "-less-build";
		buildCss({
			name: buildTaskName,
			src: options.css,
			dest: "./public/js/" + options.name + suffix + ".js",
		});
		buildTasks.push(buildTaskName);
	}

	gulp.task(options.name, gulp.parallel(devTasks));
	gulp.task(options.name + "-build", gulp.parallel(buildTasks));
}

module.exports = task;
