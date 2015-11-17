"use strict";
var browserify = require("./browserify");
var config = require("../config");
var gulp = require("gulp");
var zip = require("gulp-zip");
var del = require("del");
var copy = require("gulp-copy");
var install = require("gulp-install");
var awsLambda = require("node-aws-lambda");
var envify = require("envify");
var transform = require("vinyl-transform");
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
	var name = options.name ? options.name : "lambda";
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

	gulp.task(`${name}-clean`, function () {
		return del(["./dist", "./dist.zip"]);
	});

	gulp.task(`${name}-copy`, function (callback) {
		gulp.src(["config/**/*"])
			.pipe(copy("dist"));
		return gulp.src(["api/**/**", "api/index.js", "!api/bootstrap/samples", "!api/bootstrap.js"])
			.pipe(copy("dist", {
				prefix: 1
			}));
		callback();
	});

	gulp.task(`${name}-node-mods`, function () {
		return gulp.src("./api/package.json")
			.pipe(gulp.dest("dist/"))
			.pipe(install({
				production: true
			}));
	});

	browserify({
		name: `${name}-browserify`,
		src: ["../dist/index.js"],
		dest: "../dist/index.js",
		basedir: "dist"
	});

	gulp.task(`${name}-zip`, function () {
		return gulp.src(["dist/**/*"])
			.pipe(zip("dist.zip"))
			.pipe(gulp.dest("./"));
	});

	gulp.task(`${name}-upload`, function (callback) {
		awsLambda.deploy("dist.zip", {
			accessKeyId: config.aws.key, // optional
			secretAccessKey: config.aws.secret, // optional
			region: config.aws.region,
			handler: "lib/index.handler",
			role: config.aws.role,
			functionName: `${config.app.slug}-api-${config.env}`,
			timeout: 10,
			memorySize: 128
		}, callback);
	});

	gulp.task(name, gulp.series([`${name}-clean`, `${name}-copy`, `${name}-node-mods`, `${name}-browserify`, `${name}-zip`, `${name}-upload`]));
}

module.exports = task;
