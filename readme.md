# remorph [![Build Status](https://travis-ci.org/dy/remorph.svg?branch=master)](https://travis-ci.org/dy/remorph) [![unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)](http://github.com/badges/stability-badges)

React/preact-based DOM morpher with [nanomorph](https://github.com/choojs/nanomorph)/[morphdom](https://ghub.io/morphdom)-compatible API.

[![NPM](https://nodei.co/npm/@dy/remorph.png?mini=true)](https://nodei.co/npm/@dy/remorph/)

```js
import morph from 'remorph'

var el = document.createElement('div')
el.innerHTML = 'hello people'

el = morph(el, <div>nanananana-na-no</div>)
// <div>nanananana-na-no</div>

el = morph(el, <div>teeny, tiny, tin bottle</div>)
// <div>teeny, tiny, tin bottle</div>
```

_Remorph_ can morph both to JSX or raw HTML. It works with react by default, preact can be used via `preact/compat` or directly as:

```js
import morph from 'remorph/preact'

let result = morph(fromElement, toElementOrJSX)
```

## See also

* [enhook](https://ghub.io/enhook) - enable react/preact/etc hooks for any function.
* [spect](https://ghub.io/spect) - reactive aspect-oriented UI framework.
<!-- * [jquery-react](https://ghub.io/jquery-react) - connect react to jquery with ease. -->


## License

MIT

<p align="right">HK</p>
