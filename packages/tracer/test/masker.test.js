import Masker from '../src/helpers/masker';
import defaultStrategy from '../src/mask/defaultStrategy';

describe('Masker', () => {
  test('should mask masked sensitive information', () => {
    const maskHelper = new Masker(defaultStrategy);
    const rawObj = {
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
    };
    const maskedObj = maskHelper.mask(rawObj);
    expect(maskedObj).toEqual({
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
