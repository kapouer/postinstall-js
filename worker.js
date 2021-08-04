const transpiler = require("@swc/core");

module.exports = function(input, data, output, opts) {
	const transpilerOpts = Object.assign({}, opts.transpiler, {
		filename: input
	});
	return transpiler.transform(
		data.replace(/# sourceMappingURL=.+$/gm, ""),
		transpilerOpts
	).then(function({code, map}) {
		code = '(function() {\n' + code + '\n})();\n';
		return {
			data: code
		};
	});
};

