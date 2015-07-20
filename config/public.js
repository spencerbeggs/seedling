"use strict";
/**
 * @module config/public
 * @desc An object that sets and calculates configurations settings that can be exposed in public-facing compiled JavaScript.
 * @see module:config
 * @see module:config/private
 */

/** The name of the enviornment in which the application is executed. Can be set via the <code>NODE_ENV</code> enviornmental variable.
 * @type {string}
 * @default unknown
 */
module.exports.env = process.env.NODE_ENV || "unknown";

/** Contains config information about the application itself.
 * @type {object}
 * @prop {string} [name=App] - The name of the applicaiton. Can be set with the <code>APP_NAME</code> enviornmental variable.
 * @prop {string} [slug=app] - A URL-safe slug used to describe the application. Can be set with the <code>APP_SLUG</code> enviornmental variable.
 * @prop {string} [protocol=http] - Set the prototcol the app expects connections on. Can be set with the <code>APP_PROTOCOL</code> enviornmental variable.
 * @prop {string} subdomain - The subdomain the app resides on. Can be set with the <code>APP_SUBDOMAIN</code> enviornmental variable.
 * @prop {string} [domain=localhost] - The domain the app resides on. Can be set with the <code>APP_DOMAIN</code> enviornmental variable.
 * @prop {string} [port=3000] - The port the app should listen on for connections. Can be set with the <code>APP_PORT</code> enviornmental variable.
 * @prop {string} hostname - The hostname of the app.
 * @prop {string} url - The public URL of the app.
 * @prop {string} version - Version of the app from package.json.
 * @prop {object} is - Collection of booleans the describe app enviornment affirmativly.
 * @prop {boolean} is.dev - True if the environment is development.
 * @prop {boolean} is.development - True if the environment is development.
 * @prop {boolean} is.stag - True if the environment is staging.
 * @prop {boolean} is.staging - True if the environment is staging.
 * @prop {boolean} is.prod - True if the environment is production.
 * @prop {boolean} is.production - True if the environment is production.
 * @prop {object} not - Collection of booleans the describe app enviornment negetivly.
 * @prop {boolean} not.dev - True if the environment is not development.
 * @prop {boolean} not.development - True if the environment is not development.
 * @prop {boolean} not.stag - True if the environment is not staging.
 * @prop {boolean} not.staging - True if the environment is not staging.
 * @prop {boolean} not.prod - True if the environment is not production.
 * @prop {boolean} not.production - True if the environment is not production.
 */
module.exports.app = {
	name: process.env.APP_NAME || "App",
	slug: process.env.APP_SLUG || "app",
	protocol: process.env.APP_PROTOCOL || "http",
	subdomain: process.env.APP_SUBDOMAIN,
	domain: process.env.APP_DOMAIN || "localhost",
	port: process.env.APP_PORT || "80",
	version: process.env.APP_VERSION
};
module.exports.app.hostname = module.exports.app.subdomain ? module.exports.app.subdomain + "." + module.exports.app.domain : module.exports.app.domain;
module.exports.app.url = module.exports.app.protocol + "://" + module.exports.app.hostname + (["80", "443"].indexOf(module.exports.app.port) === -1 ? ":" + module.exports.app.port : "");

module.exports.app.is = {
	dev: module.exports.env === "development",
	development: module.exports.env === "development",
	stag: module.exports.env === "staging",
	staging: module.exports.env === "staging",
	prod: module.exports.env === "production",
	production: module.exports.env === "production"
};
module.exports.app.not = {
	dev: module.exports.env !== "development",
	development: module.exports.env !== "development",
	stag: module.exports.env !== "staging",
	staging: module.exports.env !== "staging",
	prod: module.exports.env !== "production",
	production: module.exports.env !== "production"
};
