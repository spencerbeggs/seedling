import { fetchRepo, fetchRepoArray } from "../util/api";

export function getRepo(fullName, url = `repos/${fullName}`) {
	return fetchRepo(url);
}

export function getStarredReposPage(login, url = `users/${login}/starred`) {
	return fetchRepoArray(url);
}
