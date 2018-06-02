import winston from 'winston';
import format from './format';

const { NODE_ENV, LOGGER_LEVEL } = process.env;

const tracer = winston.createLogger({
  levels: winston.config.syslog.levels,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      silent: NODE_ENV === 'test',
      level: LOGGER_LEVEL || 'debug',
    }),
  ],
  format: format(),
});

export default tracer;
