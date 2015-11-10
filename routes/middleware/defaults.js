"use strict";
var config = require("../../config");

module.exports = function (req, res, next) {
	res.locals = config;
	res.locals.css = {
		head: [],
		body: []
	};
	res.locals.js = {
		head: [],
		body: []
	}; next();
};
