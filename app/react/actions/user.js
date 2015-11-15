import { dispatchAsync } from "../util/dispatcher";
import ActionTypes from "../constants/actions";
import UserStore from "../stores/user";

export function getBySlug(slug, fields) {
	// Exit early if we know about this page
	if (PageStore.get(slug)) {
		return PageStore.get(slug);
	}
}
