## The logging system for Blockchaintech

###Log Level  
```js 
{
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
}
```

### How to use
```
tracer.<log level>(message, {Object});
```
Example

```js
import tracer from '@blockchaintech/tracer'

tracer.info('info message', { info: 'some information' });
```

The log should be 

```js
{"level":"info","timestamp":"2018-06-04T01:15:07.440Z","message":"info message","info":"some information"}
```