import React, { Component } from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, Link, History} from "react-router";
import history from "./components/history";
import App from "./components/app.jsx";
import Page from "./components/page.jsx";

// var data = require("./data.yml");
// console.log(data);
var config = require("config");
console.log("App started: %O", config);

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path=":slug" component={Page} />
			<IndexRoute component={Page} />
		</Route>
	</Router>
), global.document.getElementsByTagName("main")[0]);
