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
{"level":"info","datetime":"2018-06-17T03:12:52.518Z","project":"csf","application":"tracer","environment":"production","message":"info message","info":"some information"}
```

## Mask sensitive information

Tracer can mask sensentive infomation to avoid customer information leak by logs. The rules is defined by Regex

### Default Rules

```js
{
  password: /.*/,
  currentPassword: /.*/,
  newPassword: /.*/,
  account_number: /.*/,
  token: /.*/,
  otp: /.*/,
  email: /.{1,4}?(?=@)/,
  userEmail: /.{1,4}?(?=@)/,
};

```

### How to customize rules

Set your own rules when initialize your app

```js
tracer.strategy = {
  password: /.*/,
  bank_info: /.*/,
}
```