import authorize from './authorize';

let callbackTag = false;
function testCallback() {
  callbackTag = true;
}

beforeEach(() => {
  callbackTag = false;
});

describe('authorize middleware', () => {
  test('Have user in ctx, should go to next', async () => {
    const ctx = { user: 'user' };
    await authorize(ctx, testCallback);
    expect(callbackTag).toEqual(true);
  });

  test('Dont have user in ctx, should throw error', async () => {
    const ctx = { };
    try {
      await authorize(ctx, testCallback);
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(callbackTag).toEqual(false);
    }
  });
});
