const { bundle, minify } = require("@swc/core");
const { basename, dirname } = require('node:path');
const { promises: fs } = require('node:fs');

module.exports = async function (inputs, output, options) {
	const opts = {
		jsc: {
			parser: {
				syntax: "ecmascript"
			}
		},
		env: {
			targets: options.browsers,
			bugfixes: true
		}
	};
	if (options.minify !== false) {
		opts.minify = true;
		opts.jsc.minify = {
			compress: true,
			mangle: true,
			format: {
				comments: false
			}
		};
	} else {
		opts.jsc.keepClassNames = true;
	}

	const ret = await bundle({
		sourceMaps: false,
		options: opts,
		target: 'browser',
		output: {
			path: dirname(output),
			name: basename(output)
		},
		entry: Object.fromEntries(inputs.map(input => [input, input]))
	});

	let code = inputs.map(input => `(function() {${ret[input].code}})();`).join('\n');
	if (opts.minify) {
		code = (await minify(code, opts.jsc.minify)).code;
	}
	await fs.writeFile(output, code);
};
