postinstall-js
==============

This is a [postinstall](http://github.com/kapouer/postintall) command plugin.

It runs `babel-preset-env` and `uglify-js` on inputs, resulting in a bundled output.

Usage
-----

The plugin can be called directly, or through `postinstall`.

Directly:
```
require('postinstall-js')(inputs, output, options).then(function() {
	// done
});
```

Options
=======

minify
------

Pass `minify: false` to disable minification.


modules
-------

When processing files that are already commonjs modules, pass `modules: false`.
To process files that are already commonjs modules, pass postinstall option:


extending native elements
-------------------------

To disable support for class-extending native HTMLElement, Array, Error, pass
`builtinClasses: false`.

`builtinClasses` can also be options given to the plugin
`babel-plugin-transform-builtin-classes`.

Note that babel 6 and babel-plugin-transform-builtin-classes only support this
type of constructor overriding:

```
class HTMLMyCustomElement extends HTMLElement {
	constructor(me) {
		me = super(me);
		me.init();
		return me;
	}
	init() {}
}
```


Caveats
-------

Support for source maps is not yet available.

