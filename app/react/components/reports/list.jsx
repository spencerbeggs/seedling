import React, { Component, PropTypes } from "react";
import Report from "./report.jsx";

export default class ReportList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			sortBy: "Date",
			sortOrder: "DESC"
		};
	}

	render () {
		return (
			<div id="report-list">
				{this.props.reports.map((report, index) =>
					<Report {...report}
						key={index}
						onClick={() => this.props.onTodoClick(index)} />
				)}
			</div>
		);
	}
}

ReportList.propTypes = {
	onTodoClick: PropTypes.func.isRequired,
	reports: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	}).isRequired).isRequired
};
