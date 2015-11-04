"use strict";
var version;
var shrinkwrap = require("../../npm-shrinkwrap.json") || {};

if (shrinkwrap.dependencies) {
	version = shrinkwrap.dependencies["browser-sync"].version;
} else {
	version = require("../../package.json").replace("^", "");
}

var config = require("../../config");
var minify = require("html-minifier").minify;
var html = require("html");

function fullUrls(file) {
	if (!file.processed) {
		var suffix = "-" + config.app.version;

		if (config.env !== "development") {
			suffix += ".min";
		}

		if (file.url.startsWith("/")) {
			let arr = file.url.split(".");
			arr[arr.length - 2] = arr[arr.length - 2] + suffix;
			file.url = arr.join(".");
		}

		file.processed = true;
	}
}

module.exports = function (req, res, next) {
	if (config.env === "development") {
		res.locals.js.body.push({
			url: config.app.protocol + "://localhost:5000/browser-sync/browser-sync-client." + version + ".js",
			async: true
		});
	}

	res.locals.js.head.forEach(fullUrls);
	res.locals.js.body.forEach(fullUrls);
	res.locals.css.head.forEach(fullUrls);
	res.locals.css.body.forEach(fullUrls);

	if (res.locals.template) {
		res.render(res.locals.template, {
			helpers: {

			}
		}, function (err, htmlText) {
			if (err) {
				console.log(err);
			}

			var output;

			if (config.env !== "development") {
				output = minify(htmlText, {
					collapseWhitespace: true,
					removeComments: true,
					minifyJS: true
				});
			} else {
				output = html.prettyPrint(htmlText, {
					indent_size: 4,
					max_char: 0
				});
			}

			res.locals = {};
			return res.send(output);
		});
	} else {
		return next();
	}
};
