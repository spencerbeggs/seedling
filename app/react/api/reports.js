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
		"Staff Member"
	];
	let second = [
		"Needed for",
		"Available to",
		"Required to",
		"Wanted to",
		"Open for",
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
	let range = [1, 2, 3, 4, 5, 6];
	return {
		title: _.sample(first) + " " + _.sample(second) + " " + _.sample(third),
		url: "http://google.com",
		enrollment: "http://yahoo.com",
		description: "This report gives a list of Courses with their Titles, College, Course Number, with Location (Bldg/Room), Section Number, Meeting days and times, Instructors Names, Course Credit Hours, Max Enrollment, Number of Enrolled students and Available enrollments. It is mainly used to check the Status of a course enrollment and availability, where it is being held (Location); total number of seats seats used and seats available.",
		category: _.sample(["Marketing", "Faculty", "Operations", "Administration", "Analytics", "Board"]),
		parameters: _.sample(words, _.sample(range)),
		fields: _.sample(words, _.sample(range)),
		sources: _.sample(words, _.sample(range)),
		sql: "html",
		info: "html"
	};
}

var day = 86400000;
var range = [day, day * 13, day * 40, day * 180];
var time = 1418164963;

for (let i = 0; i < 200; i++) {
	var item = makeIt();
	item.added = time;
	item.modified = time + _.sample(range);
	time += day;
	REPORTS.push(item);
}

export default {

	get () {
		return REPORTS;
		// return new Promise(function (resolve, reject) {
		// 	resolve(REPORTS);
		// });
	}
};
