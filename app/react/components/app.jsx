import React, { Component } from "react";
import {Link} from "react-router";

class App extends Component {
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
