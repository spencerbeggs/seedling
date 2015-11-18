import React, { Component } from "react";
import {Link} from "react-router";
import $ from "jquery";
import Auth0Lock from "auth0-lock";
console.log(Auth0Lock);
class App extends Component {
	componentWillMount () {
		this.setupAjax();

		this.createLock();

		this.setState({idToken: this.getIdToken()});
	}

	createLock () {
		//this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
	}

	setupAjax () {
		$.ajaxSetup({
			beforeSend: function (xhr) {
				if (localStorage.getItem("userToken")) {
					xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("userToken"));
				}
			}
		});
	}

	getIdToken () {
		var idToken = localStorage.getItem("userToken");
		var authHash = this.lock.parseHash(window.location.hash);

		if (!idToken && authHash) {
			if (authHash.id_token) {
				idToken = authHash.id_token;
				localStorage.setItem("userToken", authHash.id_token);
			}

			if (authHash.error) {
				console.log("Error signing in", authHash);
			}
		}

		return idToken;
	}

	render () {
		return (
			<section id="app">
				<header className="navbar navbar-fixed-top navbar-light bg-faded">
					<nav>
						<ul className="nav nav-pills">
							<li className="nav-item">
								<Link to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link to="/summary">Summary</Link>
							</li>
							<li className="nav-item">
								<Link to="/splash">Splash</Link>
							</li>
							<li className="nav-item">
								<Link to="/foo">Foo</Link>
							</li>
						</ul>
					</nav>
				</header>
				<section id="content">
					{this.props.children}
				</section>
				<footer>

				</footer>
			</section>
		);
	}
}

export default App;
