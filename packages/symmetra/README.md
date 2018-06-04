## The Http Client for Blockchaintech

### Feature

1. Promise base http client
2. Set Json as default format
3. Log `request` and `response` information


### How to use

```js
import symm from '@blockchaintech/symmetra';

try {
const res = await symm.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  });
  console.log(response);
} catch (error) {
  console.log(error);
}
```

OR

```js
import symm from '@blockchaintech/symmetra';

symm.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```