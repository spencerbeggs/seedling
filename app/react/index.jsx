import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { compose, combineReducers } from "redux";
import { ReduxRouter, routerStateReducer, reduxReactRouter, pushState } from "redux-router";
import { Route, Link } from "react-router";
import { Provider, connect } from "react-redux";
import { devTools } from "redux-devtools";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";
import { createHistory } from "history";
import App from "./components/app.jsx";
import Page from "./components/page.jsx";
import createStore from "./store";

const store = createStore();

class Parent extends Component {
	static propTypes = {
		children: PropTypes.node
	}

	render () {
		return (
			<div>
				<h2>Parent</h2>
				{this.props.children}
			</div>
		);
	}
}

class Child extends Component {
	render () {
		const {params: {id}} = this.props;

		return (
			<div>
				<h2>Child</h2>
				{id && <p>{id}</p>}
			</div>
		);
	}
}

const reducer = combineReducers({
	router: routerStateReducer
});

class Root extends Component {
	render () {
		return (
			<div>
				<Provider store={store}>
					<ReduxRouter>
						<Route path="/react" component={App}>
						<Route path="/react/foo" component={Parent} />
						<Route path="/react/splash" component={Parent} />
						<Route path="/react/summary" component={Parent} />
						<Route path="parent" component={Parent}>
							<Route path="child" component={Child} />
								<Route path="child/:id" component={Child} />
							</Route>
						</Route>
					</ReduxRouter>
				</Provider>
				<DebugPanel top right bottom>
					<DevTools store={store} monitor={LogMonitor} />
				</DebugPanel>
			</div>
		);
	}
}

ReactDOM.render(<Root />, global.document.getElementsByTagName("main")[0]);
