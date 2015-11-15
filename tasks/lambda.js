"use strict";
var config = require("../config");
var gulp = require("gulp");
var zip = require("gulp-zip");
var del = require("del");
var copy = require("gulp-copy");
var install = require("gulp-install");
var awsLambda = require("node-aws-lambda");
var browserify = require("browserify");
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

	return gulp.task(name, function (done) {
		gulp.task("${name}-clean", function () {
			return del(["./dist", "./dist.zip"]);
		});

		gulp.task("${name}-envify", function () {
			var envified = transform(function (filename) {
				return envify(filename);
			});

			return gulp.src(["dist/**/*.js"])
				.pipe(envified)
				.pipe(gulp.dest("dist/"));
		});

		gulp.task("${name}-copy", function () {
			return gulp.src(["lib/**/*", "config/**/*"])
				.pipe(copy("dist/"));
		});

		gulp.task("${name}-node-mods", function () {
			return gulp.src("./package.json")
				.pipe(gulp.dest("dist/"))
				.pipe(install({
					production: true
				}));
		});

		gulp.task("${name}-zip", function () {
			return gulp.src(["dist/**/*"])
				.pipe(zip("dist.zip"))
				.pipe(gulp.dest("./"));
		});

		gulp.task("${name}-upload", function (callback) {
			awsLambda.deploy("./dist.zip", {
				accessKeyId: config.aws.key, // optional
				secretAccessKey: config.aws.secret, // optional
				region: config.aws.region,
				handler: "lib/index.handler",
				role: config.aws.role,
				functionName: config.aws.function + "-" + config.env,
				timeout: 10,
				memorySize: 128
			}, callback);
		});

		gulp.task(`${name}-deploy`, gulp.series([`${name}-clean`, `${name}-copy`, `${name}-envify`, `${name}-node-mods`, `${name}-zip`, `${name}-upload`]));
	});
}
