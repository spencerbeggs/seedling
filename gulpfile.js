"use strict";
var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");
var env = require("node-env-file");
try {
	var envFilePath = path.join(__dirname, "/.env");
	env(process.env.ENV_FILE || envFilePath);
	gutil.log("[GULP] Loaded enviornment variables from " + envFilePath);
} catch (err) {
	console.log(err);
	gutil.log("[WARNING] No .env file found");
}
var pjson = require("./package.json");
process.env.APP_VERSION = pjson.version;
var tasks = require("./tasks");

global.gulpTaskNames = [];
global.gulpZoneNames = [];

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
	src: ["./package.json", "./.jshintrc", "./.jsbeautifyrc", "./.eslintrc"]
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
	css: "./styles/less/above-the-fold.less"
});

// tasks.zone({
// 	name: "default",
// 	js: "./app/default.js",
// 	css: "./styles/less/default.less"
// });

tasks.zone({
	name: "seedling",
	js: "./app/app.jsx",
	css: "./styles/scss/app.scss"
});

tasks.aws({
	routes: [{
		src: "/",
		dest: "index.html"
	}]
});

gulp.task("beautify", gulp.series(["beautify-less"]));

gulp.task("test", gulp.series(gulp.series(["jshint"])));

gulp.task("dev", gulp.series(gulp.parallel(global.gulpZoneNames), "nodemon", "browser-sync"));

gulp.task("build", gulp.parallel(global.gulpZoneNames));

gulp.task("aws", gulp.series("build", "aws"));
