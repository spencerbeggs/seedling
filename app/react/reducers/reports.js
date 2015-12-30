import { Map, List } from "immutable";
import { FETCH_REPORTS, FILTER_REPORTS } from "../actions/reports";
import _ from "lodash";

const initialState = Map({
	items: List(),
	visibleItems: List(),
	search: {
		active: false,
		keywords: [],
		departments: [],
		sources: [],
		tables: [],
		fields: [],
		order: "DESC",
		sort: "ABC"
	},
	suggestions: {
		departments: [],
		sources: [],
		tables: [],
		fields: []
	}
});

export default function reports(state = initialState, action) {
	switch (action.type) {
		case FETCH_REPORTS:
			return state.withMutations(map => {
				var search = map.get("search");
				var items = List(action.payload).sort((a, b) => {
					var key;

					if (search.sort === "ADDED") {
						key = "added";
					} else if (search.sort === "MODIFIED") {
						key = "modified";
					} else if (search.sort === "ABC") {
						key = "title";
					}

					if (a[key] > b[key]) {
						return search.order === "ASC" ? -1 : 1;
					} else if (a[key] < b[key]) {
						return search.order === "ASC" ? 1 : -1;
					} else {
						return 0;
					}
				});
				map.set("items", items);
				map.set("visibleItems", items);
				var suggestions = {
					departments: [],
					sources: [],
					tables: [],
					fields: []
				};
				items.forEach(item => {
					suggestions.departments = suggestions.departments.concat(item.departments);
					suggestions.sources = suggestions.sources.concat(item.sources);
					suggestions.tables = suggestions.tables.concat(item.tables);
					suggestions.fields = suggestions.fields.concat(item.fields);
				});
				suggestions.departments = _.uniq(suggestions.departments).sort();
				suggestions.sources = _.uniq(suggestions.sources).sort();
				suggestions.tables = _.uniq(suggestions.tables).sort();
				suggestions.fields = _.uniq(suggestions.fields).sort();
				map.set("suggestions", suggestions);
			});
		case FILTER_REPORTS:
			return state.withMutations(map => {
				var search = map.get("search");

				if (!search.active) {
					search.active = true;
				}

				Object.assign(search, action.payload);
				var visibleItems = map.get("items").filter(report => {
					if (search.keywords.length > 0) {
						var matchedKeywords = false;
						search.keywords.forEach(function (keyword) {
							if (!matchedKeywords) {
								matchedKeywords = report.title.split(" ").some(word => word.toLowerCase().includes(keyword.toLowerCase()));

								if (!matchedKeywords) {
									matchedKeywords = report.description.split(" ").some(word => word.toLowerCase().includes(keyword.toLowerCase()));
								}
							}
						});

						return matchedKeywords;
					} else {
						return true;
					}
				}).filter(report => {
					if (search.departments.length > 0) {
						return search.departments.some(department => _.includes(report.departments, department));
					} else {
						return true;
					}
				}).filter(report => {
					if (search.sources.length > 0) {
						return search.sources.some(source => _.includes(report.sources, source));
					} else {
						return true;
					}
				}).filter(report => {
					if (search.tables.length > 0) {
						return search.tables.some(table => _.includes(report.tables, table));
					} else {
						return true;
					}
				}).filter(report => {
					if (search.fields.length > 0) {
						return search.fields.some(field => _.includes(report.fields, field));
					} else {
						return true;
					}
				});
				visibleItems = visibleItems.sort((a, b) => {
					var key;

					if (search.sort === "ADDED") {
						key = "added";
					} else if (search.sort === "MODIFIED") {
						key = "modified";
					} else if (search.sort === "ABC") {
						key = "title";
					}

					if (a[key] > b[key]) {
						return search.order === "ASC" ? -1 : 1;
					} else if (a[key] < b[key]) {
						return search.order === "ASC" ? 1 : -1;
					} else {
						return 0;
					}
				});
				var suggestions = {
					departments: [],
					sources: [],
					tables: [],
					fields: []
				};
				visibleItems.toArray().forEach(item => {
					suggestions.departments = suggestions.departments.concat(item.departments);
					suggestions.sources = suggestions.sources.concat(item.sources);
					suggestions.tables = suggestions.tables.concat(item.tables);
					suggestions.fields = suggestions.fields.concat(item.fields);
				});
				suggestions.departments = _.difference(_.uniq(suggestions.departments), search.departments).sort();
				suggestions.sources = _.difference(_.uniq(suggestions.sources), search.sources).sort();
				suggestions.tables = _.difference(_.uniq(suggestions.tables), search.tables).sort();
				suggestions.fields = _.difference(_.uniq(suggestions.fields), search.fields).sort();
				map.set("suggestions", suggestions);
				map.set("visibleItems", visibleItems);
				map.set("search", search);
			});

		default:
			return state;
	}
}
