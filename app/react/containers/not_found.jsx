import React from "react";
import { Link } from "react-router";
import { Grid, Jumbotron } from "react-bootstrap";

export default class NotFound extends React.Component {
	render () {
		return (
			<Grid style={{paddingTop: 20}}>
				<Jumbotron>
					<h3>We can't find your page! :(</h3>
					<Link to="/">Back to home page</Link>
				</Jumbotron>
			</Grid>
		);
	}
}
