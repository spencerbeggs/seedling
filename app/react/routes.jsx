import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import {createHistory, useBasename} from "history";
import { syncReduxAndRouter } from "redux-simple-router";

import App from "./containers/app.jsx";
import Admin from "./containers/admin.jsx";
import Search from "./components/reports/search.jsx";
import Reports from "./containers/reports.jsx";
import Home from "./containers/home.jsx";
import Report from "./containers/report.jsx";
import Login from "./containers/login.jsx";
import NotFound from "./containers/not_found.jsx";

const history = useBasename(createHistory)({
	basename: "/react"
});

createHistory();

export default function getRoutes(store) {
	syncReduxAndRouter(history, store);

	function requireAuth(nextState, replaceState) {
		console.log(arguments);
		// if (!store.getState().auth.token) {
		// 	replaceState(null, `/react/login?nextPathname=${nextState.location.pathname}`);
		// }
	}

	function checkLink() {
		console.log("GGG");
		console.log(arguments);
	}

	return (
		<Router history={history}>
			<Route path="/login" component={Login} />
			<Route path="/" onEnter={requireAuth} component={App}>
				<IndexRoute component={Search} />
				<Route path="reports" component={Reports}>
					<IndexRoute component={Search} />
					<Route path=":slug" onEnter={checkLink} component={Report} />
				</Route>
			</Route>

			<Route path="/*" component={NotFound} />
		</Router>
	);
};
