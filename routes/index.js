"use strict";
var middleware = require("./middleware");

module.exports = function (app) {
	app.use(middleware.logger);
	app.use(middleware.defaults);
	app.use("/api", require("./api"));
	app.use(require("./pages"));
	app.use(middleware.render);
	app.use(function (req, res) {
		res.status(404).send("404");
	});
};
