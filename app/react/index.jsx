require("babel-polyfill");
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import getRoutes from "./routes.jsx";
import createStore from "./store";

const store = createStore();

render(
	<Provider store={store}>
		{getRoutes(store)}
	</Provider>,
	global.document.getElementsByTagName("main")[0]
);
