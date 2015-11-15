/**
 * Test suite for Microservice endpoint for managing users.
 *
 * @author C. Spencer Beggs      <spencer@beg.gs>
 * @since  29 Aug. 2015
 */
"use strict";
var config = require("../config");
var chai = require("chai");
var path = require("path");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var mock = require("aws-lambda-mock-context");

// Use should flavour for Mocha
chai.should();
chai.use(sinonChai);
var handler = require("../api").handler;

describe("User", function () {
	it("Can get a list of all users", function (done) {
		const context = mock();
		handler({
			operation: "ListUsers"
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can get a user by ID", function (done) {
		const context = mock();
		handler({
			operation: "GetUserById",
			data: {
				user_id: "1"
			}
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can create a new user", function (done) {
		const context = mock();
		handler({
			operation: "CreateUser",
			data: {
				user_id: "3",
				name: "Sarah Silver",
				email: "sarah@aol.com",
				username: "sarahsilver"
			}
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});
});
