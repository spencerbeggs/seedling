process.env.APP_VERSION = process.env.npm_package_version;
/**
 * @module config
 * @desc This module provides a unified configuration object where application-level settings can be stored. Properties that are safe to expose in compiled JavaScript should be stored or calculated in the [public.js]{@link module:config/public}. Settings that you would not want exposed in compiled JavaScript should be stored or calculated in [private.js]{@link module:config/private}. The [Gulp]{@link https://github.com/gulpjs/gulp} tasks included in this package use [Envify]{@link https://github.com/hughsk/envify} and [Uglifyify]{@link https://github.com/hughsk/uglifyify} transforms to strip the private code from the [Browserify]{@link https://github.com/substack/node-browserify} bundle by injecting an enviornmental variable <code>BROWSERIFY</code> with the value of <code>true</code> via Envify.
 * @see module:config/public
 * @see module:config/private
 * @borrows module:config/public.app as app
 * @borrows module:config/public.env as env
 * @borrows module:config/private.proxy as proxy
 * @borrows module:config/private.mongo as mongo

 */
var config = require("./public");

if (!process.env.BROWSERIFY) {
	Object.assign(config, require("./private"));
}

module.exports = config;
