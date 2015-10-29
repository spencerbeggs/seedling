"use strict";
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.locals.content = {
		title: "This is the Homepage",
		description: "This is the description"
	};
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	res.locals.css.head.push({
		url: "/css/seedling.css",
	});
	res.locals.js.body.push({
		url: "/js/seedling.js",
		async: true
	});
	next();
});

module.exports = router;
