"use strict";
/**
 * @module tasks
 * @desc A wrapper for all the Gulp tasks.
 * @see module:tasks/beautify
 * @see module:tasks/browserify
 * @see module:tasks/browserSync
 * @see module:tasks/buildCss
 * @see module:tasks/buildJs
 * @see module:tasks/jsdoc
 * @see module:tasks/jshint
 * @see module:tasks/json
 * @see module:tasks/less
 * @see module:tasks/nodemon
 * @see module:tasks/zone
 * @borrows module:tasks/beautify~task as beautify
 * @borrows module:tasks/browserify~task as browserify
 * @borrows module:tasks/browserSync~task as browserSync
 * @borrows module:tasks/buildCss~task as buildCss
 * @borrows module:tasks/buildJs~task as buildJs
 * @borrows module:tasks/jsdoc~task as jsdoc
 * @borrows module:tasks/jshint~task as jshint
 * @borrows module:tasks/json~task as json
 * @borrows module:tasks/less~task as less
 * @borrows module:tasks/nodemon~task as nodemon
 * @borrows module:tasks/zone~task as zone
 */

module.exports.beautify = require("./beautify");
module.exports.browserify = require("./browserify");
module.exports.browserSync = require("./browser-sync");
module.exports.buildCss = require("./build-css");
module.exports.buildJs = require("./build-js");
module.exports.jsdoc = require("./jsdoc");
module.exports.jshint = require("./jshint");
module.exports.json = require("./json");
module.exports.less = require("./less");
module.exports.nodemon = require("./nodemon");
module.exports.zone = require("./zone");
