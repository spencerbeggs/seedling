var gutil = require("gulp-util");
var env = require("node-env-file");
var path = require("path");

try {
	var envFilePath = path.resolve(__dirname, "../.env");
	env(process.env.ENV_FILE || envFilePath);
	gutil.log("[GULP] Loaded enviornment variables from " + envFilePath);
} catch (err) {
	console.log(err);
	gutil.log("[WARNING] No .env file found");
}

process.env.APP_VERSION = process.env.npm_package_version || "unknown";
