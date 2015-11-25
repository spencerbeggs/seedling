import React from "react";
import { connect } from "react-redux";
import { Link, IndexLink } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";
import { logout } from "../actions/auth";

class Admin extends React.Component {

  constructor (props) {
	super(props);
	this.renderLinks = this.renderLinks.bind(this);
  }

  logout (e) {
	e.preventDefault();
	this.props.dispatch(logout());
  }

  renderLinks () {
	if (this.props.auth.token) {
		return (
			<ul>
				<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
				<li><Link to="/todo" activeClassName="active">Todo</Link></li>
				<li><a href="/#" onClick={e => this.logout(e)}>Logout</a></li>
			</ul>
		);
	}

	return (
		<ul>
			<li><Link to="/login" activeClassName="active">Login</Link></li>
		</ul>
	);
  }

  render () {
	return (
		<Grid>
			<div className="main">
				<Row>
					<Col xs={3}>
						{this.renderLinks()}
					</Col>
					<Col xs={9}>
						{this.props.children}
					</Col>
				</Row>
			</div>
		</Grid>
	);
  }
}

export default connect(state => state)(Admin);
