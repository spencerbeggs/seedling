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
		this.state = Pages[props.params.slug] || {
			title: "Not found"
		};
	}

	componentDidMount () {
		console.log(this);
	}

	render () {
		return (
		<section>
			<h1>{Pages[this.props.params.slug].title}</h1>
		</section>);
	}
}

Page.propTypes = {
	title: React.PropTypes.string
};

export default Page;
