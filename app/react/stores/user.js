import { register } from "../util/dispatcher";
import { createStore, mergeIntoBag, isInBag } from "../util/stores";
import selectn from "selectn";

const _users = {
	1: {
		id: 1,
		name: "C. Spencer Beggs",
		username: "spencerbeggs"
	},
	2: {
		id: 2,
		name: "Dan DeLorenz0",
		username: "dan"
	}
};

const UserStore = createStore({
	contains (slug, fields) {
		return isInBag(_pages, slug, fields);
	},

	get (slug) {
		return _pages[slug];
	}
});

UserStore.dispatchToken = register(action => {
	const responseRepos = selectn("response.entities.repos", action);

	if (responseRepos) {
		mergeIntoBag(_users, responseRepos);
		UserStore.emitChange();
	}
});

export default UserStore;
