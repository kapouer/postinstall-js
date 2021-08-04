const Cache = require('postinstall-cache');

const cacheWorker = Cache.worker({
	dirname: __dirname
});

module.exports = function (inputs, output, options) {
	const opts = Object.assign({}, options);
	opts.transpiler = {
		sourceMaps: false,
		minify: opts.minify !== false,
		jsc: {
			loose: true,
			parser: {
				syntax: "ecmascript",
				classProperty: true
			},
			transform: {
				target: "es5",
				optimizer: true
			}
		}
	};
	return cacheWorker(inputs, output, opts);
};

