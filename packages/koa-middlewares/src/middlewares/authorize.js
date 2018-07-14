import UnauthorizedError from '../errors/unauthorized-error';

async function authorize(ctx, next) {
  if (!ctx.user) {
    throw new UnauthorizedError();
  }
  await next();
}

export default authorize;
