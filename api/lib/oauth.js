var oauth2orize = require("oauth2orize");
const Bootstrapper = require("../bootstrap/index");
const Samples = require("../bootstrap/samples/oauth");
const config = require("../../config");

const Tablenames = {
	Codes: `${config.app.slug}-codes-${config.env}`,
	Tokens: `${config.app.slug}-tokens-${config.env}`,
	Clients: `${config.app.slug}-clients-${config.env}`
};

const AWS = require("aws-sdk");
AWS.config.region = config.aws.region;
const dynamodb = new AWS.DynamoDB({
	apiVersion: "2012-08-10"
});

function mapSchema(schema) {
	const types = {
		strings: []
	};
	schema.AttributeDefinitions.forEach(function (def) {
		if (def.AttributeType === "S") {
			types.strings.push(def.AttributeName);
		}
	});

	return types;
}

const CodeSchema = {
	TableName: Tablenames.Codes,
	KeySchema: [{
		AttributeName: "code_id",
		KeyType: "HASH"
	}],
	AttributeDefinitions: [{
		AttributeName: "code_id",
		AttributeType: "S"
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	}
};

module.exports.CreateCode = function (event, context) {
	const Item = {};
	["code_id", "redirect_uri", "user_id", "client_id"].forEach(function (key) {
		if (event.data[key]) {
			Item[key] = {
				S: String(event.data[key])
			};
		}
	});

	dynamodb.putItem({
		TableName: Tablenames.Codes,
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

module.exports.ListCodes = function (event, context) {
	return dynamodb.scan({
		TableName: Tablenames.Codes
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.GetCodeById = function (event, context) {
	return dynamodb.getItem({
		TableName: Tablenames.Codes,
		Key: {
			code_id: {
				S: event.data.code_id
			}
		}
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.Code = {
	Schema: CodeSchema,
	Bootstrap: Bootstrapper(Tablenames.Codes, CodeSchema, module.exports.CreateCode, Samples.codes)
};

const TokenSchema = {
	TableName: Tablenames.Tokens,
	KeySchema: [{
		AttributeName: "token_id",
		KeyType: "HASH"
	}],
	AttributeDefinitions: [{
		AttributeName: "token_id",
		AttributeType: "S"
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	}
};

module.exports.CreateToken = function (event, context) {
	const Item = {};
	const types = mapSchema(TokenSchema);
	["token_id", "value", "user_id", "client_id"].forEach(function (key) {
		if (event.data[key]) {
			Item[key] = {
				S: String(event.data[key])
			};
		}
	});

	dynamodb.putItem({
		TableName: Tablenames.Tokens,
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

module.exports.ListTokens = function (event, context) {
	return dynamodb.scan({
		TableName: Tablenames.Tokens
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.GetTokenById = function (event, context) {
	return dynamodb.getItem({
		TableName: Tablenames.Tokens,
		Key: {
			token_id: {
				S: event.data.token_id
			}
		}
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.Token = {
	Schema: TokenSchema,
	Bootstrap: Bootstrapper(Tablenames.Tokens, TokenSchema, module.exports.CreateToken, Samples.tokens)
};

const ClientSchema = {
	TableName: Tablenames.Clients,
	KeySchema: [{
		AttributeName: "client_id",
		KeyType: "HASH"
	}],
	AttributeDefinitions: [{
		AttributeName: "client_id",
		AttributeType: "S"
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	}
};

module.exports.CreateClient = function (event, context) {
	const Item = {};
	["client_id", "name", "service_id", "service_secret", "user_id"].forEach(function (key) {
		if (event.data[key]) {
			Item[key] = {
				S: String(event.data[key])
			};
		}
	});

	dynamodb.putItem({
		TableName: Tablenames.Clients,
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

module.exports.ListClients = function (event, context) {
	return dynamodb.scan({
		TableName: Tablenames.Clients
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.GetClientById = function (event, context) {
	return dynamodb.getItem({
		TableName: Tablenames.Clients,
		Key: {
			client_id: {
				S: event.data.client_id
			}
		}
	}, function (err, data) {
		context.done(err, data);
	});
};

module.exports.Client = {
	Schema: ClientSchema,
	Bootstrap: Bootstrapper(Tablenames.Clients, ClientSchema, module.exports.CreateClient, Samples.clients)
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uid(len) {
	var buf = [];
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charlen = chars.length;

	for (var i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
	}

	return buf.join("");
}

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function (client, callback) {
	return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function (id, callback) {
	dynamodb.getItem({
		TableName: `${config.app.slug}-clients-${config.env}`,
		Key: {
			user_id: {
				S: event.data.user_id
			}
		}
	}, function (err, data) {
		callback(err, data);
	});
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function (client, redirectUri, user, ares, callback) {
	console.log("grant");

	// Create a new authorization code
	var code = new Code({
		value: uid(16),
		clientId: client._id,
		redirectUri: redirectUri,
		userId: user._id
	});

	// Save the auth code and check for errors
	code.save(function (err) {
		if (err) {
			return callback(err);
		}

		callback(null, code.value);
	});
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function (client, code, redirectUri, callback) {
	console.log("exchange");
	Code.findOne({
		value: code
	}, function (err, authCode) {
		if (err) {
			return callback(err);
		}

		if (authCode === undefined) {
			return callback(null, false);
		}

		if (client._id.toString() !== authCode.clientId) {
			return callback(null, false);
		}

		if (redirectUri !== authCode.redirectUri) {
			return callback(null, false);
		}

		// Delete auth code now that it has been used
		authCode.remove(function (err) {
			if (err) {
				return callback(err);
			}

			// Create a new access token
			var token = new Token({
				value: uid(256),
				clientId: authCode.clientId,
				userId: authCode.userId
			});

			// Save the access token and check for errors
			token.save(function (err) {
				if (err) {
					return callback(err);
				}

				callback(null, token);
			});
		});
	});
}));

// User authorization endpoint
module.exports.authorization = [
	server.authorization(function (clientId, redirectUri, callback) {
		console.log("auth");
		Client.findOne({
			clientId: clientId
		}, function (err, client) {
			if (err) {
				return callback(err);
			}

			return callback(null, client, redirectUri);
		});
	}),

	function (req, res) {
		res.render("pages/dialog", {
			transactionID: req.oauth2.transactionID,
			user: req.user,
			client: req.oauth2.client
		});
	}
];

// User decision endpoint
module.exports.decision = [
	server.decision()
];

// Application client token exchange endpoint
module.exports.token = [
	server.token(),
	server.errorHandler()
];
