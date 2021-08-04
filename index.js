const Cache = require('postinstall-cache');

const cacheWorker = Cache.worker({
	dirname: __dirname
});

module.exports = function (inputs, output, options) {
	const opts = Object.assign({}, options);
	opts.transpiler = {
		sourceMaps: false,
		jsc: {
			loose: true,
			parser: {
				syntax: "ecmascript",
				classPrivateProperty: true
			},
			target: "es3"
		}
	};
	if (opts.minify !== false) {
		opts.transpiler.minify = true;
		opts.transpiler.jsc.minify = {
			compress: true,
			mangle: true
		};
	}
	return cacheWorker(inputs, output, opts);
};

