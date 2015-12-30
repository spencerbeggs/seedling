import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {fetchReport } from "../actions/reports";
import slug from "slug";
import {Link} from "react-router";
import Highlight from "react-highlight";

class Report extends Component {
	constructor (props) {
		super(props);
		this.state = {
			activeTab: "overview"
		};
	}

	componentDidMount () {
		const {dispatch} = this.props;
	}

	toggleTab (tab, evt) {
		evt.preventDefault();
		this.setState({
			activeTab: tab
		});
	}

	render () {
		var prevPath = `/reports/${this.props.prevPath}`;
		var nextPath = `/reports/${this.props.nextPath}`;
		var prevLink = "";
		var nextLink = "";

		if (this.props.prevPath) {
			prevLink = <Link className="previous-report" to={prevPath}>← previous</Link>;
		}

		if (this.props.nextPath) {
			nextLink = <Link className="next-report" to={nextPath}>next →</Link>;
		}

		var fields = "";
		this.props.report.fields.forEach((field, i) => {
			if (i > 0) {
				fields += ", ";
			}

			fields += field;
		});

		var parameters = "";
		this.props.report.parameters.forEach((param, i) => {
			if (i > 0) {
				parameters += ", ";
			}

			parameters += param;
		});

		var tables = "";
		this.props.report.tables.forEach((table, i) => {
			if (i > 0) {
				tables += ", ";
			}

			tables += table;
		});

		var sources = "";
		this.props.report.sources.forEach((source, i) => {
			if (i > 0) {
				sources += ", ";
			}

			sources += source;
		});

		return (
			<div id="page" className="row">
				<div className="col-md-4">
					<img className="img-fluid" src="http://placehold.it/400x400" />
					<div className="next-previous">
						{prevLink}
						{nextLink}
					</div>
				</div>
				<div className="col-md-8 report-content">
					<h1>{this.props.report.title}</h1>
					<button type="button" className="btn btn-primary">Run Report</button>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a className={this.state.activeTab === "overview" ? "nav-link active" : "nav-link"} onClick={this.toggleTab.bind(this, "overview")}>Overview</a>
						</li>
						<li className="nav-item">
							<a className={this.state.activeTab === "info" ? "nav-link active" : "nav-link"} onClick={this.toggleTab.bind(this, "info")}>Info</a>
						</li>
						<li className="nav-item">
							<a className={this.state.activeTab === "sql" ? "nav-link active" : "nav-link"} onClick={this.toggleTab.bind(this, "sql")}>SQL</a>
						</li>
					</ul>
					<ul className="tab-content">
						<li className={this.state.activeTab === "overview" ? "active" : ""}>
							<p>{this.props.report.description}</p>
						</li>
						<li className={this.state.activeTab === "info" ? "active" : ""}>
							<p>Fields: {fields}</p>
							<p>Parameters: {parameters}</p>
							<p>Tables: {tables}</p>
							<p>Sources: {sources}</p>
						</li>
						<li className={this.state.activeTab === "sql" ? "active" : ""}>
							<h4>SQL Queries in Report</h4>
							<Highlight className="sql">
								{this.props.report.sql}
							</Highlight>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

Report.propTypes = {
	report: PropTypes.object.isRequired
};

function select(state) {
	const reports = state.reports;
	var report = false;
	let theSlug = state.routing.path.split("/").pop();
	let arr = reports.toArray();
	var nextPath = false;
	var prevPath = false;
	arr.some((item, i) => {
		if (slug(item.title).toLowerCase() === theSlug) {
			report = item;

			if (i !== 0 && arr.length > 1) {
				prevPath = slug(arr[i - 1].title).toLowerCase();
			}

			if (i >= 0 && arr.length > 1 && i !== arr.length - 1) {
				nextPath = slug(arr[i + 1].title).toLowerCase();
			}

			return true;
		}
	});
	return {
		report: report,
		nextPath: nextPath,
		prevPath: prevPath
	};
}

export default connect(select)(Report);
