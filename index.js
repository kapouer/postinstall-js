const presetEnv = require.resolve('@babel/preset-env');
const presetMinify = require.resolve('babel-preset-minify');

const pify = require('util').promisify;
const fs = require('fs');
const readFile = pify(fs.readFile);
const writeFile = pify(fs.writeFile);
const Path = require('path');
const crypto = require('crypto');

const WorkerNodes = require('worker-nodes');

const worker = new WorkerNodes(Path.join(__dirname, 'worker.js'), {
	taskTimeout: 60 * 1000
});

process.on('exit', function() {
	worker.terminate();
});

module.exports = function(inputs, output, options) {
	if (inputs.length == 0) return Promise.resolve();
	var opts = Object.assign({
		modules: false
	}, options);

	var babelOpts = {
		presets: [
			[presetEnv, {
				modules: opts.modules,
				targets: {
					browsers: opts.browsers || ["> 0.2%", "last 1 version", "not dead"]
				}
			}]
		],
		plugins: [],
		sourceMaps: false,
		compact: false
	};

	if (opts.minify !== false) {
		babelOpts.presets.push([presetMinify]);
		babelOpts.comments = false;
	}

	return Promise.all(inputs.map(function(input) {
		return readTransformed(input, opts.cacheDir, function(input) {
			return readFile(input).then(function(buf) {
				return worker.call(buf, babelOpts);
			});
		});
	})).then(function(strs) {
		return writeFile(output, strs.join('\n'));
	});
};


function readTransformed(filePath, cacheDir, operation) {
	if (!cacheDir) return operation(filePath);
	var hash = crypto.createHash('sha256').update(filePath).digest('hex');
	var ext = Path.extname(filePath) || '.bin';
	var cachePath = Path.join(cacheDir, hash + ext);
	return readFile(cachePath).then(function(buf) {
		return buf.toString();
	}).catch(function(err) {
		// no cached file
		return operation(filePath).then(function(buf) {
			return writeFile(cachePath, buf).then(function() {
				return buf;
			});
		});
	});
}
