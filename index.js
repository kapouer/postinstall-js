const UglifyJS = require("uglify-js");
const babel = require("babel-core");
const presetEnv = require.resolve('babel-preset-env');
const pluginBuiltinClasses = require.resolve("babel-plugin-transform-builtin-classes");

const pify = require('util').promisify;
const fs = require('fs');
const readFile = pify(fs.readFile);
const writeFile = pify(fs.writeFile);

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
					browsers: opts.browsers || [ "last 10 versions" ]
				}
			}]
		],
		plugins: [],
		sourceMaps: false
	};

	if (options.builtinClasses !== false) {
		var builtinOpts = options.builtinClasses;
		if (builtinOpts === true) builtinOpts = {
			globals: ["Error", "Array", "HTMLElement"]
		};
		babelOpts.plugins.push([pluginBuiltinClasses, builtinOpts]);
	}

	return Promise.all(inputs.map(function(input) {
		return readFile(input);
	})).then(function(bufs) {
		var map = {};
		bufs.forEach(function(buf, i) {
			var input = inputs[i];
			var code = buf.toString().replace(/# sourceMappingURL\=.+$/gm, "");
			map[input] = babel.transform(code, babelOpts).code;
		});
		var code;
		if (opts.minify === false) {
			code = Object.values(map).join('\n');
		} else {
			var result = UglifyJS.minify(map, {
				compress: true,
				mangle: true,
				output: {
					ast: false,
					code: true
				}
			});
			if (result.error) return Promise.reject(result.error);
			code = result.code;
		}
		return writeFile(output, code);
	});
};

/* NOTE for self
to update to babel 7 (but extending builtin classes is broken is beta 42)
babel-xxx -> @babel/xxx
and babel-plugin-transform-builtin-classes -> @babel/plugin-transform-classes
*/
