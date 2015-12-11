import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchReports} from "../actions/reports";
import AddTodo from "../components/reports/add.jsx";
import ReportList from "../components/reports/list.jsx";
import Footer from "../components/reports/footer.jsx";
import Spinner from "../components/lib/spinner.jsx";
import _ from "lodash";
import Filter from "redux-filter";
import Filters from "../components/reports/filters.jsx";

class Reports extends Component {

	componentDidMount () {
		const {dispatch} = this.props;
		dispatch(fetchReports());
	}

	render () {
		const {dispatch, reports} = this.props;
		const config = {

			// things that are filtered
			subjects: reports,

			// attributes that you filter.
			// Component will return a unique list of attributes for each filterableCriteria
			filterableCriteria: [{
				title: "Filter By Department",
				attribute: "category"
			}],

			// keys on each subject that will be searched on
			searchKeys: ["title", "category"],

			// if you need to order the filterableCriteria output
			filterableCriteriaSortOptions: {
				category: items => [...items].sort()
			}
		};
		return (
			<div id="page">
				<Filter {...config}>
					<ReportList {...this.props} />
				</Filter>
			</div>
		);
	}
}

Reports.propTypes = {
	reports: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired
	}))
};

function select(state) {
	const reports = state.reports;
	return {
		reports: reports.toArray()
	};
}

export default connect(select)(Reports);
