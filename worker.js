const babel = require("@babel/core");
const Uglify = require('uglify-js');

module.exports = function(input, data, output, opts) {
	var code = babel.transform(
		data.replace(/# sourceMappingURL=.+$/gm, ""),
		Object.assign({}, opts.babel, {	filename: input })
	).code;
	if (opts.iife) {
		code = '(function() {\n' + code + '\n})();\n';
	}
	var result = {};
	if (opts.minify !== false) {
		var ugl = Uglify.minify({
			[input]: code
		});
		if (ugl.error) throw(ugl.error);
		result.data = ugl.code;
	} else {
		result.data = code;
	}
	return result;
};

