import React, { Component, PropTypes } from "react";
import PageStore from "../stores/pages";
import * as PageActionCreators from "../actions/page";

/**
 * Requests data from server for current props.
 */
function requestData(props) {
	const {params} = props;
	PageActionCreators.getBySlug(params.slug);
}
 
/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
	const content = PageStore.get(props.params.slug);
	return {content};
}

//@connectToStores([PageStore], getState)
class Page extends Component {
	static propTypes = {
		// Injected by React Router:
		params: PropTypes.shape({
			slug: PropTypes.string
		}).isRequired,

		// Injected by @connectToStores
		content: PropTypes.object
	}

	componentWillMount () {
		requestData(this.props);
		this.state = getState(this.props);
	}

	componentWillReceiveProps (nextProps) {
		requestData(nextProps);
	}

	componentDidMount () {
		console.log(this.state);
	}

	render () {
		console.log(this.props);
		return (
			<section>
				<h1>{this.props.title}</h1>
			</section>
		);
	}
}

export default Page;
