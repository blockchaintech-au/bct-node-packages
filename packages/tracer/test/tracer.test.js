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
          email: 'csf-123@blockchaintech.net.au',
          userEmail: 'csf-123@blockchaintech.net.au',
          password: 'pass',
          currentPassword: 'pass',
          newPassword: 'pass',
          account_number: '123456',
          token: '1234567890',
          otp: '12345',
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
        email: 'csf****@blockchaintech.net.au',
        userEmail: 'csf****@blockchaintech.net.au',
        password: '****',
        currentPassword: '****',
        newPassword: '****',
        account_number: '******',
        token: '**********',
        otp: '*****',
      },
      users: [{
        password: '*',
      }, {
        password: '*',
      }],
    });
  });
});
