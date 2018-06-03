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
});
