import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {fetchReport } from "../actions/reports";
import slug from "slug";

class Report extends Component {

	componentDidMount () {
		const {dispatch} = this.props;
	}

	render () {
		console.log(this.props);
		var prevPath = `/reports/${this.props.prevPath}`;
		var nextPath = `/reports/${this.props.nextPath}`;
		return (
			<div id="page" className="row">
				<div className="col-md-4">
					<img className="img-fluid" src="http://placehold.it/400x400" />
				</div>
				<div className="col-md-8">
					<h1>{this.props.report.title}</h1>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a className="nav-link active" href="#">Overview</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">SQL</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Another link</a>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" href="#">Disabled</a>
						</li>
					</ul>
					<a href={prevPath}>Previous</a>
					<a href={nextPath}>Next</a>
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

			if (i > 0 && arr.length > 1) {
				prevPath = slug(arr[i - 1].title).toLowerCase();
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
