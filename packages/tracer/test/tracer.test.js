import tracer from '../src/tracer';
import format from '../src/format';

process.env['NODE_ENV'] = 'production';
process.env['PROJECT_NAME'] = 'BCT';
process.env['APPLICATION_NAME'] = 'Tracer';
process.env['LOGGER_LEVEL'] = 'debug';

tracer.debug('debug', {shu: 'hui'});
tracer.info('info', {project: 'csf'});
tracer.warning('warning');
tracer.error('error');
