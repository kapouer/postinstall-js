const browserify = require('browserify');
const promisePipe = require('promisepipe');
const fs = require('fs');

module.exports = function(input, output, options) {
	var tr = browserify(input).transform('bubleify', {
	}).transform('uglifyify', {
	})
	.bundle()
	.pipe(fs.createWriteStream(output));

	return promisePipe(tr);
};

