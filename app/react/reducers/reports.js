import { combineReducers } from "redux";
import { List, Map } from "immutable";
import { REQUEST_REPORTS, RECEIVE_REPORTS } from "../actions/reports";

const initialState = List();

export default function reports(state = initialState, action) {
	switch (action.type) {
		case RECEIVE_REPORTS:
			return List(action.payload);
		default:
			return state;
	}
}
