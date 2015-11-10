import React, { Component } from "react";
import {Link} from "react-router";

class App extends Component {
	render () {
		return (
			<div>
				<h1>App</h1>
				<ul>
					<li><Link to="/splash">Splash</Link></li>
					<li><Link to="/summary">Summary</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	}
}

export default App;
