import api from "../api/reports";
import { createAction, handleAction, handleActions } from "redux-actions";
import _ from "lodash";

export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const REQUEST_REPORTS = "REQUEST_REPORTS";
export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

let options = {
	keywords: [],
	categories: [],
	fields: [],
	sources: [],
	tables: []
};

export function receiveReports(reports) {
	return {
		type: RECEIVE_REPORTS,
		payload: reports
	};
}

export function receiveCategories(reports) {
	return {
		type: RECEIVE_CATEGORIES,
		payload: _.uniq(_.flatten(_.pluck(reports, "categories"))).sort()
	};
}

export function requestReports() {
	return {
		type: REQUEST_REPORTS
	};
}

export function fetchReports(opts = {}) {
	return function (dispatch) {
		Object.assign(options, opts);
		dispatch(requestReports());
		dispatch(receiveReports(api.get(options)));
	};
}

export function fetchCategories(opts = {}) {
	return function (dispatch) {
		Object.assign(options, opts);
		dispatch({
			type: REQUEST_CATEGORIES
		});
		dispatch(receiveCategories(api.get(options)));
	};
}

export function filterReports(opts = {}) {
	return function (dispatch) {
		Object.assign(options, opts);
		const data = api.get(options);
		dispatch(receiveReports(data));
	};
}
