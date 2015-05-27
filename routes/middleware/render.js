"use strict";
var config = require("../../config");
var minify = require("html-minifier").minify;
var html = require("html");

function fullUrls(file) {
	var suffix = "-" + config.app.version;
 	if (config.env !== "development") {
		suffix += ".min";
	}
	if (file.url.startsWith("/")) {
		let arr = file.url.split(".");
		arr[arr.length - 2] = arr[arr.length - 2] + suffix;
		file.url = config.app.url + arr.join(".");
	}
}

module.exports = function(req, res, next) {
	if (config.env === "development") {
		res.locals.js.body.push({
			url: config.app.protocol + "://" + config.app.hostname + ":5000/browser-sync/browser-sync-client.2.7.1.js",
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
		}, function(err, htmlText) {
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
