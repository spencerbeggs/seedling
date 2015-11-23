import React, { Component, PropTypes } from "react";
import { Input, ButtonInput } from "react-bootstrap";

export default class LoginForm extends Component {
	render () {
		return (
			<form onSubmit={e => this.handleLogin(e)} className="form-horizontal">
				<Input
					name="username"
					ref="username"
					type="text"
					label="Username"
					labelClassName="col-xs-4"
					wrapperClassName="col-xs-8" />
				<Input
					name="password"
					ref="password"
					type="password"
					label="Password"
					labelClassName="col-xs-4"
					wrapperClassName="col-xs-8" />
				<ButtonInput
					type="submit"
					value="Login"
					bsStyle="primary"
					bsSize="small"
					wrapperClassName="col-xs-offset-4 col-xs-8" />
			</form>
		);
	}

	handleLogin (e) {
		e.preventDefault();
		const username = this.refs.username.getValue();
		const password = this.refs.password.getValue();
		this.props.login(username, password);
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
};
