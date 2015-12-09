import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {fetchReport } from "../actions/reports";

class Report extends Component {

	componentDidMount () {
		const {dispatch} = this.props;
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
	const report = state.report;
	console.log(report);
	var visibleReports = selectTodos(report.reports.toArray(), report.visibilityFilter);
	var sortedReports;

	if (report.sortOrder === "ASC") {
		sortedReports = _.sortBy(visibleReports, "added");
	} else {
		sortedReports = visibleReports;
	}

	return {
		isProcessing: report.isProcessing,
		items: sortedReports,
		visibilityFilter: report.visibilityFilter,
		sortBy: report.sortBy,
		sortOrder: report.sortOrder
	};
}

export default connect(select)(Report);
