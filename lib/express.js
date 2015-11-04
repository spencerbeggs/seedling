"use strict";
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var config = require("../config");
var device = require("express-device");
var express = require("express");
var exphbs = require("express-handlebars");
var EventEmitter = require("events").EventEmitter;
var favicon = require("serve-favicon");
var gutil = require("gulp-util");
var path = require("path");
var util = require("util");

class App extends EventEmitter {
	constructor (routes) {
		super();
		let app = express();
		app.use(compression()); app.use(favicon(path.resolve(`${__dirname}/../public/images/favicon.ico`)));

		if (config.app.is.dev) {
			app.set("showStackError", true);
		}

		app.set("views", path.resolve(__dirname + "/../templates"));
		var hbs = exphbs.create({
			extname: ".hbs",
			layoutsDir: path.resolve(`${__dirname}/../templates/layouts`),
			partialsDir: [
			path.resolve(`${__dirname}/../templates/partials`)
			],
			defaultLayout: "default"
		});
		app.engine("hbs", hbs.engine);
		app.set("view engine", ".hbs");

		if (config.app.is.dev) {
			app.use("/browser-sync", express.static(path.resolve(`${__dirname}/../node_modules/browser-sync/node_modules/browser-sync-client/dist`)));
		}

		app.use("/js", express.static(path.resolve(`${__dirname}/../public/js`)));
		app.use("/css", express.static(path.resolve(`${__dirname}/../public/css`)));
		app.use("/images", express.static(path.resolve(`${__dirname}/../public/images`)));
		app.use("/video", express.static(path.resolve(`${__dirname}/../public/video`)));
		app.use(device.capture()); app.use(cookieParser()); app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		device.enableDeviceHelpers(app);
		return app;
	}
}

module.exports = App;
