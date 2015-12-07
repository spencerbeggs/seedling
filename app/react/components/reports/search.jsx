import React, { Component, PropTypes } from "react";

export default class SearchReportsBar extends Component {

	render () {
		return (
			<div id="searchbar">
				<form onSubmit={e => this.handleSubmit(e)}>
					<fieldset className="form-group">
						<label htmlFor="search">Search</label>
						<input type="text" className="form-control-search" ref="input" name="search" />
					</fieldset>
				</form>
			</div>
		);
	}

	handleSubmit (e) {
		e.preventDefault();
		const text = this.refs.input.value.trim();

		if (text === "") {
			return;
		}

		this.props.onAddClick(text);
		this.refs.input.value = "";
	}
}

SearchReportsBar.propTypes = {
	onAddClick: PropTypes.func.isRequired
};
