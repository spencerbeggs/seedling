import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchReports, fetchCategories, filterReports} from "../../actions/reports";
import ReportList from "./list.jsx";
import Spinner from "../lib/spinner.jsx";
import _ from "lodash";

class Dropdown extends Component {
	constructor (props) {
		super(props);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.addTag = this.addTag.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
		this.showSuggestions = this.showSuggestions.bind(this);
		this.hideSuggestions = this.hideSuggestions.bind(this);
		this.state = {
			values: [],
			possibilities: [],
			suggestions: []
		};
	}

	componentWillReceiveProps (nextProps) {
		var possibilities = _.uniq(_.flatten(_.pluck(nextProps.reports, this.props.kind))).sort();
		this.setState({possibilities: possibilities});
	}

	showSuggestions () {
		var suggestions = [];
		var normalizedValues = this.state.values.map(value => value.toLowerCase());
		this.state.possibilities.forEach(word => {
			let normalizedWord = word.toLowerCase();

			if (normalizedWord.includes(this._input.value.toLowerCase()) && !_.contains(normalizedValues, normalizedWord)) {
				suggestions.push(word);
			}
		});

		if (suggestions.length === 0 && this._input.value === "") {
			suggestions = this.state.possibilities;
		}

		this.setState({suggestions: suggestions});
	}

	hideSuggestions () {
		this.setState({suggestions: []});
	}

	onKeyUp (evt) {
		const {dispatch} = this.props;

		if (evt.key === "Enter" && this._input.value !== "") {
			this.addTag(null, this._input.value);
			this._input.value = "";
		}

		this.showSuggestions();
	}

	onBlur () {
		var self = this;
		setTimeout(function () {
			self.hideSuggestions();
		}, 200);
	}

	addTag (evt, tag) {
		const {dispatch} = this.props;
		let values = [];
		let added = false;
		this.state.values.forEach(value => {
			if (value.toLowerCase() === tag.toLowerCase()) {
				added = true;
			}

			values.push(value);
		});

		if (!added) {
			values.push(tag);
		}

		this.setState({values: values});
		let filter = {};
		filter[this.props.kind] = values;
		dispatch(filterReports(filter));
	}

	deleteTag (evt, tag) {
		const {dispatch} = this.props;
		var values = [];
		this.state.values.forEach(word => {
			if (word.toLowerCase() !== tag.toLowerCase()) {
				values.push(word);
			}
		});
		this.setState({values: values});
		let filter = {};
		filter[this.props.kind] = values;
		dispatch(filterReports(filter));
	}

	render () {
		var items = [];
		var tags = [];

		if (this.state.suggestions) {
			this.state.suggestions.forEach((word, i) => {
				if (i < this.props.max) {
					items.push(<a style={{cursor: "pointer"}} className="dropdown-item" key={i} onClick={evt => this.addTag(evt, word)}>{word}</a>);
				}
			});
		}

		if (this.state.suggestions.length > this.props.max) {
			items.push(<div key="divider" className="dropdown-divider"></div>);
			items.push(<a key="showmore" className="dropdown-item disabled">+{this.state.suggestions.length - this.props.max} more not shown</a>);
		}

		this.state.values.forEach((value, i) => {
			tags.push(<li key={i}><div><div>{value}</div><span onClick={evt => this.deleteTag(evt, value)}>x</span></div></li>);
		});

		return (
			<div className="col-sm-3 input-group-sm droptag">
				<label>{this.props.label}</label>
				<ul>
					{tags}
				</ul>
				<input
					type="text"
					className="form-control"
					ref={ref => this._input = ref}
					onKeyUp={evt => this.onKeyUp(evt)}
					onFocus={this.showSuggestions}
					placeholder={this.props.placeholder}
					onBlur={this.onBlur}
				/>
				<div className={items.length > 0 ? "dropdown open" : "dropdown"}>
					<div className="dropdown-menu" aria-labelledby="dropdownMenu1">
						{items}
					</div>
				</div>
			</div>
		);
	}

}

Dropdown.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object)
};

class Search extends Component {

	constructor (props) {
		super(props);
		this.filter = this.filter.bind(this);
	}

	componentDidMount () {
		const {dispatch, reports} = this.props;
		dispatch(fetchReports());
	}

	filter (evt) {
		const {dispatch} = this.props;
		dispatch(filterReports({
			keywords: this.searchbox.value.trim().split(" ")
		}));
	}

	render () {
		const {dispatch, reports} = this.props;
		return (
			<div id="search">
				<div id="searchform">
					<form onSubmit={e => this.onSubmit(e)}>
						<fieldset className="form-group">
							<input type="text" ref={ref => this.searchbox = ref} onChange={e => this.filter(e)} className="form-control" id="exampleInputEmail1" placeholder="What are you looking for?" />
						</fieldset>
						<div className="row">
							<Dropdown
								{...this.props}
								kind="categories"
								placeholder="Add a department..."
								label="Filter by department"
								max={3}
							/>
							<Dropdown
								{...this.props}
								kind="sources"
								placeholder="Add a source..."
								label="Filter by source"
								max={7}
							/>
							<Dropdown
								{...this.props}
								kind="tables"
								placeholder="Add a table..."
								label="Filter by table"
								max={7}
							/>
							<Dropdown
								{...this.props}
								kind="fields"
								placeholder="Add a field..."
								label="Filter by field"
								max={7}
							/>
						</div>
						<fieldset className="sort-it">
							<p>Sort: <a className="active">Alphabetical</a>, <a>Date Added</a>, <a>Date Modified</a></p>
						</fieldset>
					</form>
				</div>
				<ReportList reports={reports} />
				{this.props.children}
			</div>
		);
	}
}

Search.propTypes = {
	reports: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired
	}))
};

function select(state) {
	const reports = state.reports;
	return {
		reports: reports.toArray()
	};
}

export default connect(select)(Search);
