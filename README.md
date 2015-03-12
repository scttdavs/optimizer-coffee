optimizer-coffee
==============

This Node.js module is a plugin for the [RaptorJS Optimizer](https://github.com/raptorjs/optimizer), that provides support to precompile [Coffee Script](https://github.com/jashkenas/coffeescript) files with the `.coffee` extension into JavaScript.

## Install

```sh
$ npm install --save optimizer-coffee
```


## Usage

In your dependencies list in `optimizer.json`, just go ahead and list all your source .coffee files
```js
[
    "main.coffee",
    "about.coffee"
    ...
]
```
And add `optimizer-coffee` as the required plugin in `optimizer-config.json`

```js
{
	"plugins": [
	    "optimizer-coffee"
	    ...
	],
	...
}
```
