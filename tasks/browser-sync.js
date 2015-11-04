"use strict";
var gulp = require("gulp");
var browserSync = require("browser-sync");
var config = require("../config");
var moment = require("moment");

/**
 * @module tasks/browserSync
 * @description Factory function that sets up a new [BrowserSync]{@link http://www.browsersync.io/} task.
 */

/** Returns a formatted timestamp */
function timestamp() {
	return "[" + moment(Date.now()).format("H:mm:ss").grey + "] [browser-sync] ";
}

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=browser-sync] - Name of the gulp task.
 * @param {number} [options.port=5000] - Port to run BrowserSync server on.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of files to watch for reload.
 * @return {Function}
 */
function task(options) {
	options = options || {}; var name = options.name ? options.name : "browser-sync";
	var port = options.port ? options.port : 5000;
	return gulp.task(name, function () {
		var bs = browserSync.create();
		bs.init({
			files: options.src,
			open: false,
			host: config.hostname,
			port: port,
			logSnippet: false,
			logPrefix: timestamp,
			browser: ["google chrome"],
			ui: {
				port: 7979
			}

		});
	});
}

module.exports = task;
