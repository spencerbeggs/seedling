import todoApi from "../api/todoApi";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const TODO_REQUEST = "TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const COMPLETE_TODO_SUCCESS = "COMPLETE_TODO_SUCCESS";

export const VisibilityFilters = {
	SHOW_ALL: "SHOW_ALL",
	SHOW_COMPLETED: "SHOW_COMPLETED",
	SHOW_ACTIVE: "SHOW_ACTIVE"
};

export function todoRequest() {
	return {type: TODO_REQUEST};
}

export function addTodoSuccess(todo) {
	return {type: ADD_TODO_SUCCESS, todo};
}

export function addTodo(text) {
	return function (dispatch) {
		dispatch(todoRequest());

		return todoApi.add(text)
.then(todo => {
	dispatch(addTodoSuccess(todo));
});
	};
}

export function receiveTodos(todos) {
	return {type: RECEIVE_TODOS, todos};
}

export function fetchTodos() {
	return function (dispatch) {
		dispatch(todoRequest());

		return todoApi.get()
.then(todos => {
	dispatch(receiveTodos(todos));
});
	};
}

export function completeTodoSuccess(index, todo) {
	return {type: COMPLETE_TODO_SUCCESS, index, todo};
}

export function completeTodo(index) {
	return function (dispatch) {
		dispatch(todoRequest());

		return todoApi.complete(index)
.then(todo => {
	dispatch(completeTodoSuccess(index, todo));
});
	};
}

export function setVisibilityFilter(filter) {
	return {type: SET_VISIBILITY_FILTER, filter};
}
