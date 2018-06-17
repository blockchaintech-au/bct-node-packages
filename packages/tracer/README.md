# The logging system for Blockchaintech

## Log Level  

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

## How to use
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
{"level":"info","timestamp":"2018-06-17T03:12:52.518Z","project":"csf","applicationName":"tracer","environment":"production","message":"info message","info":"some information"}
```

## Slack Integration

Set Slack API token and conversation id in the environment variable

```sh
export SLACK_TOKEN=XXXXXXX
export CONVERSATION_ID=XXXXXX
```
