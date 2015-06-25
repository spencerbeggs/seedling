"use strict";
var path = require("path");
var env = require("node-env-file");
env(process.env.ENV_FILE || path.resolve(__dirname, "./.env"));
var pjson = require("./package.json");
process.env.APP_VERSION = pjson.version;
var gulp = require("gulp");
var tasks = require("./tasks");
var fs = require("fs");

tasks.nodemon({
	start: "lib/index.js",
	watch: [
		"**/*.js",
		"templates/**/*.hbs"
	],
	ignore: [
		"app/**/*.js",
		"public/**/*.js",
		"tasks/**/*.js",
		"node_modules/**",
		"bower_components/**"
	]
});

tasks.beautify({
	src: ["./less/**/*.less"],
	dest: "./less",
	name: "beautify-less",
	config: JSON.parse(fs.readFileSync("./.jsbeautifyrc", {
		encoding: "utf-8"
	})).css
});

tasks.json({
	src: ["package.json", ".jshintrc", ".jsbeautifyrc"]
});

tasks.jshint({
	src: ["./app/**/*.js", "./config/**/*.js", "./lib/**/*.js", "./routes/**/*.js", "./tasks/**/*.js"]
});

tasks.browserSync({
	src: ["public/css/**/*.css", "./public/js/**/*.js"]
});

tasks.jsdoc({
	src: ["./config/**/*.js", "./tasks/*.js"]
});

tasks.zone({
	name: "above-the-fold",
	less: "./less/above-the-fold.less"
});

tasks.zone({
	name: "default",
	js: "./app/default.js",
	less: "./less/default.less"
});

gulp.task("beautify", gulp.series(["beautify-less"]));

gulp.task("test", gulp.series(gulp.series(["jshint"])));

gulp.task("dev", gulp.series(gulp.parallel(["above-the-fold", "default"]), "nodemon", "browser-sync"));

gulp.task("build", gulp.parallel("above-the-fold-build", "default-build", "jsdoc"));
