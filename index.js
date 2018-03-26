const browserify = require('browserify');
const exorcist = require('exorcist');
const promisePipe = require('promisepipe');
const fs = require('fs');

module.exports = function(input, output, options) {
	var tr = browserify({
		debug: true
	})
	.add(input)
	.transform('bubleify', {})
	.transform('uglifyify', {})
	.bundle()
	.pipe(exorcist(`${output}.map`))
	.pipe(fs.createWriteStream(output));

	return promisePipe(tr);
};

