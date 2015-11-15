/**
 * Microservice endpoint for managing users.
 *
 * @author C. Spencer Beggs      <spencer@beg.gs>
 * @since  1 Sept. 2015
 */
"use strict";
const Bootstrapper = require("../bootstrap/index");
const Samples = require("../bootstrap/samples/users");
const config = require("../../config");
const AWS = require("aws-sdk");
AWS.config.region = config.aws.region;
const dynamodb = new AWS.DynamoDB({
	apiVersion: "2012-08-10"
});
const tableName = `${config.app.slug}-users-${config.env}`;

const UserSchema = {
	TableName: tableName,
	KeySchema: [{
		AttributeName: "user_id",
		KeyType: "HASH"
	}],
	AttributeDefinitions: [{
		AttributeName: "user_id",
		AttributeType: "S"
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	}
};

module.exports.UserSchema = UserSchema;

module.exports.ListUsers = function (event, context) {
	return dynamodb.scan({
		TableName: tableName
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.GetUserById = function (event, context) {
	return dynamodb.getItem({
		TableName: tableName,
		Key: {
			user_id: {
				S: event.data.user_id
			}
		}
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.CreateUser = function (event, context) {
	const Item = {};
	const strings = ["user_id", "name", "email", "username"];
	strings.forEach(function (key) {
		if (event.data[key]) {
			Item[key] = {
				S: String(event.data[key])
			};
		}
	});

	dynamodb.putItem({
		TableName: tableName,
		Item: Item
	}, function (err, data) {
		if (err) {
			context.fail(err);
		} else {
			context.done();
		}
	});

	return context;
};

module.exports.Bootstrap = Bootstrapper(tableName, UserSchema, module.exports.CreateUser, Samples);
