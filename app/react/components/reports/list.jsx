import React, { Component, PropTypes } from "react";
import Report from "./report.jsx";

export default class ReportList extends Component {

	render () {
		const {reports} = this.props;

		if (reports.length > 0) {
			return (
				<div id="report-list">
					{reports.map((report, index) =>
						<Report {...report} key={index} />
					)}
				</div>
			);
		} else {
			return (
				<div>No reports</div>
			);
		}
	}
}

ReportList.propTypes = {
	collection: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	}).isRequired)
};
