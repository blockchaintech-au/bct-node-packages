import jwt from 'jsonwebtoken';
import { JWT_SECRET, TOKEN_EXPIRATION_TIME } from '../configs';
import UnauthorizedError from '../errors/unauthorized-error';

const AUTHORIZATION = 'authorization';
const G_AUTHUSER_H = 'G_AUTHUSER_H';
const G_ENABLED_IDPS = 'G_ENABLED_IDPS';

function parseAuthHeader(token) {
  try {
    if (token) {
      const user = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
      delete user.exp;
      delete user.iat;
      return user;
    }
    return null;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return null;
    }
    throw error;
  }
}

async function headerHandler(ctx, next) {
  try {
    const token = ctx.headers.authorization || ctx.cookies.get(AUTHORIZATION);
    ctx.user = parseAuthHeader(token);
  } catch (error) {
    throw new UnauthorizedError();
  }
  await next();
  if (ctx.user) {
    const token = jwt.sign(ctx.user, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
    ctx.set(AUTHORIZATION, `Bearer ${token}`);
    ctx.cookies.set(AUTHORIZATION, `Bearer ${token}`);
  } else {
    ctx.cookies.set(AUTHORIZATION, null);
    ctx.cookies.set(G_AUTHUSER_H, null);
    ctx.cookies.set(G_ENABLED_IDPS, null);
  }
}
export default headerHandler;
