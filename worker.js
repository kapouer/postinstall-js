const babel = require("@babel/core");
const Uglify = require('uglify-js');

module.exports = function(input, data, opts) {
	var code = data.replace(/# sourceMappingURL=.+$/gm, "");
	var str = '(function() {\n' + babel.transform(code, opts.babel).code + '\n})();\n';
	var result = {};
	if (opts.minify !== false) {
		var ugl = Uglify.minify(str);
		if (ugl.error) throw(ugl.error);
		result.data = ugl.code;
	} else {
		result.data = str;
	}
	return result;
};

