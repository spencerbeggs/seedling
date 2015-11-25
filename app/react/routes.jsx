import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import createHistory from "history/lib/createBrowserHistory";
import { syncReduxAndRouter } from "redux-simple-router";

import App from "./containers/app.jsx";
import Admin from "./containers/admin.jsx";
import Home from "./containers/home.jsx";
import TodoApp from "./containers/todo_app.jsx";
import Login from "./containers/login.jsx";
import NotFound from "./containers/not_found.jsx";

const history = createHistory();

export default function getRoutes(store) {
	syncReduxAndRouter(history, store);

	function requireAuth(nextState, replaceState) {
		if (!store.getState().auth.token) {
			replaceState(null, `/login?nextPathname=${nextState.location.pathname}`);
		}
	}

	return (
		<Router history={history}>
			<Route path="/react" component={App}>
				<Route path="/login" component={Login} />
				<Route component={Admin} onEnter={requireAuth}>
					<IndexRoute component={Home} />
					<Route path="/todo" component={TodoApp} />
				</Route>
				<Route path="/*" component={NotFound} />
			</Route>
		</Router>
	);
};
