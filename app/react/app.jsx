var React = require("react");
var ReactDOM = require("react-dom");
var data = require("./data.yml");
var _ = require("lodash");
console.log(data);
var Page = require("./components/page.jsx");

class App extends React.Component {
	constructor (props = {}) {
		super(props);
	}

	render () {
		var pages = _.map(data.pages, page => {
			console.log(page);
			(<Page doo="dar" foo="bar" noo="nar" text={ page.question } />);
		});

		return (
			<section id="page">
				<header></header>
				<section id="content">
					<h1>Hi</h1>
				</section>
				<footer></footer>
			</section>
		);
	}
}

ReactDOM.render(<App />, global.document.getElementsByTagName("main")[0]);
