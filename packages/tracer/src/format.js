import winston from 'winston';
import MaskHelper from './maskHelper';

const filter = {
  password: /.*/,
};


const maskHelper = new MaskHelper(filter);

const MESSAGE = Symbol.for('message');

const {
  PROJECT,
  APP_NAME,
  ENVIRONMENT,
} = process.env;

const extraLogGroup = ['staging', 'production'];

const format = winston.format((info) => {
  const { level, message, ...obj } = info;
  let messageObj = {
    level,
    datetime: (new Date()).toISOString(),
  };
  if (extraLogGroup.includes(ENVIRONMENT)) {
    messageObj = {
      ...messageObj,
      project: PROJECT,
      application: APP_NAME,
      environment: ENVIRONMENT,
    };
  }
  const maskedObj = maskHelper.mask(obj);
  messageObj = {
    ...messageObj,
    message,
    ...maskedObj,
  };

  const formattedInfo = { ...info };
  formattedInfo[MESSAGE] = JSON.stringify(messageObj);
  return formattedInfo;
});

export default format;
