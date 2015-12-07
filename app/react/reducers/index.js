import { combineReducers } from "redux";
import { routeReducer as routing } from "redux-simple-router";

import report from "./reports";
import auth from "./auth";

const rootReducer = combineReducers({
	auth,
	report,
	routing
});

export default rootReducer;
