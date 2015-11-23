import { updatePath } from "redux-simple-router";
import authApi from "../api/auth";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const SHOW_MESSAGE = "SHOW_MESSAGE";

export function loginSuccess(token) {
	return {
		type: LOGIN_SUCCESS,
		token
	};
};

export function loginError(message) {
	return {
		type: LOGIN_ERROR,
		message
	};
};

export function login(username, password, nextPath="/") {
	return dispatch => {
		dispatch({type: LOGIN});
		return authApi.login(username, password).then(token => {
			dispatch(loginSuccess(token));
			dispatch(clearMessage());
			dispatch(updatePath(nextPath));
		})
      .catch(err => {
	dispatch(showMessage(err.message));
	dispatch(loginError());
      });
	};
}

export function logout() {
	return dispatch => {
		dispatch({type: LOGOUT});
		return authApi.logout().then(result => {
			dispatch({type: LOGOUT_SUCCESS});
			dispatch(clearMessage());
			dispatch(updatePath("/login"));
		}).catch(err => {
			dispatch(showMessage(err.message));
			dispatch({type: LOGIN_ERROR});
		});
	};
}

export function showMessage(message) {
	return {
		type: SHOW_MESSAGE,
		message
	};
}

export function clearMessage() {
	return {
		type: CLEAR_MESSAGE
	};
}
