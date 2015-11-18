import React, { Component } from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, Link, History} from "react-router";
import history from "./components/history";
import App from "./components/app.jsx";
import Page from "./components/page.jsx";
import Login from "./components/login.jsx";
import {Profile, UserIndex} from "./components/user.jsx";

// var data = require("./data.yml");
// console.log(data);
var config = require("config");
console.log("App started: %O", config);

class LoginPage extends Component {
	render () {
		<Login title="Foo" />;
	}
}

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="/users" component={UserIndex}>
				<Route path=":username" component={Profile} />
			</Route>
			<Route path="/login" component={Login} />
			<Route path=":slug" component={Page} />
			<IndexRoute component={Page} />
		</Route>
	</Router>
), global.document.getElementsByTagName("main")[0]);
