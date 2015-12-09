import React, { Component, PropTypes } from "react";

export default class Report extends Component {

	constructor (props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		if (!this.props.completed) {
			this.props.onClick();
		}
	}

	render () {
		return (
			<div className="report"
				onClick={this.handleClick}
				style={{
					textDecoration: this.props.completed ? "line-through" : "none",
					cursor: this.props.completed ? "default" : "pointer"
				}}
			>
				<a className="report-image">
					<img src="http://placehold.it/250x100" />
				</a>
				<h5>{this.props.title}</h5>
				<p>{this.props.description}</p>
			</div>
		);
	}
}

Report.propTypes = {
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};
