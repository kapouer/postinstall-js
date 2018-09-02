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

browsers
--------

The default setting:
```
browsers: ["> 0.2%", "last 1 version", "not dead"]
```

minify
------

Pass `minify: false` to disable minification.


modules
-------

By default `modules: false` is passed to babel-preset-env.


cacheDir
--------

A path to a cache directory must be set to enable cache.


extending native elements
-------------------------

Note that babel 7 and @babel/plugin-transform-classes only support this
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

