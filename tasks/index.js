"use strict";
/**
 * @module tasks
 * @desc A wrapper for all the Gulp tasks.
 * @see module:tasks/aws
 * @see module:tasks/beautify
 * @see module:tasks/beautifyCSS
 * @see module:tasks/browserify
 * @see module:tasks/browserSync
 * @see module:tasks/jsdoc
 * @see module:tasks/jshint
 * @see module:tasks/json
 * @see module:tasks/less
 * @see module:tasks/nodemon
 * @see module:tasks/scss
 * @see module:tasks/zone
 * @borrows module:tasks/beautify-css~task as beautifyCSS
 * @borrows module:tasks/beautify~task as beautify
 * @borrows module:tasks/browserify~task as browserify
 * @borrows module:tasks/browserSync~task as browserSync
 * @borrows module:tasks/jsdoc~task as jsdoc
 * @borrows module:tasks/jshint~task as jshint
 * @borrows module:tasks/json~task as json
 * @borrows module:tasks/less~task as less
 * @borrows module:tasks/nodemon~task as nodemon
 * @borrows module:tasks/scss~task as scss
 * @borrows module:tasks/zone~task as zone
 */

module.exports.aws = require("./aws");
module.exports.beautify = require("./beautify");
module.exports.beautifyCSS = require("./beautify-css");
module.exports.browserify = require("./browserify");
module.exports.browserSync = require("./browser-sync");
module.exports.jsdoc = require("./jsdoc");
module.exports.jshint = require("./jshint");
module.exports.json = require("./json");
module.exports.less = require("./less");
module.exports.nodemon = require("./nodemon");
module.exports.scss = require("./scss");
module.exports.zone = require("./zone");
