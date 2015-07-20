"use strict";
var http = require("http");
var util = require("util");
var path = require("path");
var config = require("../config");
var express = require("express");
var exphbs = require("express-handlebars");
var device = require("express-device");
var EventEmitter = require("events").EventEmitter;
var Emitter = function() {};
util.inherits(Emitter, EventEmitter);
var emitter = new Emitter();
var hbs = exphbs.create({
	extname: ".hbs",
	layoutsDir: path.resolve(__dirname + "/../templates/layouts"),
	partialsDir: [
		path.resolve(__dirname + "/../templates/partials")
	],
	defaultLayout: "default"
});
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var compression = require("compression");
var gutil = require("gulp-util");

var app = express();
app.use(compression());
app.use(favicon(path.resolve(__dirname + "/../public/images/favicon.ico")));
if (config.app.is.dev) {
	app.set("showStackError", true);
}
// set the view engine to use handlebars
app.set("views", path.resolve(__dirname + "/../templates"));
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");
if (config.app.is.dev) {
	app.use("/browser-sync", express.static(path.resolve(__dirname + "/../node_modules/browser-sync/node_modules/browser-sync-client/dist")));
}
app.use("/js", express.static(path.resolve(__dirname + "/../public/js")));
app.use("/css", express.static(path.resolve(__dirname + "/../public/css")));
app.use("/images", express.static(path.resolve(__dirname + "/../public/images")));
app.use("/video", express.static(path.resolve(__dirname + "/../public/video")));
app.use(device.capture());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
device.enableDeviceHelpers(app);

// setup routes
require("../routes")(app);
var server = http.createServer(app);
server.listen(config.server.port, function() {
	gutil.log(config.app.name + " listening on " + config.app.url + " from localhost:" + config.server.port);
	emitter.emit("ready");
});

module.exports = emitter;
