const { PROJECT, APP_NAME, ENVIRONMENT } = process.env;

const extraLogGroup = ['staging', 'production'];

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

class Formatter {
  constructor(maskHelper) {
    this.maskHelper = maskHelper;
  }

  format(message, obj) {
    const logObj = { datetime: (new Date()).toISOString() };
    if (extraLogGroup.includes(ENVIRONMENT)) {
      Object.assign(logObj, {
        project: PROJECT,
        application: APP_NAME,
        environment: ENVIRONMENT,
      });
    }

    Object.assign(logObj, { message }, Formatter.flatten(this.maskHelper.mask(obj)));
    return logObj;
  }

  static flatten(obj) {
    const cloneObj = JSON.parse(JSON.stringify(obj));
    Object.keys(cloneObj).forEach((key) => {
      const value = cloneObj[key];
      if (!isString(value)) {
        cloneObj[key] = JSON.stringify(value);
      }
    });
    return cloneObj;
  }
}

export default Formatter;
