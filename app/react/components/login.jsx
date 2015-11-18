import React, { Component, PropTypes } from "react";
import fetch from "whatwg-fetch";

class Login extends Component {
	static propTypes = {
		// Injected by React Router:
		params: PropTypes.shape({
			slug: PropTypes.string
		}).isRequired,

		// Injected by @connectToStores
		content: PropTypes.object
	}



	onSubmit (evt) {
		evt.preventDefault();
		global.fetch("https://savvynyc.auth0.com/delegation", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				client_id: "lObLIK59qW7JrDFW6RP0u0o6OkCawr7F",
				grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
				id_token: "CAAHNzUbD0eIBABl5cqnKJgcm4k4QSW0WxEdwVcxFfWPFzVix1WWS7Q2pxCkzaVgdycBSHVeFIsQ4r63u4oIQ4n7WvVp8ZCxopLiUJZBEc5DGhHTBrJZBpnIkkWaRzdn5xqFxvcHxGTdpib5OieWK3QSAVvnDj8UBWIGQ0WAmyb4e6IIuEtc4QEbZAhjA8CzpAHCfq2J2jgZDZD",
				target: "lObLIK59qW7JrDFW6RP0u0o6OkCawr7F",
				api_type: "aws",
				role: "arn:aws:iam::010616021751:role/kiqio-db-access-per-client",
				principal: "arn:aws:iam::010616021751:saml-provider/auth0"
			})
		}).then(function (res) {
			console.log(res);
		});
	}

	render () {
		console.log(this.props);
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset className="form-group">
					<label htmlFor="formGroupExampleInput" className="sr-only">Username</label>
					<input type="text" className="form-control" id="formGroupExampleInput" placeholder="email" />
				</fieldset>
				<fieldset className="form-group">
					<label htmlFor="formGroupExampleInput2" className="sr-only">Password</label>
					<input type="password" className="form-control" id="formGroupExampleInput2" placeholder="password" />
				</fieldset>
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

export default Login;
