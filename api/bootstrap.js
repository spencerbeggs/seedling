const User = require("./lib/user");
const Oauth = require("./lib/oauth");

Promise.all([
	User.Bootstrap(),
	Oauth.Token.Bootstrap(),
	Oauth.Client.Bootstrap(),
	Oauth.Code.Bootstrap()
]).then(function () {
	console.log("[BOOTSTRAP] Done");
}).catch(function (err) {
	console.log(err);
});
