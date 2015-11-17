const User = require("./lib/user");
const Oauth = require("./lib/oauth");

module.exports.handler = function (event, context) {
	switch (event.operation) {
		case "ListUsers":
			User.ListUsers(event, context);
			break;
		case "GetUserById":
			User.GetUserById(event, context);
			break;
		case "CreateUser":
			User.CreateUser(event, context);
			break;
		case "ListTokens":
			Oauth.ListTokens(event, context);
			break;
		case "GetTokenById":
			Oauth.GetTokenById(event, context);
			break;
		case "CreateToken":
			Oauth.CreateToken(event, context);
			break;
		case "ListClients":
			Oauth.ListClients(event, context);
			break;
		case "GetClientById":
			Oauth.GetClientById(event, context);
			break;
		case "CreateClient":
			Oauth.CreateClient(event, context);
			break;
		case "ListCodes":
			Oauth.ListCodes(event, context);
			break;
		case "GetCodeById":
			Oauth.GetCodeById(event, context);
			break;
		case "CreateCode":
			Oauth.CreateCode(event, context);
			break;
		default:
			context.fail(new Error("No Event for:" + event.operation));
	}
};
