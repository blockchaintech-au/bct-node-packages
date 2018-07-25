import tracer from '../src/tracer';

describe('Masker', () => {
  test('should mask masked sensitive information', () => {
    tracer.error('error', {
      email: 'hui.shu@gmail.com',
      password: 'huishu',
    });
    tracer.strategy = {};
    tracer.info('huishu', {
      password: 'asdasdad',
      shu: 2,
    });
  });
});
