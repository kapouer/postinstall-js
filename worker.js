const transpiler = require("@swc/core");

module.exports = function(input, data, output, opts) {
	const transpilerOpts = Object.assign({}, opts.transpiler, {
		filename: input
	});
	return transpiler.transform(
		data,
		transpilerOpts
	).then(function ({ code }) {
		return {
			data: code + "\n"
		};
	});
};

