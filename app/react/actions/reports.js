import api from "../api/reports";

export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const REQUEST_REPORTS = "REQUEST_REPORTS";

export function receiveReports(reports) {
	let data = {
		type: RECEIVE_REPORTS,
		reports
	};
	return data;
}

export function requestReports() {
	return {
		type: REQUEST_REPORTS
	};
}

export function fetchReports() {
	return function (dispatch) {
		dispatch(requestReports());

		return api.get().then(reports => {
			dispatch(receiveReports(reports));
		});
	};
}
