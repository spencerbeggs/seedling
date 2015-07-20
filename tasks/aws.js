"use strict";
var gulp = require("gulp");
var recursive = require("recursive-readdir");
var AWS = require("aws-sdk");
var fs = require("fs");
var config = require("../config");
var zlib = require("zlib");
var request = require("request");

/**
 * @module tasks/aws
 * @description Factory function that sets up a new [Gulp JS Beautifier]{@link https://github.com/tarunc/gulp-jsbeautifier} task.
 */

/**
 * @param {Object} options - Task options.
 * @param {string} [options.name=beautify] - Name of the gulp task.
 * @param {string|string[]} [options.src=./**\/*.js] - Glob path(s) of files to beautify.
 * @param {string} [options.dest=./] - Path to output beauti
 * @return {Function}
 */
function task(options) {
	options = options || {};
	var name = options.name ? options.name : "aws";
	var routes = options.routes ? options.routes : [];
	// /var dest = options.dest ? options.dest : "./";
	gulp.task(name, function() {
		var server = require("../lib/server");
		server.on("ready", function() {
			routes.forEach(function(route) {
				request.get("http://localhost:3000" + route.src, function(err, data) {
					var params = {
						Bucket: config.aws.staticBucket,
						Key: route.dest,
						ACL: "public-read",
						ContentType: "text/html; charset=utf-8",
						ContentEncoding: "gzip",
						CacheControl: "public, max-age=600"
					};
					var s3 = new AWS.S3({
						params: params
					});
					zlib.gzip(data.body, function(err, result) {
						s3.upload({
							Body: result
						}, function(err, data) {
							console.log(data.Location);
						});
					});
				});
			});
		});
		recursive("./public", [".DS_Store"], function(err, files) {
			files.forEach(function(file) {
				var arr = file.split(".");
				var contentType;
				var contentEncoding;
				var zipped = false;
				var params = {
					Bucket: config.aws.staticBucket,
					Key: file.replace("public/", ""),
					ACL: "public-read",
					CacheControl: "public, max-age=86400"
				};
				if (arr[arr.length - 1] === "js") {
					console.log(file);
					contentType = "application/javascript";
					contentEncoding = "gzip";
					zipped = true;
				} else if (arr[arr.length - 1] === "css") {
					contentType = "text/css";
					contentEncoding = "gzip";
					zipped = true;
				}
				params.ContentType = contentType;
				params.ContentEncoding = contentEncoding;
				var s3 = new AWS.S3({
					params: params
				});
				var body;
				if (zipped) {
					body = fs.createReadStream(file).pipe(zlib.createGzip());
				} else {
					body = fs.createReadStream(file);
				}
				s3.upload({
					Body: body
				}, function(err, data) {
					console.log(data.Location);
				});
			});
		});
	});
}

module.exports = task;
