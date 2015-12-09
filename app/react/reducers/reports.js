import { combineReducers } from "redux";
import { List, Map } from "immutable";
import { REPORT_REQUEST, ADD_TODO_SUCCESS, RECEIVE_TODOS, COMPLETE_TODO_SUCCESS, SET_VISIBILITY_FILTER, VisibilityFilters, SortByFilters, SortOrderFilters } from "../actions/reports";

const {SHOW_ALL} = VisibilityFilters;

const initialState = List();

function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
	case SET_VISIBILITY_FILTER:
		return action.filter;
	default:
		return state;
	}
}

function sortBy(state = "DATE", action) {
	switch (action.type) {

		default:
			return state;
	}
}

function reports(state = initialState, action) {
	switch (action.type) {
	case ADD_TODO_SUCCESS:
		return state.push(action.todo);
	case RECEIVE_TODOS:
		return List(action.todos);
	case COMPLETE_TODO_SUCCESS:
		return state.set(action.index, action.todo);
	default:
		return state;
	}
}

function isProcessing(state = false, action) {
	switch (action.type) {
	case REPORT_REQUEST:
		return true;
	default:
		return false;
	}
}

const reportApp = combineReducers({
	visibilityFilter,
	reports,
	isProcessing,
});

export default reportApp;
