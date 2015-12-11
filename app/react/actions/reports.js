import api from "../api/reports";
import { createAction, handleAction, handleActions } from "redux-actions";

export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const REQUEST_REPORTS = "REQUEST_REPORTS";

export function receiveReports(reports) {
	return {
		type: RECEIVE_REPORTS,
		payload: reports
	};
}

export function requestReports() {
	return {
		type: REQUEST_REPORTS
	};
}

export function fetchReports() {
	return function (dispatch) {
		dispatch(requestReports());
		dispatch(receiveReports(api.get()));
	};
}
