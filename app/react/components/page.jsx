import React, { Component, PropTypes } from "react";
import PageStore from "../stores/pages";
import * as PageActionCreators from "../actions/page";

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
	return PageStore.get(props.params.slug);
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
		this.requestData(this.props);
		this.state = getState(this.props);
	}
	componentDidUpdate() {
		console.log(this);
	}
	componentWillReceiveProps (nextProps) {
		this.state = this.requestData(nextProps);
	}

	requestData(props) {
		const {params} = props;
		PageActionCreators.getBySlug(params.slug);
	}


	componentDidMount () {
		//console.log(this.state);
	}

	render () {
		console.log("HHH");
		return (
			<section>
				<h1>{this.state.title}</h1>
			</section>
		);
	}
}

export default Page;
