"use strict";
require("./config/load_env");
var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");

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
	src: ["package.json", ".jsbeautifyrc", ".jscsrc"]
});

// tasks.eslint({
// 	src: ["./app/**/*.js", "./config/**/*.js", "./lib/**/*.js", "./routes/**/*.js", "./tasks/**/*.js"]
// });

tasks.lambda({
	name: "deploy-api"
});

tasks.browserSync({
	src: ["public/css/**/*.css", "./public/js/**/*.js"]
});

tasks.esdoc({
	src: ["./config/**/*.js", "./tasks/*.js"]
});

tasks.zone({
	name: "jquery",
	js: "./app/jquery/app.js",
	css: "./styles/jquery/app.less"
});

tasks.zone({
	name: "react",
	js: "./app/react/index.jsx",
	css: "./styles/react/app.scss"
});

tasks.aws({
	routes: [{
		src: "/",
		dest: "index.html"
	}]
});

tasks.jscs({
	src: ["./**/js", "./**/jsx"]
});

gulp.task("bootstrap-staging", function () {
	BootstrapUsers();
});

tasks.mocha({
	src: "./test/**.js"
});

gulp.task("beautify", gulp.series(["json", "beautify-less"]));

gulp.task("test", gulp.series(gulp.series(["jscs", "mocha"])));

gulp.task("dev", gulp.series(gulp.parallel(global.gulpZoneNames), "nodemon", "browser-sync"));

gulp.task("build", gulp.parallel(global.gulpZoneNames));

gulp.task("aws", gulp.series("build", "aws"));
