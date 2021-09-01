const transpiler = require("@swc/core");
const fs = require('fs').promises;

module.exports = function (inputs, output, options) {
	const opts = {
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
		opts.minify = true;
		opts.jsc.minify = {
			compress: true,
			mangle: true
		};
	}
	return Promise.all(inputs.map(input => fs.readFile(input))).then(datas => {
		const beg = '(function() {\n';
		const end = '\n})();';
		const list = [];
		for (const buf of datas) {
			list.push(beg, buf, end);
		}
		const buf = list.join('\n');
		return transpiler.transform(buf, opts).then(function ({ code }) {
			return fs.writeFile(output, code);
		});
	});
};
