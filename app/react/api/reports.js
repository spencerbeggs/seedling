import _ from "lodash";

const REPORTS = [];

const sql = `BEGIN;
CREATE TABLE "topic" (
	-- This is the greatest table of all time
	"id" serial NOT NULL PRIMARY KEY,
	"forum_id" integer NOT NULL,
	"subject" varchar(255) NOT NULL -- Because nobody likes an empty subject
);
ALTER TABLE "topic" ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id") REFERENCES "forum" ("id");
-- Initials
insert into "topic" ("forum_id", "subject") values (2, 'D''artagnian');
select /* comment */ count(*) from cicero_forum;
-- this line lacks ; at the end to allow people to be sloppy and omit it in one-liners
/*
but who cares?
*/
COMMIT`;

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
		description: "This is the report description.",
		departments: _.sample(["Marketing", "Faculty", "Operations", "Administration", "Analytics", "Board"], 1),
		parameters: _.sample(words, range()),
		fields: _.sample(words, range()),
		sources: _.sample(words, range()),
		tables: _.sample(words, range()),
		sql: sql,
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

	get () {
		return REPORTS;
	}
};
