/* eslint new-cap:0 */
"use strict";
var express = require("express");
var router = express.Router();

router.param("pageId", function (req, res, next, pageId) {
	if (pageId === "1") {
		res.locals.json = {
			title: "Splash"
		};
	} else if (pageId === "2") {
		res.locals.json = {
			title: "Summary"
		};
	}

	next();
});

router.get("/page/:pageId", function (req, res, next) {
	res.json(res.locals.json);
	next();
});

module.exports = router;
