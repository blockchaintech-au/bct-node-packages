import axios from 'axios';
import tracer from '@blockchaintech/tracer';
import { requestLogFormatter, responseLogFormatter, errorLogFormatter } from './logFormatter';
import HttpError from './httpError';

const symmetra = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

symmetra.interceptors.request.use((req) => {
  tracer.info('Sent HTTP Request:', requestLogFormatter(req));
  return req;
});

symmetra.interceptors.response.use((res) => {
  tracer.info('Receive HTTP Response:', responseLogFormatter(res));
  return res;
}, (err) => {
  if (err.response && err.response.status !== 500) {
    tracer.warning('Receive HTTP Error Response:', errorLogFormatter(err));
  } else {
    tracer.error('Receive HTTP Error Response:', errorLogFormatter(err));
  }
  return Promise.reject(new HttpError(err));
});

export default symmetra;
