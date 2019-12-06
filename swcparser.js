exports.parse = function(str) {
	var tree = require('@swc/core').parseSync(str.toString());
	//console.log(tree);
	return tree;
};
