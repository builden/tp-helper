# tp-helper
tp-helper based TexturePacker

## How to use
```js
var tp = require('tp');
var opts = {
  maxSize: 2048,  // spritesheet最大尺寸[1024]
  scale: 1 // 缩放 [1] , 0 - 1
};
tp.create(srcDir, destDir, opts, function(err, code) {
});
```

## Installation
```sh
npm install --save tp-helper
```

## Tests
```sh
npm install
npm test
```