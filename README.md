# Vue on resize

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/SparingSoftware/vue-on-resize/blob/master/LICENSE)
[![Downloads number](https://img.shields.io/npm/dt/@sparing-software/vue-on-resize.svg)](https://www.npmjs.com/package/@sparing-software/vue-on-resize)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Vue plugin for resize handlers. 

Reduce your old code:
```js
mounted() {
  const resizeHandler = e => {
    // handler code
  }
  resizeHandler()
  
  const debouncedHandler = debounce(resizeHandler, 250)
  window.addEventListener('resize', debouncedHandler)
  this.$once('hook:beforeDestroy', () => {
    window.removeEventListener('resize', debouncedHandler)
  })
}
```
to simple:
```js
mounted() {
  this.$onResize(width => {
    // ... handler code
  }).fire()
}
```

## Installation
Install package in your project 
```bash
$ npm install @sparing-software/vue-on-resize
```

## Configuration
```js
import Vue from 'vue'
import VueOnResize from '@sparing-software/vue-on-resize'

Vue.use(VueOnResize)
```

## Examples
Simple usage:
```js
mounted() {
  this.$onResize(width => {
    // ... handler code
  })
}
```

Immediately execute callback:
```js
mounted() {
  this.$onResize(width => {
    // ... handler code
  }).fire()
}
```

Programmatically execute callback:
```js
mounted() {
  const resizeHandler = this.$onResize(width => {
     // ... handler code
  }).fire()

  resizeHandler.fire()
}
```

Custom debounce time (default 250ms):
```js
mounted() {
  this.$onResize(width => {
    // ... handler code
  }, 100)
}
```

Get more info about resize event:
```js
mounted() {
  this.$onResize((windowWidth, windowHeight, event) => {
    // ... handler code
  })
}
```

## Contributing
Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License
MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
