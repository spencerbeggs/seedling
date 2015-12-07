import React from "react";
import SearchReportsBar from "../components/reports/search.jsx";

export default class Home extends React.Component {
	foo() {

	}
	render () {
		return (
			<div>
				<SearchReportsBar onAddClick={this.foo} />
			</div>
		);
	}
}
