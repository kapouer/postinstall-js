postinstall-js
==============

This is a [postinstall](http://github.com/kapouer/postintall) command plugin.

It runs `babel-preset-env` and `uglify-js` on inputs, resulting in a bundled output.

Modules
-------

To process files that are already commonjs modules, pass postinstall option:
```
{ modules: false }
```

To add support for class-extending native HTMLElement, Array, Error, pass
postinstall option:
```
{builtinClasses: true}
```

`builtinClasses` can also be an array of class names (strings).

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


Usage
-----

The plugin can be called directly, or through `postinstall`.

