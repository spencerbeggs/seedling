import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchReports, fetchCategories, filterReports, filterSearch} from "../../actions/reports";
import ReportList from "./list.jsx";
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
			active: false
		};
	}

	showSuggestions () {
		this.setState({active: true});
	}

	hideSuggestions () {
		this.setState({active: false});
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
		this.props.values.forEach(value => {
			if (value.toLowerCase() === tag.toLowerCase()) {
				added = true;
			}

			values.push(value);
		});

		if (!added) {
			values.push(tag);
		}

		let filter = {};
		filter[this.props.kind] = values;
		dispatch(filterReports(filter));
	}

	deleteTag (evt, tag) {
		const {dispatch} = this.props;
		var values = [];
		this.props.values.forEach(word => {
			if (word.toLowerCase() !== tag.toLowerCase()) {
				values.push(word);
			}
		});
		let filter = {};
		filter[this.props.kind] = values;
		dispatch(filterReports(filter));
	}

	render () {
		var items = [];
		var tags = [];

		if (this.props.suggestions) {
			this.props.suggestions.forEach((word, i) => {
				if (i < this.props.max) {
					items.push(<a style={{cursor: "pointer"}} className="dropdown-item" key={i} onClick={evt => this.addTag(evt, word)}>{word}</a>);
				}
			});
		}

		if (this.props.suggestions.length > this.props.max) {
			items.push(<div key="divider" className="dropdown-divider"></div>);
			items.push(<a key="showmore" className="dropdown-item disabled">+{this.props.suggestions.length - this.props.max} more not shown</a>);
		}

		this.props.values.forEach((value, i) => {
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
				<div className={this.state.active ? "dropdown open" : "dropdown"}>
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

	sort (sort) {
		const {dispatch} = this.props;
		let currentOrder = this.props.reports.get("search").order;
		let currentSort = this.props.reports.get("search").sort;
		if (currentSort === sort) {
			var newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
			dispatch(filterReports({
				order: newOrder
			}));
		} else {
			dispatch(filterReports({
				sort: sort
			}));
		}
	}

	order (order) {
		const {dispatch} = this.props;
		dispatch(filterReports({
			order: order
		}));
	}

	filter (evt) {
		const {dispatch} = this.props;
		dispatch(filterReports({
			keywords: this.searchbox.value.trim().split(" ")
		}));
	}

	render () {
		const {dispatch, reports} = this.props;
		let searchState = reports.get("search");
		let suggestions = reports.get("suggestions");
		var sortOrder = <div className="sort-order"><span className={searchState.order === "ASC" ? "active" : ""} onClick={this.order.bind(this, "ASC")}>▲</span><span className={searchState.order === "DESC" ? "active" : ""} onClick={this.order.bind(this, "DESC")}>▼</span></div>;
		var sortAbc = <div className="sorter"><a className={searchState.sort === "ABC" ? "selected" : ""} onClick={this.sort.bind(this, "ABC")} title="Alphabetical">Alphabetical</a>{searchState.sort === "ABC" ? sortOrder : ""}</div>;
		var sortAdded = <div className="sorter"><a className={searchState.sort === "ADDED" ? "selected" : ""} onClick={this.sort.bind(this, "ADDED")} title="Date Added">Date Added</a>{searchState.sort === "ADDED" ? sortOrder : ""}</div>;
		var sortModified = <div className="sorter"><a className={searchState.sort === "MODIFIED" ? "selected" : ""} onClick={this.sort.bind(this, "MODIFIED")} title="Date Modified">Date Modified</a>{searchState.sort === "MODIFIED" ? sortOrder : ""}</div>;
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
								kind="departments"
								placeholder="Add a department..."
								label="Filter by department"
								max={3}
								suggestions={suggestions.departments}
								values={searchState.departments}
							/>
							<Dropdown
								{...this.props}
								kind="sources"
								placeholder="Add a source..."
								label="Filter by source"
								max={7}
								suggestions={suggestions.sources}
								values={searchState.sources}
							/>
							<Dropdown
								{...this.props}
								kind="tables"
								placeholder="Add a table..."
								label="Filter by table"
								max={7}
								suggestions={suggestions.tables}
								values={searchState.tables}
							/>
							<Dropdown
								{...this.props}
								kind="fields"
								placeholder="Add a field..."
								label="Filter by field"
								max={7}
								suggestions={suggestions.fields}
								values={searchState.fields}
							/>
						</div>
						<fieldset className="sort-it col-md-8 col-md-offset-2">
							<div>Sort:</div>{sortAbc}<div>|</div>{sortAdded}<div>|</div>{sortModified}
						</fieldset>
					</form>
				</div>
				<ReportList {...this.props} />
			</div>
		);
	}
}

Search.propTypes = {
	reports: PropTypes.object
};

export default Search;
