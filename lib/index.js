"use strict";
var http = require("http");
var path = require("path");
var env = require("node-env-file");
var gutil = require("gulp-util");
var util = require("util");
var pjson = require("../package.json");
var Express = require("./express");

process.env.APP_VERSION = pjson.version;

try {
	var envFilePath = path.resolve(`${__dirname}/../.env`);
	env(process.env.ENV_FILE || envFilePath);
	gutil.log(`[APP] Loaded enviornment variables from ${envFilePath}`);
} catch (err) {
	console.log(err); gutil.log("[WARNING] No .env file found");
}

var config = require("../config");
gutil.log(`Starting ${config.app.name} in ${config.env} mode...`);

// start the local reverse proxy if we are spoofing a domain in the dev env
if (config.env === "development" && ["localhost", "127.0.0.1"].indexOf(config.app.hostname) === -1) {
	require("child_process").fork(`${__dirname}/proxy.js`, {
		silent: false
	});
}

// bring up Express app
var app = new Express();

// setup routes
require("../routes")(app);
var server = http.createServer(app);

server.listen(config.server.port, () => {
	gutil.log(`${config.app.name} listening on ${config.app.url} from localhost:${config.server.port}`);
});
