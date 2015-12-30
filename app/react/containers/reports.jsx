import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchReports } from "../actions/reports";

class Reports extends Component {

	renderChildren () {
		return React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, {
				reports: this.props.reports,
				dispatch: this.props.dispatch
			});
		}.bind(this));
	}

	componentDidMount () {
		const {dispatch} = this.props;
		dispatch(fetchReports());
	}

	render () {
		return (
			<div id="reports">
				{this.renderChildren()}
			</div>
		);
	}
}

Reports.propTypes = {
	reports: PropTypes.object.isRequired
};

function select(state) {
	const reports = state.reports;
	return {
		reports: reports
	};
}

export default connect(select)(Reports);
