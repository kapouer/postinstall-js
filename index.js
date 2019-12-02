const Cache = require('postinstall-cache');

const cacheWorker = Cache.worker({
	dirname: __dirname
});

module.exports = function(inputs, output, options) {
	var opts = Object.assign({}, options);
	opts.transpiler = {
		sourceMaps: false,
		minify: opts.minify !== false,
		jsc: {
			transform: {
				target: "es5"
			}
		}
	};
	return cacheWorker(inputs, output, opts);
};

