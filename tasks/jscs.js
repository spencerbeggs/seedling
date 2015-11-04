const gulp = require("gulp");
const jscs = require("gulp-jscs");

function task(options) {
	options = options || {};
	var name = options.name ? options.name : "jscs";

	if (typeof options.src === "string") {
		options.src = [options.src];
	}

	gulp.task(name, callback => {
		gulp.src(options.src)
			.pipe(jscs({
				fix: true
			}))
			.pipe(jscs.reporter());
		callback();
	});
}

module.exports = task;
