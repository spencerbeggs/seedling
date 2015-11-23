import React, { Component, PropTypes } from "react";
import { Input, Button } from "react-bootstrap";

export default class AddTodo extends Component {

	render () {
		let addButton = (
			<Button type="submit">Add</Button>
		);

		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				<Input type="text" ref="input" buttonAfter={addButton} />
			</form>
		);
	}

	handleSubmit (e) {
		e.preventDefault();
		const node = this.refs.input.getInputDOMNode();
		const text = node.value.trim();

		if (text === "") {
			return;
		}

		this.props.onAddClick(text);
		node.value = "";
	}
}

AddTodo.propTypes = {
	onAddClick: PropTypes.func.isRequired
};
