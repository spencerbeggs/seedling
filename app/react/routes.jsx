import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import {createHistory, useBasename} from "history";
import { syncReduxAndRouter } from "redux-simple-router";

import App from "./containers/app.jsx";
import Admin from "./containers/admin.jsx";
import Home from "./containers/home.jsx";
import Reports from "./containers/reports.jsx";
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
		if (!store.getState().auth.token) {
			replaceState(null, `/login?nextPathname=${nextState.location.pathname}`);
		}
	}

	return (
		<Router history={history}>
			<Route path="/login" component={Login} />
			<Route path="/" onEnter={requireAuth} component={App}>
				<IndexRoute component={Home} />
				<Route path="reports" component={Reports}>
					<IndexRoute component={Home} />
				</Route>
				<Route path=":slug" component={Report} />
			</Route>
			<Route path="/*" component={NotFound} />
		</Router>
	);
};
