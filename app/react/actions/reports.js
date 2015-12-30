import api from "../api/reports";
import _ from "lodash";

export const FETCH_REPORTS = "FETCH_REPORTS";
export const FILTER_REPORTS = "FILTER_REPORTS";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export function fetchReports() {
	return function (dispatch) {
		dispatch({
			type: FETCH_REPORTS,
			payload: api.get()
		});
	};
}

export function filterReports(opts = {}) {
	return function (dispatch) {
		dispatch({
			type: FILTER_REPORTS,
			payload: opts
		});
	};
}

export function addCategory(category) {
	if (typeof category === "string") {
		category = [category];
	}

	return {
		type: ADD_CATEGORY,
		payload: category
	};
}

export function deleteCategory(category) {
	if (typeof category === "string") {
		category = [category];
	}

	return {
		type: DELETE_CATEGORY,
		payload: category
	};
}

export function updateOrder(order) {
	return {
		type: UPDATE_ORDER,
		payload: order
	};
}
