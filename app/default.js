class Foo {
	constructor(name) {
		this.name = name;
	}
}

var spencer = new Foo("Bob");
console.log(spencer);

var p = new Promise(function(reject, resolve) {
	console.log("FGFFF");
});
