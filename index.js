const browserify = require('browserify');
const exorcist = require('exorcist');
const promisePipe = require('promisepipe');
const fs = require('fs');

module.exports = function(inputs, output, options) {
	var opts = Object.assign({}, options, {debug: true});
	var tr = browserify(opts)
	.add(inputs)
	.transform('bubleify', {})
	.transform('uglifyify', {})
	.bundle()
	.pipe(exorcist(`${output}.map`))
	.pipe(fs.createWriteStream(output));

	return promisePipe(tr);
};

