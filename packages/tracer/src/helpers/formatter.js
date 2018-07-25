const { PROJECT, APP_NAME, ENVIRONMENT } = process.env;

const extraLogGroup = ['staging', 'production'];

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
    Object.assign(logObj, { message }, this.maskHelper.mask(obj));
    return logObj;
  }
}

export default Formatter;
