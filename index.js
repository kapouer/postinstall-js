const Cache = require('postinstall-cache');
const presetEnv = require.resolve('@babel/preset-env');
// const runtimePlugin = require.resolve('@babel/plugin-transform-runtime');
// const regeneratorRuntime = require.resolve('regenerator-runtime/runtime.js');

const cacheWorker = Cache.worker({
	dirname: __dirname
});

module.exports = function(inputs, output, options) {
	var opts = Object.assign({
		modules: false
	}, options);

	opts.babel = {
		presets: [
			[presetEnv, {
				modules: opts.modules,
				exclude: ["@babel/plugin-transform-typeof-symbol"]
			}]
		],
		// plugins: [
			// [ runtimePlugin, {
			// 	helpers: true,
			// 	regenerator: false
			// }]
		// ],
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

