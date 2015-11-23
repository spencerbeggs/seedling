import React from "react";

class Spinner extends React.Component {

	getStyle () {
		return {
			display: this.props.show ? "block" : "none",
			paddingTop: "15%"
		};
	}

	render () {
		return (
			<div className="modal fade in" data-backdrop="static" style={this.getStyle()}>
				<div className="modal-dialog">
					<div className="text-center">
						<i className="fa fa-spinner fa-pulse fa-4x"></i>
					</div>
				</div>
				<div className="modal-backdrop fade in" />
			</div>
		);
	}
}
export default Spinner;
