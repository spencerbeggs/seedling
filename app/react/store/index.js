import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import { devTools, persistState } from "redux-devtools";

const finalCreateStore = compose(
	applyMiddleware(thunk),
	applyMiddleware(promise),
	applyMiddleware(createLogger())
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("../reducers", () => {
			const nextRootReducer = require("../reducers");
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
