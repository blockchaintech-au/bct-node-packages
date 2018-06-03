import winston from 'winston';

const MESSAGE = Symbol.for('message');

const {
  PROJECT_NAME,
  APPLICATION_NAME,
  NODE_ENV,
} = process.env;

const extraLogGroup = ['staging', 'production'];

const format = winston.format((info) => {
  const { level, message, ...obj } = info;
  let messageObj = {
    level,
    timestamp: (new Date()).toISOString(),
  };
  if (extraLogGroup.includes(NODE_ENV)) {
    messageObj = {
      ...messageObj,
      project: PROJECT_NAME,
      applicationName: APPLICATION_NAME,
      environment: NODE_ENV,
    };
  }

  messageObj = {
    ...messageObj,
    message,
    ...obj,
  };

  const formattedInfo = { ...info };
  formattedInfo[MESSAGE] = JSON.stringify(messageObj);
  return formattedInfo;
});

export default format;
