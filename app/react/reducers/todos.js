import { combineReducers } from "redux";
import { List, Map } from "immutable";

import { TODO_REQUEST, ADD_TODO_SUCCESS, RECEIVE_TODOS, COMPLETE_TODO_SUCCESS, SET_VISIBILITY_FILTER, VisibilityFilters } from "../actions/todo";

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

function todos(state = initialState, action) {
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
	case TODO_REQUEST:
		return true;
	default:
		return false;
	}
}

const todoApp = combineReducers({
	visibilityFilter,
	todos,
	isProcessing
});

export default todoApp;
