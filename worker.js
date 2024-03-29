const babel = require("@babel/core");
const Uglify = require('uglify-js');

module.exports = function (input, data, output, opts) {
	let code = babel.transform(
		data.replace(/# sourceMappingURL=.+$/gm, ""),
		Object.assign({}, opts.babel, {	filename: input })
	).code;
	if (opts.iife) {
		code = '(function() {\n' + code + '\n})();\n';
	}
	const result = {};
	if (opts.minify !== false) {
		const ugl = Uglify.minify({
			[input]: code
		}, {
			webkit: true
		});
		if (ugl.error) throw(ugl.error);
		result.data = ugl.code;
	} else {
		result.data = code;
	}
	return result;
};

