
export default {

	login (username, password) {
		return new Promise(function (resolve, reject) {
			if (username === "admin" && password === "admin") {
				resolve("x" + Date.now() + "x");
			}

			reject(new Error("Invalid username or password!"));
		});
	},

	logout () {
		return new Promise(function (resolve, reject) {
			resolve(true);
		});
	}
};
