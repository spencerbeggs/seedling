import { combineReducers } from "redux";
import { routeReducer as routing } from "redux-simple-router";

import reports from "./reports";
import auth from "./auth";

const rootReducer = combineReducers({
	auth,
	reports,
	routing
});

export default rootReducer;
