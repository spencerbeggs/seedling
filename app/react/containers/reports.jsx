import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { addTodo, fetchTodos, completeTodo, setVisibilityFilter, VisibilityFilters } from "../actions/reports";
import AddTodo from "../components/reports/add.jsx";
import ReportList from "../components/reports/list.jsx";
import Footer from "../components/reports/footer.jsx";
import Spinner from "../components/lib/spinner.jsx";
import Filter from "redux-filter";

class Reports extends Component {

	componentDidMount () {
		const {dispatch} = this.props;
		dispatch(fetchTodos());
	}

	render () {
		const {dispatch, visibleTodos, visibilityFilter, isProcessing} = this.props;
		const config = {

			// things that are filtered
			subjects: visibleTodos,

			// attributes that you filter.
			// Component will return a unique list of attributes for each filterableCriteria
			filterableCriteria: [{
				title: "Filter By Practice Area",
				attribute: "practices"
			}, {
				title: "Filter Alphabetically",
				attribute: "initial"
			}],

			// keys on each subject that will be searched on
			searchKeys: ["title", "subhead", "practices"],

			// if you need to order the filterableCriteria output
			filterableCriteriaSortOptions: {
				tags: items => [...items].sort()
			}
		};
		return (
			<div id="page">
				<Spinner show={isProcessing} />
				<div>
					<div>
						<AddTodo
							onAddClick={text =>
								dispatch(addTodo(text))
							} />
						<Filter {...config}>
						<ReportList
							reports={visibleTodos}
							onTodoClick={index =>
								dispatch(completeTodo(index))
							} />
						</Filter>
						<Footer
							filter={visibilityFilter}
							onFilterChange={nextFilter =>
								dispatch(setVisibilityFilter(nextFilter))
							} />
					</div>
				</div>
			</div>
		);
	}
}

Reports.propTypes = {
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	})),
	visibilityFilter: PropTypes.oneOf([
		"SHOW_ALL",
		"SHOW_COMPLETED",
		"SHOW_ACTIVE"
	]).isRequired
};

function selectTodos(reports, filter) {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return reports;
		case VisibilityFilters.SHOW_COMPLETED:
			return reports.filter(report => report.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return reports.filter(report => !report.completed);
	}
}

function select(state) {
	const report = state.report;
	return {
		isProcessing: report.isProcessing,
		visibleTodos: selectTodos(report.reports.toArray(), report.visibilityFilter),
		visibilityFilter: report.visibilityFilter
	};
}

export default connect(select)(Reports);
