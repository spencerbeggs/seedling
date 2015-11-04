"use strict";
var gutil = require("gulp-util");

module.exports = function(req, res, next) {
	gutil.log(req.method + ": " + req.originalUrl); next();
};
