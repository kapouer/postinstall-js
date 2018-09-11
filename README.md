postinstall-js
==============

This is a [postinstall](http://github.com/kapouer/postinstall) command plugin.

It runs `babel-preset-env` and `babel-preset-minify` on inputs, and concatenate
them on output.

To transform inputs using browserify, please check
[postinstall-browserify](http://github.com/kapouer/postinstall-browserify).


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


comments
--------

By default, when `minify` is active, babel `comments` option is set to false.


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

Support for source maps is not available and will be added eventually.

