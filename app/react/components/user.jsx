import React, { Component, PropTypes } from "react";
import UserStore from "../stores/user";
import * as UserActionCreators from "../actions/user";

/**
 * Requests data from server for current props.
 */
function requestData(props) {
	const {params} = props;
	console.log(params);
	UserActionCreators.getBySlug(params.slug);
}

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
	const page = UserStore.get(props.params.slug);
	return page;
}

// @connectToStores([UserStore], getState)
class Profile extends Component {
	static propTypes = {
		// Injected by React Router:
		params: PropTypes.shape({
			username: PropTypes.string.isRequired
		}).isRequired,

		// Injected by @connectToStores
		page: PropTypes.object
	}

	componentWillMount () {
		requestData(this.props);
	}

	componentWillReceiveProps (nextProps) {
		requestData(nextProps);
	}

	componentDidMount () {
		console.log(this);
	}

	render () {
		return (
			<section>
				<h1>{this.state.title}</h1>
			</section>
		);
	}
}

// @connectToStores([UserStore], getState)
class UserIndex extends Component {
	render () {
		return (
			<h1>Users</h1>
		);
	}
}

export {Profile, UserIndex};
