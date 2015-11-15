import { register } from "../util/dispatcher";
import { createStore, mergeIntoBag, isInBag } from "../util/stores";
import selectn from "selectn";

const _pages = {
	splash: {
		title: "Splash"
	},
	summary: {
		title: "Summary"
	}
};

const PageStore = createStore({
	contains(slug, fields) {
		return isInBag(_pages, slug, fields);
	},

	get(slug) {
		return _pages[slug];
	}
});

PageStore.dispatchToken = register(action => {
	const responseRepos = selectn("response.entities.repos", action);

	if (responseRepos) {
		mergeIntoBag(_pages, responseRepos);
		PageStore.emitChange();
	}
});

export default PageStore;
