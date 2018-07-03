import _ from 'lodash';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 20000,
};

function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  ['url', 'method', 'params', 'data', 'baseURL', 'responseType'].forEach((prop) => {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  ['headers', 'auth', 'proxy'].forEach((prop) => {
    const obj1 = typeof config1[prop] !== 'undefined' ? config1[prop] : {};
    const obj2 = typeof config2[prop] !== 'undefined' ? config2[prop] : {};
    if (!_.isEmpty(obj1) || !_.isEmpty(obj2)) {
      config[prop] = Object.assign(obj1, obj2);
    }
  });

  return config;
}

export {
  defaultConfig,
  mergeConfig,
};
