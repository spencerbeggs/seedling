import Promise from "bluebird";

export default {

	login (username, password) {
		return Promise.delay(300).then(() => {
			if (username === "admin" && password === "admin") {
				return "x" + Date.now() + "x";
			}

			throw new Error("Invalid username or password!");
		});
	},

	logout () {
		return Promise.delay(100).then(() => true);
	}
};
