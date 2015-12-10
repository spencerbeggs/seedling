import {Component} from "react";

const active = (appliedFilters, attribute, value) => appliedFilters[attribute] && (appliedFilters[attribute].indexOf(value) > -1);

class Filters extends Component {

	renderOptionGroup (group) {
		const {toggleFilter, appliedFilters} = this.props;
		return group.map(item, idx => {
			const {attribute, value} = item;
			const isActive = active(appliedFilters, attribute, value);
			const style = {
				background: isActive ? "yellow" : "white"
			};
			return (
				<div key={idx} style={style} onClick={() => toggleFilter(attribute, value)}>
					{item.value}
				</div>
			);
		});
	}

	sortThem () {
		const {sortItems, applySort} = this.props;
		const handleSortChange = e => {
			if (!e.target.value) {
				return;
			}

			const idx = e.target.value;
			applySort(sortItems[idx]);
		};

		return (
			<select onChange={e => handleSortChange(e)}>
				<option value="" disabled>Sort Functions</option>
				{sortItems.map(item, idx => <option key={idx} value={idx}>{item.title}</option>)}
			</select>
		);
	}

	render () {
		const {optionGroups, clearAllFilters, reports} = this.props;
		console.log(this.props);
		const items = optionGroups.map(group, idx => {
			const {title, values} = group;
			return (
				<div key={idx}>
					<header>{title}</header>
					{this.renderOptionGroup((values))}
				</div>
			);
		});
		let sortItems = this.sortThem();
		return (
			<div className="filters">
				<h2>Sorts</h2>
				{sortItems}
				<h2>Filters</h2>
				{items}
				<h2>Clears</h2>
				<button onClick={() => clearAllFilters() }>Clear All Filters</button>
			</div>
		);
	}
}

export default Filters;
