exports.parse = function(str) {
	var tree = require('@swc/core').parseSync(str.toString());
	return {
		ast: tree,
		scopeManager: null,
		visitorKeys: null
	};
};
