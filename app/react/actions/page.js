import { dispatchAsync } from "../util/dispatcher";
import ActionTypes from "../constants/actions";
import * as PageAPI from "../api/page";
import PageStore from "../stores/pages";

export function getBySlug(slug, fields) {
	// Exit early if we know about this page
	if (PageStore.get(slug)) {
		return;
	}

	// dispatchAsync(PageAPI.getRepo(fullName), {
	// 	request: ActionTypes.REQUEST_REPO,
	// 	success: ActionTypes.REQUEST_REPO_SUCCESS,
	// 	failure: ActionTypes.REQUEST_REPO_ERROR
	// }, {fullName});
}
