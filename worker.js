const babel = require("@babel/core");
const pify = require('util').promisify;
const fs = {
	readFile: pify(require('fs').readFile),
	writeFile: pify(require('fs').writeFile),
	stat: pify(require('fs').stat)
};
const Path = require('path');
const crypto = require('crypto');

module.exports = readTransformed;

function readTransformed(filePath, opts, babelOpts) {
	if (!opts.cacheDir) return doTransform(filePath, babelOpts);
	var hash = crypto.createHash('sha256').update(filePath + JSON.stringify(opts)).digest('hex');
	var ext = Path.extname(filePath) || '.bin';
	var cachePath = Path.join(opts.cacheDir, hash + ext);
	return Promise.all([
		fs.stat(filePath),
		fs.stat(cachePath).catch(function(err) {})
	]).then(function(stats) {
		if (!stats[1] || stats[1].mtimeMs < stats[0].mtimeMs) {
			return doTransform(filePath, babelOpts).then(function(buf) {
				return fs.writeFile(cachePath, buf).then(function() {
					return buf;
				});
			});
		} else {
			return fs.readFile(cachePath).then(function(buf) {
				return buf.toString();
			});
		}
	});
}

function doTransform(filePath, opts) {
	return fs.readFile(filePath).then(function(buf) {
		var code = buf.toString().replace(/# sourceMappingURL\=.+$/gm, "");
		return '(function() {\n' + babel.transform(code, opts).code + '\n})();\n';
	});
}
