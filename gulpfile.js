"use strict";
var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");
var env = require("node-env-file");
try {
	var envFilePath = __dirname + "/.env";
	env(process.env.ENV_FILE || envFilePath);
	gutil.log("[GULP] Loaded enviornment variables from " + envFilePath);
} catch (err) {
	console.log(err);
	gutil.log("[WARNING] No .env file found");
}
var pjson = require("./package.json");
process.env.APP_VERSION = pjson.version;
var tasks = require("./tasks");

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

tasks.beautifyCSS({
	src: ["./less/**/*.less"],
	dest: "./less",
	name: "beautify-less"
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

tasks.aws({
	routes: [{
		src: "/",
		dest: "index.html"
	}]
});

gulp.task("beautify", gulp.series(["beautify-less"]));

gulp.task("test", gulp.series(gulp.series(["jshint"])));

gulp.task("dev", gulp.series(gulp.parallel(["above-the-fold", "default"]), "nodemon", "browser-sync"));

gulp.task("build", gulp.parallel("above-the-fold-build", "default-build", "jsdoc"));

gulp.task("aws", gulp.series("build", "aws"));
