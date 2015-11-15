const User = require("./lib/user");

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
		default:
			context.fail(new Error("No Event for:" + event.operation));
	}
};
