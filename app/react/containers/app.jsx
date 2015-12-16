import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class App extends React.Component {

	render () {
		return (
			<section id="app">
				<header>
					<div className="container">
						<div className="row">
							<div className="col-md-9"></div>
							<div className="col-md-3">
								<Link to="/react/reports">Reports</Link>
							</div>
						</div>
					</div>
				</header>
				<section id="page">
					{this.props.children}
				</section>
				<footer>
					<div>
						<div className="logo">
							<img src="/images/fordham_logo.png" />
						</div>
						<div className="slogan">
							<p>New York is my campus. Fordham is my school.</p>
						</div>
						<div className="links">
							<ul>
								<li>
									<a href="http://my.fordham.edu/">Log in to my.fordham</a>
								</li>
								<li>
									<a href="http://my.fordham.edu/">Contact us</a>
								</li>
								<li>
									<a href="http://my.fordham.edu/">Maps and directions</a>
								</li>
							</ul>
						</div>
					</div>
				</footer>
			</section>
		);
	}
}

export default connect(state => (state))(App);
