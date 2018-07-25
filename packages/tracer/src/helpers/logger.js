import winston from 'winston';

const { NODE_ENV, LOGGER_LEVEL } = process.env;

function logger() {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        silent: NODE_ENV === 'test',
        level: LOGGER_LEVEL || 'debug',
      }),
    ],
  });
}

export default logger();
