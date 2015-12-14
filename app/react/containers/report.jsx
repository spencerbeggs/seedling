import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {fetchReport } from "../actions/reports";

class Report extends Component {

	componentDidMount () {
		const {dispatch} = this.props;
		console.log(this);
	}

	render () {
		return (
			<div id="page">
				Hello
			</div>
		);
	}
}

Report.propTypes = {

};

function select(state) {
	const reports = state.report;
	return {

	};
}

export default connect(select)(Report);
