import { combineReducers } from "redux";
import { routeReducer as routing } from "redux-simple-router";

import todo from "./todos";
import auth from "./auth";

const rootReducer = combineReducers({
	auth,
	todo,
	routing
});

export default rootReducer;
