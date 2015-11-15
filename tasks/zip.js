var gulp = require("gulp");
var pkg = require("../package.json");

/**
 * Creates a zip file
 */


function task(options) {
	options = options || {};
	var name = options.name ? options.name : "zip";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output, outputPath;
	return gulp.task(name, function() {
		var name = decamelize(pkg.name);

		// Ignore all the dev dependencies and the bin folder
		var ignoreModules = Object.keys(pkg.devDependencies);
		ignoreModules.push(".bin");

		// Map the array to a list of globbing patterns
		var ignore = ignoreModules.map(function(dep) {
			return "!node_modules/{" + dep + "," + dep + "/**}";
		});

		// Zip the code
		var toZip = [
			"./**", "!README.md",
			"!.gitignore", "!gulpfile.js",
			"!./{dist,dist/**}",
			"!./{test,test/**}"
		].concat(ignore);
		return gulp.src(toZip, {
				base: "."
			})
			.pipe(zip(name + ".zip"))
			.pipe(gulp.dest(dest));
	});
}

module.exports = task;