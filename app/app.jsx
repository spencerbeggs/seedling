require("babelify/polyfill");
var React = require("react");
var data = require("./data.yml");
var _ = require("lodash");
console.log(data);
var Page = require("./components/page.jsx");

var App = React.createClass({
	render: function() {
		var pages = _.map(data.pages, function(page) {
			return (
				<Page text={page.question} foo="bar" noo="nar" doo="dar" />
				);
		});
		return (
			<Page text={page.question} foo="bar" noo="nar" doo="dar" />
			);
	}
});

React.render(<App />, global.document.getElementsByTagName("body")[0]);
