import React, { Component, PropTypes } from "react";

export default class Todo extends Component {

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
			<li
				onClick={this.handleClick}
				style={{
					textDecoration: this.props.completed ? "line-through" : "none",
					cursor: this.props.completed ? "default" : "pointer"
				}}
			>
			{this.props.text}
			</li>
		);
	}
}

Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired
};
