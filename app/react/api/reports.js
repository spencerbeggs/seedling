import _ from "lodash";

const REPORTS = [];

function makeIt() {
	let words = [
		"Aardvark", "Aardwolf",
		"Backflip", "Backflow",
		"Cusps", "Croon",
		"Divested", "Dornocks",
		"Emeritas", "Encloser",
		"Facemask", "Feminise",
		"Gashouse", "Gildings",
		"Hacksaws", "Halfback",
		"Illegals", "Imaginer",
		"Jackaroo", "Joyously",
		"Kainites", "Killjoys",
		"Lackaday", "Legendry",
		"Madwoman", "Medalist",
		"Natation", "Nepotist",
		"Obituary", "Occupier",
		"Painters", "Pedantry",
		"Quackery", "Quashers",
		"Rabidity", "Rebutton",
		"Sardonic", "Scaffold",
		"Talookas", "Testoons",
		"Ultrahip", "Uncaging",
		"Valerian", "Varmints",
		"Wakerife", "Watchdog",
		"Xanthous", "Xylotomy",
		"Yearling", "Yielding",
		"Zoonosis", "Zibeline",
		"Aconitic", "Aconitum",
		"Binary", "Binate",
		"Crag", "Cure",
		"Deciders", "Degrader",
		"Ensiling", "Exclaves",
		"Fireable", "Flangers",
		"Globbier", "Goitrous",
		"Harpings", "Hibiscus",
		"Inchworm", "Inaction",
		"Juiciest", "Jigsawed",
		"Keycards", "Knitters",
		"Licenser", "Localist",
		"Milkiest", "Misstamp",
		"Nitpicky", "Nonsolar",
		"Operands", "Outdated",
		"Peroxide", "Pillowed",
		"Quinsies", "Quotable",
		"Riots", "Rugby",
		"Sciatics", "Snowfall",
		"Thrawing", "Tollgate",
		"Urgently", "Utilizes",
		"Vanadium", "Vexillar",
		"Wheelers", "Whiskeys",
		"Xeric", "Xenia",
		"Yataghan", "Yuletide",
		"Zoophile", "Zillions"
	];
	let first = [
		"Faculty",
		"Students",
		"Atheletes",
		"Classrooms",
		"Buildings",
		"Administrators",
		"Staff Member",
		"People",
		"Animals",
		"Siblings"
	];
	let second = [
		"Needed for",
		"Available to",
		"Required to",
		"Wanted to",
		"Open for",
		"That Can",
		"Will Fail",
		"Are Passing",
		"Won't Do",
		"Allowed to",
		"Disallowed from",
		"Not Required to"
	];
	let third = [
		"Enrollment",
		"Access Library",
		"Eat at Cafeteria",
		"Run Reports",
		"Submit Invoices",
		"Return Items",
		"Practice",
		"Enter Campus",
		"Exit Campus",
		"Turn on Computers",
		"Operate Lights",
		"Drive Cars",
		"Remove Equipment",
		"Approve Waitlist",
		"Create Class"
	];
	function range() {
		return _.sample([1, 2, 3, 4, 5, 6]);
	}

	return {
		title: _.sample(first) + " " + _.sample(second) + " " + _.sample(third),
		url: "http://google.com",
		enrollment: "http://yahoo.com",
		description: "This report gives a list of Courses with their Titles, College, Course Number, with Location (Bldg/Room), Section Number, Meeting days and times, Instructors Names, Course Credit Hours, Max Enrollment, Number of Enrolled students and Available enrollments. It is mainly used to check the Status of a course enrollment and availability, where it is being held (Location); total number of seats seats used and seats available.",
		categories: [_.sample(["Marketing", "Faculty", "Operations", "Administration", "Analytics", "Board"])],
		parameters: _.sample(words, range()),
		fields: _.sample(words, range()),
		sources: _.sample(words, range()),
		tables: _.sample(words, range()),
		sql: "html",
		info: "html"
	};
}

var day = 86400000;
var range = [day, day * 13, day * 40, day * 180];
var time = 1418164963;

for (let i = 0; i < 100; i++) {
	var item = makeIt();
	item.added = time;
	item.modified = time + _.sample(range);
	time += day;
	REPORTS.push(item);
}

export default {

	get (filters = {}) {
		var collection = [];

		if (!filters.keyword && filters.categories.length === 0 && filters.fields.length === 0 && filters.sources.length === 0 && filters.tables.length === 0) {
			collection = REPORTS;
		}

		REPORTS.forEach(function (report) {
			var matchedKeyword = false;
			var matchedCategory = false;
			var matchedField = false;
			var matchedSource = false;
			var matchedTable = false;

			if (filters.keyword !== null) {
				let exp = new RegExp(filters.keyword.toLowerCase().trim());
				matchedKeyword = exp.test(report.title.toLowerCase());
			}

			filters.categories.forEach(function (category) {

				if (_.includes(report.categories, category)) {
					matchedCategory = true;
				}
			});

			filters.fields.forEach(function (field) {
				if (_.includes(report.fields, field)) {
					matchedField = true;
				}
			});

			filters.sources.forEach(function (source) {
				if (_.includes(report.sources, source)) {
					matchedSource = true;
				}
			});

			filters.tables.forEach(function (table) {
				if (_.includes(report.tables, table)) {
					matchedTable = true;
				}
			});

			if (matchedKeyword || matchedCategory || matchedField || matchedSource || matchedTable) {
				collection.push(report);
			}
		});

		return collection;
	}
};
