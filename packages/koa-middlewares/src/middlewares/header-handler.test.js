import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRATION_TIME } from '../configs';
import headerHandler from './header-handler';

let callbackTag = false;
function testCallback() {
  callbackTag = true;
}

beforeEach(() => {
  callbackTag = false;
});

function generateToken(expiresIn) {
  const user = { email: 'email' };
  return jwt.sign(user, JWT_SECRET, { expiresIn });
}

describe('header handler middleware', () => {
  test('token invalid should return 401', async () => {
    const ctx = {
      headers: { authorization: 'invalid token' },
      cookies: {
        set: (key, value) => {
          ctx.cookies[key] = value;
        },
        get: key => ctx.cookies[key],
      },
    };
    try {
      await headerHandler(ctx, testCallback);
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(callbackTag).toEqual(false);
    }
  });

  test('token expired should go to next', async () => {
    const ctx = {
      headers: { authorization: generateToken(0) },
      cookies: {
        set: (key, value) => {
          ctx.cookies[key] = value;
        },
        get: key => ctx.cookies[key],
      },
    };
    await headerHandler(ctx, testCallback);
    expect(callbackTag).toEqual(true);
  });

  test('token valid should go to next', async () => {
    const ctx = {
      headers: { authorization: generateToken(TOKEN_EXPIRATION_TIME) },
      set: (key, value) => {
        ctx[key] = value;
      },
      cookies: {
        set: (key, value) => {
          ctx.cookies[key] = value;
        },
        get: key => ctx.cookies[key],
      },
    };
    await headerHandler(ctx, testCallback);
    expect(callbackTag).toEqual(true);
    expect(ctx.authorization.startsWith('Bearer')).toEqual(true);
  });
});
