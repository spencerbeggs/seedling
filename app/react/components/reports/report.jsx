import React, { Component, PropTypes } from "react";

export default class Report extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		const {title, department} = this.props;
		return (
			<div className="report">
				<a className="report-image">
					<img src="http://placehold.it/400x400" />
					<h5>{this.props.title}</h5>
				</a>
			</div>
		);
	}
}

Report.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};
