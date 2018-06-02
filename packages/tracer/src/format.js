import winston from 'winston';

const MESSAGE = Symbol.for('message');
const LEVEL = Symbol.for('level');

const {
  PROJECT_NAME,
  APPLICATION_NAME,
  NODE_ENV,
} = process.env;

const extraLogGroup = ['staging', 'production'];

const format = winston.format((info) => {
  const { level, message, LEVEL, ...obj } = info;
  let formattedInfo = {
    level,
    timestamp: (new Date()).toISOString(),
  };
  if (extraLogGroup.includes(NODE_ENV)) {
    formattedInfo = {
      ...formattedInfo,
      project: PROJECT_NAME,
      applicationName: APPLICATION_NAME,
      environment: NODE_ENV,
    };
  }

  formattedInfo = {
    ...formattedInfo,
    message,
    ...obj
  };

  info[MESSAGE] = JSON.stringify(formattedInfo);
  return info;
});

export default format;
