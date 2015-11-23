import React, { Component } from "react";
import {Link} from "react-router";
import { connect } from "react-redux";
import { pushState } from "redux-router";

class App extends Component {

	render () {
		return (
			<section id="app">
				<header className="navbar navbar-fixed-top navbar-light bg-faded">
					<nav>
						<ul className="nav nav-pills">
							<li className="nav-item">
								<Link to="/react">Home</Link>
							</li>
							<li className="nav-item">
								<Link to="/react/summary">Summary</Link>
							</li>
							<li className="nav-item">
								<Link to="/react/splash">Splash</Link>
							</li>
							<li className="nav-item">
								<Link to="/react/foo">Foo</Link>
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

connect(

  // Use a selector to subscribe to state
  state => ({q: state.router.location.query.q}),

  // Use an action creator for navigation
  {pushState}
)(App);

export default App;
