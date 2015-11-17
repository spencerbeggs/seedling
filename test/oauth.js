require("../config/load_env");
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

describe("Oauth2 Tokens", function () {
	it("Can get a list of all tokens", function (done) {
		const context = mock();
		handler({
			operation: "ListTokens"
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can get a token by ID", function (done) {
		const context = mock();
		handler({
			operation: "GetTokenById",
			data: {
				token_id: "1"
			}
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can create a token", function (done) {
		const context = mock();
		handler({
			operation: "CreateToken",
			data: {
				token_id: "2",
				value: "defuvw",
				user_id: "2",
				client_id: "1"
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

describe("Oauth2 Clients", function () {
	it("Can get a list of all clients", function (done) {
		const context = mock();
		handler({
			operation: "ListClients"
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can get a client by ID", function (done) {
		const context = mock();
		handler({
			operation: "GetClientById",
			data: {
				client_id: "1"
			}
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can create a client", function (done) {
		const context = mock();
		handler({
			operation: "CreateClient",
			data: {
				client_id: "2",
				name: "Test Client",
				service_id: "7891",
				service_secret: "foobar",
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
});

describe("Oauth2 Codes", function () {
	it("Can get a list of all codes", function (done) {
		const context = mock();
		handler({
			operation: "ListCodes"
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can get a code by ID", function (done) {
		const context = mock();
		handler({
			operation: "GetCodeById",
			data: {
				code_id: "1"
			}
		}, context);
		context.Promise.then(function () {
			done();
		});

		context.Promise.catch(function (err) {
			done(err);
		});
	});

	it("Can create a code", function (done) {
		const context = mock();
		handler({
			operation: "CreateCode",
			data: {
				code_id: "2",
				redirect_uri: "http://moofar.com/redirect",
				user_id: "1",
				client_id: "1"
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
