import React, { Component, PropTypes } from "react";
import Report from "./report.jsx";
import { connect } from "react-redux";
import { List } from "immutable";

export default class ReportList extends Component {

	render () {
		var reports = this.props.reports.get("visibleItems") ? this.props.reports.get("visibleItems").toArray() : [];
		var search = this.props.reports.get("search");

		if (this.props.reports.getIn(["search"], "active")) {
			var phrase = "";

			if (reports.length > 0) {
				phrase += `Found ${reports.length} reports`;
			}

			if (search.departments.length > 0) {
				phrase += " in the ";

				if (search.departments.length === 1) {
					phrase += `${search.departments[0]} department`;
				} else {
					console.log("else");
				}
			}

			return (
				<div>
					<span>{phrase}</span>
					<div id="report-list">
						{reports.map((report, index) =>
							<Report {...report} key={index} />
						)}
					</div>
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
	reports: PropTypes.object.isRequired
};

function select(state) {
	return {
		reports: state.reports
	};
}

export default connect(select)(ReportList);
