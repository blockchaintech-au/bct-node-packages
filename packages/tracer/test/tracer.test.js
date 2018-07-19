import format from '../src/format';

const MESSAGE = Symbol.for('message');

describe('Log format', () => {
  test('should return json format log', () => {
    const formatter = format();
    const log = formatter.transform({
      level: 'info',
      message: 'information',
    }, formatter.options);
    const infoLog = JSON.parse(log[MESSAGE]);
    expect(infoLog.level).toEqual('info');
    expect(infoLog.message).toEqual('information');
  });

  test('should return masked format log', () => {
    const formatter = format();
    const log = formatter.transform({
      level: 'info',
      message: 'information',
      request: {
        password: 'password',
        user: {
          password: 'pass',
        },
        users: [{
          password: '1',
        }, {
          password: '2',
        }],
      },
    }, formatter.options);
    const infoLog = JSON.parse(log[MESSAGE]);
    expect(infoLog.level).toEqual('info');
    expect(infoLog.request).toEqual({
      password: '********',
      user: {
        password: '****',
      },
      users: [{
        password: '*',
      }, {
        password: '*',
      }],
    });
  });
});
