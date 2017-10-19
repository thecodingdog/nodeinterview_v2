const {BadRequest, Forbidden, NotAuthorized, NotFound} = require('../helpers/customError');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const {message} = err;
    switch (err.constructor.name) {
      case BadRequest.name:
        return ctx.badRequest(message);
      case Forbidden.name:
        return ctx.forbidden(message);
      case NotAuthorized.name:
        return ctx.notAuthorized(message);
      case NotFound.name:
        return ctx.notFound(message);
      default:
        return ctx.serverError(err);
    }
  }
};
