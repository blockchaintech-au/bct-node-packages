import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const {
  PROJECT_NAME,
  APPLICATION_NAME,
  NODE_ENV,
  LOGGER_LEVEL,
} = process.env;


const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});


const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      silent: NODE_ENV === 'test',
      level: LOGGER_LEVEL || 'debug',
    }),
  ],
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
  ),
});

logger.debug('debug');
logger.info('info');
logger.warning('warning');
logger.error('error');
