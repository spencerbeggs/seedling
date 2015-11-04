"use strict";
/**
 * @module config/private
 * @desc An object that sets and calculates configurations settings that can should not be exposed in public-facing compiled JavaScript.
 * @see module:config
 * @see module:config/public
 */

/** Settings for local reverse proxy.
 * @type {object}
 * @prop {string} port - The port number for the local dynamic reverse proxy
 */
module.exports.proxy = {
	port: process.env.PROXY_PORT || "7777"
};

module.exports.server = {
	port: process.env.SERVER_PORT || "3000"
};

/** [MongoDB]{@link https://www.mongodb.org} connection information.
 * @type {object}
 * @prop {string} username - Username to authenitcate with. Can be set via <code>MONGO_USERNAME</code> enviornment variable.
 * @prop {string} password - Password to authenitcate with. Can be set via <code>MONGO_PASSWORD</code> enviornment variable.
 * @prop {string} [hostname=localhost] - Address of MongoDB server. Can be set via <code>MONGO_HOSTNAME</code> enviornment variable.
 * @prop {string} [port=27017] - Port number to connect to MongoDB. Can be set via <code>MONGO_PORT</code> enviornment variable.
 * @prop {string} database - Name of database to connect to. Can be set via <code>MONGO_DATABASE</code> enviornment variable.
 * @prop {string} connect - Calculated MongoDB connection string
 */
module.exports.mongo = {
	username: process.env.MONGO_USERNAME,
	password: process.env.MONGO_PASSWORD,
	hostname: process.env.MONGO_HOSTNAME || "localhost",
	port: process.env.MONGO_PORT || "27017",
	database: process.env.MONGO_DATABASE || ""
};

module.exports.aws = {
	key: process.env.AWS_KEY,
	secret: process.env.AWS_SECRET,
	staticBucket: process.env.AWS_STATIC_BUCKET
};

module.exports.mongo.connect = "mongodb://" + ((module.exports.mongo.username) ? module.exports.mongo.username + ":" : "") + ((module.exports.mongo.password) ? module.exports.mongo.password + "@" : "") + module.exports.mongo.hostname + "/" + module.exports.mongo.database;
