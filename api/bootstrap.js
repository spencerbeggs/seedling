const User = require("./lib/user");

Promise.all([User.Bootstrap()]).then(function () {
	console.log("[BOOTSTRAP] Done");
}).catch(function (err) {
	console.log(err);
});
