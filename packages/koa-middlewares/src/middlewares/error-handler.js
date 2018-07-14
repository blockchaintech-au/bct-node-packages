import tracer from '@blockchaintech/tracer';

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    if (ctx.status === 500) {
      tracer.error(err.message, {
        path: ctx.path,
        status: ctx.status,
        stacks: err.stack ? err.stack.split(/\r?\n/) : [],
      });
    } else {
      tracer.warning(err.message, {
        path: ctx.path,
        status: ctx.status,
      });
    }
  }
}

export default errorHandler;
