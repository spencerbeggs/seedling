import { combineReducers } from "redux";
import { List, Map } from "immutable";
import { REQUEST_REPORTS, RECEIVE_REPORTS } from "../actions/reports";

const initialState = List();

function reports(state = initialState, action) {
	switch (action.type) {
		case RECEIVE_REPORTS:
			return List(action.reports);
		default:
			return state;
	}
}

const reportApp = combineReducers({
	reports
});

export default reportApp;
