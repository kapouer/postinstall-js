const babel = require("@babel/core");

module.exports = function(buf, opts) {
	var code = buf.toString().replace(/# sourceMappingURL\=.+$/gm, "");
	return '(function() {\n' + babel.transform(code, opts).code + '\n})();\n';
};

