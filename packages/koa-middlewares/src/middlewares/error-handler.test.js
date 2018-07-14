import errorHandler from './error-handler';

function testCallback() {
  throw new Error('test Error');
}

describe('errorHandler middleware', () => {
  test('Should catch error and set status and error message', async () => {
    const ctx = {};
    await errorHandler(ctx, testCallback);
    expect(ctx.status).toEqual(500);
    expect(ctx.body).toEqual('test Error');
  });
});
