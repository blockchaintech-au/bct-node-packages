import tracer from '@blockchaintech/tracer';
import {
  requestLogFormatter,
  responseLogFormatter,
  errorLogFormatter,
} from './helpers/logFormatter';
import HttpError from './httpError';

function requestInterceptor(req) {
  tracer.info('Sent HTTP Request:', requestLogFormatter(req, req.logParams));
  return req;
}

function responseInterceptor(res) {
  tracer.info('Receive HTTP Response:', responseLogFormatter(res, res.config.logParams));
  if (res.config.full) return res;
  return res.data;
}

function errorInterceptor(err) {
  if (err.response && err.response.status !== 500) {
    tracer.warning('Receive HTTP Error Response:', errorLogFormatter(err, err.response.config.logParams));
  } else if (err.response) {
    tracer.error('Receive HTTP Error Response:', errorLogFormatter(err, err.response.config.logParams));
  } else {
    tracer.error('Receive HTTP Error Response:', err.message);
  }
  return Promise.reject(new HttpError(err));
}


function applyInteceptor(instance) {
  instance.interceptors.request.use(requestInterceptor);
  instance.interceptors.response.use(responseInterceptor, errorInterceptor);
}

export default applyInteceptor;
