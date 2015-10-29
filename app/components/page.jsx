var React = require('react');

module.exports = React.createClass({
  render: function() {
     return (
        <section>
            <h1>{this.props.text}</h1>
        </section>
     )}
});
