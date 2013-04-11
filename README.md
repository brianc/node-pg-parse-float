# pg-parse-float

Restore 'parseFloat' functionailty to node-postgres.  Allowing it to return float column types as JavaScript floats.

## install

`npm install pg-parse-float`

## use

```js
var pg = require('pg');
require('pg-parse-float')(pg);

//now all your floats (float4, float8, numeric) will come back out
//as floats in JavaScript
```

## notes

There were some discussions around this:

https://github.com/brianc/node-postgres/pull/301
https://github.com/brianc/node-postgres/pull/271


## license

MIT
