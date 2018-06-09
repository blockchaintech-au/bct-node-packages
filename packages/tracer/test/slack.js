/* eslint import/first: 0 */
import tracer from '../src/tracer';

tracer.error('test error slack', {
  req: 'http://localhost',
  res: {
    status: 200,
    data: 'success',
  },
});
tracer.info('test info slack');
