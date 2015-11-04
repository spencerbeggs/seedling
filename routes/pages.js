/* eslint new-cap:0 */
"use strict";
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
	res.locals.content = {
		title: "This is the Homepage",
		description: "This is the description"
	};
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

router.get("/react", function (req, res, next) {
	res.locals.content = {
		title: "React App",
		description: "This is a react app."
	};
	res.locals.pageId = "react";
	res.locals.template = "pages/react";
	res.locals.css.head.push({
		url: "/css/react.css"
	});
	res.locals.js.body.push({
		url: "/js/react.js",
		async: true
	});
	next();
});

router.get("/jquery", function (req, res, next) {
	res.locals.content = {
		title: "React App",
		description: "This is a react app."
	};
	res.locals.pageId = "react";
	res.locals.template = "pages/jquery";
	res.locals.css.head.push({
		url: "/css/jquery.css"
	});
	res.locals.js.body.push({
		url: "/js/jquery.js",
		async: true
	});
	next();
});

module.exports = router;
