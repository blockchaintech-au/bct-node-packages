import Formatter from '../src/helpers/formatter';
import Masker from '../src/helpers/masker';

describe('Formatter', () => {
  test('Should return formatted log', () => {
    const rawLogObj = {
      user: {
        email: 'test@block.com',
        name: 'ico',
      },
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
      user: {
        email: 'test@block.com',
        name: 'ico',
      },
    });
  });
});
