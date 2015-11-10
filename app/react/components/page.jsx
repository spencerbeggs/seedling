import React, { Component } from "react";

let Pages = {
	splash: {
		title: "Splash"
	},
	summary: {
		title: "Summary"
	}
};

class Page extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		console.log(this);
	}

	render () {
		return (
		<section>
			<h1>{this.props.params.slug ? Pages[this.props.params.slug].title : "Home"}</h1>
		</section>);
	}
}

Page.propTypes = {
	title: React.PropTypes.string
};

export default Page;
