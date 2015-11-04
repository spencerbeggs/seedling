var React = require("react");

class Page extends React.Component {
	constructor (props = {}) {
		super(props);
		this.state = {
			foo: props.initialCount
		};
	}

	render () {
		return (<section><h1>{this.state.foo}</h1></section>);
	}
}

Page.propTypes = {
	initialCount: React.PropTypes.number
};

module.exports = Page;
