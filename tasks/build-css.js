"use strict";
var gulp = require("gulp");
var less = require("gulp-less");
var concat = require("gulp-concat");
var prefixer = require("less-plugin-autoprefix");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = new prefixer({
	browsers: ["last 3 versions"]
});
var pjson = require("../package.json");
var plumber = require("gulp-plumber");

/**
 * @module tasks/buildCss
 * @description Factory function that sets up a new [Gulp LESS]{@link https://github.com/plus3network/gulp-less} task.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=build-css] - Name of the Gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of LESS files to compile.
 * @param {string} [options.dest=./] - Output path of compiled CSS.
 * @return {Function}
 */
function task(options) {
	options = options || {};
	var name = options.name ? options.name : "build-css";
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
		return gulp.src(options.src)
			.pipe(plumber())
			.pipe(less({
				plugins: [autoprefixer]
			}))
			.pipe(minifyCSS({
				keepSpecialComments: 0
			}))
			.pipe(concat(output))
			.pipe(gulp.dest(outputPath));
	});
}

module.exports = task;
