"use strict";
var gulp = require("gulp");
var config = require("../config");
var browserify = require("./browserify");
var webpack = require("./webpack");
var less = require("./less");
var scss = require("./scss");

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
		}); devTasks.push(devTaskName);
		let buildTaskName = options.name + "-js-build";
		browserify({
			name: buildTaskName,
			src: options.js,
			dest: "./public/js/" + options.name + suffix + ".js"
		});
		buildTasks.push(buildTaskName);
	}

	// if (options.js) {
	// let devTaskName = options.name + "-js";
	// webpack({
	// 	watch: true,
	// 	name: devTaskName,
	// 	src: options.js,
	// 	dest: "./public/js/"
	// });
	// devTasks.push(devTaskName);

	// let buildTaskName = options.name + "-js-build";
	// browserify({
	// 	name: buildTaskName,
	// 	src: options.js,
	// 	dest: "./public/js/" + options.name + suffix + ".js"
	// });
	// buildTasks.push(buildTaskName);
	// }

	if (options.css) {
		if (typeof options.css === "string") {
			options.css = [options.css];
		}

		options
			.css
			.forEach(function (file) {
				var baseName;
				var taskName;
				let fileArr = file.split("/");
				let filename = fileArr[fileArr.length - 1];
				let fileBase = filename.split(".")[0];

				if (options.css.length > 1) {
					baseName = options.name + "-" + fileBase;
				} else {
					baseName = options.name;
				}

				if (file.includes(".less")) {
					taskName = baseName + "-less"; less({
						name: taskName,
						src: file,
						dest: "public/css/" + baseName + suffix + ".css"
					});
				} else if (file.includes(".scss")) {
					taskName = baseName + "-scss"; scss({
						name: taskName,
						src: file,
						dest: "public/css/" + baseName + suffix + ".css"
					});
				}

				devTasks.push(taskName);
			});
	}

	gulp.task(options.name, gulp.parallel(devTasks));
	global.gulpZoneNames.push(options.name);
}

module.exports = task;
