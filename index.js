const Cache = require('postinstall-cache');
const presetEnv = require.resolve('@babel/preset-env');
const plugins = [
	"@babel/plugin-proposal-class-properties",
	"@babel/plugin-proposal-private-methods",
	"@babel/plugin-proposal-optional-chaining"
].map((str) => require.resolve(str));
// const runtimePlugin = require.resolve('@babel/plugin-transform-runtime');
// const regeneratorRuntime = require.resolve('regenerator-runtime/runtime.js');

const cacheWorker = Cache.worker({
	dirname: __dirname
});

module.exports = function(inputs, output, options) {
	var opts = Object.assign({
		modules: false,
		iife: true
	}, options);

	var presetOpts = Object.assign({
		modules: opts.modules,
		exclude: ["@babel/plugin-transform-typeof-symbol"]
	}, options.presetEnv);

	opts.babel = {
		presets: [
			[presetEnv, presetOpts]
		],
		plugins: [
			plugins[0], plugins[1]
			// ,[ runtimePlugin, {
			// 	helpers: true,
			// 	regenerator: false
			// }]
		],
		sourceMaps: false,
		compact: false
	};

	if (opts.minify !== false) {
		opts.babel.comments = false;
	}
	if (opts.comments !== undefined) opts.babel.comments = opts.comments;
	//if (!opts.modules) inputs = [regeneratorRuntime].concat(inputs);

	return cacheWorker(inputs, output, opts);
};

