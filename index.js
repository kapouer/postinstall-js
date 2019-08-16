const presetEnv = require.resolve('@babel/preset-env');
const presetMinify = require.resolve('babel-preset-minify');

const pify = require('util').promisify;
const fs = {
	readFile: pify(require('fs').readFile),
	writeFile: pify(require('fs').writeFile),
	stat: pify(require('fs').stat)
};
const Path = require('path');

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
				modules: opts.modules
			}]
		],
		plugins: [],
		sourceMaps: false,
		compact: false
	};

	if (opts.minify !== false) {
		babelOpts.presets.push([presetMinify, {
			builtIns: false // https://github.com/babel/minify/issues/904
		}]);
		babelOpts.comments = false;
	}
	if (opts.comments !== undefined) babelOpts.comments = opts.comments;

	return Promise.all(inputs.map(function(input) {
		return worker.call(input, opts, babelOpts);
	})).then(function(strs) {
		return fs.writeFile(output, strs.join('\n'));
	});
};

