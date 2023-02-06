const Cache = require('postinstall-cache');
const presetEnv = require.resolve('@babel/preset-env');

const cacheWorker = Cache.worker({
	dirname: __dirname
});

module.exports = function(inputs, output, options) {
	const opts = Object.assign({
		modules: false,
		iife: true
	}, options);

	const presetOpts = Object.assign({
		modules: opts.modules,
		exclude: ["@babel/plugin-transform-typeof-symbol"],
		targets: opts.browsers
	}, options.presetEnv);

	opts.babel = {
		presets: [
			[presetEnv, presetOpts]
		],
		sourceMaps: false,
		compact: false
	};

	if (opts.minify !== false) {
		opts.babel.comments = false;
	}
	if (opts.comments !== undefined) opts.babel.comments = opts.comments;

	return cacheWorker(inputs, output, opts);
};

