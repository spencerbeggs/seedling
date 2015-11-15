require("../../config/load_env");
const config = require("../../config");
const AWS = require("aws-sdk-promise");
AWS.config.region = config.aws.region;
const dynamodb = new AWS.DynamoDB({
	apiVersion: "2012-08-10"
});
const context = require("aws-lambda-mock-context");
const _ = require("lodash");

module.exports = function (tableName, schema, createFunction, samples) {
	return function () {
		return new Promise(function (resolve, reject) {
			dynamodb.deleteTable({
				TableName: tableName
			}, function (err, data) {
				if (err && err.code !== "ResourceNotFoundException") {
					reject(err);
				} else if (err && err.code === "ResourceNotFoundException") {
					console.log(`[BOOTSTRAP] ${tableName}  table not found`);
				} else {
					console.log(`[BOOTSTRAP] Deleting ${tableName} table`);
				}

				dynamodb.waitFor("tableNotExists", {
					TableName: tableName
				}, function (err, data) {
					if (err) {
						console.log(err, err.stack); // an error occurred
					} else {
						console.log(`[BOOTSTRAP] Creating ${tableName} table`);
						dynamodb.createTable(schema, function (err, data) {
							if (err) {
								throw err;
							}

							dynamodb.waitFor("tableExists", {
								TableName: tableName
							}, function (err, data) {
								if (err) {
									throw err;
								}

								console.log(`[BOOTSTRAP] ${tableName} table created`);

								if (samples) {
									console.log(`[BOOTSTRAP] Adding ${samples.length} items to table`);
									var promises = [];
									samples.forEach(function (item) {
										promises.push(createFunction({
											data: item
										}, context()));
									});

									Promise.all(_.pluck(promises, "Promise")).then(function () {
										resolve();
									}).catch(function (err) {
										console.log(err);
										reject(err);
									});
								}
							});
						});
					}
				});
			});
		});
	};
};
