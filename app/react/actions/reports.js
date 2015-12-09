import api from "../api/reports";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const REPORT_REQUEST = "REPORT_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const COMPLETE_TODO_SUCCESS = "COMPLETE_TODO_SUCCESS";
export const SORT_REPORTS = "SORT_REPORTS";

export const VisibilityFilters = {
	SHOW_ALL: "SHOW_ALL",
	SHOW_COMPLETED: "SHOW_COMPLETED",
	SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const SortByFilters = {
	DATE: "DATE"
};

export const SortOrderFilters = {
	DESC: "DESC",
	ASC: "ASC"
};

export function todoRequest() {
	return {
		type: REPORT_REQUEST
	};
}

export function addTodoSuccess(report) {
	return {
		type: ADD_TODO_SUCCESS,
		report
	};
}

export function addTodo(text) {
	return function (dispatch) {
		dispatch(todoRequest());

		return api.add(text).then(todo => {
			dispatch(addTodoSuccess(todo));
		});
	};
}

export function receiveReports(todos) {
	let data = {
		type: RECEIVE_TODOS,
		todos
	};
	return data;
}

export function fetchReports() {
	return function (dispatch) {
		dispatch(todoRequest());

		return api.get().then(reports => {
			dispatch(receiveReports(reports));
		});
	};
}

export function completeTodoSuccess(index, report) {
	return {
		type: COMPLETE_TODO_SUCCESS,
		index,
		report
	};
}

export function completeTodo(index) {
	return function (dispatch) {
		dispatch(todoRequest());

		return api.complete(index).then(report => {
			dispatch(completeTodoSuccess(index, report));
		});
	};
}

export function setVisibilityFilter(filter) {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	};
}
