import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchReports, fetchCategories} from "../actions/reports";
import AddTodo from "../components/reports/add.jsx";
import ReportList from "../components/reports/list.jsx";
import Footer from "../components/reports/footer.jsx";
import Spinner from "../components/lib/spinner.jsx";
import _ from "lodash";
import {WithContext as TagInput} from "react-tag-input";

class Reports extends Component {
	constructor (props) {
		super(props);
		this.addCategory = this.addCategory.bind(this);
		this.addTable = this.addTable.bind(this);
		this.addField = this.addField.bind(this);
		this.addSource = this.addSource.bind(this);
		this.state = {
			categories: {
				tags: [],
				suggestions: []
			},
			tables: {
				tags: [],
				suggestions: []
			},
			fields: {
				tags: [],
				suggestions: []
			},
			sources: {
				tags: [],
				suggestions: []
			}
		};
	}

	componentDidMount () {
		const {dispatch, reports} = this.props;
		dispatch(fetchReports());
	}

	onSubmit (evt) {
		evt.preventDefault();
		this.filter();
	}

	filter (evt) {
		const {dispatch} = this.props;
		dispatch(fetchReports({
			keyword: this.searchbox.value,
			categories: _.pluck(this.state.categories.tags, "text"),
			tables: _.pluck(this.state.tables.tags, "text"),
			fields: _.pluck(this.state.fields.tags, "text"),
			sources: _.pluck(this.state.sources.tags, "text")
		}));
	}

	handleDelete () {
	}

	addCategory (tag) {
		var tags = this.state.categories.tags;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.state.categories.tags = tags;
		this.filter();
	}

	addTable (tag) {
		var tags = this.state.tables.tags;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.state.tables.tags = tags;
		this.filter();
	}

	addField (tag) {
		var tags = this.state.fields.tags;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.state.fields.tags = tags;
		this.filter();
	}

	addSource (tag) {
		var tags = this.state.sources.tags;
		tags.push({
			id: tags.length + 1,
			text: tag
		});
		this.state.sources.tags = tags;
		this.filter();
	}

	handleDrag () {
	}

	render () {
		const {dispatch, reports} = this.props;
		this.state.categories.suggestions = _.uniq(_.flatten(_.pluck(reports, "categories"))).sort();
		this.state.tables.suggestions = _.uniq(_.flatten(_.pluck(reports, "tables"))).sort();
		this.state.fields.suggestions = _.uniq(_.flatten(_.pluck(reports, "fields"))).sort();
		this.state.sources.suggestions = _.uniq(_.flatten(_.pluck(reports, "sources"))).sort();
		return (
			<div id="page">
				<div id="searchform">
					<form onSubmit={e => this.onSubmit(e)}>
						<fieldset className="form-group">
							<input type="text" ref={ref => this.searchbox = ref} onChange={e => this.filter(e)} className="form-control" id="exampleInputEmail1" placeholder="What are you looking for?" />
						</fieldset>
						<fieldset className="row">
							<fieldset className="col-md-3 form-group">
								<TagInput tags={this.state.categories.tags}
									suggestions={this.state.categories.suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.addCategory}
									handleDrag={this.handleDrag}
									placeholder="Filter by department"
								/>
							</fieldset>
							<fieldset className="col-md-3 form-group">
								<TagInput tags={this.state.tables.tags}
									suggestions={this.state.tables.suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.addTable}
									handleDrag={this.handleDrag}
									placeholder="Filter by table"
								/>
							</fieldset>
							<fieldset className="col-md-3 form-group">
								<TagInput tags={this.state.fields.tags}
									suggestions={this.state.fields.suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.addField}
									handleDrag={this.handleDrag}
									placeholder="Filter by field"
								/>
							</fieldset>
							<fieldset className="col-md-3 form-group">
								<TagInput tags={this.state.sources.tags}
									suggestions={this.state.sources.suggestions}
									handleDelete={this.handleDelete}
									handleAddition={this.addSource}
									handleDrag={this.handleDrag}
									placeholder="Filter by source"
								/>
							</fieldset>
						</fieldset>
					</form>
				</div>
				<ReportList reports={reports} />
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
