import Formatter from '../src/helpers/formatter';
import Masker from '../src/helpers/masker';

describe('Formatter', () => {
  test('Should return formatted log', () => {
    const rawLogObj = {
      user: {
        email: 'test@block.com',
        name: 'ico',
      },
      passowrd: 'something',
    };
    const masker = new Masker({});
    const formatter = new Formatter(masker);
    const {
      datetime,
      message,
      ...obj
    } = formatter.format('test message', rawLogObj);
    expect(datetime).not.toBeNull();
    expect(message).toEqual('test message');
    expect(obj).toEqual({
      user: '{"email":"test@block.com","name":"ico"}',
      passowrd: 'something',
    });
  });

  test('Should return formatted log without rawLogObj', () => {
    const masker = new Masker({});
    const formatter = new Formatter(masker);
    const {
      datetime,
      message,
      ...obj
    } = formatter.format('test message');
    expect(datetime).not.toBeNull();
    expect(message).toEqual('test message');
    expect(obj).toEqual({});
  });
});
