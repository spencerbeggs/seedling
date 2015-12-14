import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import slug from "slug";

export default class Report extends Component {

	constructor (props) {
		super(props);
		console.log(this.props);
	}

	render () {
		const {title, department} = this.props;
		var path = "/reports/" + slug(this.props.title).toLowerCase();
		return (
			<div className="report" className="report-image">
				<Link to={path}>
					<img src="http://placehold.it/400x400" />
					<h5>{this.props.title}</h5>
				</Link>
			</div>
		);
	}
}

Report.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};
