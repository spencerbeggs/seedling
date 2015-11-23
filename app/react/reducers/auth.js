import { combineReducers } from "redux";
import {
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
	SHOW_MESSAGE,
	CLEAR_MESSAGE
} from "../actions/auth";

const TOKEN = "redux-demo-token";

const initialState = getToken();

function token(state = initialState, action) {
	switch (action.type) {
	case LOGIN_SUCCESS:
		saveToken(action.token);
		return action.token;
	case LOGIN_ERROR:
		removeToken();
		return null;
	case LOGOUT_SUCCESS:
		removeToken();
		return null;
	case LOGOUT_ERROR:
		return state;
	default:
		return state;
	}
}

function isProcessing(state = false, action) {
	switch (action.type) {
	case LOGIN:
		return true;
	case LOGOUT:
		return true;
	default:
		return false;
	}
}

function message(state = null, action) {
	switch (action.type) {
	case SHOW_MESSAGE:
		return action.message;
	case CLEAR_MESSAGE:
		return null;
	default:
		return state;
	}
}

function saveToken(token) {
	window.localStorage.setItem(TOKEN, token);
}

function removeToken() {
	window.localStorage.removeItem(TOKEN);
}

function getToken() {
	return window.localStorage.getItem(TOKEN);
}

const auth = combineReducers({
	token,
	isProcessing,
	message
});

export default auth;
